import { randomUUID } from "node:crypto";
import { cleanUrls, classify, parseSitemap, selectPages, type PageKind } from "./discover";
import { isDev, missingSetup } from "./env.server";
import { firecrawlEnabled, mapSite, scrapePage } from "./firecrawl.server";
import { hasNoindex, markdownToText, matchKey, parseHtml, schemaTypes, snippetAround, type ParsedHtml } from "./html";
import { evaluateContent, type AiCriterionId, type AiFinding, type AiResult } from "./openai.server";
import { runPageSpeed, type PageSpeed } from "./pagespeed.server";
import { crawlDelay, isAllowed, parseRobots, type Robots } from "./robots";
import { hostResolvesPublic, parseTargetUrl, safeFetch, USER_AGENT, type SafeResponse } from "./safeFetch.server";
import {
  CATEGORY_META,
  type Category,
  type CategoryId,
  type CategoryScore,
  type Check,
  type CheckStatus,
  type Counts,
  type Effort,
  type Evidence,
  type PlanStep,
  type Report,
  type ScanInput,
  type Teaser,
} from "./types";

/**
 * One audit, start to finish. Every check is deterministic except the ten content questions, which OpenAI answers
 * with quotes that are verified against the crawled text before they count. Anything that cannot be tested reports
 * "unknown" and is left out of the score rather than guessed.
 */

export type Progress = (percent: number, message: string, detail?: string) => void;

export class AuditError extends Error {}

type Page = {
  url: string;
  kinds: PageKind[];
  source: "firecrawl" | "direct";
  status: number;
  parsed: ParsedHtml;
  text: string;
  xRobots: string;
};

const BUDGET_MS = 150_000;
const MAX_PAGES = 10;

export async function runAudit(input: ScanInput, progress: Progress): Promise<Report> {
  const started = Date.now();
  const timeLeft = () => BUDGET_MS - (Date.now() - started);

  /* 1. The address. */
  const target = parseTargetUrl(input.url);
  if (!target) throw new AuditError("Enter a public website address, like yourcompany.com.");
  if (!(await hostResolvesPublic(target.hostname))) throw new AuditError("We couldn't find that website. Check the address and try again.");
  progress(4, "Loading your homepage");

  /* 2. Homepage and robots.txt, always fetched directly so headers and redirects are seen. */
  const homeRes = await safeFetch(target.href, { timeoutMs: 15_000 });
  if (!homeRes.ok || homeRes.status >= 400 || homeRes.text.length < 100) {
    throw new AuditError(
      homeRes.ok ? `Your homepage returned an error (HTTP ${homeRes.status}).` : "We couldn't load that website. Check the address and try again.",
    );
  }
  const home = new URL(homeRes.url);
  const pagespeedPromise = runPageSpeed(home.href);
  progress(10, "Reading robots.txt", "Checking which search and AI crawlers are allowed in");

  const robotsRes = await safeFetch(new URL("/robots.txt", home).href, { timeoutMs: 8_000, maxBytes: 200_000 });
  const robots: { status: "ok" | "missing" | "unknown"; parsed: Robots } =
    !robotsRes.ok
      ? { status: "unknown", parsed: parseRobots("") }
      : robotsRes.status >= 400 || /^\s*</.test(robotsRes.text)
        ? { status: "missing", parsed: parseRobots("") }
        : { status: "ok", parsed: parseRobots(robotsRes.text) };
  const delayMs = Math.min(crawlDelay(robots.parsed, USER_AGENT.split("/")[0]) * 1000, 3_000);
  const allowedForUs = (url: string) => isAllowed(robots.parsed, "Echo27ReadinessBot", new URL(url).pathname);

  /* 3. Finding pages: Firecrawl's map, the sitemaps, and the homepage's own links. */
  progress(18, "Finding your service and location pages");
  const homeParsed = parseHtml(homeRes.text);
  const found = new Set<string>(cleanUrls(homeParsed.links, home));
  const sitemapUrls = robots.parsed.sitemaps.length ? robots.parsed.sitemaps : [new URL("/sitemap.xml", home).href];
  const [mapped] = await Promise.all([
    firecrawlEnabled() ? mapSite(home.href) : Promise.resolve(null),
    (async () => {
      const queue = [...sitemapUrls].slice(0, 3);
      let fetched = 0;
      while (queue.length && fetched < 6) {
        const next = queue.shift()!;
        fetched++;
        if (!parseTargetUrl(next) || !sameHost(next, home)) continue;
        const res = await safeFetch(next, { timeoutMs: 8_000, maxBytes: 3_000_000 });
        if (!res.ok || res.status >= 400) continue;
        const { pages, children } = parseSitemap(res.text);
        cleanUrls(pages, home).forEach((u) => found.add(u));
        queue.push(...children.slice(0, 5));
      }
    })(),
  ]);
  if (mapped) cleanUrls(mapped, home).forEach((u) => found.add(u));
  const chosen = selectPages([...found].filter(allowedForUs), home.href.replace(/\/$/, "") || home.href, input.category, input.city, MAX_PAGES);

  /* 4. Reading the chosen pages. */
  const pages: Page[] = [
    {
      url: home.href,
      kinds: ["home"],
      source: "direct",
      status: homeRes.status,
      parsed: homeParsed,
      text: homeParsed.text,
      xRobots: (homeRes.headers["x-robots-tag"] ?? "").toLowerCase(),
    },
  ];
  const others = chosen.filter((u) => u !== home.href && u !== home.href.replace(/\/$/, ""));
  let done = 0;
  const readPage = async (url: string): Promise<Page | null> => {
    const page = await fetchPage(url, input.category, input.city);
    done++;
    progress(22 + Math.round((done / Math.max(others.length, 1)) * 30), `Reading page ${done + 1} of ${others.length + 1}`, shortPath(url));
    return page;
  };
  if (delayMs > 0 || timeLeft() < 60_000) {
    for (const url of others) {
      if (timeLeft() < 45_000) break;
      const page = await readPage(url);
      if (page) pages.push(page);
      if (delayMs) await new Promise((r) => setTimeout(r, delayMs));
    }
  } else {
    for (let i = 0; i < others.length; i += 3) {
      if (timeLeft() < 45_000) break;
      const batch = await Promise.all(others.slice(i, i + 3).map(readPage));
      batch.forEach((p) => p && pages.push(p));
    }
  }

  /* 5. The content questions, in parallel with PageSpeed. */
  progress(56, "Checking how well your content answers customer questions", "Reading like an AI search engine would");
  const aiPromise = evaluateContent(
    pages.map((p) => ({ url: p.url, text: p.text })),
    { category: input.category, city: input.city },
  );
  const ai = await Promise.race([aiPromise, new Promise<AiResult>((r) => setTimeout(() => r({ status: "error" }), Math.max(timeLeft() - 20_000, 5_000)))]);
  progress(84, "Measuring page speed on mobile");
  const pagespeed = await Promise.race([pagespeedPromise, new Promise<PageSpeed | null>((r) => setTimeout(() => r(null), Math.max(timeLeft() - 5_000, 1_000)))]);
  progress(94, "Scoring");

  /* 6. The checks. */
  const checks = buildChecks({ input, home, robots, pages, ai, pagespeed });
  return assemble(input, home, pages, checks);
}

