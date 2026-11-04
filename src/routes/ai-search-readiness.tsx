import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, ExternalLink, HelpCircle, Lock, Minus, X } from "lucide-react";
import { CalcPage } from "@/components/echo/calc/CalcKit";
import { captureAttribution, getAttribution } from "@/lib/attribution";
import { tagScripts } from "@/lib/tagScripts";
import { track } from "@/lib/tracking";
import {
  CATEGORIES,
  CONSENT_TEXT,
  type Category,
  type CategoryScore,
  type Check as AuditCheck,
  type CheckStatus,
  type Report,
  type ScanEvent,
  type Teaser,
} from "@/lib/readiness/types";

const TITLE = "AI Search Readiness Checker for Home Service Businesses | Echo 27";
const DESCRIPTION =
  "Find out whether AI search engines like ChatGPT and Google AI can find, understand, and recommend your business. A real audit of your website, scored out of 100, in about two minutes.";
const PAGE_URL = "https://echo-27.com/ai-search-readiness";

export const Route = createFileRoute("/ai-search-readiness")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: PAGE_URL },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
    scripts: tagScripts,
  }),
  component: Page,
});

type Phase = { name: "form" } | { name: "scanning"; percent: number; message: string; detail?: string } | { name: "teaser"; teaser: Teaser } | { name: "report"; report: Report };

const field = "mt-2.5 w-full border-2 bg-surface px-4 py-3 text-[16px] outline-none placeholder:text-muted-foreground/50 focus:border-teal";
const labelCls = "block text-[16px] font-bold leading-snug tracking-[-0.01em]";
const errCls = "mt-2 text-[13px] font-medium text-pink";

/* Traffic-light tones inside the site's flat palette: teal for green, amber for orange, pink for red. */
const tone = (pct: number | null) => (pct === null ? "muted" : pct >= 70 ? "good" : pct >= 40 ? "mid" : "bad");
const toneClass: Record<string, { text: string; bg: string }> = {
  good: { text: "text-teal", bg: "bg-teal" },
  mid: { text: "text-amber", bg: "bg-amber" },
  bad: { text: "text-pink", bg: "bg-pink" },
  muted: { text: "text-muted-foreground", bg: "bg-muted-foreground" },
};

