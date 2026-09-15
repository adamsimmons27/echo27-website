import { useState } from "react";
import { Check, X } from "lucide-react";
import logo from "@/assets/echo27-logo.png";
import { Footer } from "@/components/echo/Footer";

// PLACEHOLDER: swap for your real endpoint. The form POSTs JSON with the field names below.
const FORM_ENDPOINT = "https://example.com/hvac-fit-call";

const problems = [
  {
    title: "Agencies sell leads, not jobs.",
    copy: "A lead is a form fill. A job is a tech in a driveway with a signed ticket. Most agencies get paid on the first one and never look at the second.",
  },
  {
    title: "The leak is after the form fill.",
    copy: "Half the leads you pay for go cold before anyone calls back. Another chunk book and never show. That is not a marketing problem. It is what happens in the ten minutes after the lead.",
  },
  {
    title: "Nobody touches the list you already own.",
    copy: "You have years of past customers in your CRM. Filters due, tune-ups skipped, systems past twelve years old. Nobody is calling them, so they call whoever is running the ad.",
  },
];

const phases = [
  {
    when: "Days 1 to 30",
    title: "Reactivation and follow-up",
    copy: "We pull your customer list, sort it by last service and system age, and run text and email campaigns that book tune-ups and replacements from people who already trust you. At the same time we set up speed to lead, appointment reminders, and no-show recovery on every new lead. Booked calls start in the first month, before we spend a dollar on ads.",
  },
  {
    when: "Days 30 to 90",
    title: "Paid channels on and tuned",
    copy: "Google Search, Local Services Ads, and Meta, aimed at your service area. Every call tracked to a booked job. We cut what does not book and move the money to what does.",
  },
  {
    when: "Day 90 and beyond",
    title: "Maintenance and the off-season",
    copy: "Maintenance agreements offered on every service call and to the whole database. Spring and fall campaigns built around tune-ups, so the calendar holds when the weather is mild.",
  },
];

const deliverables = [
  "Booked calls on your techs' calendars, not a list of phone numbers",
  "A live dashboard of booked calls and the revenue they produced",
  "Reactivation campaigns to the customers you already have",
  "Follow-up automation: speed to lead, reminders, no-show recovery",
  "One HVAC company per metro. We do not work for your competitor.",
];

const goodFit = [
  "Residential HVAC doing $1M to $5M a year",
  "Three to fifteen techs",
  "A CRM with a real customer list in it",
  "You want kept calls, not a lead report",
  "You have room on the calendar to take more work",
];

const badFit = [
  "Under $1M, or one truck",
  "No CRM, or no customer list",
  "Shopping for the cheapest lead source",
  "You want leads handed over and nothing after",
];

const faqs = [
  {
    q: "How long is the contract?",
    a: "There is not one. Month to month. We keep clients by filling the calendar, not by locking them in.",
  },
  {
    q: "What platforms do you run?",
    a: "Google Search, Google Local Services Ads, and Meta. Plus text and email to your own customer list. We pick the mix based on your metro and your season, not on what we like selling.",
  },
  {
    q: "Do you need access to my CRM?",
    a: "Yes. Reactivation and follow-up run through it. We need read and write access to contacts and appointments. We do not touch billing.",
  },
  {
    q: "What happens in the slow season?",
    a: "That is what the maintenance work is for. Spring and fall campaigns to your own base, tune-up offers, and agreement sales on every call. The paid budget flexes down when demand does, so you are not buying expensive clicks in April.",
  },
  {
    q: "How does exclusivity work?",
    a: "One HVAC company per metro. If we are working with you in your market, we turn down your competitors. If your metro is already taken, we will tell you on the call.",
  },
  {
    q: "What does it cost?",
    a: "Covered on the call. It is structured around results, and it depends on your metro and where you are starting from. If the numbers do not make sense for your business, we will say so.",
  },
];

