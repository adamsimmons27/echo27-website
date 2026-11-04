import { createFileRoute } from "@tanstack/react-router";
import { CONSENT_TEXT, type UnlockInput } from "@/lib/readiness/types";

/** POST /api/readiness/unlock: records the lead, sends it to GoHighLevel from the server, and returns the full report. */
export const Route = createFileRoute("/api/readiness/unlock")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { allow, clientIp, hashIp } = await import("@/lib/readiness/limits.server");
        const { getReport, markUnlocked } = await import("@/lib/readiness/storage.server");
        const { env } = await import("@/lib/readiness/env.server");

        let body: Record<string, unknown>;
        try {
          body = (await request.json()) as Record<string, unknown>;
        } catch {
          return json({ ok: false, error: "Bad request" }, 400);
        }
        const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
        const input: UnlockInput = {
          reportId: clean(body.reportId, 64),
          name: clean(body.name, 120),
          email: clean(body.email, 200).toLowerCase(),
          marketingConsent: body.marketingConsent === true,
          attribution: pickStrings(body.attribution),
          company: clean(body.company, 200),
        };
        if (input.company) return json({ ok: false, error: "Something went wrong. Please try again." }, 400);
        if (!/^[0-9a-f-]{36}$/.test(input.reportId)) return json({ ok: false, error: "That report has expired. Run the audit again." }, 400);
        if (input.name.length < 2) return json({ ok: false, error: "Enter your name." }, 400);
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.email)) return json({ ok: false, error: "Enter a valid email address." }, 400);

        const ip = clientIp();
        if (!allow(`unlock:${hashIp(ip)}`, 10)) return json({ ok: false, error: "Too many requests. Try again in an hour." }, 429);

        const stored = await getReport(input.reportId);
        if (!stored) return json({ ok: false, error: "That report has expired. Run the audit again." }, 404);

        await markUnlocked(stored.id, { ...input, ip: hashIp(ip) });

        const webhook = env("GHL_WEBHOOK_URL") ?? (import.meta.env.VITE_GHL_WEBHOOK_URL as string | undefined);
        if (webhook) {
          const t = stored.teaser;
          try {
            const res = await fetch(webhook, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: input.name,
                email: input.email,
                website: t.host,
                category: t.category,
                city: t.city,
                aiReadinessScore: t.score ?? "not enough verified",
                topIssues: t.issues.map((i) => i.label).join("; "),
                reportId: stored.id,
                marketingConsent: input.marketingConsent ? "yes" : "no",
                consentText: input.marketingConsent ? CONSENT_TEXT : "",
                ...(input.attribution ?? {}),
                form: "ai-search-readiness",
                source: "echo-27.com/ai-search-readiness",
                submittedAt: new Date().toISOString(),
              }),
              signal: AbortSignal.timeout(10_000),
            });
            if (!res.ok) console.error(`GHL webhook ${res.status}`);
          } catch (err) {
            console.error("GHL webhook failed:", err instanceof Error ? err.message : err);
          }
        } else {
          console.error("Lead not sent: GHL_WEBHOOK_URL is not set.");
        }

        return json({ ok: true, report: stored.report });
      },
    },
  },
});

const ATTRIBUTION_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "fbclid", "gclid", "landing_page", "referrer"];

function pickStrings(v: unknown): Record<string, string> | undefined {
  if (!v || typeof v !== "object") return undefined;
  const out: Record<string, string> = {};
  for (const key of ATTRIBUTION_KEYS) {
    const value = (v as Record<string, unknown>)[key];
    if (typeof value === "string" && value) out[key] = value.slice(0, 500);
  }
  return out;
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}
