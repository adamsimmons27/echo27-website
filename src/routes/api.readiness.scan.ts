import { createFileRoute } from "@tanstack/react-router";
import { CATEGORIES, type Category, type ScanEvent, type ScanInput } from "@/lib/readiness/types";

/**
 * POST /api/readiness/scan: runs an audit and streams progress as server-sent events, ending with the teaser.
 * Streaming keeps the connection alive for the minute or two an audit takes and lets the page show real progress.
 */
export const Route = createFileRoute("/api/readiness/scan")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { runAudit, AuditError, teaserOf } = await import("@/lib/readiness/audit.server");
        const { acquireSlot, allow, clientIp, hashIp } = await import("@/lib/readiness/limits.server");
        const { findRecent, saveReport } = await import("@/lib/readiness/storage.server");

        let body: Record<string, unknown>;
        try {
          body = (await request.json()) as Record<string, unknown>;
        } catch {
          return json({ error: "Bad request" }, 400);
        }
        const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
        const input: ScanInput = {
          url: clean(body.url, 2048),
          category: CATEGORIES.includes(body.category as Category) ? (body.category as Category) : "Other home service",
          city: clean(body.city, 80),
          company: clean(body.company, 200),
        };
        /* Honeypot: real people never see the field. Answer as if it worked so bots learn nothing. */
        if (input.company) return stream(async (send) => send({ type: "error", message: "Something went wrong. Please try again." }));
        if (input.city.length < 2) return stream(async (send) => send({ type: "error", message: "Enter the main city you serve." }));

        const visitor = hashIp(clientIp());
        if (!allow(`scan:${visitor}`, 3)) {
          return stream(async (send) => send({ type: "error", message: "You've run a few audits already. Try again in an hour." }));
        }

        return stream(async (send) => {
          let host: string;
          try {
            host = new URL(/^https?:\/\//i.test(input.url) ? input.url : `https://${input.url}`).hostname.toLowerCase().replace(/^www\./, "");
          } catch {
            send({ type: "error", message: "Enter a public website address, like yourcompany.com." });
            return;
          }
          const cacheKey = `${host}|${input.category}|${input.city}`.toLowerCase();
          const recent = await findRecent(cacheKey, 24 * 60 * 60 * 1000);
          if (recent) {
            send({ type: "progress", percent: 100, message: "We audited this site recently. Here are the results." });
            send({ type: "result", teaser: recent.teaser });
            return;
          }

          const release = acquireSlot();
          if (!release) {
            send({ type: "error", message: "The checker is busy right now. Try again in a minute." });
            return;
          }
          try {
            const report = await runAudit(input, (percent, message, detail) => send({ type: "progress", percent, message, detail }));
            const teaser = teaserOf(report);
            const saved = await saveReport({ id: report.reportId, host, cache_key: cacheKey, created_at: report.createdAt, teaser, report });
            if (!saved) console.error("Readiness report could not be saved; the full report will not unlock.");
            send({ type: "progress", percent: 100, message: "Done" });
            send({ type: "result", teaser });
          } catch (err) {
            if (err instanceof AuditError) send({ type: "error", message: err.message });
            else {
              console.error("Readiness audit failed:", err);
              send({ type: "error", message: "The audit didn't finish. Give it another try in a moment." });
            }
          } finally {
            release();
          }
        });
      },
    },
  },
});

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}

function stream(run: (send: (event: ScanEvent) => void) => Promise<void>): Response {
  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      let closed = false;
      const send = (event: ScanEvent) => {
        if (closed) return;
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
        } catch {
          closed = true;
        }
      };
      /* A comment line every 10 seconds keeps proxies from closing a quiet connection mid-audit. */
      const heartbeat = setInterval(() => {
        if (closed) return;
        try {
          controller.enqueue(encoder.encode(": keep-alive\n\n"));
        } catch {
          closed = true;
        }
      }, 10_000);
      run(send).finally(() => {
        clearInterval(heartbeat);
        closed = true;
        try {
          controller.close();
        } catch {
          /* already closed */
        }
      });
    },
  });
  return new Response(body, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}
