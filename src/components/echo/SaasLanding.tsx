import { useState } from "react";
import { openBookingModal } from "./BookingModal";
import adamImg from "@/assets/adam.jpg";
import justinImg from "@/assets/justin.jpg";
import tobiasImg from "@/assets/tobias.jpeg";
import louImg from "@/assets/lou.jpeg";
import logo from "@/assets/echo27-logo.png";
import {
  ArrowRight,
  Check,
  Play,
  Quote,
  X,
  Linkedin,
  TrendingDown,
  LineChart,
  Target,
  Sparkles,
  Wrench,
  Compass,
  Plus,
  Minus,
} from "lucide-react";

/**
 * Echo 27 SaaS Paid-Acquisition Landing Page (/saas)
 * Dark premium aesthetic — scoped so it doesn't affect the rest of the site.
 */

const ACCENT = "#1F8F85"; // Echo 27 brand teal
const BG = "#0B0B0F";
const SURFACE = "#121218";
const BORDER = "rgba(255,255,255,0.08)";
const MUTED = "rgba(255,255,255,0.65)";

function CTA({ children = "Book a Growth Call", size = "md" as "md" | "lg" }) {
  return (
    <button
      type="button"
      onClick={openBookingModal}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold text-[#0B0B0F] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-8px_rgba(31,143,133,0.55)] ${
        size === "lg" ? "px-8 py-4 text-base" : "px-6 py-3 text-sm"
      }`}
      style={{ backgroundColor: ACCENT }}
    >
      {children} <ArrowRight className="h-4 w-4" />
    </button>
  );
}

function Section({
  id,
  children,
  className = "",
  bg,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  bg?: string;
}) {
  return (
    <section id={id} className={`py-20 md:py-28 ${className}`} style={bg ? { backgroundColor: bg } : undefined}>
      <div className="mx-auto max-w-[1200px] px-6">{children}</div>
    </section>
  );
}

const problems = [
  "Your CAC keeps climbing and payback keeps stretching.",
  "Agencies report on clicks and impressions, not trials and MRR.",
  "You're guessing which channel actually drives pipeline.",
  "You don't have time to babysit ad accounts.",
];

const pillars = [
  {
    icon: Target,
    title: "Paid Acquisition (Meta + Google)",
    body: "Full-funnel campaigns built around trials, demos, and MRR — not vanity metrics.",
  },
  {
    icon: Sparkles,
    title: "Creative That Converts",
    body: "Founder-led and direct-response ad creative, tested at volume until winners compound.",
  },
  {
    icon: LineChart,
    title: "Tracking & Attribution",
    body: "Clean conversion tracking so you finally know what actually drives pipeline.",
  },
  {
    icon: Compass,
    title: "Growth Strategy",
    body: "Channel strategy and funnel guidance informed by SaaS Academy coaching.",
  },
];

const steps = [
  { title: "Growth Call", body: "We audit your funnel, spend, and goals — straight talk, no pitch deck." },
  { title: "Build", body: "We build the acquisition engine: creative, campaigns, and tracking." },
  { title: "Scale", body: "We optimize toward CAC and MRR targets, reporting only on what matters." },
];

const faqs = [
  {
    q: "We've tried agencies before and got burned. How is this different?",
    a: "Most agencies are generalists optimizing for clicks. Echo 27 is run by a SaaS Academy coach who advises SaaS founders on growth. We're tied to CAC, payback, and MRR — and we'll tell you on the first call if we can't move those numbers.",
  },
  {
    q: "What ad budget do I need to work with you?",
    a: "Our best-fit clients are spending or ready to spend at least $10K/month on paid. Below that, we'll usually point you toward what to fix in-house first.",
  },
  {
    q: "How fast will we see results?",
    a: "Tracking and creative fixes typically show signal in 2–3 weeks. Meaningful CAC and trial-volume movement usually lands inside 60–90 days, depending on your funnel and offer.",
  },
  {
    q: "Do you work month to month or lock me into a contract?",
    a: "We start with a 90-day engagement so we have time to build, learn, and optimize. After that it's month-to-month. No multi-year handcuffs.",
  },
  {
    q: "What if it doesn't work?",
    a: "We're upfront on the Growth Call about whether we can help. If a campaign isn't tracking to the targets we set together, we say so, fix it, or refund the build — your numbers, not ours.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: BORDER }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="text-lg font-semibold text-white">{q}</span>
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: open ? ACCENT : "rgba(255,255,255,0.06)" }}
        >
          {open ? <Minus className="h-4 w-4 text-[#0B0B0F]" /> : <Plus className="h-4 w-4 text-white" />}
        </span>
      </button>
      {open && <p className="pb-6 pr-12 text-[15px] leading-relaxed" style={{ color: MUTED }}>{a}</p>}
    </div>
  );
}

export function SaasLanding() {
  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: BG, fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}>
      {/* Minimal header — logo only, no nav escape */}
      <header className="border-b" style={{ borderColor: BORDER }}>
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-5">
          <a href="/" className="flex items-center gap-2">
            <img src={logo} alt="Echo 27" className="h-8 w-auto brightness-0 invert" />
          </a>
          <button
            type="button"
            onClick={openBookingModal}
            className="hidden sm:inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-[#0B0B0F]"
            style={{ backgroundColor: ACCENT }}
          >
            Book a Growth Call <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(800px 400px at 80% 0%, rgba(31,143,133,0.18), transparent 60%), radial-gradient(600px 300px at 10% 100%, rgba(31,143,133,0.10), transparent 60%)",
          }}
        />
        <div className="relative mx-auto grid max-w-[1200px] gap-12 px-6 py-20 md:py-28 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider"
              style={{ backgroundColor: "rgba(31,143,133,0.12)", color: ACCENT }}
            >
              Performance marketing for B2B SaaS
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Turn ad spend into{" "}
              <span style={{ color: ACCENT }}>predictable SaaS growth.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed" style={{ color: MUTED }}>
              Echo 27 builds paid acquisition engines for SaaS companies that need lower CAC, more trials, and revenue you can forecast. Run by a SaaS Academy coach — not a generalist agency.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <CTA size="lg" />
              <span className="text-sm" style={{ color: MUTED }}>
                30 minutes · no pitch deck
              </span>
            </div>
            <p className="mt-8 text-xs uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.5)" }}>
              SaaS Academy Coach · 12+ years · 23+ industries · 8 figures in managed ad spend
            </p>
          </div>
          <div className="relative">
            <div
              className="absolute -inset-4 rounded-3xl blur-2xl"
              style={{ background: `radial-gradient(circle, ${ACCENT}40, transparent 70%)` }}
            />
            <img
              src={adamImg}
              alt="Adam, founder of Echo 27 and SaaS Academy coach"
              className="relative w-full rounded-3xl object-cover shadow-2xl"
              style={{ aspectRatio: "4/5", border: `1px solid ${BORDER}` }}
            />
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <Section bg={SURFACE}>
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: ACCENT }}>The honest part</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            You don't need more reports. You need an engine that compounds.
          </h2>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {problems.map((p) => (
            <div
              key={p}
              className="rounded-2xl p-6"
              style={{ backgroundColor: BG, border: `1px solid ${BORDER}` }}
            >
              <p className="text-[15px] leading-relaxed text-white/90">{p}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* WHO RUNS THIS */}
      <Section id="about">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <div className="order-2 lg:order-1">
            <img
              src={adamImg}
              alt="Adam — Echo 27 founder and SaaS Academy coach"
              className="w-full rounded-3xl object-cover"
              style={{ aspectRatio: "1/1", border: `1px solid ${BORDER}` }}
            />
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: ACCENT }}>Who runs this</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
              Most agencies have never sat in a SaaS founder's seat.{" "}
              <span style={{ color: ACCENT }}>Adam coaches them.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed" style={{ color: MUTED }}>
              Adam is a coach inside <strong className="text-white">SaaS Academy</strong>, where he helps SaaS founders scale. Echo 27 thinks like a growth partner, not a vendor — tied to CAC, LTV, payback, and MRR, not vanity metrics.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {[
                ["12+", "yrs paid media"],
                ["23+", "industries"],
                ["8-fig", "managed spend"],
                ["SaaS", "specialists"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="text-3xl font-bold md:text-4xl" style={{ color: ACCENT }}>{n}</div>
                  <div className="mt-1 text-sm" style={{ color: MUTED }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* WHAT WE DO */}
      <Section id="services" bg={SURFACE}>
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: ACCENT }}>What we do</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            A complete paid acquisition engine — not a dashboard.
          </h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {pillars.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl p-7 transition-all hover:-translate-y-1"
              style={{ backgroundColor: BG, border: `1px solid ${BORDER}` }}
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ backgroundColor: "rgba(31,143,133,0.12)" }}
              >
                <Icon className="h-6 w-6" style={{ color: ACCENT }} />
              </div>
              <h3 className="mt-5 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed" style={{ color: MUTED }}>{body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CASE STUDY */}
      <Section id="case-study">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: ACCENT }}>Case study</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">AttractWell</h2>
          <p className="mt-4 text-lg" style={{ color: MUTED }}>
            A coaching platform competing in a crowded category against players like Kajabi.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            { stat: "−42%", label: "Cost per lead", icon: TrendingDown },
            { stat: "+118%", label: "Trial signups", icon: LineChart },
            { stat: "3.4×", label: "ROAS lift", icon: Target },
          ].map(({ stat, label, icon: Icon }) => (
            <div
              key={label}
              className="rounded-2xl p-8"
              style={{ backgroundColor: SURFACE, border: `1px solid ${BORDER}` }}
            >
              <Icon className="h-6 w-6" style={{ color: ACCENT }} />
              <div className="mt-4 text-5xl font-bold tracking-tight md:text-6xl" style={{ color: ACCENT }}>{stat}</div>
              <div className="mt-2 text-sm uppercase tracking-wider" style={{ color: MUTED }}>{label}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl p-8 md:p-10" style={{ backgroundColor: SURFACE, border: `1px solid ${BORDER}` }}>
          <p className="text-lg leading-relaxed text-white/90">
            Echo 27 rebuilt AttractWell's paid acquisition with <strong className="text-white">founder-led UGC creative</strong>, a sharper counter-offer against competitor promotions, and fixed conversion tracking that was under-reporting results. The outcome: lower CAC, more qualified trials, and a repeatable trial-to-paid engine the team can scale.
          </p>
          <div className="mt-8">
            <CTA>Book a Growth Call</CTA>
          </div>
        </div>
      </Section>

      {/* PROCESS */}
      <Section bg={SURFACE}>
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: ACCENT }}>How it works</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Three steps from spend to predictable pipeline.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.title} className="relative rounded-2xl p-7" style={{ backgroundColor: BG, border: `1px solid ${BORDER}` }}>
              <h3 className="text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed" style={{ color: MUTED }}>{s.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <SaasTestimonials />

      {/* FAQ */}
      <Section id="faq" bg={SURFACE}>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: ACCENT }}>FAQ</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Straight answers to the questions founders actually ask.
            </h2>
          </div>
          <div>
            {faqs.map((f) => (
              <FAQItem key={f.q} {...f} />
            ))}
          </div>
        </div>
      </Section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden border-t" style={{ borderColor: BORDER, backgroundColor: BG }}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(700px 350px at 50% 100%, ${ACCENT}25, transparent 60%)`,
          }}
        />
        <div className="relative mx-auto max-w-[900px] px-6 py-24 text-center md:py-32">
          <h2 className="text-4xl font-bold tracking-tight md:text-6xl">
            Ready to make ad spend <span style={{ color: ACCENT }}>predictable</span>?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg" style={{ color: MUTED }}>
            Book a 30-minute Growth Call. We'll look at your numbers and tell you straight if we can help.
          </p>
          <div className="mt-10 flex justify-center">
            <CTA size="lg" />
          </div>
          <p className="mt-6 text-sm" style={{ color: MUTED }}>
            No pitch deck. No pressure. Just a real conversation about your growth.
          </p>
          <ul className="mx-auto mt-10 flex max-w-md flex-wrap justify-center gap-x-6 gap-y-2 text-sm" style={{ color: MUTED }}>
            {["SaaS specialists", "Founder-led", "CAC & MRR focused"].map((x) => (
              <li key={x} className="flex items-center gap-2">
                <Check className="h-4 w-4" style={{ color: ACCENT }} /> {x}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t p-3 md:hidden"
        style={{ backgroundColor: BG, borderColor: BORDER }}
      >
        <button
          type="button"
          onClick={openBookingModal}
          className="flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-[#0B0B0F]"
          style={{ backgroundColor: ACCENT }}
        >
          Book a Growth Call <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Footer */}
      <footer className="border-t" style={{ borderColor: BORDER, backgroundColor: BG }}>
        <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-4 px-6 py-10 md:flex-row md:items-center">
          <div>
            <img src={logo} alt="Echo 27" className="h-7 w-auto brightness-0 invert" />
            <p className="mt-2 text-xs" style={{ color: MUTED }}>
              Performance marketing for B2B SaaS.
            </p>
          </div>
          <div className="flex items-center gap-6 text-xs" style={{ color: MUTED }}>
            <a href="/privacy" className="hover:text-white">Privacy</a>
            <span>© {new Date().getFullYear()} Echo 27</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ---------- Testimonials (dark variant, same data as the main site) ----------

type VideoT = { src: string; name: string; title: string; poster: string; linkedin?: string };
type WrittenT = { quote: string; name: string; title: string; photo: string; linkedin?: string };

const videoTestimonials: VideoT[] = [
  { src: "/videos/marc-lafleur.mp4", poster: "/images/thumbs/marc-lafleur.jpg", name: "Marc Lafleur", title: "Founder, Trulocal & DB8 Labs", linkedin: "https://www.linkedin.com/in/marclafleur1/" },
  { src: "/videos/molly-kauffman.mp4", poster: "/images/thumbs/molly-kauffman.jpg", name: "Molly Kauffman", title: "Director of Marketing, Society Mortgage", linkedin: "https://www.linkedin.com/in/mollykauf/" },
  { src: "/videos/marc-steiniger.mp4", poster: "/images/thumbs/marc-steiniger.jpg", name: "Marc Steiniger", title: "Co-Founder, The Sweat Box", linkedin: "https://www.linkedin.com/in/marc-steiniger-015494/" },
  { src: "/videos/thibaut-bannelier.mp4", poster: "/images/thumbs/thibaut-bannelier.jpg", name: "Thibaut Bannelier", title: "Founder, Music and Company", linkedin: "https://www.linkedin.com/in/thibaut-b-382884b3/" },
];

const writtenTestimonials: WrittenT[] = [
  {
    quote: "Thanks to Echo 27's Google ads management service, my business has seen continuous success year over year. He is very easy to work with and I would not hesitate to recommend him to others looking to grow their business.",
    name: "Justin Lui",
    title: "Founder, The Physio Loft",
    photo: justinImg,
    linkedin: "https://www.linkedin.com/in/justin-lui-31071886/",
  },
  {
    quote: "I would highly recommend working with Echo 27 and have referred them to several friends. We've worked with several agencies but none of them delivered results as consistently or professionally as Adam and his team.",
    name: "Tobias Brinkmann",
    title: "CEO, Mountain",
    photo: tobiasImg,
    linkedin: "https://www.linkedin.com/in/tobiasbrinkmann/",
  },
  {
    quote: "Working with Adam and his team has been a game-changer for our company. Their understanding of marketing strategies, coupled with a great attitude and a creative approach, has significantly enhanced our brand presence.",
    name: "Lou Jimenez",
    title: "Founder, Choose Charters",
    photo: louImg,
    linkedin: "https://www.linkedin.com/in/loujimenez/",
  },
];

function SaasTestimonials() {
  const [active, setActive] = useState<VideoT | null>(null);
  return (
    <Section id="testimonials">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: ACCENT }}>Testimonials</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
          Don't take <span style={{ color: ACCENT }}>our word for it</span>
        </h2>
        <p className="mt-4 text-lg" style={{ color: MUTED }}>Real founders, real results.</p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {videoTestimonials.map((v) => (
          <button
            key={v.src}
            onClick={() => setActive(v)}
            className="group text-left rounded-2xl overflow-hidden p-0 transition-all hover:-translate-y-0.5"
            style={{ backgroundColor: SURFACE, border: `1px solid ${BORDER}` }}
          >
            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
              <img
                src={v.poster}
                alt={v.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div
                className="relative h-16 w-16 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
                style={{ backgroundColor: ACCENT }}
              >
                <Play className="h-6 w-6 text-[#0B0B0F] fill-[#0B0B0F] ml-1" />
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2">
                <p className="font-bold text-white">{v.name}</p>
                {v.linkedin && (
                  <a
                    href={v.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`${v.name} on LinkedIn`}
                    className="transition-colors"
                    style={{ color: MUTED }}
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                )}
              </div>
              <p className="text-sm" style={{ color: MUTED }}>{v.title}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        {writtenTestimonials.map((w) => (
          <article
            key={w.name}
            className="rounded-2xl p-7 flex flex-col"
            style={{ backgroundColor: SURFACE, border: `1px solid ${BORDER}` }}
          >
            <Quote className="h-6 w-6 mb-4" style={{ color: ACCENT }} />
            <p className="leading-relaxed flex-1 text-white/90">{w.quote}</p>
            <div className="mt-6 flex items-center gap-3">
              <img src={w.photo} alt={w.name} className="h-12 w-12 rounded-full object-cover" />
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-white">{w.name}</p>
                  {w.linkedin && (
                    <a
                      href={w.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${w.name} on LinkedIn`}
                      style={{ color: MUTED }}
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                </div>
                <p className="text-sm" style={{ color: MUTED }}>{w.title}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-6"
          onClick={() => setActive(null)}
        >
          <button
            className="absolute top-6 right-6 h-10 w-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
            onClick={() => setActive(null)}
            aria-label="Close video"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <video src={active.src} poster={active.poster} controls autoPlay className="w-full h-full" />
          </div>
        </div>
      )}
    </Section>
  );
}