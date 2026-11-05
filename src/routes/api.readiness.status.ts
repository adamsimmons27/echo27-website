import { createFileRoute } from "@tanstack/react-router";

/**
 * GET /api/readiness/status: which integrations this server can see, never a value.
 * Add ?check=1 to also test the Firecrawl and OpenAI keys against their providers.
 * It exists because a setting added in Vercel only takes effect after a redeploy, and nothing else shows that it did.
 */
export const Route = createFileRoute("/api/readiness/status")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { env } = await import("@/lib/readiness/env.server");
        const { storageEnabled } = await import("@/lib/readiness/storage.server");
        const { allow, clientIp, hashIp } = await import("@/lib/readiness/limits.server");
        const set = (name: string) => Boolean(env(name));

        /* ?check=1 also asks each provider whether it accepts the key. Neither call spends credits. */
        const live = new URL(request.url).searchParams.get("check") === "1" && allow(`status:${hashIp(clientIp())}`, 10);
        const probe = async (url: string, key: string | undefined, credits?: (body: unknown) => number | undefined) => {
          if (!key) return false;
          if (!live) return true;
          try {
            const res = await fetch(url, { headers: { Authorization: `Bearer ${key}` }, signal: AbortSignal.timeout(8_000) });
            if (res.status === 401 || res.status === 403) return "key rejected";
            if (res.status === 402) return "no credits";
            if (!res.ok) return `provider answered ${res.status}`;
            const left = credits?.(await res.json().catch(() => null));
            if (left !== undefined) return left > 0 ? `working, ${left} credits left` : "no credits";
            return "working";
          } catch {
            return "provider did not answer";
          }
        };
        const [firecrawl, openai] = await Promise.all([
          probe("https://api.firecrawl.dev/v2/team/credit-usage", env("FIRECRAWL_API_KEY"), (b) => {
            const n = (b as { data?: { remainingCredits?: unknown } } | null)?.data?.remainingCredits;
            return typeof n === "number" ? n : undefined;
          }),
          probe("https://api.openai.com/v1/models", env("OPENAI_API_KEY")),
        ]);
        return new Response(
          JSON.stringify({
            firecrawl,
            openai,
            pagespeed: set("PAGESPEED_API_KEY"),
            reportStorage: storageEnabled(),
            leadWebhook: set("GHL_WEBHOOK_URL") || Boolean(import.meta.env.VITE_GHL_WEBHOOK_URL),
          }),
          { headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } },
        );
      },
    },
  },
});
