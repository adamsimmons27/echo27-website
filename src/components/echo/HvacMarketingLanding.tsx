import { useState, type FormEvent } from "react";
import logo from "@/assets/echo27-logo.png";
import { Container } from "@/components/cmo/Container";
import { Section } from "@/components/cmo/Section";
import { CtaButton } from "@/components/cmo/CtaButton";
import { Faq } from "@/components/cmo/Faq";
import { Analytics } from "@/components/cmo/Analytics";
import { Footer } from "@/components/echo/Footer";
import { VideoTestimonials, WrittenQuotes, videoBy, writtenBy } from "@/components/echo/Testimonials";
import { getAttribution } from "@/lib/attribution";
import { track } from "@/lib/tracking";

/**
 * HVAC marketing page at /hvac-marketing, modelled on the structure of an appointment-booking agency page:
 * promise, the problem with leads, the three-part system, results, owner testimonials, FAQ, booking.
 * Copy rules: no em dashes, no exclamation marks, no invented figures. Proof cards are marked until real ones exist.
 */
export const hvac = {
  cta: { label: "Book your call", targetId: "book" },
  hero: {
    eyebrow: "For HVAC business owners",
    headline: "Booked estimates on your calendar, not leads in your inbox.",
    subhead:
      "Ads, follow-up, and booking run as one system for residential HVAC companies, so the homeowners who are ready to replace a system end up on your techs' calendars.",
    note: "No pitch. We'll tell you if we're not a fit.",
    stats: [
      { value: "$12M+", label: "Ad spend managed" },
      { value: "12+", label: "Years in performance marketing" },
      { value: "23+", label: "Industries served" },
    ],
  },
  problem: {
    header: "Appointments, not leads.",
    body: "Ads get you in front of homeowners fast. On their own they get you form fills nobody calls back and a team that stops trusting the leads. The ads, the follow-up, and the booking have to run as one thing, or the spend leaks.",
  },
  system: {
    header: "One system, from the first click to the estimate.",
    intro:
      "We run the whole path, with reporting tied to booked estimates and the revenue they produced, so you always know what the spend turned into.",
    pillars: [
      {
        title: "Ads that find replacements",
        copy: "Google Search, Local Services Ads, and Meta, aimed at your service area and at the homes most likely to need a replacement. Creative built around rebates, financing, and what makes your company different, not stock footage.",
        tone: "bg-sky",
      },
      {
        title: "Follow-up in minutes, not days",
        copy: "Every lead gets a text and an email within minutes, then reminders and no-show recovery. Leads that go quiet get chased, so the ad spend is not wasted on people who never hear back.",
        tone: "bg-mint",
      },
      {
        title: "Booking that qualifies first",
        copy: "System age, home ownership, timeline, and budget are asked before anything lands on your calendar. Your techs spend their time on homeowners who are ready to decide.",
        tone: "bg-peach",
      },
    ],
    cta: "Book your call",
  },
  results: {
    header: "HVAC campaign results.",
    note: "[Placeholder cards until real campaign results replace them. Nothing here is invented.]",
    cards: [
      {
        spent: "Spend: [SPEND]",
        headline: "[REVENUE] in replacements, [Region]",
        roas: "[X]x return on ad spend",
        did: ["[PLACEHOLDER: what we did, step one]", "[PLACEHOLDER: what we did, step two]", "[PLACEHOLDER: what we did, step three]"],
      },
      {
        spent: "Spend: [SPEND]",
        headline: "[REVENUE] in new installs, [Region]",
        roas: "[X]x return on ad spend",
        did: ["[PLACEHOLDER: what we did, step one]", "[PLACEHOLDER: what we did, step two]", "[PLACEHOLDER: what we did, step three]"],
      },
      {
        spent: "Spend: [SPEND]",
        headline: "[REVENUE] in the first [N] days",
        roas: "[X]x return on ad spend",
        did: ["[PLACEHOLDER: what we did, step one]", "[PLACEHOLDER: what we did, step two]", "[PLACEHOLDER: what we did, step three]"],
      },
    ],
  },
  voices: {
    header: "Owners who fill their calendars with us.",
    intro: "Local businesses we work with today. None of them are HVAC companies yet. The system is the same.",
  },
  faq: {
    header: "Frequently asked questions",
    items: [
      {
        question: "How is this different from the last agency?",
        answer:
          "One person is accountable for the number, and the follow-up and booking are part of the service, not an upsell. You get reporting on booked estimates and the revenue behind them, not on clicks.",
      },
      {
        question: "Who decides a homeowner is worth a visit?",
        answer:
          "Before anything lands on your calendar the homeowner answers four questions: system age, whether they own the home, their timeline, and their budget. Anyone who does not fit is not booked.",
      },
      {
        question: "How much of my team's time does this take?",
        answer:
          "Answer the phone, and send the tech. Setup takes two short calls in the first two weeks. After that it is a standing weekly call and a dashboard.",
      },
      {
        question: "What does it cost?",
        answer:
          "It depends on your service area and how much volume you want. We quote after the first call, and there is no long-term contract. We earn next month by performing this month.",
      },
      {
        question: "Who is this for?",
        answer:
          "It fits residential HVAC companies doing roughly $1M to $5M a year, with a few techs and room on the calendar to take more work. If you are under that, or you want the cheapest option rather than the best one, we will say so on the call.",
      },
    ],
  },
  closing: {
    header: "Ready for a fuller calendar?",
    body: "Book a call. We look at your market and your calendar and tell you straight whether this works for you.",
  },
  form: {
    revenue: ["Under $1M", "$1M to $3M", "$3M to $5M", "$5M+"],
    submit: "Book your call",
    sending: "Sending",
    success: { title: "Got it. Thanks.", body: "We'll email you to set up the call." },
    errors: {
      required: "This field is required.",
      email: "Enter a valid email address.",
      phone: "Enter a valid phone number.",
      notConnected: "This form isn't taking submissions right now. Please try again shortly.",
      failed: "Something went wrong sending that. Please try again in a moment.",
    },
  },
};