const revenueBands = ["Under $1M", "$1M to $2M", "$2M to $5M", "Over $5M"];

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full border-2 border-foreground bg-surface px-4 py-3 text-[16px] outline-none focus:border-teal";
const label = "block text-[13px] font-bold uppercase tracking-[0.08em]";

function FitCallLink({ className = "" }: { className?: string }) {
  return (
    <a href="#fit-call" className={`btn-primary ${className}`}>
      Book a 20-minute fit call
    </a>
  );
}

function Heading({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div>
      <p className="eyebrow mb-7">{eyebrow}</p>
      <h2 className="max-w-[18ch] text-[36px] md:text-[52px] font-extrabold leading-[0.98] tracking-[-0.04em]">{title}</h2>
      {sub && <p className="mt-6 max-w-[52ch] text-lg text-muted-foreground leading-snug">{sub}</p>}
    </div>
  );
}

export function HvacLanding() {
  const [status, setStatus] = useState<Status>("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "echo-27.com/hvac", submittedAt: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="bg-background text-foreground pb-20 md:pb-0">
      <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-foreground bg-background">
        <div className="mx-auto flex h-[68px] max-w-[1180px] items-center justify-between px-6">
          <a href="/" className="flex items-center">
            <img src={logo} alt="Echo 27" className="h-7 w-auto" />
          </a>
          <div className="hidden md:block">
            <FitCallLink className="text-sm px-4 py-2" />
          </div>
        </div>
      </header>

      <main className="pt-[68px]">
        {/* Hero */}
        <section id="top" className="mx-auto max-w-[1180px] px-6 pt-20 pb-16 md:pt-28 md:pb-24">
          <p className="eyebrow mb-7">Residential HVAC, $1M to $5M</p>
          <h1 className="max-w-[14ch] text-[44px] sm:text-[64px] md:text-[80px] lg:text-[92px] font-extrabold leading-[0.94] tracking-[-0.04em]">
            Booked calls all year, not just when it's 95 out.
          </h1>
          <p className="mt-8 max-w-[52ch] text-lg md:text-2xl text-muted-foreground leading-snug">
            You've paid for leads that never became jobs. We fix what happens after the form fill,
            then fill the shoulder seasons with maintenance agreements. Built for $1M to $5M
            residential HVAC.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <FitCallLink />
            <a href="#how" className="btn-ghost">
              See how it works
            </a>
          </div>
          <p className="mt-4 text-[14px] text-muted-foreground">No pitch. If we are not a fit, we will tell you on the call.</p>
        </section>

        {/* Problem */}
        <section id="problem" className="border-y-2 border-foreground bg-surface-alt py-20 md:py-28">
          <div className="mx-auto max-w-[1180px] px-6">
            <Heading eyebrow="Why the last agency didn't work" title="Leads are not jobs." />
            <div className="slab mt-12 grid grid-cols-1 gap-[2px] bg-foreground md:grid-cols-3">
              {problems.map((p) => (
                <div key={p.title} className="bg-surface p-7 md:p-8">
                  <h3 className="text-[24px] font-extrabold leading-[1.05] tracking-[-0.03em]">{p.title}</h3>
                  <p className="mt-4 text-[15px] md:text-base text-muted-foreground leading-relaxed">{p.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="py-20 md:py-28">
          <div className="mx-auto max-w-[1180px] px-6">
            <Heading
              eyebrow="How it works"
              title="Your own customers first. Ads second. Maintenance all year."
              sub="The order matters. Reactivation pays in the first month, which is what funds the paid channels while they settle in."
            />
            <div className="mt-12 border-t-2 border-foreground">
              {phases.map((p) => (
                <div key={p.when} className="grid grid-cols-1 gap-5 border-b-2 border-foreground py-9 md:grid-cols-[0.6fr_1.4fr] md:gap-12 md:py-11">
                  <div>
                    <p className="text-[14px] font-bold text-teal">{p.when}</p>
                    <h3 className="mt-2 text-[26px] md:text-[32px] font-extrabold leading-[1.05] tracking-[-0.03em]">{p.title}</h3>
                  </div>
                  <p className="text-[15px] md:text-[17px] leading-relaxed">{p.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What you get */}
        <section id="get" className="border-y-2 border-foreground bg-teal-deep py-20 text-white md:py-28">
          <div className="mx-auto max-w-[1180px] px-6">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
              <div>
                <p className="eyebrow-dark mb-7">What you get</p>
                <h2 className="max-w-[12ch] text-[36px] md:text-[52px] font-extrabold leading-[0.98] tracking-[-0.04em]">
                  Calls on the calendar. Numbers you can check.
                </h2>
              </div>
              <ul className="divide-y-2 divide-white/15 border-y-2 border-white/15">
                {deliverables.map((d) => (
                  <li key={d} className="flex gap-4 py-5">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-teal" strokeWidth={3} />
                    <span className="text-[17px] md:text-[19px] font-bold leading-snug tracking-[-0.01em]">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Fit */}
        <section id="fit" className="py-20 md:py-28">
          <div className="mx-auto max-w-[1180px] px-6">
            <Heading eyebrow="Straight talk" title="Who this is for. Who it is not." />
            <div className="slab mt-12 grid grid-cols-1 gap-[2px] bg-foreground md:grid-cols-2">
              <div className="bg-surface p-7 md:p-8">
                <p className="text-[13px] font-bold uppercase tracking-[0.1em] text-teal">This is for you if</p>
                <ul className="mt-5 space-y-4">
                  {goodFit.map((t) => (
                    <li key={t} className="flex gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-teal" strokeWidth={3} />
                      <span className="text-[16px] leading-snug">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-surface p-7 md:p-8">
                <p className="text-[13px] font-bold uppercase tracking-[0.1em] text-pink">This is not for you if</p>
                <ul className="mt-5 space-y-4">
                  {badFit.map((t) => (
                    <li key={t} className="flex gap-3">
                      <X className="mt-0.5 h-5 w-5 shrink-0 text-pink" strokeWidth={3} />
                      <span className="text-[16px] leading-snug">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Proof: clearly marked placeholders, no invented numbers */}
        <section id="proof" className="border-y-2 border-foreground bg-sky py-20 md:py-28">
          <div className="mx-auto max-w-[1180px] px-6">
            <Heading eyebrow="Results" title="What it looked like for companies like yours." />
            <div className="mt-12 grid grid-cols-2 gap-[2px] border-2 border-dashed border-foreground/40 bg-foreground/10 sm:grid-cols-4">
              {["Booked calls", "Kept rate", "Agreements sold", "Attributed revenue"].map((m) => (
                <div key={m} className="bg-surface px-5 py-6">
                  <p className="text-[30px] font-extrabold leading-none tracking-[-0.03em] text-muted-foreground/40">[stat]</p>
                  <p className="mt-2 text-[13px] text-muted-foreground leading-snug">{m}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              {["Case study placeholder", "Case study placeholder"].map((c, i) => (
                <article key={i} className="border-2 border-dashed border-foreground/40 bg-surface p-7 md:p-8">
                  <p className="inline-block border-2 border-foreground/40 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Placeholder</p>
                  <h3 className="mt-4 text-[22px] font-extrabold leading-[1.05] tracking-[-0.03em] text-muted-foreground/60">[Company, metro]</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground/70">
                    [Starting point: techs, revenue, what was broken.] [What we did in the first 30, 60, 90 days.] [Result: booked calls, kept rate, agreements, revenue.]
                  </p>
                </article>
              ))}
            </div>
            <p className="mt-5 text-[13px] text-muted-foreground">Placeholder content. Real case studies and figures go here before launch.</p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 md:py-28">
          <div className="mx-auto max-w-[1180px] px-6">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
              <Heading eyebrow="Questions" title="What owners ask first." />
              <div className="slab divide-y-2 divide-foreground bg-surface">
                {faqs.map((f) => (
                  <details key={f.q} className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-[17px] font-bold leading-snug tracking-[-0.01em] hover:bg-surface-alt md:px-7 [&::-webkit-details-marker]:hidden">
                      {f.q}
                      <span className="text-[22px] font-bold leading-none transition-transform group-open:rotate-45" aria-hidden>+</span>
                    </summary>
                    <p className="px-6 pb-6 text-[15px] md:text-base text-muted-foreground leading-relaxed md:px-7">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA with the fit-call form */}
        <section id="fit-call" className="border-t-2 border-foreground bg-teal-deep py-20 text-white md:py-28">
          <div className="mx-auto max-w-[1180px] px-6">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
              <div>
                <p className="eyebrow-dark mb-7">Book a fit call</p>
                <h2 className="max-w-[13ch] text-[40px] md:text-[60px] lg:text-[72px] font-extrabold leading-[0.94] tracking-[-0.04em]">
                  Twenty minutes. <span className="text-teal">Then you'll know.</span>
                </h2>
                <p className="mt-6 max-w-[42ch] text-lg text-white/70 leading-snug">
                  We look at your metro, your list, and your calendar. You leave with a straight
                  answer on whether this works for your business, and what it would take.
                </p>
              </div>

              <div className="slab border-white/20 bg-surface text-foreground">
                {status === "sent" ? (
                  <div className="p-7 md:p-9" role="status" aria-live="polite">
                    <p className="text-[26px] font-extrabold leading-tight tracking-[-0.02em]">Got it. We'll be in touch within one business day.</p>
                    <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed">
                      We'll set up the call, and if your metro is already taken, we'll tell you that up front.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={submit} className="space-y-5 p-7 md:p-9" aria-label="Fit call request">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="hvac-name" className={label}>Name</label>
                        <input id="hvac-name" name="name" required autoComplete="name" className={`${field} mt-2`} />
                      </div>
                      <div>
                        <label htmlFor="hvac-company" className={label}>Company</label>
                        <input id="hvac-company" name="company" required autoComplete="organization" className={`${field} mt-2`} />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="hvac-city" className={label}>City and state</label>
                      <input id="hvac-city" name="city_state" required placeholder="Columbus, OH" className={`${field} mt-2`} />
                    </div>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="hvac-revenue" className={label}>Annual revenue</label>
                        <select id="hvac-revenue" name="annual_revenue" required defaultValue="" className={`${field} mt-2`}>
                          <option value="" disabled>Select a range</option>
                          {revenueBands.map((b) => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="hvac-techs" className={label}>Number of techs</label>
                        <input id="hvac-techs" name="techs" type="number" inputMode="numeric" min={1} required className={`${field} mt-2`} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="hvac-phone" className={label}>Phone</label>
                        <input id="hvac-phone" name="phone" type="tel" required autoComplete="tel" className={`${field} mt-2`} />
                      </div>
                      <div>
                        <label htmlFor="hvac-email" className={label}>Email</label>
                        <input id="hvac-email" name="email" type="email" required autoComplete="email" className={`${field} mt-2`} />
                      </div>
                    </div>

                    {status === "error" && (
                      <p className="border-l-2 border-pink pl-4 text-[14px] font-medium" role="alert">
                        That didn't send. Give it another try in a moment.
                      </p>
                    )}

                    <button type="submit" disabled={status === "sending"} className="btn-primary w-full text-[16px] disabled:opacity-60">
                      {status === "sending" ? "Sending" : "Book a 20-minute fit call"}
                    </button>
                    <p className="text-[13px] text-muted-foreground">No pitch. One HVAC company per metro.</p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <div className="fixed inset-x-0 bottom-0 z-50 border-t-2 border-foreground bg-background p-3 md:hidden">
        <FitCallLink className="w-full" />
      </div>
    </div>
  );
}
