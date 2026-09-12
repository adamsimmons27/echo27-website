import { useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Target,
  Users,
  Image as ImageIcon,
  PenLine,
  Rocket,
  FlaskConical,
  Gauge,
  TrendingUp,
  Activity,
  FileBarChart,
} from "lucide-react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Testimonials } from "./Testimonials";
import { Reveal } from "./Reveal";
import { openBookingModal } from "./BookingModal";

const included = [
  { icon: Target, title: "Strategy and account architecture", copy: "We map offers, campaigns, and budgets into a clean account structure built to scale, not a pile of boosted posts." },
  { icon: Users, title: "Audience research and targeting", copy: "We find who actually buys, then build the audiences, exclusions, and placements around them." },
  { icon: ImageIcon, title: "Creative production", copy: "Static graphics, video edits, and UGC-style ads produced in-house by our team. You send nothing." },
  { icon: PenLine, title: "Copywriting", copy: "Hooks, angles, primary text, and headlines written in-house, with multiple variations per concept." },
  { icon: Rocket, title: "Campaign build and launch", copy: "We build everything inside your ad account and take it live, correctly, the first time." },
  { icon: FlaskConical, title: "Creative testing framework", copy: "Systematic angle and A/B testing so winners are found on purpose instead of by luck." },
  { icon: Gauge, title: "Daily optimization and budget management", copy: "Budgets, bids, and placements reviewed daily. Money moves toward what is working." },
  { icon: TrendingUp, title: "Methodical scaling", copy: "We scale winners in controlled steps so performance holds instead of breaking overnight." },
  { icon: Activity, title: "Tracking setup", copy: "Meta pixel, Conversions API, and event tracking configured and maintained so the data is trustworthy." },
  { icon: FileBarChart, title: "Reporting and communication", copy: "Clear reporting on spend, leads, and cost per result. Plain language, no jargon." },
];

const problems = [
  "Boosting posts with no strategy behind them.",
  "One tired creative running for months until it dies.",
  "No testing, so nobody knows what actually works.",
  "Broken or missing tracking, so the numbers lie.",
  "Guessing at audiences instead of researching them.",
  "No one who actually owns the numbers.",
];

const steps = [
  { n: "Step 1", title: "Onboarding and deep dive", copy: "We learn your offer, margins, sales process, and what a customer is really worth. Access is set up and audited." },
  { n: "Step 2", title: "Research and strategy", copy: "Audience research, competitor teardown, offer angles, and a written plan for the account." },
  { n: "Step 3", title: "Build and launch", copy: "Creative and copy produced, campaigns built, tracking verified, ads live." },
  { n: "Step 4", title: "Test and optimize", copy: "Angles, hooks, and formats tested against each other. Daily optimization on spend and results." },
  { n: "Step 5", title: "Scale", copy: "Winners scaled in controlled increments while new creative keeps the pipeline of ideas full." },
];

const deliverables = [
  "Fresh creative produced every month",
  "New copy, hooks, and angles",
  "Ongoing structured creative testing",
  "Daily optimization and budget management",
  "Tracking maintained and verified",
  "A clear monthly performance report",
];

const faqs = [
  { q: "Do I need to provide the creative?", a: "No. We produce all of it. Static graphics, video edits, and UGC-style ads are made in-house by our team. If you have brand assets or existing footage we will use them, but nothing is required from you." },
  { q: "Who writes the ad copy?", a: "We do, in-house. Hooks, angles, primary text, and headlines, with multiple variations per concept so we always have something new to test." },
  { q: "What is the minimum ad spend?", a: "We generally work with businesses spending at least 3,000 dollars per month on Meta. Below that there is not enough data to test and scale properly." },
  { q: "What is the commitment?", a: "We ask for an initial 90 days. That is the honest amount of time needed to build, test, and get to reliable numbers. After that it is month to month." },
  { q: "How fast will I see results?", a: "Ads are usually live within the first two weeks. Early signals show up quickly, and the meaningful compounding happens in months two and three once testing has run." },
  { q: "Do you handle tracking and pixel setup?", a: "Yes, fully. Meta pixel, Conversions API, and event tracking are set up, tested, and maintained by us." },
];

const reasons = [
  { stat: "12+", label: "Years in performance marketing", copy: "We have run ads through every platform change, cost spike, and tracking shakeup of the last decade." },
  { stat: "23+", label: "Industries served", copy: "SaaS, lending, ecommerce, and local service businesses. We adapt to how your business actually makes money." },
  { stat: "8 figures", label: "In managed ad spend", copy: "Real budgets, real accountability. We have made the expensive mistakes already so you do not have to." },
  { stat: "0", label: "Junior account managers", copy: "Senior operators run your account and treat the spend like it is coming out of their own pocket." },
];

