import { createFileRoute } from "@tanstack/react-router";

/** GET /api/readiness/report?id=...: the teaser, plus the full report once the lead form has been submitted. */
export const Route = createFileRoute("/api/readiness/report")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { getReport } = await import("@/lib/readiness/storage.server");
        const id = new URL(request.url).searchParams.get("id") ?? "";
        if (!/^[0-9a-f-]{36}$/.test(id)) return json({ ok: false }, 400);
        const stored = await getReport(id);
        if (!stored) return json({ ok: false }, 404);
        return json({ ok: true, teaser: stored.teaser, report: stored.unlocked_at ? stored.report : null });
      },
    },
  },
});

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });
}
