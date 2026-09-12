import { useState } from "react";
import { ArrowRight, Phone, Check, Plus, Minus } from "lucide-react";

/**
 * Echo 27 — Marketing for Appliance Repair Businesses
 * Self-contained, scoped light theme. Mobile-first.
 * No em dashes anywhere in copy.
 */

const ACCENT = "#1F8F85"; // Echo 27 brand teal
const INK = "#0F1419";
const MUTED = "#5B6470";
const BORDER = "rgba(15,20,25,0.10)";
const SURFACE = "#F6F7F5";
const PHONE = "(416) 555-0142";
const PHONE_HREF = "tel:+14165550142";

function CTA({
  children = "Book a free strategy call",
  size = "md" as "md" | "lg",
  onClick,
}: {
  children?: React.ReactNode;
  size?: "md" | "lg";
  onClick?: () => void;
}) {
  const scroll = () => {
    const el = document.getElementById("book");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <button
      type="button"
      onClick={onClick ?? scroll}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-12px_rgba(31,143,133,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
        size === "lg" ? "px-8 py-4 text-base" : "px-5 py-3 text-sm"
      }`}
      style={{ backgroundColor: ACCENT, outlineColor: ACCENT }}
    >
      {children} <ArrowRight className="h-4 w-4" />
    </button>
  );
}

function Section({
  id,
  children,
  bg,
}: {
  id?: string;
  children: React.ReactNode;
  bg?: string;
}) {
  return (
    <section id={id} className="py-16 md:py-24" style={bg ? { backgroundColor: bg } : undefined}>
      <div className="mx-auto max-w-[1160px] px-5 md:px-8">{children}</div>
    </section>
  );
}

const problems = [
  {
    h: "Slow weeks you can't predict.",
    p: "Some weeks the calls pour in. Others are dead quiet, and you have techs standing around.",
  },
  {
    h: "Leads that never book.",
    p: "You pay for clicks and calls that go nowhere, with no idea what a real customer is actually costing you.",
  },
  {
    h: "Outranked by the same competitors.",
    p: "The other shops show up first on Google while you wait on word of mouth and repeat customers.",
  },
];

const services = [
  {
    tag: "PAID ADS",
    title: "Get the phone ringing this week",
    body: "Google and Meta ads built to bring in people who need a repair right now, not tire-kickers. We target your service area, track every call, and cut what does not pay.",
  },
  {
    tag: "WEBSITE",
    title: "A site that turns visitors into booked jobs",
    body: "A fast, mobile-first website with online booking and click-to-call front and center. Built to convert the traffic you are already paying for.",
  },
  {
    tag: "SEO",
    title: 'Show up first for "appliance repair near me"',
    body: "Local SEO and Google Business Profile work so you own your service area in search and the map pack, and bring in jobs you are not paying per click for.",
  },
];

const steps = [
  {
    h: "Free call and audit",
    p: "We look at your current marketing, your numbers, and your service area, then tell you exactly where the booked jobs are hiding.",
  },
  {
    h: "We build and launch",
    p: "Ads, website, and SEO done for you. No projects to manage, no software to learn.",
  },
  {
    h: "You get booked jobs",
    p: "We track every lead and call, and send you a simple report showing jobs booked and what they cost.",
  },
];

const testimonials = [
  {
    q: "Our slow weeks basically disappeared. The phone rings every morning now.",
    n: "Mike D.",
    t: "Owner, Appliance Repair Co.",
  },
  {
    q: "We finally know what a booked job costs us. No more guessing where the money goes.",
    n: "Sandra L.",
    t: "Owner, Home Appliance Pros",
  },
  {
    q: "We went from page three to the top of the map for our city in a few months.",
    n: "Carlos R.",
    t: "Owner, Reliable Appliance Service",
  },
];

const why = [
  "We specialize in home services. We are not a generalist agency learning your business on your dime.",
  "Transparent reporting. You see jobs booked and cost per job in plain English, every month.",
  "No long lock-in contracts. We earn the next month by performing this month.",
  "You keep everything. Your ad accounts, your website, your data. If we ever part ways, you walk away with all of it.",
];

const faqs = [
  {
    q: "How much does it cost?",
    a: "It depends on your market and which services you need. We will give you a flat, straight answer on our first call. No vague packages.",
  },
  {
    q: "How fast will I see results?",
    a: "Ads can start producing calls within the first week. SEO builds over a few months. We are upfront about the timeline for each.",
  },
  {
    q: "Do I need all three, or can I start with one?",
    a: "You can start with whatever moves the needle fastest for you, usually ads. We will tell you honestly what to do first.",
  },
  {
    q: "What if it doesn't work?",
    a: "No long contracts. We track everything, so if something is not producing booked jobs we change it or you walk. The risk is on us to keep performing.",
  },
  {
    q: "Will I have to manage anything?",
    a: "No. That is the point. We handle the marketing so you can stay focused on repairs.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: BORDER }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-6 py-5 text-left"
      >
        <span className="text-base font-semibold md:text-lg" style={{ color: INK }}>
          {q}
        </span>
        {open ? (
          <Minus className="h-5 w-5 shrink-0" style={{ color: ACCENT }} />
        ) : (
          <Plus className="h-5 w-5 shrink-0" style={{ color: ACCENT }} />
        )}
      </button>
      {open ? (
        <p className="pb-5 pr-10 text-[15px] leading-relaxed" style={{ color: MUTED }}>
          {a}
        </p>
      ) : null}
    </div>
  );
}

function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || "").trim(),
      business: String(fd.get("business") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      need: String(fd.get("need") || "").trim(),
      source: "appliance-repair-landing",
    };

    // TODO: Wire GHL webhook here.
    // Example:
    // await fetch("https://services.leadconnectorhq.com/hooks/REPLACE_WITH_GHL_WEBHOOK_URL", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(payload),
    // });
    console.log("[lead]", payload);

    await new Promise((r) => setTimeout(r, 400));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className="rounded-2xl p-8 text-center"
        style={{ backgroundColor: "#fff", border: `1px solid ${BORDER}` }}
      >
        <div
          className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full"
          style={{ backgroundColor: ACCENT }}
        >
          <Check className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-xl font-bold" style={{ color: INK }}>
          You're on the list.
        </h3>
        <p className="mx-auto mt-2 max-w-md text-[15px]" style={{ color: MUTED }}>
          We will reach out within one business day to set up your free strategy call.
        </p>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-xl border bg-white px-4 py-3 text-[15px] outline-none transition focus:border-[color:var(--accent)] focus-visible:ring-2";

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl p-6 md:p-8"
      style={
        {
          backgroundColor: "#fff",
          border: `1px solid ${BORDER}`,
          ["--accent" as never]: ACCENT,
        } as React.CSSProperties
      }
    >
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide" style={{ color: MUTED }}>
            Name
          </span>
          <input
            required
            name="name"
            maxLength={100}
            className={inputCls}
            style={{ borderColor: BORDER }}
            placeholder="Your name"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide" style={{ color: MUTED }}>
            Business name
          </span>
          <input
            required
            name="business"
            maxLength={120}
            className={inputCls}
            style={{ borderColor: BORDER }}
            placeholder="Your business"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide" style={{ color: MUTED }}>
            Phone
          </span>
          <input
            required
            name="phone"
            type="tel"
            maxLength={30}
            className={inputCls}
            style={{ borderColor: BORDER }}
            placeholder="(555) 555-5555"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide" style={{ color: MUTED }}>
            Email
          </span>
          <input
            required
            name="email"
            type="email"
            maxLength={255}
            className={inputCls}
            style={{ borderColor: BORDER }}
            placeholder="you@business.com"
          />
        </label>
      </div>
      <label className="mt-3 block">
        <span className="mb-1 block text-xs font-semibold uppercase tracking-wide" style={{ color: MUTED }}>
          What do you need most right now?
        </span>
        <select
          required
          name="need"
          defaultValue=""
          className={inputCls}
          style={{ borderColor: BORDER }}
        >
          <option value="" disabled>
            Pick one
          </option>
          <option>Ads</option>
          <option>Website</option>
          <option>SEO</option>
          <option>Not sure</option>
        </select>
      </label>
      <button
        type="submit"
        disabled={loading}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-12px_rgba(31,143,133,0.6)] disabled:opacity-60"
        style={{ backgroundColor: ACCENT }}
      >
        {loading ? "Sending..." : "Book my free call"} <ArrowRight className="h-4 w-4" />
      </button>
      <p className="mt-3 text-center text-xs" style={{ color: MUTED }}>
        Free, no obligation, 20 minutes.
      </p>
    </form>
  );
}

export function ApplianceRepairLanding() {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#FBFBF9",
        color: INK,
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* HEADER */}
      <header
        className="sticky top-0 z-40 border-b backdrop-blur"
        style={{
          backgroundColor: "rgba(251,251,249,0.85)",
          borderColor: BORDER,
        }}
      >
        <div className="mx-auto flex max-w-[1160px] items-center justify-between gap-4 px-5 py-4 md:px-8">
          <a href="#top" className="text-lg font-black tracking-tight" style={{ color: INK }}>
            Echo <span style={{ color: ACCENT }}>27</span>
          </a>
          <div className="flex items-center gap-3 md:gap-5">
            <a
              href={PHONE_HREF}
              className="hidden items-center gap-2 text-sm font-semibold sm:inline-flex"
              style={{ color: INK }}
            >
              <Phone className="h-4 w-4" style={{ color: ACCENT }} />
              {PHONE}
            </a>
            <CTA>Book a free call</CTA>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="mx-auto max-w-[1160px] px-5 md:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold tracking-[0.14em]"
                style={{ backgroundColor: SURFACE, color: ACCENT, border: `1px solid ${BORDER}` }}
              >
                MARKETING FOR APPLIANCE REPAIR BUSINESSES
              </span>
              <h1
                className="mt-5 text-[40px] font-black leading-[1.05] tracking-tight md:text-[64px]"
                style={{ color: INK }}
              >
                More booked repair jobs.{" "}
                <span style={{ color: ACCENT }}>Without chasing leads</span> or learning ads.
              </h1>
              <p
                className="mt-6 max-w-[640px] text-lg leading-relaxed md:text-xl"
                style={{ color: MUTED }}
              >
                We run the ads, build the website, and own your local search so your phone keeps
                ringing with ready-to-book customers. You stay in the field.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <CTA size="lg">Book a free strategy call</CTA>
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2 text-sm font-semibold"
                  style={{ color: INK }}
                >
                  <Phone className="h-4 w-4" style={{ color: ACCENT }} />
                  Or call {PHONE}
                </a>
              </div>
              <p className="mt-6 text-sm" style={{ color: MUTED }}>
                12+ years in performance marketing. Ad spend managed across 23+ industries. Built
                for home service owners.
              </p>
            </div>

            <div id="book" className="lg:sticky lg:top-24">
              <div className="mb-3">
                <h2 className="text-xl font-bold" style={{ color: INK }}>
                  Book your free strategy call
                </h2>
                <p className="mt-1 text-sm" style={{ color: MUTED }}>
                  Tell us a bit about your business and we will reach out to set a time.
                </p>
              </div>
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <Section bg={SURFACE}>
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-black tracking-tight md:text-4xl" style={{ color: INK }}>
            Sound familiar?
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {problems.map((p) => (
            <div
              key={p.h}
              className="rounded-2xl bg-white p-6"
              style={{ border: `1px solid ${BORDER}` }}
            >
              <h3 className="text-lg font-bold" style={{ color: INK }}>
                {p.h}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed" style={{ color: MUTED }}>
                {p.p}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* SERVICES */}
      <Section>
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-black tracking-tight md:text-4xl" style={{ color: INK }}>
            Three ways we keep your schedule full
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.title}
              className="flex flex-col rounded-2xl p-7 transition-all hover:-translate-y-1"
              style={{
                backgroundColor: "#fff",
                border: `1px solid ${BORDER}`,
                boxShadow: "0 1px 0 rgba(15,20,25,0.02)",
              }}
            >
              <span
                className="self-start rounded-full px-2.5 py-1 text-[10px] font-bold tracking-[0.16em]"
                style={{ backgroundColor: SURFACE, color: ACCENT }}
              >
                {s.tag}
              </span>
              <h3 className="mt-5 text-xl font-bold leading-tight" style={{ color: INK }}>
                {s.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed" style={{ color: MUTED }}>
                {s.body}
              </p>
            </article>
          ))}
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <Section bg={SURFACE}>
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-black tracking-tight md:text-4xl" style={{ color: INK }}>
            How it works
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.h} className="rounded-2xl bg-white p-7" style={{ border: `1px solid ${BORDER}` }}>
              <h3 className="text-lg font-bold" style={{ color: INK }}>
                {s.h}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed" style={{ color: MUTED }}>
                {s.p}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* PROOF */}
      <Section>
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-black tracking-tight md:text-4xl" style={{ color: INK }}>
            What owners say
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.n}
              className="flex flex-col rounded-2xl p-7"
              style={{ backgroundColor: "#fff", border: `1px solid ${BORDER}` }}
            >
              <blockquote className="text-[17px] leading-relaxed" style={{ color: INK }}>
                "{t.q}"
              </blockquote>
              <figcaption className="mt-5 text-sm" style={{ color: MUTED }}>
                <span className="font-semibold" style={{ color: INK }}>
                  {t.n}
                </span>{" "}
                — {t.t}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* WHY ECHO 27 */}
      <Section bg={SURFACE}>
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-black tracking-tight md:text-4xl" style={{ color: INK }}>
            Why Echo 27
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {why.map((w) => (
            <div
              key={w}
              className="flex gap-4 rounded-2xl bg-white p-6"
              style={{ border: `1px solid ${BORDER}` }}
            >
              <div
                className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full"
                style={{ backgroundColor: ACCENT }}
              >
                <Check className="h-4 w-4 text-white" />
              </div>
              <p className="text-[15px] leading-relaxed" style={{ color: INK }}>
                {w}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-black tracking-tight md:text-4xl" style={{ color: INK }}>
            Questions owners ask
          </h2>
          <div className="mt-8">
            {faqs.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </Section>

      {/* FINAL CTA */}
      <Section bg={INK}>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-black leading-tight tracking-tight text-white md:text-5xl">
            Stop hoping the phone rings.{" "}
            <span style={{ color: ACCENT }}>Make it ring.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg" style={{ color: "rgba(255,255,255,0.7)" }}>
            Book a free 20-minute strategy call. We will show you where your next booked jobs are
            coming from. No obligation.
          </p>
          <div className="mt-8 flex justify-center">
            <CTA size="lg">Book a free strategy call</CTA>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: "#0A0E12" }}>
        <div className="mx-auto max-w-[1160px] px-5 py-12 md:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <div className="text-lg font-black text-white">
                Echo <span style={{ color: ACCENT }}>27</span>
              </div>
              <p className="mt-3 max-w-sm text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                Marketing built for appliance repair and home service businesses.
              </p>
            </div>
            <div className="text-sm md:text-right" style={{ color: "rgba(255,255,255,0.7)" }}>
              <div>
                <a href={PHONE_HREF} className="hover:text-white">
                  {PHONE}
                </a>
              </div>
            </div>
          </div>
          <div
            className="mt-10 border-t pt-6 text-xs"
            style={{ borderColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}
          >
            Copyright Echo 27. All rights reserved.
          </div>
        </div>
      </footer>

      {/* STICKY MOBILE CTA */}
      <div
        className="fixed inset-x-0 bottom-0 z-50 border-t p-3 md:hidden"
        style={{
          backgroundColor: "rgba(251,251,249,0.95)",
          borderColor: BORDER,
          backdropFilter: "blur(8px)",
        }}
      >
        <button
          type="button"
          onClick={() =>
            document.getElementById("book")?.scrollIntoView({ behavior: "smooth", block: "start" })
          }
          className="flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white"
          style={{ backgroundColor: ACCENT }}
        >
          Book a free call <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      <div className="h-16 md:hidden" aria-hidden />

      {/* Analytics placeholders: drop pixel IDs in <head> via route head() */}
    </div>
  );
}