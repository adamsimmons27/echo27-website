import { useState, type FormEvent } from "react";
import { Check, Play, X } from "lucide-react";
import logo from "@/assets/echo27-logo.png";
import { Container } from "@/components/cmo/Container";
import { Section } from "@/components/cmo/Section";
import { CtaButton } from "@/components/cmo/CtaButton";
import { Analytics } from "@/components/cmo/Analytics";
import { Footer } from "@/components/echo/Footer";
import { VideoTestimonials, videoBy } from "@/components/echo/Testimonials";
import { getAttribution } from "@/lib/attribution";
import { track } from "@/lib/tracking";

/** PLACEHOLDER: the hero video. An .mp4 path or a YouTube, Loom, or Vimeo embed URL. Empty shows a marked frame. */
const VIDEO = { src: "", poster: "" };

/**
 * HVAC growth partner page at /hvac-marketing, in the shape of a video sales page: a centred promise, the video,
 * one call to action, the problem, the four-part program, proof, what happens next, fit, and booking.
 * Copy rules: no em dashes, no exclamation marks, no invented figures, "estimates" and "customers" rather than "jobs".
 */
export const hvac = {
  cta: { label: "Book a call", targetId: "book", note: "Twenty minutes, at a time you pick. We ask questions, we do not pitch." },
  hero: {
    eyebrow: "For residential HVAC companies doing $1M to $5M a year",
    headline: "Qualified replacement estimates.",
    mark: "Already on your calendar.",
    subhead:
      "Demand generated, every homeowner qualified, and the estimate booked before it reaches you. You show up and close. Nothing shared, nothing resold.",
    watch: "Watch this first",
    reassurance: "The call is for both of us to work out whether this is worth doing.",
    stats: [
      { value: "$12M+", label: "Ad spend managed" },
      { value: "12+", label: "Years in performance marketing" },
      { value: "23+", label: "Industries served" },
    ],
  },
  problem: {
    eyebrow: "Why the leads are not turning into installs",
    header: "The leads are coming in. The wrong ones are reaching your calendar.",
    intro: "Most HVAC owners we speak to already have an ad budget. It is paying for conversations with people who were never going to buy a system.",
    cards: [
      { title: "The lead you bought was sold to three other companies", body: "The marketplaces resell one homeowner to several companies at once. Three of you dial the same person and the fastest one wins.", tone: "bg-sky" },
      { title: "Cheap clicks buy the wrong homeowners", body: "Optimizing an account for cost per lead fills the calendar with people who wanted a free opinion, not a new system.", tone: "bg-peach" },
      { title: "By the time someone calls back, they have booked elsewhere", body: "The homeowner called, nobody picked up, and the voicemail sat until lunch. By then two other companies had called them back.", tone: "bg-lilac" },
    ],
  },
  program: {
    eyebrow: "The booked estimates program",
    header: "Demand, qualification, and booking are ours. The sale is yours.",
    steps: [
      { title: "Generate", sub: "Homeowners who need a system", body: "Google Search, Local Services Ads, and Meta campaigns aimed at homeowners in your service area who need a system, not a tune-up. Every lead belongs to you and goes to nobody else.", tone: "bg-sky" },
      { title: "Qualify", sub: "Every homeowner, before you see them", body: "Automated follow-up texts and calls every lead within minutes, and an AI receptionist picks up when your office cannot. System age, ownership, timeline, and budget are confirmed before the estimate reaches your calendar.", tone: "bg-mint" },
      { title: "Book", sub: "Onto your calendar, with notes", body: "Only qualified homeowners land on your calendar, with the details your tech needs to walk in prepared.", tone: "bg-peach" },
      { title: "You close", sub: "The sale is yours", body: "The homeowner is expecting your tech, knows why they are there, and wants a price. Your part starts at the front door.", tone: "bg-lilac" },
    ],
    cta: "Check whether your metro is taken",
  },
  proof: {
    eyebrow: "Clients on camera",
    header: "Owners we work with today.",
    intro: "Two current clients, on camera. Neither runs an HVAC company. The same team and the same approach go into this program.",
  },
  next: {
    eyebrow: "After you book",
    header: "Here is how it goes.",
    steps: [
      { title: "A 20-minute call", body: "Pick a time. We talk about your metro, how many installs you do, and what you are spending now. If we are not the right fit, we say so on the call." },
      { title: "The plan", body: "A written plan for your metro: which channels, what the follow-up looks like, and what we need from your office. Yours to keep either way." },
      { title: "Your metro is yours", body: "If it works both ways, we reserve your metro, build the system, and start putting estimates on your calendar. One HVAC company per metro. We do not work for your competitor." },
    ],
  },
  fit: {
    header: "Who this is built for.",
    intro: "We take on one HVAC company per metro, so we are particular about which one.",
    yes: { title: "A fit if you", items: ["Do $1M to $5M a year in residential HVAC", "Run three to fifteen techs", "Have room on the calendar to take more work", "Have a tech free to run estimates the same week they are booked", "Are willing to fund ads for the months it takes to build a channel"] },
    no: { title: "Not a fit if you", items: ["Are under $1M, or one truck", "Have no CRM, or no customer list", "Are shopping for the cheapest lead source", "Let booked estimates sit because nobody is free to run them", "Want leads handed over and nothing after"] },
  },
  closing: {
    eyebrow: "One HVAC company per metro",
    header: "Is your metro still available?",
    body: "Twenty minutes to find out. If we are not the right partner for your metro, you hear it on the call, not after a contract.",
  },
  form: {
    revenue: ["Under $1M", "$1M to $3M", "$3M to $5M", "$5M+"],
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

function Eyebrow({ children, dark = false }: { children: string; dark?: boolean }) {
  return <p className={`${dark ? "eyebrow-dark" : "eyebrow"} mb-6`}>{children}</p>;
}

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
        {/* Hero: centred promise, the video, one button */}
        <section id="top" aria-labelledby="hvac-hero" className="bg-background">
          <Container className="pt-14 pb-14 text-center sm:pt-20 sm:pb-16 lg:pt-24">
            <p className="eyebrow justify-center">{c.hero.eyebrow}</p>
            <h1 id="hvac-hero" className="headline headline-xl mx-auto mt-6 max-w-[20ch]">
              {c.hero.headline} <span className="hl">{c.hero.mark}</span>
            </h1>
            <p className="lede mx-auto mt-7 max-w-[60ch] text-muted-foreground">{c.hero.subhead}</p>
            <div className="mx-auto mt-10 max-w-[880px]">
              <p className="eyebrow mb-4 justify-center">{c.hero.watch}</p>
              <VideoSlot />
            </div>
            <div className="mt-10 flex flex-col items-center gap-3">
              <CtaButton location="hero" targetId={c.cta.targetId} className="w-full sm:w-auto sm:px-8 sm:py-4 sm:text-[17px]">
                {c.cta.label}
              </CtaButton>
              <p className="text-[14px] text-muted-foreground">{c.cta.note}</p>
              <p className="text-[14px] text-muted-foreground">{c.hero.reassurance}</p>
            </div>
            <ul className="slab slab-grid mx-auto mt-12 max-w-[880px] grid-cols-1 text-left sm:grid-cols-3">
              {c.hero.stats.map((s, i) => (
                <li key={s.label} className={`${["bg-sky", "bg-mint", "bg-peach"][i]} px-5 py-5 sm:px-6`}>
                  <p className="text-[32px] font-extrabold leading-none tracking-[-0.04em] md:text-[38px]">{s.value}</p>
                  <p className="mt-2 text-[13px] font-bold leading-snug">{s.label}</p>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* Problem */}
        <Section id="problem" tone="mist" labelledBy="hvac-problem">
          <div className="max-w-[60ch]">
            <Eyebrow>{c.problem.eyebrow}</Eyebrow>
            <h2 id="hvac-problem" className="headline headline-lg">
              {c.problem.header}
            </h2>
            <p className="lede mt-5 text-muted-foreground">{c.problem.intro}</p>
          </div>
          <ul className="slab slab-grid mt-12 grid-cols-1 lg:grid-cols-3">
            {c.problem.cards.map((k) => (
              <li key={k.title} className={`${k.tone} p-6 md:p-7`}>
                <span className="block h-2.5 w-2.5 rounded-full bg-teal" aria-hidden="true" />
                <h3 className="headline headline-md mt-4">{k.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{k.body}</p>
              </li>
            ))}
          </ul>
        </Section>

        {/* Program */}
        <Section id="program" tone="light" labelledBy="hvac-program">
          <div className="max-w-[60ch]">
            <Eyebrow>{c.program.eyebrow}</Eyebrow>
            <h2 id="hvac-program" className="headline headline-lg">
              {c.program.header}
            </h2>
          </div>
          <ol className="slab slab-grid mt-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {c.program.steps.map((s) => (
              <li key={s.title} className={`${s.tone} p-6 md:p-7`}>
                <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-foreground">{s.title}</p>
                <h3 className="headline headline-md mt-3">{s.sub}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{s.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-col items-start gap-2">
            <CtaButton location="program" targetId={c.cta.targetId}>
              {c.program.cta}
            </CtaButton>
            <p className="text-[14px] text-muted-foreground">{c.cta.note}</p>
          </div>
        </Section>

        {/* Proof */}
        <Section id="voices" tone="sky" labelledBy="hvac-voices">
          <div className="max-w-[60ch]">
            <Eyebrow>{c.proof.eyebrow}</Eyebrow>
            <h2 id="hvac-voices" className="headline headline-lg">
              {c.proof.header}
            </h2>
            <p className="lede mt-5 text-muted-foreground">{c.proof.intro}</p>
          </div>
          <div className="mt-12">
            <VideoTestimonials items={[videoBy("Marc Steiniger"), videoBy("Thibaut Bannelier")]} columns={2} showResult={false} />
          </div>
        </Section>

        {/* What happens next */}
        <Section id="next" tone="light" labelledBy="hvac-next">
          <Eyebrow>{c.next.eyebrow}</Eyebrow>
          <h2 id="hvac-next" className="headline headline-lg">
            {c.next.header}
          </h2>
          <ol className="slab slab-grid mt-12 grid-cols-1 lg:grid-cols-3">
            {c.next.steps.map((s, i) => (
              <li key={s.title} className={`${["bg-sky", "bg-mint", "bg-peach"][i]} p-6 md:p-7`}>
                <span className="block h-2.5 w-2.5 rounded-full bg-teal" aria-hidden="true" />
                <h3 className="headline headline-md mt-4">{s.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{s.body}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* Fit */}
        <Section id="fit" tone="mist" labelledBy="hvac-fit">
          <div className="max-w-[60ch]">
            <h2 id="hvac-fit" className="headline headline-lg">
              {c.fit.header}
            </h2>
            <p className="lede mt-5 text-muted-foreground">{c.fit.intro}</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
            {[c.fit.yes, c.fit.no].map((col, i) => (
              <div key={col.title} className={`card ${i === 0 ? "bg-mint" : "bg-peach"} sm:p-8`}>
                <h3 className="headline headline-md">{col.title}</h3>
                <ul className="mt-5 space-y-3">
                  {col.items.map((item) => (
                    <li key={item} className="flex min-h-[28px] items-start gap-3 text-[15px] font-medium leading-snug">
                      {i === 0 ? (
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-teal-deep" strokeWidth={2.5} aria-hidden="true" />
                      ) : (
                        <X className="mt-0.5 h-5 w-5 shrink-0 text-foreground" strokeWidth={2.5} aria-hidden="true" />
                      )}
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* Closing and booking */}
        <Section id="book" tone="dark" labelledBy="hvac-book">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow-dark mb-6 justify-center">{c.closing.eyebrow}</p>
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

/** The hero video: an embed or an mp4 when VIDEO.src is set, otherwise a marked frame. */
function VideoSlot() {
  const isEmbed = /youtube\.com|youtu\.be|loom\.com|vimeo\.com/.test(VIDEO.src);
  return (
    <div className="slab overflow-hidden bg-[#111]">
      <div className="relative aspect-video w-full">
        {VIDEO.src && isEmbed ? (
          <iframe src={VIDEO.src} title="How the HVAC growth partner program works" className="absolute inset-0 h-full w-full" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
        ) : VIDEO.src ? (
          <video src={VIDEO.src} poster={VIDEO.poster || undefined} controls playsInline className="absolute inset-0 h-full w-full" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 border-2 border-dashed border-white/30 p-6 text-center text-white">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center border-2 border-white">
              <Play className="ml-1 h-6 w-6 fill-current" aria-hidden="true" />
            </span>
            <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-white/80">[Video goes here]</p>
            <p className="hidden max-w-[40ch] text-[14px] text-white/80 sm:block">Set VIDEO.src in HvacMarketingLanding.tsx to an .mp4 path or a YouTube, Loom, or Vimeo embed URL.</p>
          </div>
        )}
      </div>
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
      <div role="status" tabIndex={-1} autoFocus className="card-dark">
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
  const wrap = (name: Field, input: React.ReactNode, hint?: string) => (
    <div>
      <label htmlFor={`hvac-${name}`} className="field-label">
        {LABELS[name]}
      </label>
      {hint && (
        <p id={`hvac-${name}-hint`} className="mt-1 text-[13px] text-muted-foreground">
          {hint}
        </p>
      )}
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
        {wrap("service_area", <input {...a11y("service_area")} type="text" autoComplete="address-level2" required className="field mt-2" />, "City and state or province")}
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
