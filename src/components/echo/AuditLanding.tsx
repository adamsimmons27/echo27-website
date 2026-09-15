import { useState } from "react";
import { Check, Play, Plus } from "lucide-react";
import logo from "@/assets/echo27-logo.png";
import adam from "@/assets/adam.jpg";
import { Testimonials } from "@/components/echo/Testimonials";
import { stats } from "@/components/echo/Results";
import { Footer } from "@/components/echo/Footer";
import { CountUp } from "@/components/echo/Motion";

// Drop your video in here. An .mp4 path renders a native player; a YouTube, Loom, or Vimeo
// embed URL renders an iframe. Leave src empty and the page shows a clearly marked slot.
const VIDEO = { src: "", poster: "" };

const WEBHOOK_URL = import.meta.env.VITE_GHL_WEBHOOK_URL as string | undefined;

const steps = [
  { title: "You fill in the form.", copy: "Two minutes. Your website, what kind of business, and anything you want looked at." },
  { title: "Adam records your audit.", copy: "Your website, your Google presence, your ads, and your follow-up. For your business, not a template." },
  { title: "The video lands in your inbox.", copy: "Watch it when you have ten minutes. Reply with questions if you have them. No call to sit through." },
];

const youGet = [
  {
    title: "Website teardown",
    copy: "Where your site loses the customer. Speed on a phone, whether the number and the booking button are where a thumb lands, and what a visitor sees in the first five seconds.",
  },
  {
    title: "Search and AI check",
    copy: "How you show up in Google and the map pack against the three companies above you, and what an AI answers when someone asks it who to call in your area.",
  },
  {
    title: "Follow-up gaps",
    copy: "What happens in the ten minutes after a lead comes in. Response speed, reminders, no-shows, and whether anyone is asking for the review.",
  },
  {
    title: "What to fix first",
    copy: "One thing, in order. Not a 40-page report. The single change that wins the most customers for the least effort, and what we'd do second.",
  },
];

const services = [
  {
    title: "Paid ads",
    copy: "Google and Meta campaigns aimed at people who need you this week, inside your service area, with every lead tracked to a paying customer.",
  },
  {
    title: "Website, SEO and AEO",
    copy: "A fast site built to convert, to rank in Google and the map pack, and to get cited when someone asks an AI who to call.",
  },
  {
    title: "Follow-up",
    copy: "Automated texts and emails that answer the lead in minutes, chase open quotes, bring past customers back, and ask for the review.",
  },
];

const faqs = [
  {
    q: "Is it actually free?",
    a: "Yes. No card, no trial, no catch. You send your details, you get a video. You keep the findings whether we ever speak or not.",
  },
  {
    q: "Do I have to get on a call?",
    a: "No. That is the point. Adam records the audit as a video you can watch when you have ten minutes, and you can reply with questions if you have them.",
  },
  {
    q: "What do you need from me?",
    a: "Your website address and an email to send the video to. If you want Adam to look at something specific, there is a box for it. That is all.",
  },
  {
    q: "Who actually does the audit?",
    a: "Adam does. Not a junior, not a template. He records it for your business, looking at your site, your search results, your ads, and your follow-up.",
  },
  {
    q: "What happens after I watch it?",
    a: "Whatever you want. Fix the things yourself, hand the video to whoever runs your marketing, or apply to work with us. If we think we can help, the video says so and the decision is yours.",
  },
  {
    q: "Why do this for free?",
    a: "Because it is the fastest way for both of us to find out if we are a fit. Some of the businesses we audit become clients. Most get a useful video and go fix a few things. Either way is fine with us.",
  },
];

type Status = "idle" | "sending" | "sent" | "error";

const field = "w-full border-2 border-foreground bg-surface px-4 py-3 text-[16px] outline-none focus:border-teal";
const label = "block text-[13px] font-bold uppercase tracking-[0.08em]";

function AuditForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [sentTo, setSentTo] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    if (!WEBHOOK_URL) {
      setStatus("error");
      setError("The form isn't connected yet. Set VITE_GHL_WEBHOOK_URL and redeploy.");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, form: "free-audit", source: "echo-27.com/free-audit", submittedAt: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setSentTo(String(data.email));
      setStatus("sent");
    } catch {
      setStatus("error");
      setError("That didn't send. Give it another try in a moment.");
    }
  }

  if (status === "sent") {
    return (
      <div className="slab bg-surface p-7 md:p-9" role="status" aria-live="polite">
        <p className="text-[26px] font-extrabold leading-tight tracking-[-0.02em]">Got it. Your video is on its way.</p>
        <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed">
          Adam will record your audit and send it to {sentTo}. Watch it when you have ten minutes,
          and reply to that email with any questions.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="slab space-y-5 bg-surface p-7 md:p-9" aria-label="Free audit request">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="audit-name" className={label}>Name</label>
          <input id="audit-name" name="name" required autoComplete="name" className={`${field} mt-2`} />
        </div>
        <div>
          <label htmlFor="audit-email" className={label}>Email</label>
          <input id="audit-email" name="email" type="email" required autoComplete="email" placeholder="Where we send the video" className={`${field} mt-2`} />
        </div>
      </div>
      <div>
        <label htmlFor="audit-website" className={label}>Your website</label>
        <input id="audit-website" name="website" required placeholder="yourcompany.com" autoComplete="url" className={`${field} mt-2`} />
      </div>
      <div>
        <label htmlFor="audit-trade" className={label}>What kind of business</label>
        <input id="audit-trade" name="business_type" placeholder="Plumbing in Hamilton, physio clinic, roofing" className={`${field} mt-2`} />
      </div>
      <div>
        <label htmlFor="audit-notes" className={label}>Anything you want Adam to look at</label>
        <textarea id="audit-notes" name="notes" rows={3} placeholder="Optional. A campaign that isn't working, a competitor who keeps beating you, anything." className={`${field} mt-2 resize-y`} />
      </div>

      {status === "error" && (
        <p className="border-l-2 border-pink pl-4 text-[14px] font-medium" role="alert">{error}</p>
      )}

      <button type="submit" disabled={status === "sending"} className="btn-primary w-full text-[16px] disabled:opacity-60">
        {status === "sending" ? "Sending" : "Send me my audit video"}
      </button>
      <p className="text-[13px] text-muted-foreground">Free. No call. You keep the findings whether we work together or not.</p>
    </form>
  );
}

