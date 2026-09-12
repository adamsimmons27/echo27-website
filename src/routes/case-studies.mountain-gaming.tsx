import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Trophy,
  Users,
  Target,
  Search,
  Megaphone,
  BarChart3,
  TrendingUp,
  Rocket,
  CheckCircle2,
  Gamepad2,
} from "lucide-react";
import logo from "@/assets/echo27-logo.png";
import mountainLogo from "@/assets/mountain-logo.svg.asset.json";

function CaseStudyNavbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-background/90 backdrop-blur border-b border-border shadow-sm">
      <div className="mx-auto max-w-[1200px] px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Echo 27" className="h-8 w-auto" />
        </Link>
      </div>
    </header>
  );
}

function SectionHeading({ children, icon: Icon }: { children: React.ReactNode; icon: React.ElementType }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-teal" />
      </div>
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight">
        {children}
      </h2>
    </div>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xl md:text-2xl font-bold text-foreground tracking-tight mt-8 mb-3">
      {children}
    </h3>
  );
}

function H4({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-base md:text-lg font-bold text-foreground mt-5 mb-2">{children}</h4>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-base md:text-[1.05rem] leading-relaxed text-muted-foreground mb-4">
      {children}
    </p>
  );
}

function UL({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-3 mb-4">
      {items.map((it, i) => (
        <li key={i} className="flex items-start gap-3">
          <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-1.5" />
          <span className="text-muted-foreground leading-relaxed">{it}</span>
        </li>
      ))}
    </ul>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-sm">
      {children}
    </div>
  );
}

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-surface rounded-xl p-5 border border-border text-center">
      <div className="text-2xl md:text-3xl font-extrabold text-foreground font-serif italic">
        {value}
      </div>
      <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-medium">
        {label}
      </div>
    </div>
  );
}

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
        <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center shrink-0">
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
      <div className="relative">{children}</div>
    </div>
  );
}

export const Route = createFileRoute("/case-studies/mountain-gaming")({
  head: () => ({
    meta: [
      { title: "Case Study - Mountain Gaming — Echo 27" },
      {
        name: "description",
        content:
          "How Echo 27 helped Mountain Gaming reduce CAC by 41% and increase ROAS by 68%.",
      },
      { property: "og:title", content: "Case Study - Mountain Gaming — Echo 27" },
      {
        property: "og:description",
        content:
          "How Echo 27 helped Mountain Gaming reduce CAC by 41% and increase ROAS by 68%.",
      },
    ],
  }),
  component: MountainGamingCaseStudy,
});

