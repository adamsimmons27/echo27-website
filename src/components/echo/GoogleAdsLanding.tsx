import { ArrowRight, Check } from "lucide-react";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/echo27-logo.png";
import { Container } from "@/components/cmo/Container";
import { Section } from "@/components/cmo/Section";
import { Faq } from "@/components/cmo/Faq";
import { Footer } from "@/components/echo/Footer";
import { VideoTestimonials, videos } from "@/components/echo/Testimonials";
import { openBookingModal } from "@/components/echo/BookingModal";
import { track } from "@/lib/tracking";

/**
 * Google Ads management at /google-ads-management. Built to be walked through on a sales call, top to bottom:
 * the promise, what is included, how a month runs, the four client videos, the price, the next step.
 * Copy rules: no em dashes, no exclamation marks, no invented figures. The three hero stats are real.
 */
export const googleAds = {
  cta: "Apply to partner with us",
  hero: {
    eyebrow: "Google Ads management",
    headline: "Google Ads, run like it's our own money.",
    subhead:
      "One senior person on your account, bidding tied to what a customer is worth to you, and a landing page we build and keep testing. Reported on customers and revenue, not clicks.",
    stats: [
      { value: "$12M+", label: "Ad spend managed" },
      { value: "12+", label: "Years in performance marketing" },
      { value: "23+", label: "Industries served" },
    ],
  },
  included: {
    header: "What's included.",
    intro: "Two things, done together, because an ad is only as good as the page it sends people to.",
    parts: [
      {
        title: "Ads management",
        tone: "bg-sky",
        items: [
          "Account structure and keyword research built around your margins, not search volume",
          "Bidding tied to customer value, not platform ROAS",
          "Ad copy written and tested on a fixed weekly cadence",
          "Negative keywords, search term reviews, and budget pacing every week",
          "Conversion and call tracking set up properly, once",
          "One owner on the account, start to finish",
        ],
      },
      {
        title: "Landing page development and testing",
        tone: "bg-mint",
        items: [
          "A dedicated landing page built for the campaign, not your homepage",
          "Laid out for the decision the visitor is making, fast on a phone",
          "A/B tests on headline, offer, and form, one change at a time",
          "Tracking from the ad click to the customer",
          "Updates and new variations as the campaigns learn",
        ],
      },
    ],
  },
  rhythm: {
    header: "How a month runs.",
    steps: [
      { title: "Week one", body: "Access, tracking, and the first landing page. We agree the one number the account is judged on." },
      { title: "Week two", body: "Campaigns live. Budget pacing and search term reviews start the same day." },
      { title: "Every week", body: "One ad or page test shipped, one short update with spend, customers, and what we are changing." },
      { title: "Every month", body: "A review call: what paid, what got cut, and where the budget goes next." },
    ],
  },
  proof: {
    header: "Hear it from clients.",
    intro: "Four owners on what changed when we took over their accounts.",
  },
  cases: {
    header: "Two accounts, start to finish.",
    intro: "The full write-ups are on the site. These are the numbers and what we changed.",
    items: [
      {
        client: "Society Mortgage",
        logo: { src: "/images/logos/society-mortgage.jpg", alt: "Society Mortgage logo", className: "h-10 w-auto object-contain" },
        channel: "Google Ads, competitor conquesting, and a landing page rebuild",
        tagline: "A fast-growing lender competing with Rocket Mortgage, CrossCountry, and Fairway on search.",
        stats: [
          { value: "62%", label: "Lower cost per qualified lead" },
          { value: "128%", label: "More qualified leads" },
          { value: "30%", label: "Higher conversion rate from ongoing testing" },
        ],
        story:
          "Rebuilt the account from the ground up: tracking that counted only qualified leads, a three-tier keyword structure with competitor conquesting, new ad copy and extensions, Target CPA bidding trained on CRM data, and 250 negative keywords.",
        to: "/case-studies/society-mortgage",
        tone: "bg-lilac",
      },
      {
        client: "Mountain",
        logo: { src: "/images/logos/mountain.svg", alt: "Mountain logo", className: "h-12 w-auto object-contain" },
        channel: "Paid campaigns across Meta, Twitter, and YouTube, with new landing pages",
        tagline: "Premium gaming hardware, recently acquired and rebuilding its growth marketing from scratch.",
        stats: [
          { value: "41%", label: "Lower customer acquisition cost, from $138 to $82" },
          { value: "68%", label: "Higher return on ad spend, from 1.9 to 3.2" },
          { value: "3 weeks", label: "To a profitable return on ad spend" },
        ],
        story:
          "Customer research found four segments the brand had been treating as one. We overhauled the creative, built campaigns with retargeting, and redesigned the site and landing pages for conversion, then scaled into three new countries.",
        to: "/case-studies/mountain-gaming",
        tone: "bg-peach",
      },
    ],
  },
  pricing: {
    header: "Pricing.",
    price: "$1,850",
    per: "per month",
    includes: [
      "Google Ads management, as described above",
      "Landing page development and ongoing testing",
      "Conversion and call tracking setup",
      "Weekly updates and a monthly review call",
      "Direct line to Adam, not an account manager",
    ],
    terms: [
      "Ad spend is separate and paid to Google from your own account.",
      "Everything is built in accounts you own. If we ever part ways, you keep all of it.",
      "No long lock-in. We earn next month by performing this month.",
    ],
  },
  faq: {
    header: "Questions owners ask on the call",
    items: [
      {
        question: "Who owns the ad account and the landing page?",
        answer: "You do. Everything is built in accounts you own. If we ever part ways, you keep all of it.",
      },
      {
        question: "How much ad spend do I need?",
        answer:
          "It depends on your market and how competitive your category is. We'll tell you the realistic floor on the call, and we'll tell you honestly if it isn't worth running ads yet.",
      },
      {
        question: "How quickly do campaigns go live?",
        answer: "Tracking and the first landing page in week one, campaigns live in week two.",
      },
      {
        question: "What if it isn't working?",
        answer:
          "We say so, and we change it. You'll always know what a new customer is costing you. If a campaign isn't tracking to the numbers we set together, the budget moves or the campaign stops.",
      },
      {
        question: "Is there a contract?",
        answer: "No long lock-in. We earn next month by performing this month.",
      },
    ],
  },
  closing: {
    header: "Ready to start?",
    body: "Apply, and we'll come back with the plan for your account: budget, the first page, and the number we'll be judged on.",
  },
};