/* ---------- Fetching one page ---------- */

async function fetchPage(url: string, category: Category, city: string): Promise<Page | null> {
  const kinds = classify(url, category, city);
  if (firecrawlEnabled()) {
    const scraped = await scrapePage(url);
    if (scraped && scraped.status < 400 && (scraped.html || scraped.markdown)) {
      const parsed = parseHtml(scraped.html);
      const text = scraped.markdown ? markdownToText(scraped.markdown) : parsed.text;
      return { url: scraped.url, kinds, source: "firecrawl", status: scraped.status, parsed, text, xRobots: "" };
    }
  }
  const res = await safeFetch(url, { timeoutMs: 12_000 });
  if (!res.ok || res.status >= 400) return null;
  const parsed = parseHtml(res.text);
  return { url: res.url, kinds, source: "direct", status: res.status, parsed, text: parsed.text, xRobots: (res.headers["x-robots-tag"] ?? "").toLowerCase() };
}

const sameHost = (url: string, home: URL) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "") === home.hostname.replace(/^www\./, "");
  } catch {
    return false;
  }
};

const shortPath = (url: string) => {
  try {
    const p = new URL(url).pathname;
    return p.length > 48 ? `${p.slice(0, 45)}...` : p;
  } catch {
    return "";
  }
};

/* ---------- Checks ---------- */

type Ctx = {
  input: ScanInput;
  home: URL;
  robots: { status: "ok" | "missing" | "unknown"; parsed: Robots };
  pages: Page[];
  ai: AiResult;
  pagespeed: PageSpeed | null;
};

type Draft = Omit<Check, "earned" | "evidence"> & { evidence?: Evidence[] };

const earnedFor = (status: CheckStatus, points: number) =>
  status === "pass" ? points : status === "partial" ? Math.round(points / 2) : status === "fail" ? 0 : null;

function finish(d: Draft): Check {
  return { ...d, earned: earnedFor(d.status, d.points), evidence: d.evidence ?? [] };
}

