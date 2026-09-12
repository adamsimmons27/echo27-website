import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Search,
  Target,
  BarChart3,
  TrendingUp,
  FileText,
  Settings2,
  Layers,
  DollarSign,
  ChevronRight,
  Trophy,
  ArrowRight,
  CheckCircle2,
  Home,
  Users,
  Award,
  ShieldCheck,
  Zap,
  ExternalLink,
  Play,
  X,
} from "lucide-react";
import logo from "@/assets/echo27-logo.png";
import societyLogo from "@/assets/society-mortgage-logo.jpeg.asset.json";

/* ───────────────────── Reusable helpers ───────────────────── */

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight">
      {children}
    </h2>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-lg md:text-xl font-bold text-foreground tracking-tight">
      {children}
    </h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-base md:text-[1.05rem] leading-relaxed text-muted-foreground max-w-prose">
      {children}
    </p>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="bg-surface rounded-2xl p-8 md:p-10 border border-border flex flex-col items-center text-center gap-3 shadow-sm">
      <div className="w-14 h-14 rounded-full bg-teal/10 flex items-center justify-center mb-1">
        <Icon className="w-7 h-7 text-teal" />
      </div>
      <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
      <span className="text-4xl md:text-5xl font-extrabold text-foreground font-serif italic">
        {value}
      </span>
      <span className="text-sm text-muted-foreground">{sub}</span>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-sm">
      {children}
    </div>
  );
}

function FadeIn({
  children,
  delay = 1,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay * 80}ms` }}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-1" : "opacity-0 translate-y-5"
      }`}
    >
      {children}
    </div>
  );
}

/* ───────────────────── Phase card ───────────────────── */

function PhaseCard({
  number,
  title,
  icon: Icon,
  children,
}: {
  number: number;
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-teal/[0.03] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="flex items-center gap-3 mb-5 relative">
        <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center shrink-1">
          <Icon className="w-5 h-5 text-teal" />
        </div>
        <div>
          <span className="text-xs font-bold text-teal uppercase tracking-wider">
            Phase {number}
          </span>
          <h3 className="text-lg md:text-xl font-bold text-foreground tracking-tight">
            {title}
          </h3>
        </div>
      </div>
      <div className="relative text-muted-foreground leading-relaxed space-y-3">
        {children}
      </div>
    </div>
  );
}

/* ───────────────────── Bullets ───────────────────── */

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 mt-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-1" />
          <span className="text-muted-foreground leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* ───────────────────── Mini stat ───────────────────── */

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-surface rounded-xl p-5 border border-border text-center">
      <div className="text-2xl font-extrabold text-foreground font-serif italic">
        {value}
      </div>
      <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-medium">
        {label}
      </div>
    </div>
  );
}

/* ───────────────────── Navbar (case-study variant) ───────────────────── */

function CaseStudyNavbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-background/90 backdrop-blur border-b border-border shadow-sm">
      <div className="mx-auto max-w-[1200px] px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Echo 27" className="h-8 w-auto" />
        </Link>
        <a
          href="#contact"
          className="inline-flex items-center justify-center bg-teal text-white font-semibold text-sm px-5 py-2.5 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          I'd like more customers
        </a>
      </div>
    </header>
  );
}

/* ───────────────────── Main page ───────────────────── */

export const Route = createFileRoute("/case-studies/society-mortgage")({
  head: () => ({
    meta: [
      { title: "Case Study: Society Mortgage — Echo 27" },
      {
        name: "description",
        content:
          "How Echo 27 reduced Society Mortgage's cost per lead by 62% and increased qualified leads by 128% through Google Ads optimization, competitor conquesting, and landing page redesign.",
      },
      {
        property: "og:title",
        content: "Case Study: Society Mortgage — Echo 27",
      },
      {
        property: "og:description",
        content:
          "How Echo 27 reduced Society Mortgage's cost per lead by 62% and increased qualified leads by 128% through Google Ads optimization.",
      },
    ],
  }),
  component: SocietyMortgageCaseStudy,
});

