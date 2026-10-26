import { useEffect, useMemo, useState, type FormEvent } from "react";
import { ArrowDown, ArrowRight, Check, Phone, PhoneCall } from "lucide-react";
import logo from "@/assets/echo27-logo.png";
import { Container } from "@/components/cmo/Container";
import { Section } from "@/components/cmo/Section";
import { CtaButton } from "@/components/cmo/CtaButton";
import { Analytics } from "@/components/cmo/Analytics";
import { Footer } from "@/components/echo/Footer";
import { money0 } from "@/components/echo/calc/CalcKit";
import { getAttribution } from "@/lib/attribution";
import { track } from "@/lib/tracking";

/** PLACEHOLDER: the demo line visitors can call to hear the receptionist. Leave empty until one exists. */
const DEMO_PHONE: string = "";

/**
 * Platforms shown as supported integration targets. They are not Echo 27 partners and nothing here claims certification.
 * To show an official logo instead of the wordmark, drop the file into public/images/integrations/ and set "logo" to its path,
 * following that platform's brand guidelines. Leave "logo" empty to render the name.
 */
const PLATFORMS: { name: string; logo: string }[] = [
  { name: "ServiceTitan", logo: "" },
  { name: "Jobber", logo: "" },
  { name: "Housecall Pro", logo: "" },
  { name: "GoHighLevel", logo: "" },
  { name: "HubSpot", logo: "" },
];
const PLATFORMS_MORE = "and other CRM, scheduling, and field service platforms";

/**
 * Voice AI page at /voice-ai. An AI receptionist, built and run by Echo 27, for home service businesses.
 * Copy rules: no em dashes, no exclamation marks, no invented figures, "customers" not "jobs".
 */
