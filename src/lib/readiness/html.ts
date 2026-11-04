/** Small HTML readers for audit pages. Regular expressions are enough here: nothing is rendered, only measured. */

const ENTITIES: Record<string, string> = {
  amp: "&", nbsp: " ", quot: '"', apos: "'", lt: "<", gt: ">", ndash: "-", mdash: "-", rsquo: "'", lsquo: "'", rdquo: '"', ldquo: '"', hellip: "...",
};

export function decodeEntities(s: string): string {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e: string) => {
    if (e[0] === "#") {
      const code = e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : Number(e.slice(1));
      return Number.isFinite(code) && code > 0 && code < 0x110000 ? String.fromCodePoint(code) : m;
    }
    return ENTITIES[e.toLowerCase()] ?? m;
  });
}

export const stripTags = (html: string) =>
  decodeEntities(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

export function visibleText(html: string): string {
  return stripTags(
    html
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<(script|style|noscript|svg|template|head)\b[\s\S]*?<\/\1>/gi, " "),
  );
}

export function markdownToText(md: string): string {
  return md
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^[#>\-*+\s]+/gm, "")
    .replace(/[*_`|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export type JsonLdNode = Record<string, unknown>;

export type ParsedHtml = {
  title: string;
  metaDescription: string;
  /** Lowercased robots directives from meta tags. */
  metaRobots: string;
  hasViewport: boolean;
  h1s: string[];
  headings: { level: number; text: string }[];
  links: string[];
  telLinks: string[];
  listCount: number;
  jsonLd: JsonLdNode[];
  jsonLdErrors: number;
  text: string;
};

function attrs(tag: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const m of tag.matchAll(/([a-zA-Z:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)) {
    out[m[1].toLowerCase()] = decodeEntities(m[2] ?? m[3] ?? m[4] ?? "");
  }
  return out;
}

export const schemaTypes = (node: JsonLdNode) => [node["@type"]].flat().map((t) => String(t).toLowerCase());

export function parseHtml(html: string): ParsedHtml {
  let metaRobots = "";
  let metaDescription = "";
  let hasViewport = false;
  for (const m of html.matchAll(/<meta\b[^>]*>/gi)) {
    const a = attrs(m[0]);
    const name = (a.name ?? "").toLowerCase();
    if (name === "robots" || name === "googlebot" || name === "bingbot") metaRobots += ` ${(a.content ?? "").toLowerCase()}`;
    if (name === "description") metaDescription = a.content ?? "";
    if (name === "viewport") hasViewport = true;
  }

  const links: string[] = [];
  const telLinks: string[] = [];
  for (const m of html.matchAll(/<a\b[^>]*>/gi)) {
    const href = attrs(m[0]).href;
    if (!href) continue;
    if (/^tel:/i.test(href)) telLinks.push(href);
    else links.push(href);
  }

  const headings: { level: number; text: string }[] = [];
  for (const m of html.matchAll(/<h([1-4])\b[^>]*>([\s\S]*?)<\/h\1>/gi)) {
    const text = stripTags(m[2]);
    if (text) headings.push({ level: Number(m[1]), text });
  }

  const jsonLd: JsonLdNode[] = [];
  let jsonLdErrors = 0;
  const walk = (v: unknown) => {
    if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === "object") {
      const node = v as JsonLdNode;
      if (node["@type"]) jsonLd.push(node);
      if (node["@graph"]) walk(node["@graph"]);
    }
  };
  for (const m of html.matchAll(/<script\b[^>]*type=["']?application\/ld\+json["']?[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      walk(JSON.parse(m[1].trim()));
    } catch {
      jsonLdErrors++;
    }
  }

  return {
    title: stripTags(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? ""),
    metaDescription,
    metaRobots: metaRobots.trim(),
    hasViewport,
    h1s: headings.filter((h) => h.level === 1).map((h) => h.text),
    headings,
    links,
    telLinks,
    listCount: (html.match(/<(ul|ol)\b/gi) ?? []).length,
    jsonLd,
    jsonLdErrors,
    text: visibleText(html),
  };
}

export const hasNoindex = (directives: string) => /\b(noindex|none)\b/i.test(directives);

/** Lowercased letters and digits only, so a quote still matches across markdown and punctuation differences. */
export const matchKey = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "");

export function snippetAround(text: string, index: number, length = 120): string {
  const start = Math.max(0, index - 30);
  return text.slice(start, start + length).trim();
}
