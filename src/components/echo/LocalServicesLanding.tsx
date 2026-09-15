import { ArrowRight, Plus } from "lucide-react";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/echo27-logo.png";
import adam from "@/assets/adam.jpg";
import justinImg from "@/assets/justin.jpg";
import { openBookingModal } from "@/components/echo/BookingModal";
import { VideoTestimonials, WrittenQuotes, videoBy, writtenBy } from "@/components/echo/Testimonials";
import { TOOLS } from "@/components/echo/calc/CalcKit";
import { Footer } from "@/components/echo/Footer";

const services = [
  {
    title: "Paid ads",
    copy: "Google and Meta campaigns aimed at people in your area who are looking for what you do right now. We write the ads, run the targeting, track every lead back to a paying customer, and cut what doesn't pay.",
  },
  {
    title: "Website, SEO and AEO",
    copy: "A fast site with the phone number and the booking button where a thumb lands, built to rank in Google, own the map pack, and get cited when someone asks an AI who to go to.",
  },
  {
    title: "Follow-up",
    copy: "Automated texts and emails that answer an enquiry in minutes, chase the ones that went quiet, bring past customers back, and ask for the review at the right moment. Nothing falls through.",
  },
];

const audiences = [
  {
    title: "Clinics and practices",
    copy: "Physio, dental, chiro, massage, med spa, optometry. Filling the book with new patients and keeping them coming back.",
  },
  {
    title: "Gyms and studios",
    copy: "Fitness, martial arts, yoga, music, dance. Trial offers that turn first-timers into members on a recurring plan.",
  },
  {
    title: "Professional services",
    copy: "Law, accounting, insurance, real estate, financial advice. Enquiries from people who are ready to talk, not tyre-kickers.",
  },
  {
    title: "Retail and hospitality",
    copy: "Showrooms, specialty retail, restaurants, salons. Foot traffic and bookings from people nearby who didn't know you existed.",
  },
  {
    title: "Home services and trades",
    copy: "HVAC, plumbing, electrical, landscaping, cleaning. Calls from your service area, tracked to the customer, planned around the season.",
  },
];

const faqs = [
  {
    q: "How quickly will I see results?",
    a: "Paid ads usually start producing enquiries within the first week of launch. SEO takes longer, typically a few months before it moves. On the first call we'll tell you which one your situation needs first and what to expect from each.",
  },
  {
    q: "Do I need a big ad budget to get started?",
    a: "It depends on your area and how competitive your category is. We'll tell you the realistic floor on the first call, and we'll tell you honestly if it isn't worth running ads yet.",
  },
  {
    q: "Is there a long-term contract?",
    a: "No long lock-in. We earn next month by performing this month, and we keep clients because the calendar fills, not because they're stuck.",
  },
  {
    q: "Do I have to manage any of this?",
    a: "No. It's done for you. No projects to run, no software to learn. If you can answer the phone, you can work with us.",
  },
  {
    q: "What if it doesn't work?",
    a: "We're upfront on the first call about whether we can help. If a campaign isn't tracking to the numbers we set together, we say so and change it. You'll always know what a new customer is costing you.",
  },
];

const toolCta: Record<string, string> = {
  "/cac-calculator": "Run the numbers",
  "/growth-calculator": "Project my growth",
  "/growth-ceiling": "Find my ceiling",
};

function Apply({ className = "" }: { className?: string }) {
  return (
    <button type="button" onClick={openBookingModal} className={`btn-primary ${className}`}>
      Apply to partner with us
    </button>
  );
}

function Heading({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div>
      <p className="eyebrow mb-7">{eyebrow}</p>
      <h2 className="max-w-[18ch] text-[38px] md:text-[52px] font-extrabold leading-[0.98] tracking-[-0.04em]">
        {title}
      </h2>
      {sub && <p className="mt-6 max-w-[52ch] text-lg text-muted-foreground leading-snug">{sub}</p>}
    </div>
  );
}