function Apply({ location, className = "" }: { location: string; className?: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        track("cta_click", { location });
        openBookingModal();
      }}
      className={`btn-primary ${className}`}
    >
      {googleAds.cta}
    </button>
  );
}

export function GoogleAdsLanding() {
  const c = googleAds;
  return (
    <div className="bg-background text-foreground">
      <header className="border-b-2 border-foreground bg-background md:sticky md:top-0 md:z-40">
        <Container className="flex h-[68px] items-center justify-between">
          <a href="#top" className="flex min-h-11 items-center" aria-label="Echo 27">
            <img src={logo} alt="" className="h-7 w-auto" />
          </a>
          <div className="hidden md:block">
            <Apply location="header" className="text-sm px-4 py-2" />
          </div>
        </Container>
      </header>

      <main className="pb-20 md:pb-0">
        {/* Hero */}
        <section id="top" aria-labelledby="ga-hero" className="bg-background">
          <Container className="grid gap-12 pt-14 pb-14 sm:pt-20 sm:pb-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-16 lg:pt-24 lg:pb-24">
            <div>
              <p className="eyebrow">{c.hero.eyebrow}</p>
              <h1 id="ga-hero" className="headline headline-xl mt-6 max-w-[16ch]">
                {c.hero.headline}
              </h1>
              <p className="lede mt-7 max-w-[56ch] text-muted-foreground">{c.hero.subhead}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Apply location="hero" />
                <a href="#pricing" className="btn-ghost">
                  See pricing
                </a>
              </div>
            </div>
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

        {/* What is included */}
        <Section id="included" tone="mist" labelledBy="ga-included">
          <div className="max-w-[60ch]">
            <h2 id="ga-included" className="headline headline-lg">
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

        {/* Rhythm */}
        <Section id="rhythm" tone="light" labelledBy="ga-rhythm">
          <h2 id="ga-rhythm" className="headline headline-lg max-w-[60ch]">
            {c.rhythm.header}
          </h2>
          <ol className="slab slab-grid mt-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {c.rhythm.steps.map((s) => (
              <li key={s.title} className="bg-surface p-6 md:p-7">
                <span className="block h-2.5 w-2.5 rounded-full bg-teal" aria-hidden="true" />
                <h3 className="headline headline-md mt-4">{s.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{s.body}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* Proof: all four client videos */}
        <Section id="proof" tone="sky" labelledBy="ga-proof">
          <div className="max-w-[60ch]">
            <h2 id="ga-proof" className="headline headline-lg">
              {c.proof.header}
            </h2>
            <p className="lede mt-5 text-muted-foreground">{c.proof.intro}</p>
          </div>
          <div className="mt-12">
            <VideoTestimonials items={videos} columns={2} showResult={false} />
          </div>
        </Section>

        {/* Case studies */}
        <Section id="case-studies" tone="light" labelledBy="ga-cases">
          <div className="max-w-[60ch]">
            <h2 id="ga-cases" className="headline headline-lg">
              {c.cases.header}
            </h2>
            <p className="lede mt-5 text-muted-foreground">{c.cases.intro}</p>
          </div>
          <ul className="mt-12 grid gap-6 md:gap-8 lg:grid-cols-2">
            {c.cases.items.map((k) => (
              <li key={k.client} className="card group relative flex flex-col md:p-8">
                <div className="flex h-14 items-center">
                  <img src={k.logo.src} alt={k.logo.alt} className={k.logo.className} />
                </div>
                <p className="eyebrow mt-5">{k.channel}</p>
                <h3 className="headline headline-md mt-4">{k.client}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{k.tagline}</p>
                <ul className="slab slab-grid mt-6 grid-cols-1 sm:grid-cols-3">
                  {k.stats.map((st) => (
                    <li key={st.label} className={`${k.tone} px-4 py-5`}>
                      <p className="text-[30px] font-extrabold leading-none tracking-[-0.04em]">{st.value}</p>
                      <p className="mt-2 text-[12px] font-bold leading-snug">{st.label}</p>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 flex-1 text-[15px] leading-relaxed">{k.story}</p>
                {/* The link's ::after covers the card; the button look sits on an inner span so a hover press never shrinks it. */}
                <Link to={k.to} className="mt-7 block rounded-[12px] after:absolute after:inset-0 after:content-[''] focus-visible:outline-[3px] focus-visible:outline-offset-[6px] focus-visible:outline-foreground">
                  <span className="btn-ghost btn-press w-full">
                    Read the case study
                    <ArrowRight className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        {/* Pricing */}
        <Section id="pricing" tone="light" labelledBy="ga-pricing">
          <h2 id="ga-pricing" className="headline headline-lg">
            {c.pricing.header}
          </h2>
          <div className="slab slab-grid mt-12 grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <div className="bg-teal-deep p-7 text-white md:p-9">
              <p className="text-[64px] font-extrabold leading-none tracking-[-0.04em] md:text-[80px]">{c.pricing.price}</p>
              <p className="mt-2 text-[17px] font-bold">{c.pricing.per}</p>
              <ul className="mt-8 space-y-3 border-t-2 border-white/30 pt-6">
                {c.pricing.terms.map((t) => (
                  <li key={t} className="text-[15px] leading-snug text-white/90">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-surface p-7 md:p-9">
              <p className="eyebrow">Included</p>
              <ul className="mt-6 space-y-3">
                {c.pricing.includes.map((item) => (
                  <li key={item} className="flex gap-3 text-[16px] leading-snug">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-teal-deep" strokeWidth={2.5} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Apply location="pricing" />
              </div>
            </div>
          </div>
        </Section>

        <Faq faq={c.faq} />

        {/* Next step */}
        <Section id="start" tone="dark" labelledBy="ga-start">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="ga-start" className="headline headline-lg">
              {c.closing.header}
            </h2>
            <p className="lede mt-5 text-white/90">{c.closing.body}</p>
            <div className="mt-8">
              <button
                type="button"
                onClick={() => {
                  track("cta_click", { location: "closing" });
                  openBookingModal();
                }}
                className="btn-on-dark"
              >
                {c.cta}
              </button>
            </div>
          </div>
        </Section>

        {/* Sticky mobile CTA */}
        <div className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-foreground bg-background p-3 md:hidden">
          <Apply location="sticky" className="w-full" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
