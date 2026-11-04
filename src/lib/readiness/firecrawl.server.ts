import { env } from "./env.server";

/** Firecrawl v2. Used for page discovery (map) and content extraction (scrape). Every URL is checked by the caller first. */

const BASE = "https://api.firecrawl.dev/v2";

async function call<T>(path: string, body: Record<string, unknown>, timeoutMs: number): Promise<T | null> {
  const key = env("FIRECRAWL_API_KEY");
  if (!key) return null;
  try {
    const res = await fetch(`${BASE}${path}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!res.ok) {
      console.error(`Firecrawl ${path} ${res.status}: ${(await res.text()).slice(0, 200)}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.error(`Firecrawl ${path} failed:`, err instanceof Error ? err.message : err);
    return null;
  }
}

export const firecrawlEnabled = () => Boolean(env("FIRECRAWL_API_KEY"));

export async function mapSite(url: string, limit = 300): Promise<string[] | null> {
  const json = await call<{ success: boolean; links?: ({ url: string } | string)[] }>(
    "/map",
    { url, limit, includeSubdomains: false, sitemap: "include" },
    25_000,
  );
  if (!json?.success || !json.links) return null;
  return json.links.map((l) => (typeof l === "string" ? l : l.url));
}

export type Scraped = { url: string; status: number; markdown: string; html: string; title: string };

export async function scrapePage(url: string): Promise<Scraped | null> {
  const json = await call<{
    success: boolean;
    data?: { markdown?: string; rawHtml?: string | null; metadata?: { statusCode?: number; url?: string; title?: string | string[] } };
  }>("/scrape", { url, formats: ["markdown", "rawHtml"], onlyMainContent: false, timeout: 30_000, maxAge: 86_400_000 }, 40_000);
  if (!json?.success || !json.data) return null;
  const meta = json.data.metadata ?? {};
  return {
    url: meta.url ?? url,
    status: meta.statusCode ?? 200,
    markdown: json.data.markdown ?? "",
    html: json.data.rawHtml ?? "",
    title: [meta.title].flat().filter(Boolean).join(" ") ?? "",
  };
}