function buildChecks(ctx: Ctx): Check[] {
  const { input, home, robots, pages, ai, pagespeed } = ctx;
  const homePage = pages[0];
  const city = input.city.split(",")[0].trim();
  const cityKey = matchKey(city);
  const checks: Draft[] = [];
  const robotsUrl = new URL("/robots.txt", home).href;
  const aiFinding = (id: AiCriterionId): AiFinding | null | "unavailable" => {
    if (ai.status !== "ok") return "unavailable";
    return ai.findings.find((f) => f.id === id) ?? null;
  };

  /* --- AI crawler accessibility (20) --- */
  const botCheck = (id: string, agent: string, label: string, points: number, fix: string): Draft => {
    if (robots.status === "unknown") {
      return { id, category: "crawler", label, points, status: "unknown", finding: "We couldn't load your robots.txt, so this couldn't be verified.", fix, effort: "quick", evidence: [{ url: robotsUrl }] };
    }
    if (robots.status === "missing") {
      return { id, category: "crawler", label, points, status: "pass", finding: "You have no robots.txt, so nothing is blocked.", fix, effort: "quick", evidence: [{ url: robotsUrl, note: "robots.txt not found" }] };
    }
    const root = isAllowed(robots.parsed, agent, "/");
    const servicePages = pages.filter((p) => p.kinds.includes("service") || p.kinds.includes("location"));
    const blockedPages = servicePages.filter((p) => !isAllowed(robots.parsed, agent, new URL(p.url).pathname));
    const status: CheckStatus = !root ? "fail" : blockedPages.length ? "partial" : "pass";
    return {
      id, category: "crawler", label, points, status, fix, effort: "quick",
      finding: !root
        ? `Your robots.txt blocks ${agent} from the whole site.`
        : blockedPages.length
          ? `${agent} is allowed in, but ${blockedPages.length} of your service or area pages are blocked.`
          : `${agent} is allowed to crawl your site.`,
      evidence: [{ url: robotsUrl }, ...blockedPages.slice(0, 3).map((p) => ({ url: p.url, note: "blocked" }))],
    };
  };
  checks.push(botCheck("robots_googlebot", "Googlebot", "Googlebot is allowed in", 4, "Remove the Disallow rules for Googlebot in robots.txt. Google's AI Overviews and AI Mode can only recommend pages Google can crawl."));
  checks.push(botCheck("robots_bingbot", "Bingbot", "Bingbot is allowed in", 3, "Allow Bingbot in robots.txt. Bing's index feeds Copilot and ChatGPT's web results."));
  checks.push(botCheck("robots_oai", "OAI-SearchBot", "ChatGPT's search crawler is allowed in", 5, "Allow OAI-SearchBot in robots.txt. It is the crawler ChatGPT search uses to find and cite pages. (GPTBot is OpenAI's training crawler and is a separate decision.)"));

  const homeNoindex = hasNoindex(homePage.parsed.metaRobots) || hasNoindex(homePage.xRobots);
  checks.push({
    id: "noindex_home", category: "crawler", label: "Homepage can be indexed", points: 4,
    status: homeNoindex ? "fail" : "pass",
    finding: homeNoindex ? "Your homepage carries a noindex directive, which tells every search engine to leave it out." : "No noindex directive on your homepage.",
    fix: "Remove the noindex robots directive from the homepage (in the meta robots tag or the X-Robots-Tag header).",
    effort: "quick",
    evidence: [{ url: home.href, note: homeNoindex ? `Directive: ${homePage.parsed.metaRobots || homePage.xRobots}` : undefined }],
  });

  const inner = pages.slice(1);
  const noindexed = inner.filter((p) => hasNoindex(p.parsed.metaRobots) || hasNoindex(p.xRobots));
  checks.push({
    id: "noindex_pages", category: "crawler", label: "Service and area pages can be indexed", points: 2,
    status: !inner.length ? "unknown" : noindexed.length === 0 ? "pass" : noindexed.length < inner.length ? "partial" : "fail",
    finding: !inner.length
      ? "No inner pages could be read, so this couldn't be verified."
      : noindexed.length
        ? `${noindexed.length} of the ${inner.length} pages we read carry a noindex directive.`
        : `None of the ${inner.length} inner pages we read are set to noindex.`,
    fix: "Remove noindex from any page you want AI search to recommend.",
    effort: "quick",
    evidence: noindexed.slice(0, 5).map((p) => ({ url: p.url, note: "noindex" })),
  });

  const thin = pages.filter((p) => p.text.length < 300);
  checks.push({
    id: "crawl_health", category: "crawler", label: "Pages load with readable content", points: 2,
    status: thin.length === 0 ? "pass" : thin.length < pages.length ? "partial" : "fail",
    finding: thin.length === 0
      ? `All ${pages.length} pages we read returned real text content.`
      : `${thin.length} of ${pages.length} pages returned almost no text. If the content loads with JavaScript only, many crawlers never see it.`,
    fix: "Make sure your pages deliver their text in the HTML itself, not only after JavaScript runs. Ask your web developer about server-side rendering or pre-rendering.",
    effort: "bigger",
    evidence: thin.slice(0, 3).map((p) => ({ url: p.url, note: `${p.text.length} characters of text` })),
  });

  /* --- Service and location coverage (25) --- */
  const servicePages = pages.filter((p) => p.kinds.includes("service"));
  const locationPages = pages.filter((p) => p.kinds.includes("location"));
  checks.push({
    id: "service_pages", category: "coverage", label: "A page for each service", points: 7,
    status: servicePages.length >= 3 ? "pass" : servicePages.length ? "partial" : "fail",
    finding: servicePages.length
      ? `Found ${servicePages.length} service page${servicePages.length === 1 ? "" : "s"}.`
      : "No individual service pages were found linked from your site or sitemap.",
    fix: "Give every service you want to be recommended for its own page: what it includes, what it costs, how long it takes, and where you offer it.",
    effort: "bigger",
    evidence: servicePages.slice(0, 4).map((p) => ({ url: p.url })),
  });
  checks.push(fromAi("service_depth", "coverage", "Services described in detail", 5, aiFinding("ai_services_clear"), {
    yes: "Your services are described clearly, not just listed.",
    partly: "Services are listed, but with little detail about each.",
    no: "We couldn't find clear descriptions of your services.",
    fix: "Write a paragraph for each service covering the problem it solves, what's included, and typical pricing or timing.",
    effort: "medium",
  }));
  checks.push({
    id: "location_pages", category: "coverage", label: "Pages for the areas you serve", points: 6,
    status: locationPages.length >= 2 ? "pass" : locationPages.length ? "partial" : "fail",
    finding: locationPages.length
      ? `Found ${locationPages.length} service area page${locationPages.length === 1 ? "" : "s"}.`
      : "No service area or city pages were found.",
    fix: `Create a page for ${city} and each other area you serve. Write it for that area (neighbourhoods, local issues, jobs you've done there), not a copy with the city name swapped.`,
    effort: "bigger",
    evidence: locationPages.slice(0, 4).map((p) => ({ url: p.url })),
  });
  const homeTitleKey = matchKey(homePage.parsed.title);
  const homeH1Key = matchKey(homePage.parsed.h1s.join(" "));
  const homeTextKey = matchKey(homePage.text);
  const cityProminent = cityKey.length > 2 && (homeTitleKey.includes(cityKey) || homeH1Key.includes(cityKey));
  const cityMentioned = cityKey.length > 2 && homeTextKey.includes(cityKey);
  checks.push({
    id: "city_on_home", category: "coverage", label: `${city} named on your homepage`, points: 4,
    status: cityProminent ? "pass" : cityMentioned ? "partial" : "fail",
    finding: cityProminent
      ? `${city} appears in your homepage title or main heading.`
      : cityMentioned
        ? `${city} is mentioned on your homepage, but not in the title or main heading.`
        : `Your homepage never mentions ${city}.`,
    fix: `Put ${city} in your homepage title, main heading, and opening paragraph. AI answers are built city by city.`,
    effort: "quick",
    evidence: [{ url: home.href, quote: homePage.parsed.title || undefined, note: homePage.parsed.h1s[0] ? `H1: ${homePage.parsed.h1s[0]}` : undefined }],
  });
  checks.push(fromAi("areas_named", "coverage", "Service areas named in your content", 3, aiFinding("ai_areas_clear"), {
    yes: "Your content names the specific areas you serve.",
    partly: "Service areas are mentioned, but only vaguely.",
    no: "We couldn't find the cities or neighbourhoods you serve written out anywhere.",
    fix: "List the cities, towns, and neighbourhoods you serve in plain text, on the homepage and on each service page.",
    effort: "quick",
  }));

  /* --- Answer-friendly content (20) --- */
  const faqPage = pages.find((p) => p.kinds.includes("faq"));
  const faqSchemaPage = pages.find((p) => p.parsed.jsonLd.some((n) => schemaTypes(n).includes("faqpage")));
  const faqHeadingPage = pages.find((p) => p.parsed.headings.some((h) => /\b(faqs?|frequently asked|common questions)\b/i.test(h.text)));
  const faqAi = aiFinding("ai_customer_questions");
  const faqHit = faqPage ?? faqSchemaPage ?? faqHeadingPage;
  checks.push({
    id: "faq_present", category: "answers", label: "Customer questions answered directly", points: 5,
    status: faqHit ? "pass" : faqAi !== "unavailable" && faqAi?.answer === "partly" ? "partial" : faqAi === "unavailable" && !faqHit ? "unknown" : "fail",
    finding: faqHit
      ? "You have question-and-answer content AI engines can lift answers from."
      : faqAi === "unavailable"
        ? "No FAQ page or section was found, and the content review wasn't available to look deeper."
        : faqAi?.answer === "partly"
          ? faqAi.note
          : "No FAQ page, FAQ section, or question-and-answer content was found.",
    fix: "Add a FAQ to your key pages that answers the questions customers actually ask: cost, timing, emergencies, warranties, financing. Question as the heading, plain answer underneath.",
    effort: "medium",
    evidence: faqHit ? [{ url: faqHit.url }] : faqAi && faqAi !== "unavailable" && faqAi.quote ? [{ url: faqAi.url, quote: faqAi.quote }] : [],
  });
  checks.push(fromAi("cost_answers", "answers", "Pricing or cost ranges explained", 5, aiFinding("ai_cost_answers"), {
    yes: "Your site talks about cost, which is the first thing homeowners ask AI tools.",
    partly: "Cost is mentioned, but without ranges or specifics.",
    no: "Your site says nothing about what things cost.",
    fix: "Add typical price ranges, starting prices, or what affects the price to each service page. You don't need exact quotes; ranges are what AI answers repeat.",
    effort: "medium",
  }));
  checks.push(fromAi("process_answers", "answers", "What to expect explained", 4, aiFinding("ai_process_answers"), {
    yes: "Your site explains what happens when a customer books.",
    partly: "The process is touched on, but not clearly laid out.",
    no: "Nothing explains how booking a job works or how long it takes.",
    fix: "Describe the steps: how to book, when you arrive, what the visit involves, how long typical jobs take, and how payment works.",
    effort: "quick",
  }));
  checks.push(fromAi("plain_language", "answers", "Written in plain language", 3, aiFinding("ai_plain_language"), {
    yes: "Your content is specific and plainly written.",
    partly: "Some content is specific, but much of it is generic marketing language.",
    no: "Your content is mostly vague marketing phrases, which AI engines skip over.",
    fix: "Replace lines like 'quality service you can trust' with specifics: what you do, for whom, where, how fast, and at what price.",
    effort: "medium",
  }));
  const structured = pages.filter((p) => p.parsed.headings.filter((h) => h.level >= 2).length >= 3 && p.parsed.listCount >= 1);
  checks.push({
    id: "headings_structure", category: "answers", label: "Pages use clear headings and lists", points: 3,
    status: structured.length >= pages.length * 0.6 ? "pass" : structured.length ? "partial" : "fail",
    finding: `${structured.length} of ${pages.length} pages use subheadings and lists that make the content easy to extract.`,
    fix: "Break long pages up with descriptive subheadings (H2, H3) and bullet lists. AI engines lift answers from well-structured sections.",
    effort: "quick",
    evidence: pages.filter((p) => !structured.includes(p)).slice(0, 3).map((p) => ({ url: p.url, note: `${p.parsed.headings.filter((h) => h.level >= 2).length} subheadings, ${p.parsed.listCount} lists` })),
  });

  /* --- Trust and credibility (20) --- */
  const reviewSchemaPage = pages.find((p) => p.parsed.jsonLd.some((n) => n.aggregateRating || n.review || schemaTypes(n).includes("review")));
  const testimonialPage = pages.find((p) => p.kinds.includes("testimonials"));
  const reviewAi = aiFinding("ai_reviews_specific");
  const reviewFallback = reviewSchemaPage ?? testimonialPage;
  checks.push(
    reviewAi !== "unavailable" && reviewAi
      ? fromAi("reviews", "trust", "Specific customer reviews shown", 5, reviewAi, {
          yes: "Your site shows reviews that mention real jobs and outcomes.",
          partly: "Reviews are shown, but they're generic.",
          no: "No customer reviews or testimonials were found on the pages we read.",
          fix: "Show your best Google reviews on the site, with the customer's first name, the job, and the area. Keep new reviews coming in: volume and recency are among the strongest signals AI answers use.",
          effort: "quick",
        })
      : {
          id: "reviews", category: "trust", label: "Specific customer reviews shown", points: 5,
          status: reviewFallback ? "partial" : reviewAi === "unavailable" ? "unknown" : "fail",
          finding: reviewFallback
            ? "Reviews are present, but we couldn't assess how specific they are."
            : "No reviews or testimonials were found, and the content review wasn't available.",
          fix: "Show your best Google reviews on the site, with the customer's first name, the job, and the area.",
          effort: "quick",
          evidence: reviewFallback ? [{ url: reviewFallback.url }] : [],
        },
  );
  const credSignals = findSignals(pages, [
    /\b(fully\s+)?(licen[cs]ed|licen[cs]e\s*(#|no\.?|number)?\s*[a-z0-9-]{3,})\b/i,
    /\b(fully\s+)?insured\b|\bliability insurance\b|\bbonded\b/i,
    /\b(certified|certification|nate[- ]certified|master (plumber|electrician)|red seal|epa[- ]certified)\b/i,
    /\b(\d{1,3}\+?\s*years?\s+(of\s+)?(experience|in business|serving))|\b(since|established|est\.?)\s+(19|20)\d{2}\b/i,
    /\b(bbb|better business bureau|accredited|award[- ]winning|angi|homeadvisor|best of)\b/i,
  ]);
  const credAi = aiFinding("ai_credentials");
  checks.push({
    id: "credentials", category: "trust", label: "Licences, insurance, and experience stated", points: 5,
    status: credSignals.length >= 2 ? "pass" : credSignals.length === 1 || (credAi !== "unavailable" && credAi?.answer !== "no" && credAi) ? "partial" : "fail",
    finding: credSignals.length >= 2
      ? `Found ${credSignals.length} credibility signals (licensing, insurance, certifications, or years in business).`
      : credSignals.length === 1
        ? "Found one credibility signal. More would help."
        : credAi !== "unavailable" && credAi && credAi.answer !== "no"
          ? credAi.note
          : "No licence numbers, insurance, certifications, or years in business were found.",
    fix: "State your licence number, insurance, certifications, and years in business in the footer and on your About page. AI engines use these to decide who is safe to recommend.",
    effort: "quick",
    evidence: credSignals.slice(0, 4),
  });
  const aboutPage = pages.find((p) => p.kinds.includes("about"));
  const peopleAi = aiFinding("ai_people");
  checks.push(
    peopleAi !== "unavailable"
      ? fromAi("people", "trust", "Real people named", 4, peopleAi, {
          yes: "Your site names the people behind the business.",
          partly: "People are mentioned, but without names, roles, or bios.",
          no: "No owner, technicians, or team members are named anywhere we read.",
          fix: "Add the owner and key team members with names, roles, photos, and a line about their experience. AI engines treat named people as a trust signal.",
          effort: "quick",
        })
      : {
          id: "people", category: "trust", label: "Real people named", points: 4,
          status: aboutPage ? "partial" : "unknown",
          finding: aboutPage ? "You have an About page, but we couldn't verify it names real people." : "Couldn't be verified without the content review.",
          fix: "Add the owner and key team members with names, roles, photos, and a line about their experience.",
          effort: "quick",
          evidence: aboutPage ? [{ url: aboutPage.url }] : [],
        },
  );
  const hasPhone = homePage.parsed.telLinks.length > 0 || /\(?\b\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}\b/.test(homePage.text);
  const addressSchema = pages.some((p) => p.parsed.jsonLd.some((n) => n.address));
  const addressText = /\b\d{1,6}\s+[a-z0-9.' -]{2,40}\b(street|st|avenue|ave|road|rd|boulevard|blvd|drive|dr|lane|ln|way|court|ct|place|pl|highway|hwy|parkway|pkwy)\b/i.test(homePage.text);
  const nap = (hasPhone ? 1 : 0) + (addressSchema || addressText ? 1 : 0);
  checks.push({
    id: "contact_nap", category: "trust", label: "Phone number and address visible", points: 4,
    status: nap === 2 ? "pass" : nap === 1 ? "partial" : "fail",
    finding: nap === 2
      ? "Your phone number and a street address are on the site."
      : hasPhone
        ? "Your phone number is shown, but no street address was found."
        : addressSchema || addressText
          ? "An address was found, but no phone number on the homepage."
          : "No phone number or address was found on your homepage.",
    fix: "Show your phone number (as a tap-to-call link) and your full address on every page, matching your Google Business Profile exactly.",
    effort: "quick",
    evidence: [{ url: home.href, note: homePage.parsed.telLinks[0] ? `Call link: ${homePage.parsed.telLinks[0]}` : undefined }],
  });
  const guaranteeSignals = findSignals(pages, [/\b(guarantee[ds]?|warrant(y|ies|ied)|satisfaction promise|money[- ]back)\b/i]);
  const guaranteeAi = aiFinding("ai_guarantee");
  checks.push({
    id: "guarantee", category: "trust", label: "Guarantee or warranty stated", points: 2,
    status: guaranteeSignals.length ? "pass" : guaranteeAi !== "unavailable" && guaranteeAi?.answer === "partly" ? "partial" : "fail",
    finding: guaranteeSignals.length
      ? "Your site states a guarantee or warranty."
      : guaranteeAi !== "unavailable" && guaranteeAi?.answer === "partly"
        ? guaranteeAi.note
        : "No guarantee, warranty, or satisfaction promise was found.",
    fix: "State your workmanship guarantee or warranty terms plainly on service pages. It is one of the specifics AI answers repeat.",
    effort: "quick",
    evidence: guaranteeSignals.slice(0, 2),
  });

  /* --- Structured data (10) --- */
  const LOCAL = new Set(["localbusiness", "homeandconstructionbusiness", "hvacbusiness", "plumber", "roofingcontractor", "electrician", "generalcontractor", "housepainter", "locksmith", "movingcompany", "professionalservice", "store"]);
  const business = pages.flatMap((p) => p.parsed.jsonLd.map((n) => ({ page: p, node: n }))).find((x) => schemaTypes(x.node).some((t) => LOCAL.has(t)));
  const organization = pages.flatMap((p) => p.parsed.jsonLd.map((n) => ({ page: p, node: n }))).find((x) => schemaTypes(x.node).some((t) => t === "organization" || t === "corporation"));
  const ldErrors = pages.reduce((n, p) => n + p.parsed.jsonLdErrors, 0);
  checks.push({
    id: "localbusiness_schema", category: "schema", label: "LocalBusiness structured data", points: 5,
    status: business ? "pass" : organization ? "partial" : "fail",
    finding: business
      ? `Found ${String([business.node["@type"]].flat()[0])} markup.`
      : organization
        ? "Found Organization markup, but nothing that identifies you as a local business."
        : `No LocalBusiness structured data was found${ldErrors ? ` (${ldErrors} JSON-LD block${ldErrors === 1 ? "" : "s"} couldn't be parsed)` : ""}.`,
    fix: `Add JSON-LD markup of type ${schemaTypeFor(input.category)} to your homepage with your name, phone, address, hours, service area, and URL. Most site builders and SEO plugins can generate it.`,
    effort: "medium",
    evidence: business ? [{ url: business.page.url }] : organization ? [{ url: organization.page.url }] : [{ url: home.href }],
  });
  const details = business ? (["telephone", "address", "areaServed", "openingHours", "url", "geo"] as const).filter((k) => business.node[k] ?? (k === "openingHours" && business.node.openingHoursSpecification) ?? (k === "areaServed" && business.node.serviceArea)) : [];
  checks.push({
    id: "schema_details", category: "schema", label: "Business markup is complete", points: 3,
    status: !business ? "fail" : details.length >= 4 ? "pass" : details.length >= 2 ? "partial" : "fail",
    finding: business ? `${details.length} of 6 key properties present (${details.join(", ") || "none"}).` : "Nothing to check without LocalBusiness markup.",
    fix: "Fill in telephone, address, areaServed, openingHours, url, and geo in your business markup, matching your Google Business Profile.",
    effort: "quick",
    evidence: business ? [{ url: business.page.url }] : [],
  });
  const servicesSchema = pages.find((p) => p.parsed.jsonLd.some((n) => schemaTypes(n).includes("service") || n.hasOfferCatalog));
  checks.push({
    id: "faq_service_schema", category: "schema", label: "FAQ and Service markup", points: 2,
    status: faqSchemaPage && servicesSchema ? "pass" : faqSchemaPage || servicesSchema ? "partial" : "fail",
    finding: faqSchemaPage && servicesSchema
      ? "Both FAQPage and Service markup were found."
      : faqSchemaPage
        ? "FAQPage markup found, but no Service markup."
        : servicesSchema
          ? "Service markup found, but no FAQPage markup."
          : "No FAQPage or Service markup was found.",
    fix: "Mark up your FAQ answers as FAQPage and your services as Service (or an OfferCatalog on your business markup).",
    effort: "medium",
    evidence: [faqSchemaPage && { url: faqSchemaPage.url, note: "FAQPage" }, servicesSchema && { url: servicesSchema.url, note: "Service" }].filter(Boolean) as Evidence[],
  });

  /* --- Page experience (5) --- */
  checks.push({
    id: "mobile_viewport", category: "experience", label: "Mobile viewport set", points: 1,
    status: homePage.parsed.hasViewport ? "pass" : "fail",
    finding: homePage.parsed.hasViewport ? "Your homepage declares a mobile viewport." : "No viewport meta tag was found, so the page may not scale on phones.",
    fix: 'Add <meta name="viewport" content="width=device-width, initial-scale=1"> to every page.',
    effort: "quick",
    evidence: [{ url: home.href }],
  });
  const perf = pagespeed?.performance ?? null;
  checks.push({
    id: "performance", category: "experience", label: "Mobile performance score", points: 3,
    status: perf === null ? "unknown" : perf >= 70 ? "pass" : perf >= 40 ? "partial" : "fail",
    finding: perf === null
      ? "PageSpeed Insights didn't return a result, so this couldn't be verified."
      : `Google PageSpeed scores your homepage ${perf} out of 100 on mobile.`,
    fix: "Compress images, remove unused scripts and plugins, and use a fast host. Your web developer can work from the PageSpeed report.",
    effort: "medium",
    evidence: [{ url: pagespeed?.reportUrl ?? `https://pagespeed.web.dev/analysis?url=${encodeURIComponent(home.href)}`, note: "PageSpeed Insights report" }],
  });
  const lcpOk = pagespeed?.lcpMs != null ? pagespeed.lcpMs <= 2500 : null;
  const clsOk = pagespeed?.cls != null ? pagespeed.cls <= 0.1 : null;
  const vitals = [lcpOk, clsOk].filter((v) => v !== null) as boolean[];
  checks.push({
    id: "core_web_vitals", category: "experience", label: "Core Web Vitals", points: 1,
    status: !vitals.length ? "unknown" : vitals.every(Boolean) ? "pass" : vitals.some(Boolean) ? "partial" : "fail",
    finding: !vitals.length
      ? "No Core Web Vitals data was available."
      : `Largest Contentful Paint ${pagespeed?.lcpMs != null ? `${(pagespeed.lcpMs / 1000).toFixed(1)}s` : "unknown"}, layout shift ${pagespeed?.cls != null ? pagespeed.cls.toFixed(2) : "unknown"}.`,
    fix: "Aim for LCP under 2.5 seconds and CLS under 0.1 on mobile. Large hero images and late-loading banners are the usual causes.",
    effort: "medium",
    evidence: pagespeed ? [{ url: pagespeed.reportUrl, note: "PageSpeed Insights report" }] : [],
  });

  return checks.map(finish);
}

function fromAi(
  id: string,
  category: CategoryId,
  label: string,
  points: number,
  finding: AiFinding | null | "unavailable",
  copy: { yes: string; partly: string; no: string; fix: string; effort: Effort },
): Draft {
  if (finding === "unavailable") {
    return { id, category, label, points, status: "unknown", finding: "The content review wasn't available, so this couldn't be verified.", fix: copy.fix, effort: copy.effort, evidence: [] };
  }
  if (!finding) {
    return { id, category, label, points, status: "unknown", finding: "The content review couldn't back this up with a verified quote, so it's left unscored.", fix: copy.fix, effort: copy.effort, evidence: [] };
  }
  const status: CheckStatus = finding.answer === "yes" ? "pass" : finding.answer === "partly" ? "partial" : "fail";
  return {
    id, category, label, points, status,
    finding: finding.note || copy[finding.answer],
    fix: copy.fix,
    effort: copy.effort,
    evidence: finding.quote ? [{ url: finding.url, quote: finding.quote }] : [],
  };
}

/** Regex evidence from page text, one quote per pattern, so a credentials line is shown as written. */
function findSignals(pages: Page[], patterns: RegExp[]): Evidence[] {
  const out: Evidence[] = [];
  for (const pattern of patterns) {
    for (const page of pages) {
      const m = pattern.exec(page.text);
      if (m && m.index != null) {
        out.push({ url: page.url, quote: snippetAround(page.text, m.index) });
        break;
      }
    }
  }
  return out;
}

function schemaTypeFor(category: Category): string {
  switch (category) {
    case "HVAC": return "HVACBusiness";
    case "Plumbing": return "Plumber";
    case "Roofing": return "RoofingContractor";
    case "Electrical": return "Electrician";
    case "Painting": return "HousePainter";
    default: return "HomeAndConstructionBusiness (or LocalBusiness)";
  }
}

/* ---------- Scores, priorities, plan ---------- */

const ORDER: CategoryId[] = ["crawler", "coverage", "answers", "trust", "schema", "experience"];

function assemble(input: ScanInput, home: URL, pages: Page[], checks: Check[]): Report {
  const categories: CategoryScore[] = ORDER.map((id) => {
    const own = checks.filter((c) => c.category === id);
    const verifiedMax = own.filter((c) => c.earned !== null).reduce((n, c) => n + c.points, 0);
    return {
      id,
      label: CATEGORY_META[id].label,
      max: CATEGORY_META[id].max,
      earned: own.reduce((n, c) => n + (c.earned ?? 0), 0),
      verifiedMax,
      unverified: CATEGORY_META[id].max - verifiedMax,
    };
  });
  const verifiedPoints = categories.reduce((n, c) => n + c.verifiedMax, 0);
  const earned = categories.reduce((n, c) => n + c.earned, 0);
  /* The score is earned points as a share of the points that could be verified. Below 60 verified points it stays blank. */
  const score = verifiedPoints >= 60 ? Math.round((earned / verifiedPoints) * 100) : null;

  const counts: Counts = { pass: 0, partial: 0, fail: 0, unknown: 0 };
  for (const c of checks) counts[c.status]++;

  const lost = (c: Check) => (c.earned === null ? 0 : c.points - c.earned);
  const failing = checks.filter((c) => c.status === "fail" || c.status === "partial").sort((a, b) => lost(b) - lost(a) || ORDER.indexOf(a.category) - ORDER.indexOf(b.category));
  const priorities = failing.slice(0, 3);

  const step = (c: Check): PlanStep => ({ checkId: c.id, label: c.label, fix: c.fix });
  const plan = {
    thisWeek: failing.filter((c) => c.effort === "quick").map(step),
    thisMonth: failing.filter((c) => c.effort === "medium").map(step),
    next90Days: failing.filter((c) => c.effort === "bigger").map(step),
  };

  const teaser: Teaser = {
    reportId: randomUUID(),
    url: home.href,
    host: home.hostname.replace(/^www\./, ""),
    city: input.city,
    category: input.category,
    score,
    verifiedPoints,
    categories,
    counts,
    issues: priorities.map((c) => ({ id: c.id, label: c.label, finding: c.finding, status: c.status, category: c.category })),
    pagesReviewed: pages.length,
    createdAt: new Date().toISOString(),
    ...(isDev() && missingSetup().length ? { missingSetup: missingSetup() } : {}),
  };
  return {
    ...teaser,
    checks,
    priorities,
    plan,
    pages: pages.map((p) => ({ url: p.url, kinds: p.kinds, source: p.source })),
  };
}

export const teaserOf = (report: Report): Teaser => {
  const { checks: _c, priorities: _p, plan: _pl, pages: _pg, ...teaser } = report;
  return teaser;
};