export const voiceAi = {
  cta: { label: "Book a call", targetId: "book" },
  hero: {
    eyebrow: "Voice AI for home service businesses",
    headline: "Every missed call is a customer who called someone else.",
    subhead:
      "An AI receptionist for HVAC, plumbing, electrical, roofing, and other home service companies. It answers every call in seconds, day or night, asks the right questions, and books the appointment into the software your office already runs. Built, trained, and run by Echo 27.",
    demo: "Hear it answer",
    demoNote: "[Demo line goes here: a number anyone can call to hear the receptionist.]",
    mock: {
      label: "Illustration of a phone call answered, qualified, and booked by the receptionist",
      status: "Incoming call",
      number: "(416) 555 0147",
      timer: "0:38",
      outcome: "Booked for today, 5 to 7. Confirmation text sent to the caller.",
      lines: [
        { who: "Caller", text: "Hi, my AC stopped working this afternoon and it's getting hot in here." },
        { who: "Receptionist", text: "Sorry to hear that. I can get someone out to you. What's the address, and is anyone in the home right now?" },
        { who: "Caller", text: "42 Elm Street, and yes, I'm home all evening." },
        { who: "Receptionist", text: "Thanks. The earliest visit is today between 5 and 7. Shall I book that, and which number should the technician call on the way?" },
      ],
    },
  },
  why: {
    header: "A front desk that never steps away.",
    cards: [
      { title: "Never misses a call", body: "Answers in seconds, 24 hours a day, including nights, weekends, and the moment three calls come in at once.", tone: "bg-sky" },
      { title: "Built around your trade", body: "Trained on your services, your service area, your hours, and the questions your dispatcher asks before anyone goes out.", tone: "bg-mint" },
      { title: "Books, not just answers", body: "Qualifies the caller and puts the appointment straight into your calendar or CRM, with the details your team needs.", tone: "bg-peach" },
      { title: "Hands emergencies to you", body: "A no-heat call in January or a burst pipe at midnight goes straight through to your phone. If you can't pick up, the details are texted and emailed to you as soon as the call ends.", tone: "bg-lilac" },
    ],
  },
  calc: {
    header: "What are missed calls costing you?",
    intro: "Your numbers, not an industry average. Change any field and the result updates.",
    labels: { missed: "Missed calls per week", value: "Average customer value", close: "Close rate on answered calls" },
    note: "A rough figure from your own inputs, not a promise. Change any number and watch how fast it moves.",
  },
  included: {
    header: "What's included.",
    items: [
      { title: "AI receptionist, 24/7", body: "Every inbound call answered in a natural voice, in your business's name, with your services and hours." },
      { title: "Missed-call text back", body: "If a call ever does slip through, the caller gets a text within seconds asking how you can help." },
      { title: "Lead qualification", body: "Service needed, location, timing, and anything else you want asked before the appointment goes on the calendar." },
      { title: "Booking into your calendar", body: "Appointments land in your calendar or CRM with the details your team needs. We confirm your tools on the first call." },
      { title: "Follow-up and reminders", body: "Confirmation texts, reminders before the visit, and a nudge when someone goes quiet, so fewer no-shows." },
      { title: "Review requests", body: "After the visit, a friendly request for a Google review, timed so it actually gets done." },
    ],
  },
  who: {
    header: "Built for the trades.",
    intro: "Home service companies that win customers one phone call at a time, usually while everyone is out on site.",
    items: [
      { title: "HVAC", body: "No-heat and no-cool calls answered in seconds, system age and home ownership confirmed, and the visit booked before the next company picks up." },
      { title: "Plumbing", body: "Burst pipe at midnight goes straight to your phone. Water heater quotes and drain calls get booked while you are under a sink." },
      { title: "Electrical", body: "Panel upgrades, EV chargers, and the lights-out emergency, each sorted by urgency and put on the right tech's calendar." },
      { title: "Roofing", body: "After the storm, every call answered at once. Inspections booked, insurance questions captured, nothing lost to voicemail." },
      { title: "Other home services", body: "Landscaping, pest control, garage doors, cleaning, restoration. If customers call to book, it answers and books." },
    ],
  },
  integrations: {
    stripHeader: "Works With the Tools You Already Use.",
    stripNote: "Nothing to replace. We connect to what your office already runs.",
    eyebrow: "Integrations",
    header: "Your Software. Now Working Smarter.",
    sub: "Already using ServiceTitan, Jobber, Housecall Pro, or another platform? Echo 27 connects AI-powered answering, lead follow-up, and booking workflows with the tools your business already relies on.",
    flow: {
      label: "How a call moves through your software: a customer call is answered by Echo 27's AI automation, which passes the details to ServiceTitan, Jobber, or Housecall Pro, where it becomes an appointment or a lead record.",
      nodes: [
        { title: "Customer call", body: "Answered in seconds, day or night." },
        { title: "Echo 27 AI automation", body: "Qualifies the caller and books the visit." },
        { title: "ServiceTitan, Jobber, or Housecall Pro", body: "Receives the customer and the booking." },
        { title: "Appointment or lead record", body: "Ready for your office, with the notes." },
      ],
    },
    benefits: [
      { title: "Customer Information", body: "Capture new inquiries and send customer details into your existing CRM." },
      { title: "Scheduling & Booking", body: "Connect qualified inquiries with your scheduling and appointment workflows." },
      { title: "Estimate Follow-Up", body: "Automate reminders and follow-ups based on available estimate and job information." },
      { title: "Lead Tracking", body: "Keep lead statuses, conversations, and follow-up activities organized." },
      { title: "Less Manual Data Entry", body: "Reduce repetitive tasks by connecting your systems." },
    ],
    statement: "No complicated software migration. No need to rebuild your business processes. We help your existing tools work together.",
    cta: "See How It Works With Your Software",
    question: {
      q: "Will this integrate with ServiceTitan, Jobber, or Housecall Pro?",
      a: "Echo 27 works with major home service management platforms, including ServiceTitan, Jobber, and Housecall Pro. We assess your existing setup and recommend the appropriate integration approach based on your software, account permissions, and available functionality.",
    },
    disclaimer: "Platform names and logos belong to their owners. Echo 27 is not certified by, endorsed by, or affiliated with these companies. Specific integrations may require API access, third-party middleware, an eligible subscription plan, or additional setup, and some features may not be available on every platform.",
  },
  how: {
    header: "Live in three steps.",
    steps: [
      { title: "A 20-minute call", body: "Your services, your prices where you want them shared, your hours, and what a good customer looks like. No pitch." },
      { title: "We build and train it", body: "We build the receptionist around your business, train it on your calls, and walk you through it before it goes live. You get a working front desk and a weekly note on what it handled." },
      { title: "It answers from day one", body: "Every call picked up, qualified, and booked. We listen to real calls in the first weeks and fix anything it got wrong." },
    ],
  },
  closing: {
    header: "Stop losing the calls you already paid for.",
    body: "Book a 20-minute call. We'll tell you straight whether an AI receptionist makes sense for your company, and what it would take to go live.",
  },
  form: {
    businessTypes: ["HVAC", "Plumbing", "Electrical", "Roofing", "Landscaping", "Other home service"],
    callVolume: ["Under 20 calls a week", "20 to 50 calls a week", "50 to 150 calls a week", "150+ calls a week"],
    submit: "Book a call",
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

export function VoiceAiLanding() {
  const c = voiceAi;
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
        {/* Hero with a call illustration beside it */}
        <section id="top" aria-labelledby="va-hero" className="bg-background">
          <Container className="grid gap-12 pt-14 pb-14 sm:pt-20 sm:pb-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-16 lg:pt-24 lg:pb-24">
            <div>
              <p className="eyebrow">{c.hero.eyebrow}</p>
              <h1 id="va-hero" className="headline headline-xl mt-6 max-w-[16ch]">
                {c.hero.headline}
              </h1>
              <p className="lede mt-7 max-w-[56ch] text-muted-foreground">{c.hero.subhead}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <CtaButton location="hero" targetId={c.cta.targetId}>
                  {c.cta.label}
                </CtaButton>
                {DEMO_PHONE ? (
                  <a href={`tel:${DEMO_PHONE.replace(/[^\d+]/g, "")}`} className="btn-ghost" onClick={() => track("demo_call", { location: "hero" })}>
                    <Phone className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
                    {c.hero.demo}: {DEMO_PHONE}
                  </a>
                ) : null}
              </div>
              {!DEMO_PHONE && <p className="mt-4 text-[14px] text-muted-foreground">{c.hero.demoNote}</p>}
            </div>
            {/* Pure HTML illustration of a live phone call: call bar, spoken transcript, outcome. No product UI, no logos. */}
            <div role="img" aria-label={c.hero.mock.label} className="card-dark w-full p-0 lg:justify-self-end lg:max-w-[460px]">
              <div aria-hidden="true">
                <div className="flex items-center justify-between gap-4 border-b-2 border-foreground px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-deep text-white">
                      <PhoneCall className="h-5 w-5" strokeWidth={2.25} />
                    </span>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-teal-deep">{c.hero.mock.status}</p>
                      <p className="text-[15px] font-bold leading-tight">{c.hero.mock.number}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="call-wave flex h-6 items-end gap-[3px]">
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                    </span>
                    <span className="text-[15px] font-bold tabular-nums">{c.hero.mock.timer}</span>
                  </div>
                </div>
                <ol className="space-y-3 px-5 py-5">
                  {c.hero.mock.lines.map((l, i) => (
                    <li key={i} className={`max-w-[88%] rounded-xl px-4 py-3 text-[15px] leading-snug ${l.who === "Caller" ? "ml-auto bg-sky" : "bg-surface-alt"}`}>
                      <span className="block text-[11px] font-bold uppercase tracking-[0.1em] text-teal-deep">{l.who}</span>
                      <span className="mt-1 block">{l.text}</span>
                    </li>
                  ))}
                </ol>
                <div className="flex items-start gap-3 border-t-2 border-foreground bg-mint px-5 py-4 text-[14px] font-bold leading-snug">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-teal-deep" strokeWidth={2.5} />
                  <span>{c.hero.mock.outcome}</span>
                </div>
              </div>
            </div>
          </Container>
          {/* Integration strip: the tools stay, we connect to them */}
          <Container className="pb-14 sm:pb-16">
            <div className="slab bg-surface">
              <div className="grid gap-6 p-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-center md:gap-10 md:p-8">
                <div>
                  <h2 className="headline headline-md">{c.integrations.stripHeader}</h2>
                  <p className="mt-2 text-[14px] text-muted-foreground">{c.integrations.stripNote}</p>
                </div>
                <PlatformGrid compact />
              </div>
            </div>
          </Container>
        </section>

        {/* Why */}
        <Section id="why" tone="mist" labelledBy="va-why">
          <h2 id="va-why" className="headline headline-lg max-w-[18ch]">
            {c.why.header}
          </h2>
          <ul className="slab slab-grid mt-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {c.why.cards.map((k) => (
              <li key={k.title} className={`${k.tone} p-6 md:p-7`}>
                <span className="block h-2.5 w-2.5 rounded-full bg-teal" aria-hidden="true" />
                <h3 className="headline headline-md mt-4">{k.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{k.body}</p>
              </li>
            ))}
          </ul>
        </Section>

        {/* Calculator */}
        <Section id="calculator" tone="sky" labelledBy="va-calc">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            <div>
              <h2 id="va-calc" className="headline headline-lg">
                {c.calc.header}
              </h2>
              <p className="lede mt-5 text-muted-foreground">{c.calc.intro}</p>
            </div>
            <MissedCallCalculator />
          </div>
        </Section>

        {/* Included */}
        <Section id="included" tone="light" labelledBy="va-included">
          <h2 id="va-included" className="headline headline-lg">
            {c.included.header}
          </h2>
          <ul className="slab slab-grid mt-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {c.included.items.map((it) => (
              <li key={it.title} className="bg-surface p-6 md:p-7">
                <Check className="h-6 w-6 text-teal-deep" strokeWidth={2.5} aria-hidden="true" />
                <h3 className="headline headline-md mt-4">{it.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{it.body}</p>
              </li>
            ))}
          </ul>
        </Section>

        {/* Who */}
        <Section id="who" tone="lilac" labelledBy="va-who">
          <div className="max-w-[60ch]">
            <h2 id="va-who" className="headline headline-lg">
              {c.who.header}
            </h2>
            <p className="lede mt-5 text-muted-foreground">{c.who.intro}</p>
          </div>
          {/* Five cells: spans chosen so no breakpoint leaves an empty ink cell. */}
          <ul className="slab slab-grid mt-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-6">
            {c.who.items.map((w, i) => (
              <li key={w.title} className={`bg-surface p-6 md:p-7 ${i < 3 ? "lg:col-span-2" : "lg:col-span-3"} ${i === 4 ? "sm:col-span-2 lg:col-span-3" : ""}`}>
                <h3 className="headline headline-md">{w.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{w.body}</p>
              </li>
            ))}
          </ul>
        </Section>

        {/* How */}
        <Section id="how" tone="light" labelledBy="va-how">
          <h2 id="va-how" className="headline headline-lg">
            {c.how.header}
          </h2>
          <ol className="slab slab-grid mt-12 grid-cols-1 lg:grid-cols-3">
            {c.how.steps.map((s, i) => (
              <li key={s.title} className={`${["bg-sky", "bg-mint", "bg-peach"][i]} p-6 md:p-7`}>
                <span className="block h-2.5 w-2.5 rounded-full bg-teal" aria-hidden="true" />
                <h3 className="headline headline-md mt-4">{s.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{s.body}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* Integrations */}
        <Section id="integrations" tone="peach" labelledBy="va-integrations">
          <div className="max-w-[64ch]">
            <p className="eyebrow mb-6">{c.integrations.eyebrow}</p>
            <h2 id="va-integrations" className="headline headline-lg">
              {c.integrations.header}
            </h2>
            <p className="lede mt-5 text-muted-foreground">{c.integrations.sub}</p>
          </div>
          <div className="mt-10">
            <PlatformGrid />
          </div>
          <IntegrationFlow />
          {/* Five benefits: spans chosen so no breakpoint leaves an empty ink cell. */}
          <ul className="slab slab-grid mt-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-6">
            {c.integrations.benefits.map((b, i) => (
              <li key={b.title} className={`bg-surface p-6 ${i < 3 ? "lg:col-span-2" : "lg:col-span-3"} ${i === 4 ? "sm:col-span-2 lg:col-span-3" : ""}`}>
                <Check className="h-6 w-6 text-teal-deep" strokeWidth={2.5} aria-hidden="true" />
                <h3 className="headline headline-md mt-4">{b.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{b.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-6 md:gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <blockquote className="card bg-mint md:p-8">
              <p className="text-[19px] font-bold leading-snug md:text-[22px]">{"\u201c"}{c.integrations.statement}{"\u201d"}</p>
            </blockquote>
            <div className="card md:p-8">
              <h3 className="headline headline-md">{c.integrations.question.q}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{c.integrations.question.a}</p>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-start gap-4">
            <CtaButton location="integrations" targetId={c.cta.targetId}>
              {c.integrations.cta}
            </CtaButton>
            <p className="max-w-[80ch] text-[13px] leading-relaxed text-muted-foreground">{c.integrations.disclaimer}</p>
          </div>
        </Section>

        {/* Closing and booking */}
        <Section id="book" tone="dark" labelledBy="va-book">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="va-book" className="headline headline-lg">
              {c.closing.header}
            </h2>
            <p className="lede mt-5 text-white/90">{c.closing.body}</p>
          </div>
          <div className="mx-auto mt-10 max-w-3xl">
            <VoiceAiForm />
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

/** Platform tiles. A wordmark in the site's own type unless an official logo path is set on the platform. */
function PlatformGrid({ compact = false }: { compact?: boolean }) {
  return (
    <ul className="slab slab-grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6" aria-label="Platforms we connect to">
      {PLATFORMS.map((p) => (
        <li key={p.name} className={`flex items-center justify-center bg-surface text-center font-extrabold tracking-[-0.02em] ${compact ? "px-3 py-4 text-[14px]" : "px-4 py-6 text-[16px] md:text-[17px]"}`}>
          {p.logo ? <img src={p.logo} alt={p.name} className={compact ? "max-h-6 w-auto" : "max-h-8 w-auto"} /> : p.name}
        </li>
      ))}
      <li className={`flex items-center justify-center bg-mint text-center font-bold leading-snug text-foreground ${compact ? "px-3 py-3 text-[12px]" : "px-4 py-5 text-[13px]"}`}>
        {PLATFORMS_MORE}
      </li>
    </ul>
  );
}

/** The path a call takes into the office software. Four nodes, with a dot moving along the connectors. */
function IntegrationFlow() {
  const f = voiceAi.integrations.flow;
  const cells: React.ReactNode[] = [];
  f.nodes.forEach((n, i) => {
    cells.push(
      <li key={n.title} className={`rounded-[12px] border-2 border-foreground p-4 ${["bg-sky", "bg-teal-deep text-white", "bg-surface", "bg-mint"][i]}`}>
        <p className="text-[15px] font-extrabold leading-tight">{n.title}</p>
        <p className={`mt-1.5 text-[13px] leading-snug ${i === 1 ? "text-white/90" : "text-muted-foreground"}`}>{n.body}</p>
      </li>,
    );
    if (i < f.nodes.length - 1) {
      cells.push(
        <li key={`${n.title}-link`} className="flow-link flex items-center justify-center lg:w-14" style={{ "--d": `${i * 0.6}s` } as React.CSSProperties}>
          <span className="flow-track hidden lg:block" />
          <ArrowRight className="relative hidden h-5 w-5 bg-surface text-foreground lg:block" strokeWidth={2.5} />
          <ArrowDown className="h-5 w-5 text-foreground lg:hidden" strokeWidth={2.5} />
        </li>,
      );
    }
  });
  return (
    <div role="img" aria-label={f.label} className="card mt-8 md:p-8">
      <ol aria-hidden="true" className="grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-stretch">
        {cells}
      </ol>
    </div>
  );
}

/** Live missed-revenue estimate from the visitor's own numbers. */
function MissedCallCalculator() {
  const c = voiceAi.calc;
  const [missed, setMissed] = useState("10");
  const [value, setValue] = useState("350");
  const [close, setClose] = useState("30");
  const n = (s: string) => (Number.isFinite(parseFloat(s)) ? Math.max(0, parseFloat(s)) : 0);
  const weekly = useMemo(() => n(missed) * n(value) * (Math.min(100, n(close)) / 100), [missed, value, close]);
  const rows = [
    { label: "Per week", amount: weekly },
    { label: "Per month", amount: weekly * 4.33 },
    { label: "Per year", amount: weekly * 52 },
  ];
  // One short sentence for screen readers, updated after typing pauses, instead of announcing every cell on every keystroke.
  const [announce, setAnnounce] = useState("");
  useEffect(() => {
    const t = window.setTimeout(() => setAnnounce(`About ${money0(weekly * 4.33)} a month, ${money0(weekly * 52)} a year.`), 700);
    return () => window.clearTimeout(t);
  }, [weekly]);
  const field = (id: string, label: string, val: string, set: (v: string) => void, prefix?: string, suffix?: string, max?: number) => (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <div className="relative mt-2">
        {prefix && <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-bold">{prefix}</span>}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={0}
          max={max}
          value={val}
          onChange={(e) => set(e.target.value)}
          className={`field ${prefix ? "pl-8" : ""} ${suffix ? "pr-10" : ""}`}
        />
        {suffix && <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-bold">{suffix}</span>}
      </div>
    </div>
  );
  return (
    <div className="card md:p-8">
      <div className="grid gap-5 sm:grid-cols-3">
        {field("va-missed", c.labels.missed, missed, setMissed)}
        {field("va-value", c.labels.value, value, setValue, "$")}
        {field("va-close", c.labels.close, close, setClose, undefined, "%", 100)}
      </div>
      <dl className="slab slab-grid mt-7 grid-cols-1">
        {rows.map((r, i) => (
          <div key={r.label} className={`${["bg-sky", "bg-mint", "bg-peach"][i]} flex items-center justify-between gap-4 px-5 py-4`}>
            <dt className="text-[12px] font-bold uppercase tracking-[0.1em]">{r.label}</dt>
            <dd className="min-w-0 text-right text-[26px] font-extrabold leading-none tracking-[-0.04em] tabular-nums md:text-[30px]">{money0(r.amount)}</dd>
          </div>
        ))}
      </dl>
      <p className="sr-only" aria-live="polite">
        {announce}
      </p>
      <p className="mt-4 text-[13px] text-muted-foreground">{c.note}</p>
    </div>
  );
}

type Field = "name" | "email" | "phone" | "company" | "business_type" | "call_volume";
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "sending" | "sent" | "error";
const LABELS: Record<Field, string> = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  company: "Business name",
  business_type: "Trade",
  call_volume: "Inbound calls",
};

/** Booking form for this page. Posts to the GoHighLevel webhook with form: "voice-ai". */
function VoiceAiForm() {
  const f = voiceAi.form;
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
      el.querySelector<HTMLElement>(`#va-${first}`)?.focus();
      return;
    }
    if (!WEBHOOK_URL) {
      console.warn("Voice AI form: set VITE_GHL_WEBHOOK_URL and redeploy.");
      setStatus("error");
      setMessage(f.errors.notConnected);
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, ...getAttribution(), form: "voice-ai", source: "echo-27.com/voice-ai", submittedAt: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error(String(res.status));
      track("form_submit", { form: "voice-ai", business_type: data.business_type });
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
    id: `va-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `va-${name}-error` : undefined,
  });
  const wrap = (name: Field, input: React.ReactNode) => (
    <div>
      <label htmlFor={`va-${name}`} className="field-label">
        {LABELS[name]}
      </label>
      {input}
      {errors[name] && (
        <p id={`va-${name}-error`} className="mt-1.5 text-sm font-semibold text-foreground">
          {errors[name]}
        </p>
      )}
    </div>
  );
  const select = (name: Field, options: string[]) =>
    wrap(
      name,
      <select {...a11y(name)} defaultValue="" required className="field mt-2">
        <option value="" disabled>
          Select one
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>,
    );

  return (
    <form onSubmit={onSubmit} noValidate className="card-dark space-y-5 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        {wrap("name", <input {...a11y("name")} type="text" autoComplete="name" required className="field mt-2" />)}
        {wrap("email", <input {...a11y("email")} type="email" autoComplete="email" required className="field mt-2" />)}
        {wrap("phone", <input {...a11y("phone")} type="tel" inputMode="tel" autoComplete="tel" required className="field mt-2" />)}
        {wrap("company", <input {...a11y("company")} type="text" autoComplete="organization" required className="field mt-2" />)}
        {select("business_type", f.businessTypes)}
        {select("call_volume", f.callVolume)}
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
