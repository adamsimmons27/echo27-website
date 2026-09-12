import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Target,
  Filter,
  MapPin,
  Play,
  Check,
  AlertTriangle,
  ChevronDown,
} from "lucide-react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Testimonials } from "./Testimonials";
import adamPhoto from "@/assets/adam.jpg";

// Drop the real VSL URL here. Supports YouTube, Vimeo, or a direct MP4.
// Examples:
//   "https://www.youtube.com/embed/VIDEO_ID"
//   "https://player.vimeo.com/video/VIDEO_ID"
//   "https://your-cdn.com/vsl.mp4"
export const VSL_VIDEO_URL = "{{VSL_VIDEO_URL}}";
// Drop the real poster image here (1280x720 recommended).
export const VSL_POSTER_URL = "";

const ctaHref = "/book";
const ctaLabel = "I'd like more customers";

function PrimaryCTA({
  size = "md",
  className = "",
}: {
  size?: "md" | "lg";
  className?: string;
}) {
  const sizing =
    size === "lg"
      ? "text-lg px-10 py-5"
      : "text-base px-8 py-4";
  return (
    <Link
      to={ctaHref}
      className={`inline-flex items-center justify-center gap-2 bg-teal text-white font-semibold ${sizing} rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all ${className}`}
    >
      {ctaLabel}
      <span aria-hidden>→</span>
    </Link>
  );
}

function isYouTube(url: string) {
  return /youtube\.com|youtu\.be/.test(url);
}
function isVimeo(url: string) {
  return /vimeo\.com/.test(url);
}
function toEmbed(url: string) {
  if (isYouTube(url)) {
    const id =
      url.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{6,})/)?.[1] ?? "";
    return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
  }
  if (isVimeo(url)) {
    const id = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)?.[1] ?? "";
    return `https://player.vimeo.com/video/${id}?autoplay=1`;
  }
  return url;
}

function VSL() {
  const [playing, setPlaying] = useState(false);
  const hasUrl = VSL_VIDEO_URL && !VSL_VIDEO_URL.includes("{{");
  const embed = hasUrl ? toEmbed(VSL_VIDEO_URL) : "";
  const isFile = hasUrl && !isYouTube(VSL_VIDEO_URL) && !isVimeo(VSL_VIDEO_URL);

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-foreground shadow-2xl ring-1 ring-foreground/10">
      {!playing && (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 w-full h-full flex items-center justify-center"
          aria-label="Play video"
        >
          {VSL_POSTER_URL ? (
            <img
              src={VSL_POSTER_URL}
              alt="Video preview"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, var(--teal), transparent 60%), radial-gradient(circle at 70% 70%, var(--pink), transparent 60%), #0f172a",
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
          <div className="relative flex flex-col items-center gap-3">
            <div className="h-20 w-20 rounded-full bg-teal flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
              <Play className="h-8 w-8 text-white fill-white ml-1" />
            </div>
            <span className="text-white font-semibold tracking-wide drop-shadow">
              Watch the video
            </span>
          </div>
        </button>
      )}
      {playing && hasUrl && isFile && (
        <video
          src={VSL_VIDEO_URL}
          poster={VSL_POSTER_URL || undefined}
          controls
          autoPlay
          playsInline
          className="w-full h-full"
        />
      )}
      {playing && hasUrl && !isFile && (
        <iframe
          src={embed}
          title="Echo 27 VSL"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="w-full h-full border-0"
        />
      )}
      {playing && !hasUrl && (
        <div className="absolute inset-0 flex items-center justify-center text-white/80 text-sm p-6 text-center">
          Drop the real VSL URL into <code className="mx-1">VSL_VIDEO_URL</code>{" "}
          in <code className="mx-1">GtaLanding.tsx</code>.
        </div>
      )}
    </div>
  );
}