function VideoSlot() {
  const isEmbed = /youtube\.com|youtu\.be|loom\.com|vimeo\.com/.test(VIDEO.src);
  return (
    <div className="slab overflow-hidden bg-[#111]">
      <div className="relative aspect-video w-full">
        {VIDEO.src && isEmbed ? (
          <iframe src={VIDEO.src} title="How the free audit works" className="absolute inset-0 h-full w-full" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
        ) : VIDEO.src ? (
          <video src={VIDEO.src} poster={VIDEO.poster || undefined} controls playsInline className="absolute inset-0 h-full w-full" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 border-2 border-dashed border-white/30 p-6 text-center text-white">
            <span className="flex h-16 w-16 items-center justify-center border-2 border-white">
              <Play className="ml-1 h-6 w-6 fill-current" />
            </span>
            <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-white/70">Video goes here</p>
            <p className="max-w-[40ch] text-[14px] text-white/60">Set VIDEO.src in AuditLanding.tsx to an .mp4 path or a YouTube, Loom, or Vimeo embed URL.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Heading({ eyebrow, title, sub, dark = false }: { eyebrow: string; title: string; sub?: string; dark?: boolean }) {
  return (
    <div>
      <p className={`${dark ? "eyebrow-dark" : "eyebrow"} mb-7`}>{eyebrow}</p>
      <h2 className="max-w-[18ch] text-[36px] md:text-[52px] font-extrabold leading-[0.98] tracking-[-0.04em]">{title}</h2>
      {sub && <p className={`mt-6 max-w-[52ch] text-lg leading-snug ${dark ? "text-white/70" : "text-muted-foreground"}`}>{sub}</p>}
    </div>
  );
}

export function AuditLanding() {
  return (
    <div className="bg-background text-foreground pb-20 md:pb-0">
      <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-foreground bg-background">
        <div className="mx-auto flex h-[68px] max-w-[1180px] items-center justify-between px-6">
          <a href="/" className="flex items-center">
            <img src={logo} alt="Echo 27" className="h-7 w-auto" />
          </a>
          <div className="hidden md:block">
            <a href="#audit" className="btn-primary text-sm px-4 py-2">Get my free audit</a>
          </div>
        </div>
      </header>

      <main className="pt-[68px]">
        {/* Hero: short headline, then the video, then one CTA */}
        <section id="top" className="mx-auto max-w-[960px] px-6 pt-16 pb-16 text-center md:pt-24 md:pb-24">
          <p className="mb-6 inline-flex items-center gap-2.5 text-[15px] font-bold uppercase tracking-[0.1em] text-teal md:text-[17px]">
            <span className="h-3 w-3 bg-teal" aria-hidden />
            For local business owners
          </p>
          <h1 className="mx-auto max-w-[16ch] text-balance text-[40px] sm:text-[54px] md:text-[68px] font-extrabold leading-[0.96] tracking-[-0.04em]">
            Find out where your marketing is losing you customers.
          </h1>
          <p className="mx-auto mt-6 max-w-[48ch] text-balance text-lg md:text-xl text-muted-foreground leading-snug">
            A personal video from Adam on your website, your Google presence, your ads, and your
            follow-up. Free. No call. No pitch.
          </p>

          <div className="mt-10">
            <VideoSlot />
          </div>

          <div className="mt-8 flex flex-col items-center gap-3">
            <a href="#audit" className="btn-primary text-[16px] px-8 py-4">Get my free audit</a>
            <p className="text-[14px] text-muted-foreground">Two minutes to fill in. You keep the findings whether we work together or not.</p>
          </div>
        </section>

        {/* Proof bar */}
        <section id="proof" className="border-y-2 border-foreground bg-surface-alt py-10 md:py-12">
          <div className="mx-auto max-w-[1180px] px-6">
            {/* Five tiles: spans chosen so no breakpoint leaves an empty divider-coloured cell. */}
            <div className="slab grid grid-cols-2 gap-[2px] bg-foreground sm:grid-cols-6 lg:grid-cols-5">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`bg-surface px-5 py-5 lg:col-span-1 ${i === 4 ? "col-span-2 sm:col-span-3" : i === 3 ? "sm:col-span-3" : "sm:col-span-2"}`}
                >
                  <p className="text-[28px] md:text-[34px] font-extrabold leading-none tracking-[-0.03em] text-teal"><CountUp value={s.value} /></p>
                  <p className="mt-2 text-[13px] text-muted-foreground leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The form, balanced against how it works */}
        <section id="audit" className="py-20 md:py-28 scroll-mt-20">
          <div className="mx-auto max-w-[1180px] px-6">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
              <div>
                <Heading eyebrow="How it works" title="Two minutes in. A video back." />
                <ul className="mt-10 divide-y-2 divide-foreground border-y-2 border-foreground">
                  {steps.map((s) => (
                    <li key={s.title} className="flex gap-4 py-5">
                      <Check className="mt-1 h-5 w-5 shrink-0 text-teal" strokeWidth={3} />
                      <div>
                        <p className="text-[18px] font-extrabold leading-tight tracking-[-0.01em]">{s.title}</p>
                        <p className="mt-1.5 text-[15px] text-muted-foreground leading-relaxed">{s.copy}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <AuditForm />
            </div>
          </div>
        </section>

        {/* What you'll get */}
        <section id="get" className="border-y-2 border-foreground bg-sky py-20 md:py-28">
          <div className="mx-auto max-w-[1180px] px-6">
            <Heading
              eyebrow="What you'll get"
              title="Ten minutes of video. Four things you can act on the same day."
              sub="Recorded for your business, not a template. Adam looks at what a customer in your area actually sees, then tells you what to do about it."
            />
            <div className="slab mt-12 grid grid-cols-1 gap-[2px] bg-foreground sm:grid-cols-2 lg:grid-cols-4">
              {youGet.map((g) => (
                <div key={g.title} className="bg-surface p-7">
                  <h3 className="text-[22px] font-extrabold leading-[1.05] tracking-[-0.03em]">{g.title}</h3>
                  <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed">{g.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Results: every testimonial from the homepage */}
        <Testimonials
          header={
            <Heading
              eyebrow="Results"
              title="Businesses that worked with us, and grew."
              sub="Real owners, in their own words. This is what happens after the audit, if you decide to go further."
            />
          }
        />

        {/* Not a pitch */}
        <section id="not-a-pitch" className="border-y-2 border-foreground bg-teal-deep py-20 text-white md:py-28">
          <div className="mx-auto max-w-[1180px] px-6">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
              <Heading dark eyebrow="Straight talk" title="The audit is not a sales pitch." />
              <div className="space-y-5 text-lg md:text-xl leading-snug text-white/85">
                <p>You get the video whether or not you ever talk to us. Fix the things yourself, hand it to whoever runs your marketing, or ignore it. It's yours.</p>
                <p>If Adam thinks we can help, the video says so plainly, and the next step is yours to take. If he doesn't, it says that too.</p>
                <p className="font-bold text-white">No call to sit through. No follow-up sequence hounding you. One video, recorded for your business.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services: what working together looks like */}
        <section id="services" className="py-20 md:py-28">
          <div className="mx-auto max-w-[1180px] px-6">
            <Heading
              eyebrow="If you go further"
              title="Three things, done for you, working as one system."
              sub="This is what we'd run if you decided to work with us after the audit. One person accountable for the number."
            />
            <div className="slab mt-12 grid grid-cols-1 gap-[2px] bg-foreground md:grid-cols-3">
              {services.map((s) => (
                <div key={s.title} className="bg-surface p-7 md:p-8">
                  <h3 className="text-[24px] font-extrabold leading-[1.05] tracking-[-0.03em]">{s.title}</h3>
                  <p className="mt-4 text-[15px] text-muted-foreground leading-relaxed">{s.copy}</p>
                </div>
              ))}
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
                <p className="eyebrow mb-7">Who records your audit</p>
                <h2 className="text-[36px] md:text-[52px] font-extrabold leading-[0.98] tracking-[-0.04em]">Why listen to Adam?</h2>
                <p className="mt-6 max-w-[52ch] text-lg leading-snug">
                  Echo 27 is led by Adam, who has spent more than twelve years running performance
                  marketing across 23+ industries and tens of millions in ad spend on Meta, Google,
                  YouTube, and TikTok.
                </p>
                <p className="mt-4 max-w-[52ch] text-lg text-muted-foreground leading-snug">
                  Every audit is his. He looks at your business the way he looks at a client account:
                  real numbers, real search results, real follow-up. This isn't theory. It's based on
                  real accounts, real ad spend, and real outcomes.
                </p>
                <p className="mt-4 text-[14px] text-muted-foreground">Based in Toronto, working across North America.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 md:py-28">
          <div className="mx-auto max-w-[1180px] px-6">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
              <Heading eyebrow="Questions" title="Common questions." sub="The things owners ask before they send the form." />
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

        {/* Final CTA back to the form */}
        <section id="cta" className="border-t-2 border-foreground bg-yellow py-20 text-foreground md:py-28">
          <div className="mx-auto max-w-[1180px] px-6">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-20">
              <div>
                <p className="eyebrow mb-7">Get your audit</p>
                <h2 className="max-w-[14ch] text-[40px] md:text-[60px] lg:text-[72px] font-extrabold leading-[0.94] tracking-[-0.04em]">
                  Find out what's costing you <span className="text-teal-deep">customers.</span>
                </h2>
              </div>
              <div>
                <p className="max-w-[40ch] text-lg text-foreground/75 leading-snug">
                  Two minutes to fill in. Ten minutes to watch. You'll know exactly where you're
                  losing customers and what to fix first.
                </p>
                <div className="mt-8">
                  <a href="#audit" className="btn-primary">Get my free audit</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <div className="fixed inset-x-0 bottom-0 z-50 border-t-2 border-foreground bg-background p-3 md:hidden">
        <a href="#audit" className="btn-primary w-full">Get my free audit</a>
      </div>
    </div>
  );
}