export function LocalServicesLanding() {
  return (
    <div className="bg-background text-foreground pb-20 md:pb-0">
      {/* Minimal header: this page is a destination for ads, so there's nowhere to wander off to. */}
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
        {/* Hero with a proof card beside it */}
        <section id="top" className="mx-auto max-w-[1180px] px-6 pt-20 pb-16 md:pt-28 md:pb-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
            <div>
              <p className="eyebrow mb-7">For local business owners</p>
              <h1 className="max-w-[12ch] text-[48px] sm:text-[64px] md:text-[80px] lg:text-[88px] font-extrabold leading-[0.94] tracking-[-0.04em]">
                Do you want more customers?
              </h1>
              <p className="mt-8 max-w-[46ch] text-lg md:text-xl text-muted-foreground leading-snug">
                We help local businesses fill their calendars through paid ads, a website built to
                rank and convert, and automated follow-up, so you can get back to running the
                business.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Apply />
                <a href="#services" className="btn-ghost">
                  See how it works
                </a>
              </div>
              <p className="mt-4 text-[14px] text-muted-foreground">
                No pitch. We'll tell you if we're not a fit.
              </p>
            </div>

            <figure className="slab bg-surface p-7 md:p-8">
              <blockquote className="text-[18px] md:text-[20px] font-bold leading-snug tracking-[-0.01em]">
                “Thanks to Echo 27's Google ads management service, my business has seen continuous
                success year over year. He is very easy to work with and I would not hesitate to
                recommend him to others looking to grow their business.”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <img src={justinImg} alt="Justin Lui" className="h-11 w-11 border-2 border-foreground object-cover" />
                <div>
                  <p className="font-bold leading-tight">Justin Lui</p>
                  <p className="text-[13px] text-muted-foreground leading-tight">Founder, The Physio Loft</p>
                </div>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="border-y-2 border-foreground bg-surface-alt py-20 md:py-28">
          <div className="mx-auto max-w-[1180px] px-6">
            <Heading
              eyebrow="What we do"
              title="We get you more customers so you can grow your revenue."
              sub="Three things, done for you, working as one system. One person accountable for the number."
            />
            <div className="slab mt-12 grid grid-cols-1 gap-[2px] bg-foreground md:grid-cols-3">
              {services.map((s) => (
                <div key={s.title} className="card-flip bg-surface p-7 md:p-8">
                  <h3 className="text-[24px] font-extrabold leading-[1.05] tracking-[-0.03em]">{s.title}</h3>
                  <p className="mt-4 text-[15px] text-muted-foreground leading-relaxed">{s.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Results: the local clients, on camera and in writing */}
        <section id="testimonials" className="py-20 md:py-28">
          <div className="mx-auto max-w-[1180px] px-6">
            <Heading
              eyebrow="Results"
              title="Businesses that worked with us, and grew."
              sub="Real owners, in their own words. No stock photos, no invented numbers."
            />
            <VideoTestimonials items={[videoBy("Marc Steiniger"), videoBy("Thibaut Bannelier")]} className="mt-14 md:mt-16" />
            <div className="mt-6">
              <WrittenQuotes items={[writtenBy("Justin Lui"), writtenBy("Lou Jimenez")]} columns={2} />
            </div>
          </div>
        </section>

        {/* Founder */}
        <section id="founder" className="border-y-2 border-foreground bg-butter py-20 md:py-28">
          <div className="mx-auto max-w-[1180px] px-6">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-16">
              <div className="slab overflow-hidden bg-surface">
                <img src={adam} alt="Adam, founder of Echo 27" loading="lazy" className="aspect-[4/5] w-full object-cover" />
              </div>
              <div>
                <p className="eyebrow mb-7">Meet Adam</p>
                <h2 className="text-[38px] md:text-[52px] font-extrabold leading-[0.98] tracking-[-0.04em]">
                  Why listen to us?
                </h2>
                <p className="mt-6 max-w-[52ch] text-lg leading-snug">
                  Echo 27 is led by Adam, who has spent more than twelve years running performance
                  marketing across 23+ industries and tens of millions in ad spend on Meta, Google,
                  YouTube, and TikTok.
                </p>
                <p className="mt-4 max-w-[52ch] text-lg text-muted-foreground leading-snug">
                  You work with him directly. No account manager layer, no hand-off to a junior
                  after the sale. Campaigns get reviewed weekly against real budgets and real
                  customers. This isn't theory. It's based on real accounts, real ad spend, and
                  real outcomes.
                </p>
                <p className="mt-4 text-[14px] text-muted-foreground">Based in Toronto, working across North America.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Audience */}
        <section id="audience" className="py-20 md:py-28">
          <div className="mx-auto max-w-[1180px] px-6">
            <Heading
              eyebrow="Who it's for"
              title="Built for businesses like yours."
              sub="We work with local businesses that win customers one at a time. If people search for you, call you, and book you, we know the maths."
            />
            <div className="slab mt-12 grid grid-cols-1 gap-[2px] bg-foreground sm:grid-cols-2 lg:grid-cols-6">
              {audiences.map((a, i) => (
                <div
                  key={a.title}
                  className={`card-flip bg-surface p-6 md:p-7 ${i < 3 ? "lg:col-span-2" : "lg:col-span-3"} ${i === 4 ? "sm:col-span-2 lg:col-span-3" : ""}`}
                >
                  <h3 className="text-[22px] font-extrabold leading-[1.05] tracking-[-0.03em]">{a.title}</h3>
                  <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed">{a.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The truth */}
        <section id="truth" className="border-y-2 border-foreground bg-teal-deep py-20 text-white md:py-28">
          <div className="mx-auto max-w-[1180px] px-6">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
              <div>
                <p className="eyebrow-dark mb-7">Real talk</p>
                <h2 className="max-w-[14ch] text-[38px] md:text-[52px] lg:text-[64px] font-extrabold leading-[0.96] tracking-[-0.04em]">
                  Here's what most agencies won't tell you.
                </h2>
              </div>
              <div>
                <p className="text-lg md:text-xl leading-snug text-white/85">
                  Ads alone don't fill a calendar. You can run the best campaign in the world, but
                  if the site doesn't convert and nobody follows up in the first five minutes, most
                  of those leads go cold and you paid for every one of them.
                </p>
                <p className="mt-6 text-lg md:text-xl font-bold leading-snug">That's why we run the full system.</p>
                <div className="mt-6 grid grid-cols-1 gap-[2px] border-2 border-white/20 bg-white/20 sm:grid-cols-3">
                  {[
                    ["Ads", "to attract"],
                    ["A site", "to convert"],
                    ["Follow-up", "to close"],
                  ].map(([a, b]) => (
                    <div key={a} className="bg-teal p-5">
                      <p className="text-[22px] font-extrabold tracking-[-0.02em] text-teal">{a}</p>
                      <p className="text-[15px] text-white/70">{b}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Free tools */}
        <section id="tools" className="py-20 md:py-28">
          <div className="mx-auto max-w-[1180px] px-6">
            <Heading
              eyebrow="Free resources"
              title="Diagnose your business in minutes."
              sub="The same models we use on client accounts. No sign-up, no email gate. If a number surprises you, that's the conversation to have."
            />
            <div className="slab mt-12 grid grid-cols-1 gap-[2px] bg-foreground md:grid-cols-3">
              {TOOLS.map((t) => (
                <div key={t.to} className="card-flip relative flex flex-col bg-surface p-7 md:p-8">
                  <p className="text-[22px] font-extrabold tracking-[-0.02em]">{t.name}</p>
                  <p className="mt-3 flex-1 text-[15px] text-muted-foreground leading-relaxed">{t.blurb}</p>
                  <Link to={t.to} className="btn-primary mt-7 w-full after:absolute after:inset-0 after:content-['']">
                    {toolCta[t.to]}
                    <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t-2 border-foreground bg-surface-alt py-20 md:py-28">
          <div className="mx-auto max-w-[1180px] px-6">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
              <Heading eyebrow="Questions" title="Common questions." sub="The things owners ask on a first call, answered before you book one." />
              <div className="slab divide-y-2 divide-foreground bg-surface">
                {faqs.map((f) => (
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

        {/* Final CTA */}
        <section id="apply" className="border-y-2 border-foreground bg-yellow py-20 text-foreground md:py-28">
          <div className="mx-auto max-w-[1180px] px-6">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-20">
              <div>
                <p className="eyebrow mb-7">Let's do this</p>
                <h2 className="max-w-[14ch] text-[44px] md:text-[68px] lg:text-[80px] font-extrabold leading-[0.94] tracking-[-0.04em]">
                  Your business deserves a full calendar. <span className="text-teal-deep">Let's build one.</span>
                </h2>
              </div>
              <div>
                <p className="max-w-[40ch] text-lg text-foreground/75 leading-snug">
                  Apply and we'll look at your market, your numbers, and your goals. Then we'll map
                  out a plan to fill the calendar, and tell you straight if we're not the right fit.
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

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t-2 border-foreground bg-background p-3 md:hidden">
        <Apply className="w-full" />
      </div>
    </div>
  );
}
