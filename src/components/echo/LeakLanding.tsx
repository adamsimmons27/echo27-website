import { useState } from "react";
import { ArrowRight, Check, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/echo27-logo.png";
import justinImg from "@/assets/justin.jpg";
import louImg from "@/assets/lou.jpeg";
import { openBookingModal } from "@/components/echo/BookingModal";
import { Field, money0, num1 } from "@/components/echo/calc/CalcKit";
import { Footer } from "@/components/echo/Footer";

const leaks = [
  {
    name: "Speed",
    stat: "The first five minutes",
    looks: "A homeowner fills in your form at 2pm. Nobody calls back until 6. By then they've booked the second company that answered.",
    fix: "Automated follow-up that texts and emails the lead within a minute, chases every open quote, and asks for the review once the job's done. Nothing waits for someone to remember.",
    service: "Follow-up",
  },
  {
    name: "The site",
    stat: "The click you already paid for",
    looks: "They land on your site from a $40 click, can't find a phone number above the fold, and leave. The ad worked. The site didn't.",
    fix: "A fast site with click-to-call and online booking front and centre, built to rank for your service area and to be cited when someone asks an AI who to call.",
    service: "Website, SEO and AEO",
  },
  {
    name: "The ads",
    stat: "Only after the first two are fixed",
    looks: "Spend goes up, the calendar doesn't. More of the same leads, leaking at the same rate, at a higher price.",
    fix: "Google and Meta campaigns aimed at people who need you this week, inside your service area, with every call tracked back to a booked job. Turned up only once the leak is plugged.",
    service: "Paid ads",
  },
];

const wont = [
  "A dashboard you have to interpret",
  "An account manager between you and the work",
  "A twelve-month contract",
  "Reports about impressions and reach",
];

const will = [
  "One number a month: booked jobs, and what each cost",
  "Adam, directly, on every account",
  "Month to month, earned every month",
  "A straight answer if we're not the right fit",
];

const quotes = [
  {
    quote: "Thanks to Echo 27's Google ads management service, my business has seen continuous success year over year. He is very easy to work with and I would not hesitate to recommend him to others looking to grow their business.",
    name: "Justin Lui",
    title: "Founder, The Physio Loft",
    photo: justinImg,
  },
  {
    quote: "Working with Adam and his team has been a game-changer for our company. Their understanding of marketing strategies, coupled with a great attitude and a creative approach, has significantly enhanced our brand presence.",
    name: "Lou Jimenez",
    title: "Founder, Choose Charters",
    photo: louImg,
  },
];

function Apply({ className = "" }: { className?: string }) {
  return (
    <button type="button" onClick={openBookingModal} className={`btn-primary ${className}`}>
      Apply to partner with us
    </button>
  );
}

const n = (v: string) => (v.trim() === "" ? 0 : Number(v) || 0);

export function LeakLanding() {
  const [leads, setLeads] = useState("40");
  const [reached, setReached] = useState("60");
  const [booked, setBooked] = useState("40");
  const [showed, setShowed] = useState("80");
  const [value, setValue] = useState("350");

  const jobsAt = (reachPct: number) =>
    n(leads) * (reachPct / 100) * (n(booked) / 100) * (n(showed) / 100);
  const jobsNow = jobsAt(n(reached));
  const jobsFixed = jobsAt(Math.max(n(reached), 90));
  const leaked = n(leads) - jobsNow;
  const gained = jobsFixed - jobsNow;
  const alreadyFast = n(reached) >= 90;

  return (
    <div className="bg-background text-foreground pb-20 md:pb-0">
      <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-foreground bg-background">
        <div className="mx-auto flex h-[68px] max-w-[1180px] items-center justify-between px-6">
          <a href="/" className="flex items-center">
            <img src={logo} alt="Echo 27" className="h-7 w-auto" />
          </a>
          <div className="hidden md:block">
            <Apply className="text-sm px-4 py-2" />
          </div>
        </div>
      </header>

      <main className="pt-[68px]">
        {/* Hero: one contrarian statement */}
        <section id="top" className="mx-auto max-w-[1180px] px-6 pt-20 pb-16 md:pt-32 md:pb-24">
          <p className="eyebrow mb-7">For local service businesses</p>
          <h1 className="max-w-[13ch] text-[48px] sm:text-[68px] md:text-[88px] lg:text-[104px] font-extrabold leading-[0.92] tracking-[-0.045em]">
            You don't have a leads problem.
          </h1>
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <p className="max-w-[50ch] text-lg md:text-2xl leading-snug">
              You have a leak. Most local businesses we take on already get enough leads to fill
              the calendar. They lose them between the click and the booked job, then buy more to
              replace the ones that leaked.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Apply />
              <a href="#leak" className="btn-ghost">
                Find your leak
              </a>
            </div>
          </div>
        </section>

        {/* The live leak model: the page proves its own claim */}
        <section id="leak" className="border-y-2 border-foreground bg-surface-alt py-20 md:py-28">
          <div className="mx-auto max-w-[1180px] px-6">
            <p className="eyebrow mb-7">Find your leak</p>
            <h2 className="max-w-[18ch] text-[38px] md:text-[52px] font-extrabold leading-[0.98] tracking-[-0.04em]">
              Put your numbers in. Watch where they go.
            </h2>
            <p className="mt-6 max-w-[52ch] text-lg text-muted-foreground leading-snug">
              Pre-filled with a typical month. Replace them with yours. No sign-up, nothing sent
              anywhere.
            </p>

            <div className="slab mt-12 grid grid-cols-1 gap-[2px] bg-foreground lg:grid-cols-[1fr_1.1fr]">
              <div className="space-y-6 bg-surface p-7 md:p-8">
                <Field label="Leads you get in a month" help="Calls, forms, and messages combined." value={leads} onChange={setLeads} step={1} />
                <Field label="How many do you actually get back to?" help="Reached by phone or text, not just voicemail." value={reached} onChange={setReached} suffix="%" max={100} />
                <Field label="Of those, how many book?" value={booked} onChange={setBooked} suffix="%" max={100} />
                <Field label="Of those booked, how many jobs happen?" help="No-shows and cancellations come off here." value={showed} onChange={setShowed} suffix="%" max={100} />
                <Field label="What's an average job worth?" value={value} onChange={setValue} prefix="$" step={1} />
              </div>

              <div className="flex flex-col bg-teal-deep p-7 text-white md:p-8">
                <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-white/70">This month, as it stands</p>
                <div className="mt-6 grid grid-cols-3 gap-[2px] border-2 border-white/20 bg-white/20">
                  {[
                    ["Leads", num1(n(leads))],
                    ["Booked", num1(jobsNow)],
                    ["Leaked", num1(Math.max(leaked, 0))],
                  ].map(([k, v]) => (
                    <div key={k} className="min-w-0 bg-teal-deep p-3 md:p-4">
                      <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/60">{k}</p>
                      <p className="mt-1 text-[22px] font-extrabold leading-none tracking-[-0.03em] tabular-nums sm:text-[28px] md:text-[34px]">{v}</p>
                    </div>
                  ))}
                </div>

                <p className="mt-7 text-[18px] md:text-[21px] font-bold leading-snug tracking-[-0.01em]">
                  You pay for {num1(n(leads))} leads and end up with {num1(jobsNow)} jobs. The other{" "}
                  <span className="text-pink">{num1(Math.max(leaked, 0))}</span> cost you money and
                  gave you nothing back.
                </p>

                <div className="mt-7 border-l-[6px] border-teal pl-5">
                  {alreadyFast ? (
                    <p className="text-[15px] leading-relaxed text-white/85">
                      You're already reaching {num1(n(reached))}% of your leads fast. Your leak
                      isn't speed. It's further down the funnel, in the site or the offer, and
                      that's exactly what a first call would find.
                    </p>
                  ) : (
                    <>
                      <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-teal">Plug the first leak only</p>
                      <p className="mt-2 text-[15px] leading-relaxed text-white/85">
                        Reach 90% of leads instead of {num1(n(reached))}%, with nothing else changed, and
                        you book{" "}
                        <strong className="text-white">{num1(gained)} more jobs a month</strong>
                        {n(value) > 0 && (
                          <>
                            , worth <strong className="text-white">{money0(gained * n(value))}</strong> a
                            month and <strong className="text-white">{money0(gained * n(value) * 12)}</strong>{" "}
                            a year
                          </>
                        )}
                        . Same ad spend. Same leads.
                      </p>
                    </>
                  )}
                </div>

                <Link to="/cac-calculator" className="mt-auto inline-flex items-center gap-2 self-start pt-8 text-[14px] font-bold text-white/70 underline underline-offset-4 hover:text-white">
                  Want the full cost-per-customer model?
                  <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* The three leaks, in the order we fix them */}
        <section id="leaks" className="py-20 md:py-28">
          <div className="mx-auto max-w-[1180px] px-6">
            <p className="eyebrow mb-7">The three leaks</p>
            <h2 className="max-w-[16ch] text-[38px] md:text-[52px] font-extrabold leading-[0.98] tracking-[-0.04em]">
              We plug them in this order. Ads come last.
            </h2>
            <p className="mt-6 max-w-[52ch] text-lg text-muted-foreground leading-snug">
              Every other agency starts with the ads because that's where the retainer is. Turning
              up spend on a leaking funnel just leaks faster.
            </p>

            <div className="mt-12 border-t-2 border-foreground">
              {leaks.map((l) => (
                <div key={l.name} className="grid grid-cols-1 gap-6 border-b-2 border-foreground py-9 md:grid-cols-[0.7fr_1fr_1fr] md:gap-12 md:py-11">
                  <div>
                    <h3 className="text-[28px] md:text-[34px] font-extrabold leading-none tracking-[-0.03em]">{l.name}</h3>
                    <p className="mt-3 text-[14px] font-bold text-teal">{l.stat}</p>
                  </div>
                  <div>
                    <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-muted-foreground">What it looks like</p>
                    <p className="mt-3 text-[15px] md:text-base leading-relaxed">{l.looks}</p>
                  </div>
                  <div>
                    <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-muted-foreground">What we do about it</p>
                    <p className="mt-3 text-[15px] md:text-base leading-relaxed">{l.fix}</p>
                    <p className="mt-3 inline-block border-2 border-foreground px-2.5 py-1 text-[12px] font-bold uppercase tracking-[0.08em]">{l.service}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What you won't get / will get */}
        <section id="deal" className="border-y-2 border-foreground bg-butter py-20 md:py-28">
          <div className="mx-auto max-w-[1180px] px-6">
            <p className="eyebrow mb-7">The deal</p>
            <h2 className="max-w-[16ch] text-[38px] md:text-[52px] font-extrabold leading-[0.98] tracking-[-0.04em]">
              Not an agency. The person accountable for your calendar.
            </h2>
            <div className="slab mt-12 grid grid-cols-1 gap-[2px] bg-foreground md:grid-cols-2">
              <div className="bg-surface p-7 md:p-8">
                <p className="text-[13px] font-bold uppercase tracking-[0.1em] text-pink">What you won't get</p>
                <ul className="mt-5 space-y-4">
                  {wont.map((t) => (
                    <li key={t} className="flex gap-3">
                      <X className="mt-0.5 h-5 w-5 shrink-0 text-pink" strokeWidth={3} />
                      <span className="text-[16px] leading-snug">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-surface p-7 md:p-8">
                <p className="text-[13px] font-bold uppercase tracking-[0.1em] text-teal">What you will</p>
                <ul className="mt-5 space-y-4">
                  {will.map((t) => (
                    <li key={t} className="flex gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-teal" strokeWidth={3} />
                      <span className="text-[16px] leading-snug">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Proof, compact */}
        <section id="proof" className="py-20 md:py-28">
          <div className="mx-auto max-w-[1180px] px-6">
            <p className="eyebrow mb-7">In their words</p>
            <div className="slab grid grid-cols-1 gap-[2px] bg-foreground md:grid-cols-2">
              {quotes.map((q) => (
                <figure key={q.name} className="flex flex-col bg-surface p-7 md:p-8">
                  <blockquote className="flex-1 text-[19px] md:text-[22px] font-bold leading-snug tracking-[-0.01em]">“{q.quote}”</blockquote>
                  <figcaption className="mt-7 flex items-center gap-3">
                    <img src={q.photo} alt={q.name} className="h-11 w-11 border-2 border-foreground object-cover" />
                    <div>
                      <p className="font-bold leading-tight">{q.name}</p>
                      <p className="text-[13px] text-muted-foreground leading-tight">{q.title}</p>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section id="apply" className="border-y-2 border-foreground bg-yellow py-20 text-foreground md:py-28">
          <div className="mx-auto max-w-[1180px] px-6">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-20">
              <div>
                <p className="eyebrow mb-7">Stop replacing. Start keeping.</p>
                <h2 className="max-w-[13ch] text-[44px] md:text-[68px] lg:text-[80px] font-extrabold leading-[0.94] tracking-[-0.04em]">
                  Plug the leak before you buy <span className="text-teal-deep">another lead.</span>
                </h2>
              </div>
              <div>
                <p className="max-w-[40ch] text-lg text-foreground/75 leading-snug">
                  Apply with your numbers. On the first call we'll find where your leads are going,
                  what it's costing you, and whether we're the right people to fix it. If we're
                  not, we'll say so.
                </p>
                <div className="mt-8">
                  <button type="button" onClick={openBookingModal} className="btn-primary">
                    Apply to partner with us
                  </button>
                </div>
                <p className="mt-4 text-[14px] text-foreground/60">No pitch. Takes about two minutes.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <div className="fixed inset-x-0 bottom-0 z-50 border-t-2 border-foreground bg-background p-3 md:hidden">
        <Apply className="w-full" />
      </div>
    </div>
  );
}