const pains = [
  {
    title: "Ads that burn cash without booking customers",
    copy: "You're paying for clicks and impressions, but the phone isn't ringing and the calendar isn't filling.",
  },
  {
    title: "Agencies that send reports, not results",
    copy: "Pretty dashboards, vague updates, zero accountability for actual revenue.",
  },
  {
    title: "Invisible in local search",
    copy: "Competitors across the GTA show up first on Google and Maps while you're buried on page two.",
  },
  {
    title: "No real funnel behind the marketing",
    copy: "Leads slip through the cracks because there's no system to follow up, book, and close.",
  },
];

const services = [
  {
    icon: Target,
    title: "Paid Ads",
    copy: "Geo-targeted Meta, Google, YouTube, and TikTok campaigns built around your service area — from downtown Toronto to Mississauga, Vaughan, Markham, and beyond.",
  },
  {
    icon: Filter,
    title: "Funnel Building",
    copy: "Landing pages, lead capture, and follow-up systems that turn local clicks into booked appointments and paying customers.",
  },
  {
    icon: MapPin,
    title: "Local Lead Generation",
    copy: "Local SEO, Google Business Profile, and high-intent lead flows that put you in front of GTA customers who are ready to buy today.",
  },
];

const faqs = [
  {
    q: "How much does this cost?",
    a: "Engagements are scoped to your goals and the channels you need. Most GTA small businesses we work with invest between a few thousand and low five figures per month across media and management. We'll be straight with you on the call whether it's a fit.",
  },
  {
    q: "How fast will I see results?",
    a: "Paid ads can generate leads in the first 1–2 weeks. Local SEO compounds over 60–90 days. We aim for early wins fast, then build a system that keeps producing.",
  },
  {
    q: "Which industries do you work with?",
    a: "Local service businesses across the GTA — clinics, dental and medical, gyms and studios, trades and home services, law firms, restaurants, and retail. 23+ industries over the last 12 years.",
  },
  {
    q: "What makes Echo 27 different?",
    a: "Results, not reports. You get a senior operator running your account, not a junior buried in a 40-client roster. Everything we do ties back to booked customers and revenue.",
  },
  {
    q: "Do you work with businesses outside Toronto?",
    a: "Yes. We're built around the GTA but work with businesses across Canada and the US. If you serve a local market anywhere, the playbook applies.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-surface rounded-2xl border border-transparent hover:border-teal/40 transition-colors">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 text-left p-6"
        aria-expanded={open}
      >
        <span className="font-bold text-foreground text-lg">{q}</span>
        <ChevronDown
          className={`h-5 w-5 text-teal shrink-0 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="px-6 pb-6 -mt-2 text-muted-foreground leading-relaxed">
          {a}
        </div>
      )}
    </div>
  );
}

export function GtaLanding() {
  return (
    <div className="bg-background text-foreground">
      <Navbar />
      <main>
        {/* HERO */}
        <section
          id="top"
          className="relative pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden bg-background"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 -right-32 h-[600px] w-[600px] rounded-full opacity-30 blur-3xl"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, var(--teal), var(--pink) 70%, transparent 80%)",
            }}
          />
          <div className="relative mx-auto max-w-[1200px] px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-center">
            <div className="fade-in-up">
              <p className="eyebrow mb-5">For Greater Toronto Area businesses</p>
              <h1 className="font-extrabold leading-[1.05] text-foreground text-4xl sm:text-5xl md:text-6xl lg:text-[64px] tracking-tight">
                More local customers.
                <br />
                <span className="text-teal">Less guesswork.</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                We help GTA small businesses grow with paid ads, funnels, and
                local lead generation that actually fill your calendar — not
                just your inbox with reports.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
                <PrimaryCTA />
                <p className="text-sm text-muted-foreground">
                  Toronto • Mississauga • Vaughan • Markham • Brampton
                </p>
              </div>
            </div>
            <div className="lg:pl-4">
              <p className="eyebrow mb-4 text-center lg:text-left">
                Watch this 3-minute breakdown of how we get GTA businesses more customers
              </p>
              <VSL />
              <div className="mt-6 flex justify-center lg:justify-start">
                <PrimaryCTA />
              </div>
            </div>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="bg-surface-alt py-20 md:py-[120px]">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <p className="eyebrow mb-4">The problem</p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
                Marketing shouldn't feel like a{" "}
                <span className="text-teal">slot machine</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pains.map((p) => (
                <div
                  key={p.title}
                  className="bg-surface rounded-2xl p-7 shadow-md border border-transparent hover:border-teal transition-all"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-pink/10 text-pink">
                    <AlertTriangle className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {p.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{p.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="bg-background py-20 md:py-[120px]">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="max-w-2xl mx-auto text-center mb-14">
              <p className="eyebrow mb-4">What we do for GTA businesses</p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
                Business Growth Made{" "}
                <span className="strike-easy">Easy</span>{" "}
                <span className="text-teal">Less Hard</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Three plays that consistently fill calendars for local businesses.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map(({ icon: Icon, title, copy }) => (
                <div
                  key={title}
                  className="group bg-surface rounded-2xl p-8 shadow-md hover:shadow-xl border border-transparent hover:border-teal transition-all"
                >
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-teal/10 text-teal group-hover:scale-105 transition-transform">
                    <Icon className="h-7 w-7" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{copy}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 flex justify-center">
              <PrimaryCTA />
            </div>
          </div>
        </section>

        {/* PROOF */}
        <Testimonials />

        {/* MEET ADAM */}
        <section className="bg-background py-20 md:py-[120px]">
          <div className="mx-auto max-w-[1200px] px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative max-w-sm mx-auto lg:mx-0 w-full">
              <div className="absolute -bottom-6 -right-6 w-4/5 aspect-[4/5] rounded-2xl border-2 border-teal" />
              <img
                src={adamPhoto}
                alt="Adam, founder of Echo 27"
                className="relative w-full aspect-[4/5] object-cover rounded-2xl shadow-lg"
                loading="lazy"
              />
            </div>
            <div>
              <p className="eyebrow mb-4">Meet Adam</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
                A senior operator running{" "}
                <span className="text-teal">your account</span>
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Based in the GTA. 12+ years in performance marketing, 23+
                industries, and a track record of building local businesses
                that compound — including scaling Spark Music to 850+ students
                before its acquisition by Long & McQuade.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  "12+ years driving real revenue, not vanity metrics",
                  "23+ industries — including clinics, gyms, trades, and retail",
                  "Hands-on with your account every week",
                  "Straight talk, no jargon, no fluff",
                ].map((c) => (
                  <li key={c} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-teal mt-0.5 shrink-0" />
                    <span className="text-foreground">{c}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <PrimaryCTA />
              </div>
            </div>
          </div>
        </section>

        {/* OFFER / SCARCITY */}
        <section className="bg-surface-alt py-20 md:py-[120px]">
          <div className="mx-auto max-w-[900px] px-6 text-center">
            <p className="eyebrow mb-4">Limited spots</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
              We take on a{" "}
              <span className="text-teal">limited number</span> of new GTA clients
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              So every client gets senior attention and real results. If you're a
              GTA small business owner ready to grow, book a call and we'll tell
              you straight up whether we're the right fit.
            </p>
            <div className="mt-10">
              <PrimaryCTA size="lg" />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-background py-20 md:py-[120px]">
          <div className="mx-auto max-w-[860px] px-6">
            <div className="text-center mb-12">
              <p className="eyebrow mb-4">FAQ</p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
                Questions, <span className="text-teal">answered</span>
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map((f) => (
                <FaqItem key={f.q} q={f.q} a={f.a} />
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="relative bg-surface-deep py-24 md:py-[140px] overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <div
              className="h-[600px] w-[800px] rounded-full opacity-40 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, var(--teal), var(--pink) 60%, transparent 75%)",
              }}
            />
          </div>
          <div className="relative mx-auto max-w-[1000px] px-6 text-center">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-[1.05] tracking-tight">
              Ready for more <span className="text-teal">GTA customers?</span>
            </h2>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Book a call. We'll show you exactly how we'd grow your business —
              no obligation, no pitch deck, no fluff.
            </p>
            <div className="mt-10 flex justify-center">
              <PrimaryCTA size="lg" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}