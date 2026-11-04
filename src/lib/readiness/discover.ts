import type { Category } from "./types";

/** Sorts a site's URLs into page types, then picks at most ten pages worth reading. */

export type PageKind = "home" | "service" | "location" | "faq" | "about" | "testimonials" | "contact" | "other";

export const CATEGORY_WORDS: Record<Exclude<Category, "Other home service">, string[]> = {
  HVAC: ["hvac", "heating", "cooling", "furnace", "air-condition", "ac-repair", "ac-install", "heat-pump", "boiler", "duct"],
  Plumbing: ["plumb", "drain", "water-heater", "sewer", "leak", "pipe", "toilet", "faucet"],
  Roofing: ["roof", "shingle", "gutter", "siding", "skylight"],
  Electrical: ["electric", "panel", "wiring", "ev-charger", "generator", "lighting", "rewir"],
  Landscaping: ["landscap", "lawn", "garden", "hardscap", "irrigation", "tree", "patio", "sod"],
  "Garage doors": ["garage", "door-repair", "door-install", "opener", "spring"],
  "Pest control": ["pest", "termite", "rodent", "bed-bug", "ant-", "wasp", "exterminat", "mosquito"],
  Cleaning: ["clean", "maid", "carpet", "janitorial", "window-wash", "pressure-wash"],
  Painting: ["paint", "stain", "drywall", "cabinet-refinish"],
};

const NOT_CONTENT = /\/(blog|news|article|articles|tag|tags|category|categories|author|page|wp-|feed|cart|checkout|account|privacy|terms|legal|sitemap|careers|jobs)(\/|-|$)/;
const FILE = /\.(pdf|jpe?g|png|gif|svg|webp|zip|xml|css|js|ico|mp4|docx?)$/i;

export const sameSite = (a: string, b: string) => a.replace(/^www\./, "") === b.replace(/^www\./, "");

export function citySlug(city: string): string {
  return city.split(",")[0].trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function classify(url: string, category: Category, city: string): PageKind[] {
  let path: string;
  try {
    path = new URL(url).pathname.toLowerCase().replace(/\/$/, "");
  } catch {
    return ["other"];
  }
  if (!path) return ["home"];
  if (NOT_CONTENT.test(path)) return ["other"];
  const kinds: PageKind[] = [];
  if (/\/(about|our-story|who-we-are|meet-the|our-team|team)(\/|-|$)/.test(path)) kinds.push("about");
  if (/(^|\/|-)(faqs?|frequently-asked|questions)(\/|-|$)/.test(path)) kinds.push("faq");
  if (/(testimonial|\/reviews?(\/|-|$)|customer-stories|what-our-customers)/.test(path)) kinds.push("testimonials");
  if (/\/contact(\/|-|$)/.test(path)) kinds.push("contact");
  const slug = citySlug(city);
  if (/(service-areas?|areas-we-serve|\/areas\/|\/locations?\/|\/cities\/|\/communities\/)/.test(path) || (slug.length > 2 && path.includes(slug))) {
    kinds.push("location");
  }
  const words = category === "Other home service" ? [] : CATEGORY_WORDS[category];
  if (/\/services?\/[^/]+/.test(path) || words.some((w) => path.includes(w))) kinds.push("service");
  return kinds.length ? kinds : ["other"];
}

/** Cleans a raw list down to crawlable pages on this site, without query strings or fragments. */
export function cleanUrls(raw: string[], base: URL): string[] {
  const out = new Set<string>();
  for (const href of raw) {
    try {
      const u = new URL(href, base);
      if (!/^https?:$/.test(u.protocol) || !sameSite(u.hostname, base.hostname) || FILE.test(u.pathname)) continue;
      out.add(`${base.protocol}//${base.host}${u.pathname.replace(/\/$/, "") || "/"}`);
    } catch {
      /* unparsable href */
    }
  }
  return [...out];
}

const QUOTAS: [PageKind, number][] = [
  ["service", 3],
  ["location", 2],
  ["faq", 1],
  ["about", 1],
  ["testimonials", 1],
  ["contact", 1],
];

export function selectPages(urls: string[], home: string, category: Category, city: string, limit = 10): string[] {
  const picked = new Set<string>([home]);
  const typed = urls.map((url) => ({ url, kinds: classify(url, category, city) }));
  /* Shorter paths first: /services/furnace-repair says more about the business than a deep archive page. */
  const byDepth = (a: { url: string }, b: { url: string }) => a.url.length - b.url.length;
  for (const [kind, quota] of QUOTAS) {
    const matches = typed.filter((t) => t.kinds.includes(kind) && !picked.has(t.url)).sort(byDepth);
    for (const m of matches.slice(0, quota)) if (picked.size < limit) picked.add(m.url);
  }
  for (const t of typed.filter((x) => x.kinds[0] !== "other" && !x.kinds.includes("home")).sort(byDepth)) {
    if (picked.size >= limit) break;
    picked.add(t.url);
  }
  return [...picked];
}

/** Pulls page URLs out of a sitemap or sitemap index. */
export function parseSitemap(xml: string): { pages: string[]; children: string[] } {
  const locs = [...xml.matchAll(/<loc>\s*(?:<!\[CDATA\[)?\s*([^<\s\]]+)/gi)].map((m) => m[1]).slice(0, 2000);
  return /<sitemapindex/i.test(xml) ? { pages: [], children: locs } : { pages: locs, children: [] };
}