function Eyebrow({ children, onDark = false }: { children: React.ReactNode; onDark?: boolean }) {
  return (
    <div
      className={`inline-flex items-center gap-2 text-xs font-semibold tracking-[0.22em] uppercase mb-6 ${
        onDark ? "text-white/60" : "text-foreground/60"
      }`}
    >
      <span className={`inline-block h-px w-8 ${onDark ? "bg-white/40" : "bg-foreground/30"}`} />
      {children}
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-foreground/10">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start justify-between gap-6 py-6 text-left"
        aria-expanded={open}
      >
        <span className="text-lg md:text-xl font-bold text-foreground">{q}</span>
        <ChevronDown
          className={`mt-1 h-5 w-5 shrink-0 text-teal transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <p className="pb-6 pr-10 text-muted-foreground leading-relaxed">{a}</p>}
    </div>
  );
}

export function MetaAdsLanding() {
  return (
    <div className="bg-background text-foreground">
      <Navbar />
      <main>
        {/* Hero */}
        <section id="top" className="relative min-h-[88vh] flex items-center pt-32 pb-20 overflow-hidden bg-background">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "linear-gradient(to right, color-mix(in oklab, var(--foreground) 6%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--foreground) 6%, transparent) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
              maskImage: "radial-gradient(ellipse at 50% 40%, black 40%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(ellipse at 50% 40%, black 40%, transparent 75%)",
            }}
          />
          <div aria-hidden className="grain-overlay" />
          <div className="relative mx-auto max-w-[1200px] px-6 w-full">
            <div className="max-w-4xl mx-auto text-center fade-in-up">
              <Eyebrow>Full-Service Meta Ads Management</Eyebrow>
              <h1 className="font-extrabold text-foreground text-[42px] sm:text-6xl md:text-7xl leading-[1.03] tracking-tight">
                We run your Meta ads end to end.{" "}
                <span className="text-teal">You just watch the leads come in.</span>
              </h1>
              <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Echo 27 handles strategy, creative, copy, launch, testing, and scaling.
                Done for you, top to bottom. You never have to touch your ad account.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <button type="button" onClick={openBookingModal} className="btn-primary text-base px-8 py-4">
                  Book a Strategy Call
                  <ArrowRight className="h-4 w-4" />
                </button>
                <a href="#included" className="btn-ghost text-base">
                  See what's included
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="relative bg-surface-alt py-20 md:py-[120px]">
          <div className="mx-auto max-w-[1200px] px-6">
            <Reveal className="max-w-3xl mx-auto text-center">
              <Eyebrow>The problem</Eyebrow>
              <h2 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold tracking-tight leading-[1.05]">
                Most businesses do not have a Meta problem. They have a{" "}
                <span className="text-pink">nobody is running it</span> problem.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Meta still works. What usually fails is everything around the ads:
                the strategy, the creative, the testing, and the tracking.
              </p>
            </Reveal>
            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-4">
              {problems.map((p, i) => (
                <Reveal key={p} delay={i * 60}>
                  <div className="flex items-start gap-4 rounded-xl border border-foreground/10 bg-background p-6">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-pink" />
                    <p className="text-base md:text-lg font-medium text-foreground leading-relaxed">{p}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Included */}
        <section id="included" className="relative bg-background py-20 md:py-[120px]">
          <div className="mx-auto max-w-[1200px] px-6">
            <Reveal className="max-w-3xl mx-auto text-center">
              <Eyebrow>Everything is handled</Eyebrow>
              <h2 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold tracking-tight leading-[1.05]">
                What's included
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Creative production and copywriting are core parts of the service, done
                in-house. They are not add-ons and they are not billed separately.
              </p>
            </Reveal>
            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {included.map(({ icon: Icon, title, copy }, i) => (
                <Reveal key={title} delay={(i % 3) * 80}>
                  <div className="card-elev p-8 group flex flex-col h-full">
                    <div className="mb-8">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal group-hover:bg-teal group-hover:text-white transition-colors">
                        <Icon className="h-6 w-6" strokeWidth={1.75} />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{copy}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Creative spotlight */}
        <section
          className="relative py-24 md:py-[140px] overflow-hidden"
          style={{ backgroundColor: "oklch(0.14 0.02 190)", color: "#ffffff" }}
        >
          <div aria-hidden className="grain-overlay" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
              maskImage: "radial-gradient(ellipse at 50% 50%, black 30%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, black 30%, transparent 75%)",
            }}
          />
          <div className="relative mx-auto max-w-[1100px] px-6">
            <Reveal className="max-w-3xl">
              <Eyebrow onDark>Creative and copy</Eyebrow>
              <h2 className="text-4xl md:text-5xl lg:text-[64px] font-extrabold leading-[1.03] tracking-tight text-white">
                The creative is the campaign.{" "}
                <span className="text-teal">So we make it, every month.</span>
              </h2>
              <p className="mt-6 text-lg md:text-xl text-white/70 leading-relaxed">
                Targeting is mostly automated now. What still decides whether Meta prints
                money for you is the ad itself: the hook, the angle, the first three
                seconds. That is why creative production sits at the center of what we do,
                not at the edge of it.
              </p>
            </Reveal>
            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { t: "Fresh creative every month", c: "New concepts ship on a schedule, so performance never depends on one ad that is slowly burning out." },
                { t: "Multiple angles and formats", c: "Static, video, and UGC-style, cut for feed, Reels, and Stories. Same offer, different ways in." },
                { t: "Scroll-stopping hooks", c: "We write and test openings hard, because the first line and first frame decide everything after it." },
                { t: "Constant iteration", c: "Winners get new variations. Losers get replaced. Nothing sits in the account untouched." },
              ].map((item, i) => (
                <Reveal key={item.t} delay={i * 80}>
                  <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-8">
                    <h3 className="text-xl font-bold text-white mb-2">{item.t}</h3>
                    <p className="text-white/65 leading-relaxed">{item.c}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="relative bg-surface-alt py-20 md:py-[120px]">
          <div className="mx-auto max-w-[1200px] px-6">
            <Reveal className="max-w-3xl mx-auto text-center">
              <Eyebrow>How it works</Eyebrow>
              <h2 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold tracking-tight leading-[1.05]">
                A process, not a promise
              </h2>
            </Reveal>
            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {steps.map((s, i) => (
                <Reveal key={s.title} delay={i * 70}>
                  <div className="h-full rounded-2xl border border-foreground/10 bg-background p-7">
                    <p className="text-xs font-semibold tracking-[0.22em] uppercase text-teal mb-4">{s.n}</p>
                    <h3 className="text-lg font-bold text-foreground mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.copy}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Why Echo 27 */}
        <section className="relative bg-background py-20 md:py-[120px]">
          <div className="mx-auto max-w-[1200px] px-6">
            <Reveal className="max-w-3xl mx-auto text-center">
              <Eyebrow>Why Echo 27</Eyebrow>
              <h2 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold tracking-tight leading-[1.05]">
                Senior operators, not a hand-off
              </h2>
            </Reveal>
            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {reasons.map((r, i) => (
                <Reveal key={r.label} delay={i * 70}>
                  <div className="card-elev h-full p-8">
                    <p className="text-4xl md:text-5xl font-extrabold text-teal tracking-tight">{r.stat}</p>
                    <p className="mt-3 text-sm font-bold uppercase tracking-[0.12em] text-foreground">{r.label}</p>
                    <p className="mt-3 text-muted-foreground leading-relaxed">{r.copy}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Deliverables */}
        <section className="relative bg-surface-alt py-20 md:py-[120px]">
          <div className="mx-auto max-w-[1100px] px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <Reveal className="lg:col-span-5">
                <Eyebrow>Every month</Eyebrow>
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05]">
                  What lands in your account
                </h2>
                <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
                  A predictable rhythm of work, not a mystery retainer.
                </p>
              </Reveal>
              <Reveal className="lg:col-span-7" delay={100}>
                <ul className="rounded-2xl border border-foreground/10 bg-background divide-y divide-foreground/10">
                  {deliverables.map((d) => (
                    <li key={d} className="flex items-center gap-4 px-7 py-5">
                      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal">
                        <Check className="h-4 w-4" strokeWidth={2.5} />
                      </span>
                      <span className="text-base md:text-lg font-medium text-foreground">{d}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <Testimonials
          header={
            <div className="max-w-2xl mx-auto text-center mb-14">
              <Eyebrow>Client results</Eyebrow>
              <h2 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold text-foreground tracking-tight leading-[1.05]">
                Don't take <span className="text-teal">our word for it</span>
              </h2>
              <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
                Founders and marketing leads we run ads for, in their own words.
              </p>
            </div>
          }
        />

        {/* FAQ */}
        <section className="relative bg-background py-20 md:py-[120px]">
          <div className="mx-auto max-w-[880px] px-6">
            <Reveal className="text-center">
              <Eyebrow>Questions</Eyebrow>
              <h2 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold tracking-tight leading-[1.05]">
                Straight answers
              </h2>
            </Reveal>
            <div className="mt-12 border-t border-foreground/10">
              {faqs.map((f) => (
                <FaqItem key={f.q} q={f.q} a={f.a} />
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section
          className="relative py-24 md:py-[160px] overflow-hidden"
          style={{ backgroundColor: "oklch(0.14 0.02 190)", color: "#ffffff" }}
        >
          <div aria-hidden className="grain-overlay" />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[520px] w-[520px] opacity-25"
            style={{ background: "radial-gradient(circle, var(--teal), transparent 65%)" }}
          />
          <div className="relative mx-auto max-w-[1100px] px-6 text-center flex flex-col items-center">
            <Eyebrow onDark>Ready when you are</Eyebrow>
            <h2 className="text-5xl md:text-6xl lg:text-[76px] font-extrabold leading-[1.02] tracking-tight text-white">
              Hand us the ads.{" "}
              <span className="text-teal">Keep the leads.</span>
            </h2>
            <p className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Book a 30 minute strategy call. We will look at your offer and numbers and
              tell you plainly whether Meta is worth your money right now.
            </p>
            <button
              type="button"
              onClick={openBookingModal}
              className="mt-10 btn-primary text-lg px-8 py-5 w-full sm:w-auto"
            >
              Book a Strategy Call
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