function SocietyMortgageCaseStudy() {
  const [videoOpen, setVideoOpen] = useState(false);

  const societyVars = {
    ["--teal" as string]: "#0E2A6B",
    ["--pink" as string]: "#F5B91E",
    ["--color-teal" as string]: "#0E2A6B",
    ["--color-pink" as string]: "#F5B91E",
  } as React.CSSProperties;

  return (
    <div className="bg-background text-foreground min-h-screen">
      <CaseStudyNavbar />

      <main className="pt-24">
        {/* ─── Hero (Society Mortgage brand colours) ─── */}
        <div style={societyVars}>
          <section className="relative overflow-hidden pt-10 pb-12 md:pt-14 md:pb-16">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 flex justify-center opacity-20"
            >
              <div
                className="h-[320px] w-[min(760px,92vw)] rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle at 50% 35%, var(--teal), var(--pink) 58%, transparent 76%)",
                }}
              />
            </div>
            <div className="relative mx-auto max-w-[980px] px-6 text-center">
              <FadeIn delay={1}>
                <div className="flex justify-center mb-6">
                  <img
                    src={societyLogo.url}
                    alt="Society Mortgage logo"
                    className="h-20 md:h-24 w-auto rounded-xl shadow-lg"
                  />
                </div>
                <span className="eyebrow mb-5">
                  <Home className="w-4 h-4" />
                  Case Study
                </span>
              </FadeIn>
              <FadeIn delay={2}>
                <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-[1.02] tracking-tight">
                  Society Mortgage
                </h1>
              </FadeIn>
              <FadeIn delay={3}>
                <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  How we cut cost per qualified lead by <span className="text-teal font-bold">62%</span>,
                  outranked national lenders, and turned a struggling Google Ads account into a high-performing acquisition engine.
                </p>
              </FadeIn>
              <FadeIn delay={4}>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
                  <MiniStat value="62%" label="Lower CPL" />
                  <MiniStat value="128%" label="More qualified leads" />
                  <MiniStat value="36%" label="Higher conversion rate" />
                </div>
              </FadeIn>
            </div>
          </section>
        </div>

        {/* ─── About ─── */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-[900px] px-6">
            <FadeIn>
              <div className="bg-surface rounded-2xl p-8 md:p-12 border border-border shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-teal" />
                  </div>
                  <SectionHeading>About Society Mortgage</SectionHeading>
                </div>
                <P>
                  Society Mortgage is a fast-growing mortgage lender operating across multiple U.S. states, specializing in home purchase loans, refinancing, and non-traditional borrower programs. Their mission is to help borrowers confidently navigate the mortgage process through personalized service and technology-driven efficiency.
                </P>
                <a
                  href="https://societymortgage.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-teal hover:underline"
                >
                  Visit Society Mortgage
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ─── Video testimonial ─── */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-[900px] px-6">
            <FadeIn>
              <div className="text-center mb-10">
                <span className="eyebrow mb-4">
                  <Users className="w-4 h-4" />
                  From the client
                </span>
                <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
                  Hear it from <span className="text-teal">Molly</span>
                </h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                  Molly Kauffman, Director of Marketing at Society Mortgage, on working with Echo 27.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={2}>
              <button
                onClick={() => setVideoOpen(true)}
                className="group relative w-full aspect-video rounded-2xl overflow-hidden bg-foreground shadow-xl hover:shadow-2xl transition-all text-left"
                aria-label="Play Molly Kauffman testimonial"
              >
                <img
                  src="/images/thumbs/molly-kauffman.jpg"
                  alt="Molly Kauffman"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-20 w-20 rounded-full bg-teal flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="h-8 w-8 text-white fill-white ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <p className="text-white font-bold text-lg md:text-xl">Molly Kauffman</p>
                  <p className="text-white/80 text-sm">Director of Marketing, Society Mortgage</p>
                </div>
              </button>
            </FadeIn>
          </div>
        </section>

        {/* ─── The Challenge ─── */}
        <section className="py-16 md:py-24 bg-surface-alt/50">
          <div className="mx-auto max-w-[900px] px-6">
            <FadeIn>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-pink/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-pink" />
                </div>
                <SectionHeading>The Challenge</SectionHeading>
              </div>
            </FadeIn>
            <FadeIn delay={2}>
              <P>
                When Society Mortgage came to us, their Google Ads campaigns were struggling to generate profitable results. They faced several key issues:
              </P>
            </FadeIn>
            <FadeIn delay={3}>
              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                <Card>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-pink/10 flex items-center justify-center shrink-1">
                      <DollarSign className="w-5 h-5 text-pink" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-base">High Cost Per Lead</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        CPL averaging $47 — nearly double industry benchmarks for mortgage leads.
                      </p>
                    </div>
                  </div>
                </Card>
                <Card>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-pink/10 flex items-center justify-center shrink-1">
                      <TrendingUp className="w-5 h-5 text-pink" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-base">Low Conversion Rates</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Few ad clicks were converting into actual loan applications.
                      </p>
                    </div>
                  </div>
                </Card>
                <Card>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-pink/10 flex items-center justify-center shrink-1">
                      <BarChart3 className="w-5 h-5 text-pink" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-base">No Data Segmentation</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        No differentiation between qualified leads and unqualified inquiries.
                      </p>
                    </div>
                  </div>
                </Card>
                <Card>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-pink/10 flex items-center justify-center shrink-1">
                      <Search className="w-5 h-5 text-pink" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-base">Low Visibility</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Struggling to compete with Rocket Mortgage, CrossCountry, and Fairway on search.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </FadeIn>
            <FadeIn delay={4}>
              <div className="mt-8 bg-teal/[0.04] border border-teal/20 rounded-2xl p-6 md:p-8">
                <p className="text-foreground font-medium">
                  Their goal was to not only reduce cost per lead but also consistently appear alongside — and above — major national lenders to capture high-intent local buyers.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ─── Approach header ─── */}
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-[900px] px-6 text-center">
            <FadeIn>
              <span className="eyebrow mb-4">
                <Settings2 className="w-4 h-4" />
                Our Approach
              </span>
            </FadeIn>
            <FadeIn delay={2}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
                Three phases to <span className="text-teal">dominate</span> search
              </h2>
            </FadeIn>
          </div>
        </section>

        {/* ─── Phase 1 ─── */}
        <section className="pb-16 md:pb-24">
          <div className="mx-auto max-w-[900px] px-6">
            <FadeIn>
              <PhaseCard number={1} title="Account Audit & Data Structuring" icon={FileText}>
                <P>
                  Our first step was to perform a complete audit of the account and rebuild it from the ground up for accuracy and control.
                </P>
                <div className="mt-6 grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3">
                      Findings
                    </h4>
                    <BulletList
                      items={[
                        "Campaigns organized by loan type but lacked state and audience segmentation.",
                        "No differentiation between branded, generic, and competitor keywords.",
                        "Conversion tracking only counted form submissions, not qualified leads.",
                      ]}
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3">
                      Actions
                    </h4>
                    <BulletList
                      items={[
                        "Implemented CRM-integrated tracking via Google Tag Manager to measure only qualified leads (loan-ready, verified contacts).",
                        "Rebuilt the account structure by intent, state, and audience.",
                        "Created a dedicated competitor conquesting campaign to appear when users searched for top lenders by name.",
                      ]}
                    />
                  </div>
                </div>
              </PhaseCard>
            </FadeIn>
          </div>
        </section>

        {/* ─── Phase 2 ─── */}
        <section className="pb-16 md:pb-24 bg-surface-alt/50">
          <div className="mx-auto max-w-[900px] px-6">
            <FadeIn>
              <PhaseCard number={2} title="Campaign Redevelopment, Competitor Positioning & Optimization" icon={Layers}>
                <P>
                  Once accurate data was in place, we rebuilt Society's campaigns for precision, efficiency, and market visibility.
                </P>

                <div className="mt-8 space-y-8">
                  {/* Keyword strategy */}
                  <div className="bg-surface rounded-xl p-6 border border-border">
                    <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Target className="w-4 h-4 text-teal" />
                      Keyword & Competitor Strategy
                    </h4>
                    <p className="text-muted-foreground mb-4">
                      We designed a three-tier keyword structure:
                    </p>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="bg-surface-deep rounded-lg p-4 border border-border">
                        <div className="text-xs font-bold text-teal uppercase tracking-wider mb-2">High-Intent Buyer</div>
                        <p className="text-sm text-muted-foreground">
                          "mortgage pre-approval near me," "FHA mortgage Florida," "home loan with 10% down"
                        </p>
                      </div>
                      <div className="bg-surface-deep rounded-lg p-4 border border-border">
                        <div className="text-xs font-bold text-teal uppercase tracking-wider mb-2">Niche Segments</div>
                        <p className="text-sm text-muted-foreground">
                          "mortgage for self-employed," "investment property refinance"
                        </p>
                      </div>
                      <div className="bg-surface-deep rounded-lg p-4 border border-border">
                        <div className="text-xs font-bold text-teal uppercase tracking-wider mb-2">Competitor Conquesting</div>
                        <p className="text-sm text-muted-foreground">
                          "Rocket Mortgage alternatives," "better than Fairway Mortgage," "CrossCountry refinance rates"
                        </p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mt-4">
                      By bidding strategically on competitor keywords and creating ad copy that directly contrasted Society's advantages — faster approvals, lower rates, and personal service — we captured high-converting intent traffic at a fraction of competitor CPCs.
                    </p>
                  </div>

                  {/* Ad copy */}
                  <div className="bg-surface rounded-xl p-6 border border-border">
                    <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-teal" />
                      Ad Copy & Extensions
                    </h4>
                    <p className="text-muted-foreground mb-4">
                      We developed new, performance-driven ad copy emphasizing trust, speed, and accessibility:
                    </p>
                    <blockquote className="border-l-4 border-teal pl-4 py-2 bg-teal/[0.03] rounded-r-lg">
                      <p className="text-foreground font-medium italic text-lg">
                        "Skip the big banks — Get pre-approved in 5 minutes with Society Mortgage."
                      </p>
                    </blockquote>
                    <p className="text-muted-foreground mt-4">
                      We implemented sitelinks, callouts, and structured snippets to improve CTR and visibility, achieving higher ad rank than much larger lenders on several high-value searches.
                    </p>
                  </div>

                  {/* Landing pages */}
                  <div className="bg-surface rounded-xl p-6 border border-border">
                    <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-teal" />
                      Landing Page Optimization
                    </h4>
                    <BulletList
                      items={[
                        "Aligned every ad with a dedicated landing page that reflected the searcher's intent and location.",
                        "Each page included loan-type specific messaging, local credibility cues, and instant pre-approval CTAs.",
                        "Reduced form fields by 40% and improved mobile usability.",
                      ]}
                    />
                  </div>

                  {/* Bid strategy */}
                  <div className="bg-surface rounded-xl p-6 border border-border">
                    <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-teal" />
                      Bid Strategy
                    </h4>
                    <p className="text-muted-foreground">
                      We transitioned to Target CPA bidding, optimized around qualified lead conversions, and trained Google's algorithm on the CRM data to prioritize high-quality leads over cheap clicks.
                    </p>
                  </div>
                </div>
              </PhaseCard>
            </FadeIn>
          </div>
        </section>

        {/* ─── Phase 3 ─── */}
        <section className="pb-16 md:pb-24">
          <div className="mx-auto max-w-[900px] px-6">
            <FadeIn>
              <PhaseCard number={3} title="Scaling & Continuous Improvement" icon={TrendingUp}>
                <P>
                  After optimizing campaigns to profitability, we focused on scaling while maintaining cost efficiency.
                </P>
                <div className="mt-6 space-y-6">
                  <div className="bg-surface rounded-xl p-6 border border-border">
                    <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-teal" />
                      Data-Driven Scaling
                    </h4>
                    <p className="text-muted-foreground">
                      We increased budgets only in campaigns that consistently delivered sub-$20 qualified leads, maintaining performance across multiple states.
                    </p>
                  </div>
                  <div className="bg-surface rounded-xl p-6 border border-border">
                    <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Search className="w-4 h-4 text-teal" />
                      Competitor Benchmarking
                    </h4>
                    <p className="text-muted-foreground">
                      Using Auction Insights, we monitored impression share against top lenders weekly. Society's ads began outranking Rocket Mortgage and Fairway on non-branded and competitor queries in core states like Florida and Texas.
                    </p>
                  </div>
                  <div className="bg-surface rounded-xl p-6 border border-border">
                    <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Settings2 className="w-4 h-4 text-teal" />
                      Continuous Testing
                    </h4>
                    <p className="text-muted-foreground">
                      We ran ongoing A/B tests on ad headlines, CTA language, and landing page layouts — improving conversion rates by over 30%.
                    </p>
                  </div>
                  <div className="bg-surface rounded-xl p-6 border border-border">
                    <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-teal" />
                      Negative Keyword Expansion
                    </h4>
                    <p className="text-muted-foreground">
                      We added over 250 negative keywords to eliminate low-intent traffic and further improve lead quality.
                    </p>
                  </div>
                </div>
              </PhaseCard>
            </FadeIn>
          </div>
        </section>

        {/* ─── Results ─── */}
        <section className="py-16 md:py-24 bg-surface-alt/50">
          <div className="mx-auto max-w-[1000px] px-6">
            <FadeIn>
              <div className="text-center mb-12">
                <span className="eyebrow mb-4">
                  <Trophy className="w-4 h-4" />
                  Results
                </span>
                <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
                  From struggling to <span className="text-teal">scaling</span>
                </h2>
              </div>
            </FadeIn>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <FadeIn delay={1}>
                <StatCard
                  icon={DollarSign}
                  label="CPL Decrease"
                  value="62%"
                  sub="from $47 → $18 in 90 days"
                />
              </FadeIn>
              <FadeIn delay={2}>
                <StatCard
                  icon={Users}
                  label="Qualified Leads"
                  value="+128%"
                  sub="without increasing ad spend"
                />
              </FadeIn>
              <FadeIn delay={3}>
                <StatCard
                  icon={TrendingUp}
                  label="Conversion Rate"
                  value="+36%"
                  sub="through new landing pages"
                />
              </FadeIn>
              <FadeIn delay={4}>
                <StatCard
                  icon={Award}
                  label="Impression Share"
                  value="Top 3"
                  sub="vs. Rocket Mortgage & Fairway"
                />
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section id="contact" className="relative bg-surface-deep py-24 md:py-[140px] overflow-hidden">
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
            <FadeIn>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.05] tracking-tight">
                Ready to grow <span className="text-teal">without guessing?</span>
              </h2>
            </FadeIn>
            <FadeIn delay={2}>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                We're currently taking on a limited number of new clients. If you think we might be a fit, get in touch.
              </p>
            </FadeIn>
            <FadeIn delay={3}>
              <div className="mt-10 flex flex-col items-center gap-4">
                <a
                  href="/book"
                  className="inline-flex items-center justify-center gap-2 bg-teal text-white font-semibold text-lg px-10 py-5 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all"
                >
                  I'd like more customers
                  <span aria-hidden>→</span>
                </a>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      {videoOpen && (
        <div
          className="fixed inset-0 z-[60] bg-foreground/80 flex items-center justify-center p-6"
          onClick={() => setVideoOpen(false)}
        >
          <button
            className="absolute top-6 right-6 h-10 w-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
            onClick={() => setVideoOpen(false)}
            aria-label="Close video"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src="/videos/molly-kauffman.mp4"
              poster="/images/thumbs/molly-kauffman.jpg"
              controls
              autoPlay
              className="w-full h-full"
            />
          </div>
        </div>
      )}

      {/* ─── Footer ─── */}
      <footer className="bg-surface-alt border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 py-14">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
            <div>
              <img src={logo} alt="Echo 27" className="h-9 w-auto" />
              <p className="mt-3 text-sm text-muted-foreground max-w-xs">
                Business Growth Made <span className="line-through">Easy</span>{" "}
                <span className="italic">Less Hard</span>
              </p>
            </div>
            <div className="flex flex-col md:items-end gap-5">
              <nav className="flex flex-wrap gap-6">
                <Link
                  to="/"
                  className="text-sm font-medium text-foreground/80 hover:text-teal transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/"
                  hash="services"
                  className="text-sm font-medium text-foreground/80 hover:text-teal transition-colors"
                >
                  What We Do
                </Link>
                <Link
                  to="/"
                  hash="testimonials"
                  className="text-sm font-medium text-foreground/80 hover:text-teal transition-colors"
                >
                  Testimonials
                </Link>
              </nav>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-border text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} Echo 27. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
