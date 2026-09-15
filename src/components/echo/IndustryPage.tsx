import type { ReactNode } from "react";
import { ArrowRight, Check, Plus } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Navbar } from "@/components/echo/Navbar";
import { Footer } from "@/components/echo/Footer";
import { openBookingModal } from "@/components/echo/BookingModal";
import { logos } from "@/components/echo/Hero";
import { stats } from "@/components/echo/Results";
import { VideoTestimonials, type Video } from "@/components/echo/Testimonials";
import { CountUp, Ticker } from "@/components/echo/Motion";

export type IndustryConfig = {
  industry: string;
  qualifier: string;
  title: string;
  subtitle: string;
  subVerticals: { name: string; copy: string }[];
  problems: string[];
  services: { title: string; copy: string }[];
  measure: { title: string; copy: string };
  proof: {
    client: string;
    logo?: { src: string; alt: string; className?: string };
    tagline: string;
    stats: { value: string; label: string }[];
    story: string;
    caseStudy?: "/case-studies/society-mortgage" | "/case-studies/mountain-gaming";
    video?: Video;
    quote?: { text: string; name: string; title: string; photo?: string };
    voice?: { name: string; title: string; note: string };
  };
  exclusivity?: string;
  faqs: { q: string; a: string }[];
  closing: { title: ReactNode; copy: string };
};

const platforms = ["Meta", "Google", "YouTube", "TikTok", "Email and SMS"];

const process = [
  {
    title: "Get to know your business",
    copy: "Your numbers, your margins, your customers, and what's already been tried. We don't touch a campaign until we know what a customer is worth to you.",
  },
  {
    title: "Build the system across channels",
    copy: "Ads, creative, landing pages, tracking, and follow-up built to work as one, so nothing falls between them and every lead is accounted for.",
  },
  {
    title: "Launch, measure, scale",
    copy: "Live fast, judged against the one number we agreed on, and scaled only where it holds. What doesn't pay gets cut, not defended.",
  },
];

const claims = [
  "You work with Adam directly, not an account manager.",
  "One number reported every month: the one you actually answer for.",
  "Tracking built properly before a dollar of budget goes out.",
  "No long lock-in. We earn next month by performing this month.",
  "Twelve years and 23+ industries of paid media behind every decision.",
];

function Heading({ eyebrow, title, sub, dark = false }: { eyebrow: string; title: string; sub?: string; dark?: boolean }) {
  return (
    <div>
      <p className={`${dark ? "eyebrow-dark" : "eyebrow"} mb-7`}>{eyebrow}</p>
      <h2 className="max-w-[18ch] text-[36px] md:text-[52px] font-extrabold leading-[0.98] tracking-[-0.04em]">{title}</h2>
      {sub && <p className={`mt-6 max-w-[52ch] text-lg leading-snug ${dark ? "text-white/70" : "text-muted-foreground"}`}>{sub}</p>}
    </div>
  );
}

function Apply({ dark = false, className = "" }: { dark?: boolean; className?: string }) {
  return (
    <button type="button" onClick={openBookingModal} className={`${dark ? "btn-on-dark" : "btn-primary"} ${className}`}>
      Apply to partner with us
    </button>
  );
}

/** A CTA row that repeats between sections, the way BAD does it. */
function CtaBand({ line }: { line: string }) {
  return (
    <div className="mx-auto max-w-[1180px] px-6">
      <div className="slab flex flex-col items-start gap-5 bg-surface p-7 md:flex-row md:items-center md:justify-between md:p-8">
        <p className="max-w-[40ch] text-[18px] md:text-[20px] font-bold leading-snug tracking-[-0.01em]">{line}</p>
        <Apply className="shrink-0" />
      </div>
    </div>
  );
}

