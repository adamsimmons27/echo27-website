import { createFileRoute } from "@tanstack/react-router";
import { IndustryPage, type IndustryConfig } from "@/components/echo/IndustryPage";

const URL = "https://echo-27.com/saas";
const TITLE = "SaaS Paid Acquisition Agency | Echo 27";
const DESCRIPTION =
  "Paid acquisition for SaaS companies, measured in trials, demos, and MRR rather than clicks. Meta and Google campaigns, creative that converts, clean attribution, and strategy from a SaaS Academy coach.";

const config: IndustryConfig = {
  industry: "SaaS",
  qualifier: "Best fit: SaaS companies spending, or ready to spend, $10K+ a month on paid",
  title: "SaaS at scale.",
  subtitle: "Paid acquisition measured in trials and MRR, not clicks. Run by a SaaS Academy coach, not a generalist agency.",
  subVerticals: [
    { name: "B2B SaaS", copy: "Demo-led and sales-assisted products where a trial is a conversation, and pipeline is the number." },
    { name: "Self-serve and PLG", copy: "Free trials and freemium, where activation and trial-to-paid decide whether the ad spend worked." },
    { name: "Vertical SaaS", copy: "Software for one industry, where the audience is narrow and the creative has to speak its language." },
    { name: "Coaching and course platforms", copy: "Where we did our AttractWell work: crowded categories, competitor promotions, and offers that have to win the comparison." },
    { name: "Marketplaces", copy: "Two-sided growth where supply and demand have to be acquired at costs that still balance." },
    { name: "Apps and subscriptions", copy: "Mobile and consumer subscriptions, measured on payback against churn from day one." },
  ],
  problems: [
    "Your CAC keeps climbing and payback keeps stretching.",
    "Agencies report on clicks and impressions, not trials and MRR.",
    "You're guessing which channel actually drives pipeline.",
    "You don't have time to babysit ad accounts.",
  ],
  services: [
    { title: "Paid acquisition", copy: "Full-funnel Meta and Google campaigns built around trials, demos, and MRR, not vanity metrics." },
    { title: "Creative that converts", copy: "Founder-led and direct-response ad creative, tested at volume until the winners compound." },
    { title: "Tracking and attribution", copy: "Clean conversion tracking so you finally know what drives pipeline and what only looks like it does." },
    { title: "Growth strategy", copy: "Channel strategy and funnel guidance informed by the coaching Adam does inside SaaS Academy." },
  ],
  measure: {
    title: "CAC, payback, and MRR.",
    copy: "Those are the targets we set together on the first call, and they're what every campaign is judged against. If an account isn't tracking to them, we say so and change it. You'll never get a report about reach.",
  },
  proof: {
    client: "AttractWell",
    logo: { src: "/images/logos/attractwell.png", alt: "AttractWell logo", className: "h-20 w-auto object-contain" },
    tagline: "A coaching platform competing in a crowded category against players like Kajabi.",
    stats: [
      { value: "42%", label: "Lower cost per lead" },
      { value: "118%", label: "More trial signups" },
      { value: "3.4x", label: "Lift in return on ad spend" },
    ],
    story:
      "We rebuilt AttractWell's paid acquisition around founder-led creative, a sharper counter-offer against competitor promotions, and conversion tracking that had been under-reporting results. The outcome was a lower CAC, more qualified trials, and a repeatable trial-to-paid engine the team could scale.",
    voice: {
      name: "Adam",
      title: "Founder, Echo 27, and SaaS Academy coach",
      note: "Most agencies have never sat in a SaaS founder's seat. Adam coaches them. Echo 27 is tied to CAC, LTV, payback, and MRR, the numbers a founder actually answers for.",
    },
  },
  faqs: [
    {
      q: "We've tried agencies before and got burned. How is this different?",
      a: "Most agencies are generalists optimizing for clicks. Echo 27 is run by a SaaS Academy coach who advises SaaS founders on growth. We're tied to CAC, payback, and MRR, and we'll tell you on the first call if we can't move those numbers.",
    },
    {
      q: "What ad budget do I need to work with you?",
      a: "Our best-fit clients are spending, or ready to spend, at least $10K a month on paid. Below that, we'll usually point you toward what to fix in-house first.",
    },
    {
      q: "How fast will we see results?",
      a: "Tracking and creative fixes typically show signal in two to three weeks. Meaningful movement in CAC and trial volume usually lands inside 60 to 90 days, depending on your funnel and offer.",
    },
    {
      q: "Do you work month to month or lock me into a contract?",
      a: "We start with a 90-day engagement so there's time to build, learn, and optimize. After that it's month to month. No multi-year handcuffs.",
    },
    {
      q: "What if it doesn't work?",
      a: "We're upfront on the first call about whether we can help. If a campaign isn't tracking to the targets we set together, we say so, fix it, or refund the build. Your numbers, not ours.",
    },
  ],
  closing: {
    title: (
      <>
        Turn ad spend into <span className="text-mint">predictable growth.</span>
      </>
    ),
    copy: "Apply with your numbers. On the first call we'll look at your funnel, your spend, and your targets, and tell you straight whether we can move them.",
  },
};

export const Route = createFileRoute("/saas")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: URL },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: () => <IndustryPage c={config} />,
});
