import { env } from "./env.server";

/** Google PageSpeed Insights v5, mobile strategy. Without a key Google rate-limits hard, so the check reports unknown instead. */

export type PageSpeed = {
  performance: number | null;
  lcpMs: number | null;
  cls: number | null;
  inpMs: number | null;
  viewportOk: boolean | null;
  reportUrl: string;
};

export const pagespeedEnabled = () => Boolean(env("PAGESPEED_API_KEY"));

export async function runPageSpeed(url: string): Promise<PageSpeed | null> {
  const key = env("PAGESPEED_API_KEY");
  if (!key) return null;
  const q = new URLSearchParams({ url, strategy: "mobile", category: "performance", key });
  try {
    const res = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${q}`, {
      signal: AbortSignal.timeout(75_000),
    });
    if (!res.ok) {
      console.error(`PageSpeed ${res.status}: ${(await res.text()).slice(0, 200)}`);
      return null;
    }
    const json = (await res.json()) as {
      lighthouseResult?: {
        categories?: { performance?: { score?: number } };
        audits?: Record<string, { numericValue?: number; score?: number }>;
      };
      loadingExperience?: { metrics?: Record<string, { percentile?: number }> };
    };
    const lh = json.lighthouseResult;
    const audits = lh?.audits ?? {};
    const field = json.loadingExperience?.metrics ?? {};
    const score = lh?.categories?.performance?.score;
    return {
      performance: typeof score === "number" ? Math.round(score * 100) : null,
      lcpMs: field.LARGEST_CONTENTFUL_PAINT_MS?.percentile ?? audits["largest-contentful-paint"]?.numericValue ?? null,
      cls: field.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile != null
        ? field.CUMULATIVE_LAYOUT_SHIFT_SCORE.percentile / 100
        : audits["cumulative-layout-shift"]?.numericValue ?? null,
      inpMs: field.INTERACTION_TO_NEXT_PAINT?.percentile ?? null,
      viewportOk: typeof audits.viewport?.score === "number" ? audits.viewport.score === 1 : null,
      reportUrl: `https://pagespeed.web.dev/analysis?url=${encodeURIComponent(url)}`,
    };
  } catch (err) {
    console.error("PageSpeed failed:", err instanceof Error ? err.message : err);
    return null;
  }
}