export function IndustryPage({ c }: { c: IndustryConfig }) {
  const loop = [...logos, ...logos];
  return (
    <div className="bg-background text-foreground">
      <Navbar />
      <main className="pt-[68px]">
        {/* Hero: qualifier, short uppercase headline, one CTA */}
        <section id="top" className="mx-auto max-w-[1180px] px-6 pt-14 pb-14 text-center md:pt-20 md:pb-20">
          <p className="mx-auto inline-block rounded-lg border-2 border-foreground bg-surface px-5 py-2.5 text-[13px] font-bold uppercase tracking-[0.08em] text-foreground md:text-[14px]">
            {c.qualifier}
          </p>
          <h1 className="mx-auto mt-10 max-w-[14ch] text-balance text-[52px] font-extrabold uppercase leading-[0.9] tracking-[-0.03em] sm:text-[72px] md:text-[96px] lg:text-[112px]">
            {c.title}
          </h1>
          <p className="mx-auto mt-7 max-w-[44ch] text-balance text-[17px] font-bold uppercase leading-snug tracking-[0.02em] text-muted-foreground md:text-[21px]">
            {c.subtitle}
          </p>
          <div className="mt-10 flex flex-col items-center gap-3">
            <Apply className="text-[16px] px-8 py-4" />
            <p className="text-[14px] text-muted-foreground">No pitch. We'll tell you if we're not a fit.</p>
          </div>
        </section>

        {/* Client logos */}
        <div className="border-y-2 border-foreground bg-teal">
          <div className="mx-auto max-w-[1180px] px-6 py-7">
            <div
              className="relative overflow-hidden"
              style={{
                maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
                WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
              }}
            >
              <div className="marquee-track flex w-max items-center gap-14 md:gap-20">
                {loop.map((l, i) => (
                  <div key={`${l.name}-${i}`} className="flex h-9 w-32 shrink-0 items-center justify-center md:h-10 md:w-40">
                    <img src={l.src} alt={`${l.name} logo`} loading="lazy" decoding="async" className="max-h-full max-w-full object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <section id="results" className="py-16 md:py-20">
          <div className="mx-auto max-w-[1180px] px-6">
            <p className="eyebrow mb-7">Across our clients</p>
            {/* Five tiles: spans chosen so no breakpoint leaves an empty divider-coloured cell. */}
            <div className="slab grid grid-cols-2 gap-[2px] bg-foreground sm:grid-cols-6 lg:grid-cols-5">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`bg-surface px-5 py-7 lg:col-span-1 ${i === 4 ? "col-span-2 sm:col-span-3" : i === 3 ? "sm:col-span-3" : "sm:col-span-2"}`}
                >
                  <p className="text-[36px] md:text-[44px] font-extrabold leading-none tracking-[-0.04em] text-teal"><CountUp value={s.value} /></p>
                  <p className="mt-3 text-[13px] text-muted-foreground leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-[64ch] text-lg text-muted-foreground leading-snug">
              Don't hire marketers. Work with the person who has run this across 23+ industries and answers for the number.
            </p>
          </div>
        </section>

        {/* Sub-verticals */}
        <section id="who" className="border-y-2 border-foreground bg-surface-alt py-20 md:py-28">
          <div className="mx-auto max-w-[1180px] px-6">
            <Heading eyebrow={c.industry} title={`Who we work with in ${c.industry.toLowerCase()}.`} />
            <div className="slab mt-12 grid grid-cols-1 gap-[2px] bg-foreground sm:grid-cols-2 lg:grid-cols-3">
              {c.subVerticals.map((v, i) => (
                <div key={v.name} className={`card-flip ${["bg-sky", "bg-surface", "bg-peach", "bg-lilac", "bg-mint", "bg-surface"][i % 6]} p-7`}>
                  <h3 className="text-[22px] font-extrabold leading-[1.05] tracking-[-0.03em]">{v.name}</h3>
                  <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed">{v.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Ticker items={c.subVerticals.map((v) => v.name)} tone="teal" />

        {/* Platforms */}
        <section id="platforms" className="py-16 md:py-20">
          <div className="mx-auto max-w-[1180px] px-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-[auto_1fr] md:items-center md:gap-12">
              <p className="max-w-[16ch] text-[26px] md:text-[30px] font-extrabold leading-[1.05] tracking-[-0.03em]">
                We run on the channels that actually move revenue.
              </p>
              <div className="slab grid grid-cols-2 gap-[2px] bg-foreground sm:grid-cols-5">
                {platforms.map((p, i) => (
                  <div
                    key={p}
                    className={`flex items-center justify-center bg-surface px-4 py-6 text-center text-[15px] font-bold tracking-[-0.01em] ${i === 4 ? "col-span-2 sm:col-span-1" : ""}`}
                  >
                    {p}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Problems */}
        <section id="problems" className="border-y-2 border-foreground bg-lilac py-20 md:py-28">
          <div className="mx-auto max-w-[1180px] px-6">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
              <Heading
                eyebrow="Sound familiar?"
                title="Where it usually goes wrong."
                sub={`The ${c.industry.toLowerCase()} accounts we take over tend to share the same problems. None of them are fixed by spending more.`}
              />
              <div className="slab divide-y-2 divide-foreground bg-surface">
                {c.problems.map((p) => (
                  <p key={p} className="px-6 py-5 text-[17px] font-bold leading-snug tracking-[-0.01em] md:px-7">{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-20 md:py-28">
          <div className="mx-auto max-w-[1180px] px-6">
            <Heading eyebrow="What we do" title={`How we work with ${c.industry.toLowerCase()}.`} />
            <div className="slab mt-12 grid grid-cols-1 gap-[2px] bg-foreground sm:grid-cols-2 lg:grid-cols-4">
              {c.services.map((s) => (
                <div key={s.title} className="card-flip bg-surface p-7">
                  <h3 className="text-[22px] font-extrabold leading-[1.05] tracking-[-0.03em]">{s.title}</h3>
                  <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed">{s.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CtaBand line="If you've read this far, the first call will tell you the rest." />

        {/* Process */}
        <section id="process" className="py-20 md:py-28">
          <div className="mx-auto max-w-[1180px] px-6">
            <Heading eyebrow="How we do it" title="Here's how we do it." />
            <div className="mt-12 border-t-2 border-foreground">
              {process.map((p) => (
                <div key={p.title} className="grid grid-cols-1 gap-4 border-b-2 border-foreground py-9 md:grid-cols-[0.6fr_1.4fr] md:gap-12 md:py-11">
                  <h3 className="text-[26px] md:text-[30px] font-extrabold leading-[1.05] tracking-[-0.03em]">{p.title}</h3>
                  <p className="text-[15px] md:text-[17px] leading-relaxed">{p.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tracking and the number */}
        <section id="measure" className="border-y-2 border-foreground bg-teal-deep py-20 text-white md:py-28">
          <div className="mx-auto max-w-[1180px] px-6">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
              <div>
                <p className="eyebrow-dark mb-7">Tracking built for the number you answer for</p>
                <h2 className="max-w-[14ch] text-[36px] md:text-[52px] lg:text-[60px] font-extrabold leading-[0.96] tracking-[-0.04em]">{c.measure.title}</h2>
              </div>
              <div className="lg:pt-14">
                <p className="text-lg md:text-xl leading-snug text-white/85">{c.measure.copy}</p>
                <p className="mt-6 text-lg md:text-xl leading-snug text-white/85">
                  Accurate data from first touch to final sale. Not a dashboard you have to interpret, and never a report about reach.
                </p>
                <div className="mt-8">
                  <Apply dark />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Proof */}
        <section id="proof" className="bg-sky py-20 md:py-28">
          <div className="mx-auto max-w-[1180px] px-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-[auto_1fr] md:items-end md:gap-12">
              {c.proof.logo && (
                <div className="slab flex h-28 w-full items-center justify-center bg-surface px-8 md:h-32 md:w-56">
                  <img src={c.proof.logo.src} alt={c.proof.logo.alt} className={c.proof.logo.className ?? "max-h-14 w-auto max-w-full object-contain"} />
                </div>
              )}
              <Heading eyebrow="Let the results do the talking" title={c.proof.client} sub={c.proof.tagline} />
            </div>

            <div className="slab mt-12 grid grid-cols-1 gap-[2px] border-teal bg-white/40 sm:grid-cols-3">
              {c.proof.stats.map((s) => (
                <div key={s.label} className="bg-teal px-6 py-7 text-white">
                  <p className="text-[40px] md:text-[52px] font-extrabold leading-none tracking-[-0.04em]"><CountUp value={s.value} /></p>
                  <p className="mt-3 text-[14px] leading-snug text-white/85">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="slab bg-surface p-7 md:p-8">
                <p className="text-[13px] font-bold uppercase tracking-[0.1em] text-pink">What we did</p>
                <p className="mt-4 text-[17px] leading-relaxed">{c.proof.story}</p>
                {c.proof.caseStudy && (
                  <Link to={c.proof.caseStudy} className="btn-ghost mt-7 text-[14px]">
                    Read the full case study
                    <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                  </Link>
                )}
              </div>

              {c.proof.video ? (
                <div className="slab bg-surface p-5 md:p-6">
                  <p className="mb-4 text-[13px] font-bold uppercase tracking-[0.1em] text-pink">Hear it from the client</p>
                  <VideoTestimonials items={[c.proof.video]} columns={1} showResult={false} />
                </div>
              ) : c.proof.quote ? (
                <figure className="slab flex flex-col bg-surface p-7 md:p-8">
                  <p className="mb-4 text-[13px] font-bold uppercase tracking-[0.1em] text-pink">From the client</p>
                  <blockquote className="flex-1 text-[18px] md:text-[20px] font-bold leading-snug tracking-[-0.01em]">“{c.proof.quote.text}”</blockquote>
                  <figcaption className="mt-7 flex items-center gap-3">
                    {c.proof.quote.photo && (
                      <img src={c.proof.quote.photo} alt={c.proof.quote.name} className="h-11 w-11 border-2 border-foreground object-cover" />
                    )}
                    <div>
                      <p className="font-bold leading-tight">{c.proof.quote.name}</p>
                      <p className="text-[13px] text-muted-foreground leading-tight">{c.proof.quote.title}</p>
                    </div>
                  </figcaption>
                </figure>
              ) : c.proof.voice ? (
                <div className="slab flex flex-col bg-surface p-7 md:p-8">
                  <p className="text-[13px] font-bold uppercase tracking-[0.1em] text-pink">Who runs this</p>
                  <p className="mt-4 flex-1 text-[17px] leading-relaxed">{c.proof.voice.note}</p>
                  <div className="mt-7">
                    <p className="font-bold leading-tight">{c.proof.voice.name}</p>
                    <p className="text-[13px] text-muted-foreground leading-tight">{c.proof.voice.title}</p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {/* Exclusivity, where it applies */}
        {c.exclusivity && (
          <section id="exclusivity" className="border-t-2 border-foreground py-16 md:py-20">
            <div className="mx-auto max-w-[1180px] px-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-[auto_1fr] md:items-center md:gap-12">
                <p className="eyebrow">Our exclusivity policy</p>
                <p className="max-w-[60ch] text-[20px] md:text-[24px] font-bold leading-snug tracking-[-0.01em]">{c.exclusivity}</p>
              </div>
            </div>
          </section>
        )}

        {/* Not marketers */}
        <section id="why" className="border-t-2 border-foreground bg-surface py-20 md:py-28">
          <div className="mx-auto max-w-[1180px] px-6">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
              <div>
                <p className="eyebrow mb-7">Why Echo 27</p>
                <h2 className="max-w-[12ch] text-[40px] font-extrabold uppercase leading-[0.92] tracking-[-0.03em] md:text-[64px]">
                  Not marketers. The person accountable for your number.
                </h2>
                <div className="mt-8">
                  <Apply />
                </div>
              </div>
              <ul className="divide-y-2 divide-foreground border-y-2 border-foreground">
                {claims.map((t) => (
                  <li key={t} className="flex gap-4 py-5">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-teal" strokeWidth={3} />
                    <span className="text-[17px] md:text-[19px] font-bold leading-snug tracking-[-0.01em]">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t-2 border-foreground bg-background py-20 md:py-28">
          <div className="mx-auto max-w-[1180px] px-6">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
              <Heading eyebrow="Questions" title="What founders ask first." />
              <div className="slab divide-y-2 divide-foreground bg-surface">
                {c.faqs.map((f) => (
                  <details key={f.q} className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-[17px] font-bold leading-snug tracking-[-0.01em] hover:bg-surface-alt md:px-7 [&::-webkit-details-marker]:hidden">
                      {f.q}
                      <Plus className="h-5 w-5 shrink-0 transition-transform group-open:rotate-45" strokeWidth={2.5} />
                    </summary>
                    <p className="px-6 pb-6 text-[15px] md:text-base text-muted-foreground leading-relaxed md:px-7">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section id="contact" className="border-y-2 border-foreground bg-teal-deep py-20 text-white md:py-28">
          <div className="mx-auto max-w-[1180px] px-6">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-20">
              <div>
                <p className="eyebrow-dark mb-7">Ready when you are</p>
                <h2 className="max-w-[14ch] text-[44px] md:text-[64px] lg:text-[76px] font-extrabold leading-[0.94] tracking-[-0.04em]">{c.closing.title}</h2>
              </div>
              <div>
                <p className="max-w-[40ch] text-lg text-white/70 leading-snug">{c.closing.copy}</p>
                <div className="mt-8">
                  <Apply dark />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