function Page() {
  const [phase, setPhase] = useState<Phase>({ name: "form" });
  const [form, setForm] = useState({ url: "", category: "" as Category | "", city: "", company: "" });
  const [errors, setErrors] = useState<{ url?: string; category?: string; city?: string }>({});
  const [failure, setFailure] = useState("");
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    captureAttribution();
    /* A reload after an audit brings the report back by its id. */
    const id = new URLSearchParams(window.location.search).get("r");
    if (!id) return;
    fetch(`/api/readiness/report?id=${encodeURIComponent(id)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { ok: boolean; teaser: Teaser; report: Report | null } | null) => {
        if (!data?.ok) return;
        setPhase(data.report ? { name: "report", report: data.report } : { name: "teaser", teaser: data.teaser });
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    if (phase.name === "teaser" || phase.name === "report") {
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
    }
  }, [phase.name]);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const v = e.target.value;
    setForm((f) => ({ ...f, [k]: v }));
    if (k in errors) setErrors((x) => ({ ...x, [k]: undefined }));
  };

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const v: typeof errors = {};
    if (!/^(https?:\/\/)?[^\s/.]+(\.[^\s/.]+)+/i.test(form.url.trim())) v.url = "Enter your website, like yourcompany.com.";
    if (!form.category) v.category = "Pick your business category.";
    if (form.city.trim().length < 2) v.city = "Enter the main city you serve.";
    setErrors(v);
    if (Object.keys(v).length) return;

    setFailure("");
    setPhase({ name: "scanning", percent: 2, message: "Starting the audit" });
    track("readiness_audit_started", { category: form.category });
    try {
      const res = await fetch("/api/readiness/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok || !res.body) throw new Error(String(res.status));
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let finished = false;
      while (!finished) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() ?? "";
        for (const part of parts) {
          const line = part.split("\n").find((l) => l.startsWith("data: "));
          if (!line) continue;
          const event = JSON.parse(line.slice(6)) as ScanEvent;
          if (event.type === "progress") setPhase({ name: "scanning", percent: event.percent, message: event.message, detail: event.detail });
          if (event.type === "result") {
            finished = true;
            window.history.replaceState(null, "", `?r=${event.teaser.reportId}`);
            track("readiness_audit_completed", { category: form.category, score: event.teaser.score ?? "unverified" });
            setPhase({ name: "teaser", teaser: event.teaser });
          }
          if (event.type === "error") {
            finished = true;
            setFailure(event.message);
            setPhase({ name: "form" });
          }
        }
      }
      if (!finished) throw new Error("ended early");
    } catch {
      setFailure("The audit didn't finish. Give it another try in a moment.");
      setPhase({ name: "form" });
    }
  }

  return (
    <CalcPage
      eyebrow="Free tool"
      title="Can AI search find and recommend your business?"
      intro="ChatGPT, Google AI, and Copilot now answer 'who should I call' for homeowners. This audit reads your website the way they do, scores it out of 100, and shows you what to fix first."
      note="For home service businesses. A real audit of up to 10 pages, in about two minutes."
      cta={<BookCta />}
    >
      {phase.name === "form" && (
        <form onSubmit={submit} noValidate className="slab bg-surface" aria-label="AI search readiness audit">
          <div className="space-y-7 p-6 md:p-8">
            <div>
              <label htmlFor="rd-url" className={labelCls}>Your website</label>
              <input id="rd-url" value={form.url} onChange={set("url")} inputMode="url" autoComplete="url" placeholder="yourcompany.com" aria-invalid={errors.url ? true : undefined} className={`${field} ${errors.url ? "border-pink" : "border-foreground"}`} />
              {errors.url && <p className={errCls}>{errors.url}</p>}
            </div>
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
              <div>
                <label htmlFor="rd-category" className={labelCls}>Business category</label>
                <select id="rd-category" value={form.category} onChange={set("category")} aria-invalid={errors.category ? true : undefined} className={`${field} ${errors.category ? "border-pink" : "border-foreground"}`}>
                  <option value="">Select one</option>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                {errors.category && <p className={errCls}>{errors.category}</p>}
              </div>
              <div>
                <label htmlFor="rd-city" className={labelCls}>Main city you serve</label>
                <input id="rd-city" value={form.city} onChange={set("city")} autoComplete="address-level2" placeholder="Denver, CO" aria-invalid={errors.city ? true : undefined} className={`${field} ${errors.city ? "border-pink" : "border-foreground"}`} />
                {errors.city && <p className={errCls}>{errors.city}</p>}
              </div>
            </div>
            {/* Honeypot: hidden from people, filled in by bots. */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="rd-company">Company</label>
              <input id="rd-company" tabIndex={-1} autoComplete="off" value={form.company} onChange={set("company")} />
            </div>
            <button type="submit" className="btn-primary w-full text-[16px]">Run my free audit</button>
            {failure && <p role="alert" className="text-[14px] font-medium text-pink">{failure}</p>}
            <p className="text-[13px] leading-relaxed text-muted-foreground">
              We only read pages your site makes public. Nothing is changed on your website.
            </p>
          </div>
        </form>
      )}

      {phase.name === "scanning" && <Scanning percent={phase.percent} message={phase.message} detail={phase.detail} />}

      {(phase.name === "teaser" || phase.name === "report") && (
        <div ref={resultsRef} className="scroll-mt-24 space-y-5">
          <ScoreCard teaser={phase.name === "teaser" ? phase.teaser : phase.report} />
          {phase.name === "teaser" ? (
            <>
              <TopIssues teaser={phase.teaser} />
              <LeadForm teaser={phase.teaser} onUnlock={(report) => setPhase({ name: "report", report })} />
            </>
          ) : (
            <FullReport report={phase.report} />
          )}
          <button type="button" onClick={() => { window.history.replaceState(null, "", window.location.pathname); setPhase({ name: "form" }); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-[14px] font-bold underline underline-offset-4">
            Audit another website
          </button>
        </div>
      )}
    </CalcPage>
  );
}

/* ---------- Scanning ---------- */

const STAGES = [
  { at: 4, label: "Loading your homepage" },
  { at: 10, label: "Checking robots.txt and crawler access" },
  { at: 18, label: "Finding service and location pages" },
  { at: 22, label: "Reading up to 10 pages" },
  { at: 56, label: "Reviewing content for customer questions" },
  { at: 84, label: "Measuring mobile page speed" },
  { at: 94, label: "Scoring" },
];

function Scanning({ percent, message, detail }: { percent: number; message: string; detail?: string }) {
  return (
    <div className="slab bg-surface p-6 md:p-8" role="status" aria-live="polite">
      <p className="eyebrow">Auditing</p>
      <p className="mt-4 text-[22px] font-extrabold leading-tight tracking-[-0.02em] md:text-[26px]">{message}</p>
      <p className="mt-1 min-h-[20px] text-[14px] text-muted-foreground">{detail ?? " "}</p>
      <div className="mt-6 h-4 overflow-hidden border-2 border-foreground bg-background" aria-hidden="true">
        <div className="h-full bg-teal transition-[width] duration-700 ease-out motion-reduce:transition-none" style={{ width: `${Math.max(percent, 2)}%` }} />
      </div>
      <p className="mt-2 text-right text-[13px] font-bold tabular-nums">{percent}%</p>
      <ol className="mt-6 space-y-2.5">
        {STAGES.map((s, i) => {
          const next = STAGES[i + 1]?.at ?? 100;
          const state = percent >= next ? "done" : percent >= s.at ? "active" : "todo";
          return (
            <li key={s.label} className={`flex items-center gap-3 text-[15px] ${state === "todo" ? "text-muted-foreground" : "font-medium"}`}>
              <span className="flex size-6 shrink-0 items-center justify-center border-2 border-foreground bg-surface">
                {state === "done" && <Check aria-hidden="true" size={14} strokeWidth={3} className="text-teal" />}
                {state === "active" && <span className="size-2.5 bg-teal motion-safe:animate-pulse" />}
              </span>
              {s.label}
              <span className="sr-only">{state === "done" ? " (done)" : state === "active" ? " (in progress)" : ""}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ---------- Score ---------- */

function ScoreCard({ teaser }: { teaser: Teaser }) {
  const t = tone(teaser.score);
  const verdict =
    teaser.score === null
      ? "Too little could be verified to give an overall score. The category results below still stand."
      : t === "good"
        ? "AI search engines can read and understand most of what matters. The remaining gaps are where competitors can still overtake you."
        : t === "mid"
          ? "AI search engines can find you, but they're missing information they need to recommend you with confidence."
          : "AI search engines are struggling to understand your business. Homeowners asking them who to call are likely being sent elsewhere.";
  return (
    <div className="slab bg-surface p-6 md:p-8">
      <div className="grid gap-8 md:grid-cols-[auto_minmax(0,1fr)] md:items-center">
        <ScoreRing score={teaser.score} />
        <div>
          <p className="eyebrow">AI Search Readiness Score</p>
          <p className="mt-3 text-[22px] font-extrabold leading-tight tracking-[-0.02em] md:text-[26px]">{teaser.host}</p>
          <p className="mt-3 text-[15px] leading-relaxed">{verdict}</p>
          <p className="mt-3 text-[13px] text-muted-foreground">
            Based on {teaser.pagesReviewed} page{teaser.pagesReviewed === 1 ? "" : "s"} read on {new Date(teaser.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}.
            {teaser.verifiedPoints < 100 && ` ${100 - teaser.verifiedPoints} of 100 points couldn't be verified and are left out of the score.`}
          </p>
        </div>
      </div>
      <h2 className="mt-8 text-[18px] font-extrabold tracking-[-0.02em]">By category</h2>
      <ul className="mt-4 space-y-4">
        {teaser.categories.map((c) => <CategoryBar key={c.id} cat={c} />)}
      </ul>
      {teaser.missingSetup && (
        <div className="mt-6 border-2 border-foreground bg-butter p-4 text-[13px] leading-relaxed">
          <p className="font-bold">Development only: integrations without credentials</p>
          <p className="mt-1">{teaser.missingSetup.join(", ")}. Their checks report as unverified. See README, "AI Search Readiness Checker".</p>
        </div>
      )}
    </div>
  );
}

