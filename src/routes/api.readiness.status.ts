import { createFileRoute } from "@tanstack/react-router";

/**
 * GET /api/readiness/status: which integrations this server can see. Yes or no only, never a value.
 * It exists because a setting added in Vercel only takes effect after a redeploy, and nothing else shows that it did.
 */
export const Route = createFileRoute("/api/readiness/status")({
  server: {
    handlers: {
      GET: async () => {
        const { env } = await import("@/lib/readiness/env.server");
        const { storageEnabled } = await import("@/lib/readiness/storage.server");
        const set = (name: string) => Boolean(env(name));
        return new Response(
          JSON.stringify({
            firecrawl: set("FIRECRAWL_API_KEY"),
            openai: set("OPENAI_API_KEY"),
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
