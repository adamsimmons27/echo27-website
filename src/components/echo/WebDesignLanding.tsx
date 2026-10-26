import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/echo27-logo.png";
import { Container } from "@/components/cmo/Container";
import { Section } from "@/components/cmo/Section";
import { CtaButton } from "@/components/cmo/CtaButton";
import { Analytics } from "@/components/cmo/Analytics";
import { Footer } from "@/components/echo/Footer";
import { getAttribution } from "@/lib/attribution";
import { track } from "@/lib/tracking";

/**
 * Web design and hosting at /web-design. One upfront fee for design and build, one monthly fee for hosting and care.
 * Copy rules: no em dashes, no exclamation marks, no invented figures, "customers" not "jobs".
 */
export const webDesign = {
  cta: { label: "Get started", targetId: "book" },
  hero: {
    eyebrow: "Web design and hosting",
    headline: "A website built to win customers, then kept running for you.",
    subhead:
      "We design and build your site, host it, keep it fast and secure, and make the changes you ask for. One upfront fee, one monthly fee, nothing else to manage.",
    price: [
      { value: "$1,000", label: "Up front. Design, build, and launch.", tone: "bg-sky" },
      { value: "$250", label: "Per month. Hosting, maintenance, and the changes you ask for.", tone: "bg-mint" },
    ],
  },
  included: {
    header: "What you get.",
    intro: "A site built to win customers, and someone who keeps it doing that.",
    parts: [
      {
        title: "Design and build",
        tone: "bg-sky",
        items: [
          "Designed around the decision a visitor is making, not a template",
          "Mobile first and fast, because that is where your customers are",
          "Search basics done properly: page titles, structure, speed, and the markup search engines and AI answers look for",
          "Copy written with you, in your voice",
          "Booking, forms, and call tracking wired into your calendar or CRM",
          "Launched in weeks once the content is agreed",
        ],
      },
      {
        title: "Hosting and maintenance",
        tone: "bg-mint",
        items: [
          "Fast, secure hosting with SSL and daily backups",
          "Software and security updates handled for you",
          "Uptime monitoring, so a problem gets seen quickly",
          "Content changes and small updates each month, included",
          "A monthly note on traffic and inquiries",
          "Your domain stays in your name",
        ],
      },
    ],
  },
  how: {
    header: "How it works.",
    steps: [
      { title: "Kickoff call", body: "What you sell, who buys it, and what the site has to make happen. We agree the pages and the one action each page is for." },
      { title: "Design and copy", body: "You see the design and the words before anything is built. One round of changes is part of the fee. Further rounds are quoted first." },
      { title: "Build and launch", body: "Built, tested on real phones, tracking checked, and launched on your domain." },
      { title: "Hosting and maintenance", body: "From launch on, we host it, keep it updated and backed up, and make the changes you send us." },
    ],
  },
  pricing: {
    header: "Pricing.",
    intro: "Two numbers. Anything outside them is quoted before we do it.",
    upfront: { value: "$1,000", label: "up front", includes: ["Design and copy", "Build and launch", "Tracking and forms set up"] },
    monthly: { value: "$250", label: "per month", includes: ["Hosting, SSL, and daily backups", "Updates and security patches", "Content changes and small updates", "Uptime monitoring"] },
    terms: [
      "The monthly plan starts at launch and runs month to month. No long lock-in.",
      "Small changes, like new hours, a price, a photo, or a new testimonial, are included. A new section or page is quoted first.",
      "Your domain stays in your name.",
      "Plus applicable tax.",
    ],
  },
  proof: {
    header: "Sites and landing pages we rebuilt as part of these accounts.",
    items: [
      {
        client: "Society Mortgage",
        logo: { src: "/images/logos/society-mortgage.jpg", alt: "Society Mortgage logo", className: "h-14 w-auto object-contain" },
        line: "Landing page rebuild alongside the Google Ads account. Ongoing testing lifted the conversion rate by over 30%.",
        to: "/case-studies/society-mortgage",
        tone: "bg-lilac",
      },
      {
        client: "Mountain",
        logo: { src: "/images/logos/mountain.svg", alt: "Mountain logo", className: "h-12 w-auto object-contain" },
        line: "Site and landing pages redesigned for conversion as part of a growth rebuild. Customer acquisition cost fell 41%.",
        to: "/case-studies/mountain-gaming",
        tone: "bg-peach",
      },
    ],
  },
  closing: {
    header: "Tell us what the site has to do.",
    body: "Tell us about your business and we'll come back with what we'd build and when it could launch.",
  },
  form: {
    needs: ["A new site from scratch", "A rebuild of my current site", "A landing page for a campaign", "Not sure yet"],
    submit: "Get started",
    sending: "Sending",
    success: { title: "Got it. Thanks.", body: "We'll email you to set up the kickoff call." },
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

export function WebDesignLanding() {
  const c = webDesign;
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
        {/* Hero with the two prices beside it */}
        <section id="top" aria-labelledby="wd-hero" className="bg-background">
          <Container className="grid gap-12 pt-14 pb-14 sm:pt-20 sm:pb-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-16 lg:pt-24 lg:pb-24">
            <div>
              <p className="eyebrow">{c.hero.eyebrow}</p>
              <h1 id="wd-hero" className="headline headline-xl mt-6 max-w-[16ch]">
                {c.hero.headline}
              </h1>
              <p className="lede mt-7 max-w-[56ch] text-muted-foreground">{c.hero.subhead}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <CtaButton location="hero" targetId={c.cta.targetId}>
                  {c.cta.label}
                </CtaButton>
                <a href="#pricing" className="btn-ghost">
                  See pricing
                </a>
              </div>
            </div>
            <ul className="slab slab-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 lg:w-full lg:max-w-[440px] lg:justify-self-end">
              {c.hero.price.map((p) => (
                <li key={p.value} className={`${p.tone} px-6 py-7 lg:px-8 lg:py-9`}>
                  <p className="text-[44px] font-extrabold leading-none tracking-[-0.04em] md:text-[56px]">{p.value}</p>
                  <p className="mt-3 text-[15px] font-bold leading-snug">{p.label}</p>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* What you get */}
        <Section id="included" tone="mist" labelledBy="wd-included">
          <div className="max-w-[60ch]">
            <h2 id="wd-included" className="headline headline-lg">
              {c.included.header}
            </h2>
            <p className="lede mt-5 text-muted-foreground">{c.included.intro}</p>
          </div>
          <div className="slab slab-grid mt-12 grid-cols-1 lg:grid-cols-2">
            {c.included.parts.map((p) => (
              <div key={p.title} className={`${p.tone} p-7 md:p-9`}>
                <h3 className="headline headline-md">{p.title}</h3>
                <ul className="mt-6 space-y-3">
                  {p.items.map((item) => (
                    <li key={item} className="flex gap-3 text-[15px] leading-snug">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-teal-deep" strokeWidth={2.5} aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* How it works */}
        <Section id="how" tone="light" labelledBy="wd-how">
          <h2 id="wd-how" className="headline headline-lg">
            {c.how.header}
          </h2>
          <ol className="slab slab-grid mt-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {c.how.steps.map((s) => (
              <li key={s.title} className="bg-surface p-6 md:p-7">
                <span className="block h-2.5 w-2.5 rounded-full bg-teal" aria-hidden="true" />
                <h3 className="headline headline-md mt-4">{s.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{s.body}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* Pricing */}
        <Section id="pricing" tone="sky" labelledBy="wd-pricing">
          <div className="max-w-[60ch]">
            <h2 id="wd-pricing" className="headline headline-lg">
              {c.pricing.header}
            </h2>
            <p className="lede mt-5 text-muted-foreground">{c.pricing.intro}</p>
          </div>
          <div className="slab slab-grid mt-12 grid-cols-1 lg:grid-cols-2">
            {[c.pricing.upfront, c.pricing.monthly].map((tier, i) => (
              <div key={tier.label} className={`${i === 0 ? "bg-teal-deep text-white" : "bg-surface"} p-7 md:p-9`}>
                <p className="text-[56px] font-extrabold leading-none tracking-[-0.04em] md:text-[72px]">{tier.value}</p>
                <p className="mt-2 text-[17px] font-bold">{tier.label}</p>
                <ul className={`mt-7 space-y-3 border-t-2 pt-6 ${i === 0 ? "border-white/30" : "border-foreground"}`}>
                  {tier.includes.map((item) => (
                    <li key={item} className="flex gap-3 text-[15px] leading-snug">
                      <Check className={`mt-0.5 h-5 w-5 shrink-0 ${i === 0 ? "text-white" : "text-teal-deep"}`} strokeWidth={2.5} aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <ul className="mt-6 space-y-1.5 text-[14px] text-muted-foreground">
            {c.pricing.terms.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <div className="mt-8">
            <CtaButton location="pricing" targetId={c.cta.targetId}>
              {c.cta.label}
            </CtaButton>
          </div>
        </Section>

        {/* Proof */}
        <Section id="proof" tone="light" labelledBy="wd-proof">
          <h2 id="wd-proof" className="headline headline-lg max-w-[22ch]">
            {c.proof.header}
          </h2>
          <ul className="mt-12 grid gap-6 md:gap-8 lg:grid-cols-2">
            {c.proof.items.map((k) => (
              <li key={k.client} className={`card group relative flex flex-col ${k.tone} md:p-8`}>
                <div className="flex h-14 items-center">
                  <img src={k.logo.src} alt={k.logo.alt} className={k.logo.className} />
                </div>
                <h3 className="headline headline-md mt-5">{k.client}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed">{k.line}</p>
                {/* The link's ::after covers the card; the button look sits on an inner span so a hover press never shrinks it. */}
                <Link to={k.to} className="mt-7 block rounded-[12px] after:absolute after:inset-0 after:content-[''] focus-visible:outline-[3px] focus-visible:outline-offset-[6px] focus-visible:outline-foreground">
                  <span className="btn-ghost btn-press w-full">
                    Read the case study
                    <span className="sr-only">: {k.client}</span>
                    <ArrowRight className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        {/* Closing and form */}
        <Section id="book" tone="dark" labelledBy="wd-book">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="wd-book" className="headline headline-lg">
              {c.closing.header}
            </h2>
            <p className="lede mt-5 text-white">{c.closing.body}</p>
          </div>
          <div className="mx-auto mt-10 max-w-3xl">
            <WebDesignForm />
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

type Field = "name" | "email" | "phone" | "company" | "website" | "need";
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "sending" | "sent" | "error";
const LABELS: Record<Field, string> = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  company: "Business name",
  website: "Current website, if you have one",
  need: "What do you need?",
};
const REQUIRED: Field[] = ["name", "email", "phone", "company", "need"];

/** Form for this page. Posts to the GoHighLevel webhook with form: "website". */
function WebDesignForm() {
  const f = webDesign.form;
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const el = e.currentTarget;
    const data = Object.fromEntries(new FormData(el)) as Record<string, string>;
    const found: Errors = {};
    for (const key of REQUIRED) if (!data[key]?.trim()) found[key] = f.errors.required;
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) found.email = f.errors.email;
    if (data.phone && data.phone.replace(/\D/g, "").length < 10) found.phone = f.errors.phone;
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = (Object.keys(LABELS) as Field[]).find((k) => found[k]);
      el.querySelector<HTMLElement>(`#wd-${first}`)?.focus();
      return;
    }
    if (!WEBHOOK_URL) {
      console.warn("Web design form: set VITE_GHL_WEBHOOK_URL and redeploy.");
      setStatus("error");
      setMessage(f.errors.notConnected);
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, ...getAttribution(), form: "website", source: "echo-27.com/web-design", submittedAt: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error(String(res.status));
      track("form_submit", { form: "website", need: data.need });
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
    id: `wd-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `wd-${name}-error` : undefined,
  });
  const wrap = (name: Field, input: React.ReactNode) => (
    <div>
      <label htmlFor={`wd-${name}`} className="field-label">
        {LABELS[name]}
      </label>
      {input}
      {errors[name] && (
        <p id={`wd-${name}-error`} className="mt-1.5 text-sm font-semibold text-foreground">
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
        {wrap("website", <input {...a11y("website")} type="text" inputMode="url" placeholder="yourcompany.com" autoComplete="url" className="field mt-2" />)}
        {wrap(
          "need",
          <select {...a11y("need")} defaultValue="" required className="field mt-2">
            <option value="" disabled>
              Select one
            </option>
            {f.needs.map((o) => (
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