function ScoreRing({ score }: { score: number | null }) {
  const r = 54;
  const c = 2 * Math.PI * r;
  const pct = score ?? 0;
  const t = tone(score);
  return (
    <div className="relative mx-auto size-[160px] md:mx-0" role="img" aria-label={score === null ? "Score not available" : `Score ${score} out of 100`}>
      <svg viewBox="0 0 128 128" className="size-full -rotate-90">
        <circle cx="64" cy="64" r={r} fill="none" stroke="var(--foreground)" strokeWidth="3" opacity="0.15" />
        <circle
          cx="64" cy="64" r={r} fill="none" strokeWidth="10" strokeLinecap="butt"
          className={`${toneClass[t].text} transition-[stroke-dashoffset] duration-1000 ease-out motion-reduce:transition-none`}
          stroke="currentColor" strokeDasharray={c} strokeDashoffset={c - (c * pct) / 100}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-[48px] font-extrabold leading-none tracking-[-0.04em] ${toneClass[t].text}`}>{score ?? "?"}</span>
        <span className="mt-1 text-[12px] font-bold uppercase tracking-[0.12em] text-muted-foreground">out of 100</span>
      </div>
    </div>
  );
}

function CategoryBar({ cat }: { cat: CategoryScore }) {
  const pct = cat.verifiedMax ? Math.round((cat.earned / cat.verifiedMax) * 100) : null;
  const t = tone(pct);
  return (
    <li>
      <div className="flex items-baseline justify-between gap-4 text-[15px]">
        <span className="font-bold">{cat.label}</span>
        <span className="shrink-0 tabular-nums">
          <span className={`font-extrabold ${toneClass[t].text}`}>{cat.earned}</span>
          <span className="text-muted-foreground"> / {cat.max}</span>
        </span>
      </div>
      <div className="mt-1.5 flex h-3 overflow-hidden border-2 border-foreground bg-background" aria-hidden="true">
        <div className={`h-full ${toneClass[t].bg} transition-[width] duration-700 motion-reduce:transition-none`} style={{ width: `${(cat.earned / cat.max) * 100}%` }} />
        {cat.unverified > 0 && <div className="h-full bg-foreground/15" style={{ width: `${(cat.unverified / cat.max) * 100}%`, marginLeft: "auto" }} />}
      </div>
      {cat.unverified > 0 && <p className="mt-1 text-[12px] text-muted-foreground">{cat.unverified} point{cat.unverified === 1 ? "" : "s"} unverified</p>}
    </li>
  );
}

/* ---------- Teaser ---------- */

function TopIssues({ teaser }: { teaser: Teaser }) {
  if (!teaser.issues.length) return null;
  return (
    <div className="slab bg-surface p-6 md:p-8">
      <h2 className="text-[20px] font-extrabold tracking-[-0.02em]">Top {teaser.issues.length} things holding you back</h2>
      <ul className="mt-5 space-y-4">
        {teaser.issues.map((i, n) => (
          <li key={i.id} className="flex items-start gap-3">
            <StatusIcon status={i.status} />
            <div>
              <p className="font-bold leading-snug">{n + 1}. {i.label}</p>
              <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">{i.finding}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-5 flex items-center gap-2 text-[14px] font-medium">
        <Lock aria-hidden="true" size={16} strokeWidth={2.25} />
        The fixes, the evidence, and the rest of the {teaser.counts.fail + teaser.counts.partial} issues are in the full report.
      </p>
    </div>
  );
}

function LeadForm({ teaser, onUnlock }: { teaser: Teaser; onUnlock: (report: Report) => void }) {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [consent, setConsent] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    if (!data.name?.trim() || !/^\S+@\S+\.\S+$/.test(data.email ?? "")) {
      setError("Enter your name and a valid email address.");
      return;
    }
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/readiness/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportId: teaser.reportId, name: data.name, email: data.email, marketingConsent: consent, attribution: getAttribution(), company: data.company ?? "" }),
      });
      const json = (await res.json()) as { ok: boolean; report?: Report; error?: string };
      if (!json.ok || !json.report) throw new Error(json.error || "failed");
      track("readiness_lead_submitted", { category: teaser.category, score: teaser.score ?? "unverified", consent });
      onUnlock(json.report);
    } catch (err) {
      setError(err instanceof Error && err.message !== "failed" ? err.message : "That didn't send. Give it another try in a moment.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={submit} noValidate className="slab bg-butter" aria-label="Get the full report">
      <div className="border-b-2 border-foreground px-6 py-5 md:px-8">
        <h2 className="text-[20px] font-extrabold tracking-[-0.02em]">Get the full report</h2>
        <p className="mt-1 text-[14px] leading-relaxed">Every check with the evidence behind it, the specific fix for each one, and a plan ordered by what to do first.</p>
      </div>
      <div className="space-y-5 p-6 md:p-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="rd-name" className={labelCls}>Name</label>
            <input id="rd-name" name="name" autoComplete="name" className={`${field} border-foreground`} />
          </div>
          <div>
            <label htmlFor="rd-email" className={labelCls}>Email</label>
            <input id="rd-email" name="email" type="email" autoComplete="email" className={`${field} border-foreground`} />
          </div>
        </div>
        <div className="hidden" aria-hidden="true">
          <label htmlFor="rd-company2">Company</label>
          <input id="rd-company2" name="company" tabIndex={-1} autoComplete="off" />
        </div>
        <label className="flex items-start gap-3 text-[14px] leading-relaxed">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 size-4 shrink-0 accent-[var(--teal)]" />
          <span>{CONSENT_TEXT}</span>
        </label>
        <button type="submit" disabled={sending} className="btn-primary w-full text-[16px] disabled:opacity-70">
          {sending ? "Unlocking" : "Show my full report"}
        </button>
        {error && <p role="alert" className="text-[14px] font-medium text-pink">{error}</p>}
        <p className="text-[13px] leading-relaxed text-muted-foreground">
          We'll send the report to this email. The checkbox is optional; leave it unticked and we won't send anything else.{" "}
          <Link to="/privacy" className="underline underline-offset-2">Privacy policy</Link>.
        </p>
      </div>
    </form>
  );
}

/* ---------- Full report ---------- */

function FullReport({ report }: { report: Report }) {
  const groups: { title: string; status: CheckStatus; checks: AuditCheck[] }[] = [
    { title: "Failing", status: "fail", checks: report.checks.filter((c) => c.status === "fail") },
    { title: "Partly there", status: "partial", checks: report.checks.filter((c) => c.status === "partial") },
    { title: "Passing", status: "pass", checks: report.checks.filter((c) => c.status === "pass") },
    { title: "Couldn't be verified", status: "unknown", checks: report.checks.filter((c) => c.status === "unknown") },
  ];
  return (
    <>
      {report.priorities.length > 0 && (
        <div className="slab bg-mint p-6 md:p-8">
          <p className="eyebrow">Start here</p>
          <h2 className="mt-3 text-[20px] font-extrabold tracking-[-0.02em]">Your top {report.priorities.length} priorities</h2>
          <ol className="mt-5 space-y-5">
            {report.priorities.map((c, n) => (
              <li key={c.id}>
                <p className="font-bold leading-snug">{n + 1}. {c.label} <span className="text-[13px] font-medium text-muted-foreground">({c.points - (c.earned ?? 0)} points available)</span></p>
                <p className="mt-1 text-[14px] leading-relaxed">{c.fix}</p>
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="slab bg-surface">
        <div className="border-b-2 border-foreground px-6 py-5 md:px-8">
          <h2 className="text-[20px] font-extrabold tracking-[-0.02em]">Every check</h2>
          <p className="mt-1 text-[14px] text-muted-foreground">
            {report.counts.pass} passing, {report.counts.partial} partly there, {report.counts.fail} failing, {report.counts.unknown} unverified.
          </p>
        </div>
        <div className="divide-y-2 divide-foreground">
          {groups.filter((g) => g.checks.length).map((g) => (
            <section key={g.status} className="p-6 md:p-8">
              <h3 className="flex items-center gap-2 text-[16px] font-extrabold tracking-[-0.01em]">
                <StatusIcon status={g.status} /> {g.title} ({g.checks.length})
              </h3>
              <ul className="mt-4 divide-y-2 divide-foreground border-2 border-foreground">
                {g.checks.map((c) => <CheckRow key={c.id} check={c} />)}
              </ul>
            </section>
          ))}
        </div>
      </div>

      <div className="slab bg-surface">
        <div className="border-b-2 border-foreground px-6 py-5 md:px-8">
          <h2 className="text-[20px] font-extrabold tracking-[-0.02em]">Your action plan</h2>
          <p className="mt-1 text-[14px] text-muted-foreground">Ordered by effort, then by points. Quick fixes first.</p>
        </div>
        <div className="grid grid-cols-1 divide-y-2 divide-foreground md:grid-cols-3 md:divide-x-2 md:divide-y-0">
          {[
            { title: "This week", sub: "Quick fixes you or your web person can do today", steps: report.plan.thisWeek },
            { title: "This month", sub: "Content and markup work", steps: report.plan.thisMonth },
            { title: "Next 90 days", sub: "Bigger site changes", steps: report.plan.next90Days },
          ].map((col) => (
            <div key={col.title} className="p-6 md:p-7">
              <p className="text-[16px] font-extrabold">{col.title}</p>
              <p className="text-[13px] text-muted-foreground">{col.sub}</p>
              {col.steps.length ? (
                <ol className="mt-4 space-y-3">
                  {col.steps.map((s, i) => (
                    <li key={s.checkId} className="text-[14px] leading-relaxed"><span className="font-bold">{i + 1}. {s.label}.</span> {s.fix}</li>
                  ))}
                </ol>
              ) : (
                <p className="mt-4 text-[14px] text-muted-foreground">Nothing here. Good.</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <details className="slab bg-surface p-6 md:p-8">
        <summary className="flex cursor-pointer items-center justify-between font-bold">
          Pages we read ({report.pages.length})
          <ChevronDown aria-hidden="true" size={18} strokeWidth={2.5} />
        </summary>
        <ul className="mt-4 space-y-1.5 text-[14px]">
          {report.pages.map((p) => (
            <li key={p.url} className="flex flex-wrap items-baseline gap-x-3">
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="break-all underline underline-offset-2">{p.url}</a>
              <span className="text-[12px] text-muted-foreground">{p.kinds.join(", ")}</span>
            </li>
          ))}
        </ul>
      </details>
    </>
  );
}

function CheckRow({ check }: { check: AuditCheck }) {
  const [open, setOpen] = useState(check.status !== "pass");
  return (
    <li className="bg-surface">
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="flex w-full items-start gap-3 px-4 py-3.5 text-left md:px-5">
        <StatusIcon status={check.status} />
        <span className="flex-1">
          <span className="block font-bold leading-snug">{check.label}</span>
          <span className="mt-0.5 block text-[14px] leading-relaxed text-muted-foreground">{check.finding}</span>
        </span>
        <span className="shrink-0 text-[13px] font-bold tabular-nums text-muted-foreground">{check.earned === null ? "?" : check.earned}/{check.points}</span>
        <ChevronDown aria-hidden="true" size={18} strokeWidth={2.5} className={`mt-0.5 shrink-0 transition-transform motion-reduce:transition-none ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="space-y-3 border-t-2 border-foreground bg-background px-4 py-4 text-[14px] leading-relaxed md:px-5">
          {check.status !== "pass" && (
            <p><span className="font-bold">{check.status === "unknown" ? "If it applies, the fix: " : "Fix: "}</span>{check.fix}</p>
          )}
          {check.evidence.length > 0 && (
            <div>
              <p className="font-bold">Evidence</p>
              <ul className="mt-1 space-y-1.5">
                {check.evidence.map((ev, i) => (
                  <li key={i}>
                    {ev.quote && <p className="border-l-2 border-teal pl-3 italic">"{ev.quote}"</p>}
                    {(ev.url || ev.note) && (
                      <p className="text-[13px] text-muted-foreground">
                        {ev.url && <a href={ev.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 break-all underline underline-offset-2">{ev.url}<ExternalLink aria-hidden="true" size={12} /></a>}
                        {ev.url && ev.note && " · "}
                        {ev.note}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </li>
  );
}

function StatusIcon({ status }: { status: CheckStatus }) {
  const Icon = status === "pass" ? Check : status === "partial" ? Minus : status === "fail" ? X : HelpCircle;
  const cls = status === "pass" ? "text-teal" : status === "partial" ? "text-amber" : status === "fail" ? "text-pink" : "text-muted-foreground";
  const label = status === "pass" ? "Passing" : status === "partial" ? "Partly there" : status === "fail" ? "Failing" : "Unverified";
  return (
    <span className="mt-0.5 shrink-0" title={label}>
      <Icon aria-hidden="true" size={20} strokeWidth={2.5} className={cls} />
      <span className="sr-only">{label}:</span>
    </span>
  );
}

function BookCta() {
  return (
    <div className="slab my-16 bg-teal-deep p-8 text-white md:my-24 md:p-12">
      <h2 className="max-w-[20ch] text-[30px] font-extrabold leading-[1.02] tracking-[-0.03em] md:text-[42px]">
        Want this fixed, not just found?
      </h2>
      <p className="mt-5 max-w-[56ch] text-[15px] leading-relaxed text-white/70 md:text-base">
        Book a free strategy call. We'll walk through your report, show you what we'd do first, and tell you honestly whether it's worth working together.
      </p>
      <Link to="/fractional-cmo" hash="book" onClick={() => track("readiness_book_call")} className="btn-on-dark mt-8 inline-flex">
        Book a strategy call
      </Link>
    </div>
  );
}