const WEBHOOK_URL = import.meta.env.VITE_GHL_WEBHOOK_URL as string | undefined;

export function HvacMarketingLanding() {
  const c = hvac;
  return (
    <div className="bg-background text-foreground">
      <header className="border-b-2 border-foreground bg-background md:sticky md:top-0 md:z-40">
        <Container className="flex h-[68px] items-center justify-between">
          <a href="#top" className="flex min-h-11 items-center" aria-label="Echo 27">
            <img src={logo} alt="" className="h-7 w-auto" />
          </a>
          <div className="hidden md:block">
            <CtaButton location="header" targetId={c.cta.targetId} className="text-sm px-4 py-2">
              {c.cta.label}
            </CtaButton>
          </div>
        </Container>
      </header>

      <main className="pb-20 md:pb-0">
        {/* Hero */}
        <section id="top" aria-labelledby="hvac-hero" className="bg-background">
          <Container className="grid gap-12 pt-14 pb-14 sm:pt-20 sm:pb-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-16 lg:pt-24 lg:pb-24">
            <div>
              <p className="eyebrow">{c.hero.eyebrow}</p>
              <h1 id="hvac-hero" className="headline headline-xl mt-6 max-w-[18ch]">
                {c.hero.headline}
              </h1>
              <p className="lede mt-7 max-w-[56ch] text-muted-foreground">{c.hero.subhead}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <CtaButton location="hero" targetId={c.cta.targetId}>
                  {c.cta.label}
                </CtaButton>
                <a href="#how" className="btn-ghost">
                  See how it works
                </a>
              </div>
              <p className="mt-4 text-[14px] text-muted-foreground">{c.hero.note}</p>
            </div>
            {/* The three real figures as one slab: three cells across on small screens, stacked beside the headline on large. */}
            <ul className="slab slab-grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 lg:w-full lg:max-w-[440px] lg:justify-self-end">
              {c.hero.stats.map((s, i) => (
                <li key={s.label} className={`${["bg-sky", "bg-mint", "bg-peach"][i]} px-5 py-6 sm:px-6 lg:px-7 lg:py-8`}>
                  <p className="text-[34px] font-extrabold leading-none tracking-[-0.04em] md:text-[40px] lg:text-[48px]">{s.value}</p>
                  <p className="mt-2 text-[13px] font-bold leading-snug">{s.label}</p>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* The problem with leads */}
        <Section id="problem" tone="mist" labelledBy="hvac-problem">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16 lg:items-center">
            <h2 id="hvac-problem" className="headline headline-lg max-w-[16ch]">
              {c.problem.header}
            </h2>
            <div>
              <p className="lede text-muted-foreground">{c.problem.body}</p>
              <div className="mt-8">
                <CtaButton location="problem" targetId={c.cta.targetId}>
                  {c.cta.label}
                </CtaButton>
              </div>
            </div>
          </div>
        </Section>

        {/* The system */}
        <Section id="how" tone="light" labelledBy="hvac-how">
          <div className="max-w-[60ch]">
            <h2 id="hvac-how" className="headline headline-lg">
              {c.system.header}
            </h2>
            <p className="lede mt-5 text-muted-foreground">{c.system.intro}</p>
          </div>
          <ul className="slab slab-grid mt-12 grid-cols-1 lg:grid-cols-3">
            {c.system.pillars.map((p) => (
              <li key={p.title} className={`${p.tone} p-6 md:p-7`}>
                <span className="block h-2.5 w-2.5 rounded-full bg-teal" aria-hidden="true" />
                <h3 className="headline headline-md mt-4">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{p.copy}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <CtaButton location="system" targetId={c.cta.targetId}>
              {c.system.cta}
            </CtaButton>
          </div>
        </Section>

        {/* Results */}
        <Section id="results" tone="sky" labelledBy="hvac-results">
          <h2 id="hvac-results" className="headline headline-lg max-w-[60ch]">
            {c.results.header}
          </h2>
          {/* Rows share a subgrid at lg so the figure, the marker, and the list line up across the three cards. */}
          <ul className="mt-12 grid gap-6 md:gap-8 lg:grid-cols-3">
            {c.results.cards.map((r, i) => (
              <li key={i} className="card flex flex-col md:p-7 lg:grid lg:grid-rows-subgrid lg:row-span-5">
                <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-teal-deep">{r.spent}</p>
                <h3 className="headline headline-md mt-3">{r.headline}</h3>
                <p className="mt-4 text-[15px] font-bold">
                  <span className="hl">{r.roas}</span>
                </p>
                <p className="mt-6 text-[12px] font-bold uppercase tracking-[0.1em] text-teal-deep">What changed</p>
                <ul className="mt-3 space-y-2">
                  {r.did.map((d) => (
                    <li key={d} className="border-l-2 border-teal pl-3 text-[14px] leading-snug">
                      {d}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[13px] text-muted-foreground">{c.results.note}</p>
        </Section>

        {/* Owner voices */}
        <Section id="voices" tone="light" labelledBy="hvac-voices">
          <div className="max-w-[60ch]">
            <h2 id="hvac-voices" className="headline headline-lg">
              {c.voices.header}
            </h2>
            <p className="lede mt-5 text-muted-foreground">{c.voices.intro}</p>
          </div>
          <div className="mt-12">
            <VideoTestimonials items={[videoBy("Marc Steiniger"), videoBy("Thibaut Bannelier")]} columns={2} showResult={false} />
          </div>
          <div className="mt-8">
            <WrittenQuotes items={[writtenBy("Justin Lui"), writtenBy("Lou Jimenez")]} columns={2} showResult={false} />
          </div>
        </Section>

        <Faq faq={c.faq} />

        {/* Closing and booking */}
        <Section id="book" tone="dark" labelledBy="hvac-book">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="hvac-book" className="headline headline-lg">
              {c.closing.header}
            </h2>
            <p className="lede mt-5 text-white/90">{c.closing.body}</p>
          </div>
          <div className="mx-auto mt-10 max-w-3xl">
            <HvacBookingForm />
          </div>
        </Section>

        {/* Sticky mobile CTA */}
        <div className="sticky-cta fixed inset-x-0 bottom-0 z-40 border-t-2 border-foreground bg-background p-3 md:hidden">
          <CtaButton location="sticky" targetId={c.cta.targetId} className="w-full">
            {c.cta.label}
          </CtaButton>
        </div>
      </main>

      <Footer />
      <Analytics bookingId={c.cta.targetId} />
    </div>
  );
}

type Field = "name" | "email" | "phone" | "company" | "service_area" | "revenue";
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "sending" | "sent" | "error";
const LABELS: Record<Field, string> = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  company: "Company",
  service_area: "Service area",
  revenue: "Annual revenue",
};

/** Booking form for this page. Posts to the GoHighLevel webhook with form: "hvac". */
function HvacBookingForm() {
  const f = hvac.form;
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const el = e.currentTarget;
    const data = Object.fromEntries(new FormData(el)) as Record<string, string>;
    const found: Errors = {};
    for (const key of Object.keys(LABELS) as Field[]) if (!data[key]?.trim()) found[key] = f.errors.required;
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) found.email = f.errors.email;
    if (data.phone && data.phone.replace(/\D/g, "").length < 10) found.phone = f.errors.phone;
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = (Object.keys(LABELS) as Field[]).find((k) => found[k]);
      el.querySelector<HTMLElement>(`#hvac-${first}`)?.focus();
      return;
    }
    if (!WEBHOOK_URL) {
      console.warn("HVAC form: set VITE_GHL_WEBHOOK_URL and redeploy.");
      setStatus("error");
      setMessage(f.errors.notConnected);
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, ...getAttribution(), form: "hvac", source: "echo-27.com/hvac-marketing", submittedAt: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error(String(res.status));
      track("form_submit", { form: "hvac", revenue: data.revenue });
      setStatus("sent");
    } catch {
      setStatus("error");
      setMessage(f.errors.failed);
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="card-dark">
        <p className="headline headline-md">{f.success.title}</p>
        <p className="mt-3 text-muted-foreground">{f.success.body}</p>
      </div>
    );
  }

  const a11y = (name: Field) => ({
    id: `hvac-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `hvac-${name}-error` : undefined,
  });
  const wrap = (name: Field, input: React.ReactNode) => (
    <div>
      <label htmlFor={`hvac-${name}`} className="field-label">
        {LABELS[name]}
      </label>
      {input}
      {errors[name] && (
        <p id={`hvac-${name}-error`} className="mt-1.5 text-sm font-semibold text-foreground">
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="card-dark space-y-5 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        {wrap("name", <input {...a11y("name")} type="text" autoComplete="name" required className="field mt-2" />)}
        {wrap("email", <input {...a11y("email")} type="email" autoComplete="email" required className="field mt-2" />)}
        {wrap("phone", <input {...a11y("phone")} type="tel" inputMode="tel" autoComplete="tel" required className="field mt-2" />)}
        {wrap("company", <input {...a11y("company")} type="text" autoComplete="organization" required className="field mt-2" />)}
        {wrap("service_area", <input {...a11y("service_area")} type="text" placeholder="City and state or province" autoComplete="address-level2" required className="field mt-2" />)}
        {wrap(
          "revenue",
          <select {...a11y("revenue")} defaultValue="" required className="field mt-2">
            <option value="" disabled>
              Select one
            </option>
            {f.revenue.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>,
        )}
      </div>
      {status === "error" && (
        <p role="alert" className="text-sm font-semibold text-foreground">
          {message}
        </p>
      )}
      <button type="submit" disabled={status === "sending"} aria-busy={status === "sending"} className="btn-primary w-full disabled:cursor-wait">
        {status === "sending" ? f.sending : f.submit}
      </button>
    </form>
  );
}