function MountainGamingCaseStudy() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <CaseStudyNavbar />

      <main className="pt-24 pb-24">
        {/* Hero */}
        <section className="relative overflow-hidden pt-10 pb-14 md:pt-14 md:pb-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 flex justify-center opacity-30"
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
            <div className="flex justify-center mb-6">
              <img src={mountainLogo.url} alt="Mountain logo" className="h-16 md:h-20 w-auto" />
            </div>
            <span className="eyebrow mb-5">
              <Gamepad2 className="w-4 h-4" />
              Case Study
            </span>
            <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-[1.02] tracking-tight">
              Mountain Gaming
            </h1>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
              <MiniStat value="41%" label="Lower CAC" />
              <MiniStat value="68%" label="Higher ROAS" />
            </div>
          </div>
        </section>

        {/* About */}
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-[900px] px-6">
            <Card>
              <SectionHeading icon={Users}>About Mountain Gaming</SectionHeading>
              <P>
                MOUNTAIN creates innovative, premium hardware and software with a user-centric design that enable gamers and content creators to achieve peak performance. Their product portfolio includes the flagship Everest keyboard as well as the Makalu 67 mouse, the Nunatak mousepad and several accessories like Switches, Keycaps and more!
              </P>
            </Card>
          </div>
        </section>

        {/* Challenge */}
        <section className="py-12 md:py-16 bg-surface-alt/50">
          <div className="mx-auto max-w-[900px] px-6">
            <SectionHeading icon={Target}>The Challenge</SectionHeading>
            <P>They came to us looking to solve the following problems:</P>
            <UL
              items={[
                "Unprofitable return on ad spend across all channels",
                "Undefined ideal customer profile",
                "Under-utilized PR assets",
                "Lack of direction around overall marketing strategy",
              ]}
            />
            <P>
              Most of these challenges were due to the company having recently been acquired and losing key growth marketing talent.
            </P>
          </div>
        </section>

        {/* Approach */}
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-[900px] px-6">
            <SectionHeading icon={Rocket}>Our Approach</SectionHeading>
          <P>We broke down our approach to working with them into 3 phases.</P>
            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <PhaseCard number={1} title="Customer research and ICP definition" icon={Search}>
                <p className="text-sm text-muted-foreground">Understand who actually buys and why.</p>
              </PhaseCard>
              <PhaseCard number={2} title="Paid ad strategy and development" icon={Megaphone}>
                <p className="text-sm text-muted-foreground">Build the campaigns, creative and CRO stack.</p>
              </PhaseCard>
              <PhaseCard number={3} title="Campaign refining and scaling" icon={TrendingUp}>
                <p className="text-sm text-muted-foreground">Optimize to profitability, then scale.</p>
              </PhaseCard>
            </div>
          </div>
        </section>

        {/* Phase 1 detail */}
        <section className="py-12 md:py-16 bg-surface-alt/50">
          <div className="mx-auto max-w-[900px] px-6">
            <SectionHeading icon={Search}>
              Phase 1 — Customer research and ICP identification
            </SectionHeading>
          <P>
            Our first phase was centred around researching and identifying their ICP. They had initially described their ICP as simply 'PC gamers' but didn't have any further insights into customer demographics, interests, or behaviours. We conducted in depth research into their current customers and market which would allow us to craft better messaging and build successful campaigns.
          </P>

          <H4>Market research</H4>
          <P>
            We began by conducting a comprehensive market analysis to understand the dynamics of the PC gaming/mechanical keyboard hardware market.
          </P>
          <P>We found that there were 3 key variables among customers in this industry. These were:</P>
          <UL
            items={[
              "Use case (e.g. gamers v.s video editors)",
              "Seriousness (Professional vs amateur video editor, serious vs non-serious gamer etc…)",
              "Price tolerance",
              "First time vs experienced keyboard buyers",
            ]}
          />

          <H4>Current customer research</H4>
          <P>
            Now that we had a better understanding of the market we dove deep into learning about their current customers to learn more about their demographics, interests, and behaviours and well as their use cases and reasons for using the products. We discovered:
          </P>
          <UL
            items={[
              "61% were using the product for gaming, 39% for content creation",
              "97% of customers were male",
              "34% of the content creator segment (13% overall) were professionals",
              "54% of the gaming market (33% overall) described themselves as \u201Cserious gamers\u201D who played for over 10 hours per week.",
              "62% of buyers were buying a mechanical keyboard for the first time when they bought their mountain product.",
            ]}
          />

          <H4>ICP development</H4>
          <P>With our research findings, we were able to segment the market in 4 segments.</P>
            <div className="mt-4 grid sm:grid-cols-2 gap-4">
              <Card>
                <h4 className="font-bold text-foreground">Serious gamers</h4>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  Male, 16-45. Plays PC games for over 10 hours per week. Not price sensitive. Has used competitors products. Values product quality and customization ability.
                </p>
              </Card>
              <Card>
                <h4 className="font-bold text-foreground">Non-serious gamers</h4>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  Male, 16-45. Plays PC games less that 10 hours per week. Price sensitive. Hasn't used competitors products. Values product quality and usability.
                </p>
              </Card>
              <Card>
                <h4 className="font-bold text-foreground">Professional content creators</h4>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  Male, 22-45. Edits video content professionally. Not price sensitive. Hasn't used competitors products. Values customization ability.
                </p>
              </Card>
              <Card>
                <h4 className="font-bold text-foreground">Amateur content creators</h4>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  Male, 18-45. Edits video content for fun. Price sensitive. Hasn't used competitors products. Values customization ability.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Phase 2 */}
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-[900px] px-6">
            <SectionHeading icon={Megaphone}>
              Phase 2 — Campaign Strategy and Development
            </SectionHeading>
          <P>Our campaign strategy focused on three key strategic initiatives:</P>
          <UL
            items={[
              "Content and messaging overhaul",
              "Paid advertising",
              "CRO (conversion rate optimization)",
            ]}
          />

          <H4>Content and messaging overhaul</H4>
          <P>
            We worked alongside the team to overhaul their content and messaging strategy. We started out by identifying the types of content that would be needed and then put together a plan for content creation/curation. We broke it down into the following content types:
          </P>
          <UL
            items={[
              "Product feature videos",
              "Product feature images",
              "User generated content",
              "User testimonials",
              "YouTuber reviews",
            ]}
          />
          <P>
            We discovered that they were sitting on a goldmine of PR assets that they were not taking advantage of. The products had been reviewed by several prominent YouTubers who had given permission to use the video assets for advertising campaigns. This content would become the cornerstone of our growth marketing campaigns.
          </P>
          <P>
            We worked with our video editing parter to create premium assets that would be used across all aspects of the campaigns.
          </P>

          <H4>Paid advertising</H4>
          <P>Our next step was to build out robust paid advertising campaigns. We broke it down into 6 steps:</P>
          <UL
            items={[
              "Platform selection: We focused on Facebook/Instagram, Twitter and YouTube. We chose these platforms as this was where our ICP were spending their time.",
              "Creative adaptation: Using the video content developed earlier, we adapted each piece of content to fit the best practices of each placement.",
              "Targeting and segmentation: We used the advanced targeting features on each platform to effectively narrow in on the our target customers based on the segments we identified.",
              "Ad spend allocation: Budgets were dynamically allocated based on real-time performance data, focusing on channels and creatives with the best results.",
              "Retargeting campaigns: We launched retargeting campaigns targeting users who interacted with our ads/landing pages but didn't convert.",
              "Analytics and Reporting: We put a strong emphasis on analytics that allowed for detailed performance tracking and informed decision-making. Regular insights and optimization recommendations were shared with everyone involved with the project.",
            ]}
          />

          <H4>CRO (conversion rate optimization)</H4>
          <P>We did a full overhaul of the client's website and landing pages. We broke it down into 5 steps:</P>
          <UL
            items={[
              "UX/UI redesign: We redesigned the website and landing pages to ensure they were intuitive and user-friendly. This involved simplifying the layout, optimizing load times and ensuring mobile responsiveness.",
              "Messaging and content optimization: Based on our ICP research, we revised the site's core messaging to speak directly to the target audience. This included highlighting success stories of successful investors, delivering up-front value to show domain expertise and addressing common concerns.",
              "Testing and optimization: We put the necessary tools in place to be able to effectively analyze data. This included several A/B tests as well as the use of Hotjar, a CRO app to track user behavior, including clicks, scrolls, and heatmaps. This data allowed us to understand how visitors interacted with the page, identify friction points, and make targeted improvements to significantly enhance user experience and conversion rates.",
            ]}
          />
          </div>
        </section>

        {/* Phase 3 */}
        <section className="py-12 md:py-16 bg-surface-alt/50">
          <div className="mx-auto max-w-[900px] px-6">
            <SectionHeading icon={TrendingUp}>Phase 3 — Refining and Scaling</SectionHeading>
          <P>
            Once our initial set of campaigns were "live", we moved towards optimizing campaigns based on data-driven insights, establishing a profitable return on ad spend (ROAS) and then the fun part - scaling successfully.
          </P>

          <H4>Data-driven optimization</H4>
          <P>
            Arguably the most important part of any paid media campaign (or marketing campaign in general) is making data driven adjustments. This involved:
          </P>
          <UL
            items={[
              "Ad-spend optimization: Adjusting our ad spend based on the performance metrics of each platform as well as each campaign within each platform.",
              "Creative rotation: We frequently rotated ad creatives to prevent ad fatigue among our target audience. This included introducing new videos based on the initial frameworks and phasing out underperforming creatives.",
              "Targeting refinement: We used the audience data across each platform to further inform our understanding on the ICP and made adjustments to the targeting based on this new information.",
              "Landing page iteration: Based on the feedback and data from our CRO tools, we made iterative changes to the landing pages. This included adjusting the messaging, layout and call-to-action buttons to improve conversion rates.",
            ]}
          />

          <H4>Scaling successfully</H4>
          <P>
            It took us 3 weeks to establish a profitable return on ad spend (ROAS). We now get to do the fun part - scaling campaign to grow the business faster. This involved:
          </P>
          <UL
            items={[
              "Increasing ad spend strategically: We gradually increased our ad spend while closely monitoring performance metrics to ensure that we maintained profitability.",
              "Broadening geographic reach: We translated ads to German and began experimenting with campaigns in Germany, Austria and Switzerland.",
              "Expanding the ICP: We started testing new types of messaging that would resonate with folks outside of the current ICPs. We found success amongst web developers/coders who could use the product in their work.",
            ]}
          />
          </div>
        </section>

        {/* Results */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-[900px] px-6">
            <SectionHeading icon={Trophy}>Results</SectionHeading>
            <div className="grid sm:grid-cols-2 gap-4 mt-2">
              <div className="bg-surface rounded-2xl p-8 border border-border shadow-sm flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 rounded-full bg-teal/10 flex items-center justify-center">
                  <BarChart3 className="w-7 h-7 text-teal" />
                </div>
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">CAC</span>
                <span className="text-4xl md:text-5xl font-extrabold text-foreground font-serif italic">41%</span>
                <span className="text-sm text-muted-foreground">Decrease in Customer Acquisition Cost, from $138 to $82 in 4 months.</span>
              </div>
              <div className="bg-surface rounded-2xl p-8 border border-border shadow-sm flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 rounded-full bg-teal/10 flex items-center justify-center">
                  <TrendingUp className="w-7 h-7 text-teal" />
                </div>
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">ROAS</span>
                <span className="text-4xl md:text-5xl font-extrabold text-foreground font-serif italic">68%</span>
                <span className="text-sm text-muted-foreground">Increase in ROAS, from 1.9 to 3.2.</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
