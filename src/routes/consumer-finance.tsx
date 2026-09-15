import { createFileRoute } from "@tanstack/react-router";
import { IndustryPage, type IndustryConfig } from "@/components/echo/IndustryPage";
import { videoBy } from "@/components/echo/Testimonials";

const URL = "https://echo-27.com/consumer-finance";
const TITLE = "Consumer Finance Marketing Agency | Echo 27";
const DESCRIPTION =
  "Lead generation for lenders, brokers, and fintech, built around compliance and long payback windows. Search campaigns by intent, qualified-lead tracking wired to your CRM, and scaling only where qualified leads stay cheap.";

const config: IndustryConfig = {
  industry: "Consumer finance",
  qualifier: "Best fit: lenders, brokers, and fintech with a live CRM and a real customer list",
  title: "More qualified leads.",
  subtitle: "At a cost that survives the payback window. Built around compliance, qualified-lead tracking, and the long gap between the click and the funded customer.",
  subVerticals: [
    { name: "Mortgage lenders and brokers", copy: "Where we did our Society Mortgage work: purchase, refinance, and non-traditional borrowers, competing with the national names on search." },
    { name: "Personal and auto loans", copy: "High-intent search and fast follow-up, tracked to funded loans rather than applications started." },
    { name: "Credit cards and credit building", copy: "Approval-rate and compliance constraints built into the copy and the targeting from the start." },
    { name: "Insurance", copy: "Quote requests that turn into bound policies, with the tracking to tell the difference." },
    { name: "Fintech apps", copy: "Signups measured on funded accounts and retained users, not installs." },
    { name: "Financial advisors and planners", copy: "Booked consultations from people with assets to move, in the states you're licensed in." },
  ],
  problems: [
    "Cost per lead looks fine. Cost per qualified lead doesn't.",
    "National lenders outbid you on every search that matters.",
    "Tracking counts form fills, not loan-ready contacts.",
    "Compliance makes most agency playbooks unusable.",
  ],
  services: [
    { title: "Search built by intent", copy: "Three tiers of keywords: high-intent buyers, niche segments like self-employed or investment refinance, and competitor conquesting against the big names." },
    { title: "Qualified-lead tracking", copy: "Conversion tracking integrated with your CRM so bidding optimizes for verified, loan-ready contacts instead of inquiries." },
    { title: "Compliant copy and pages", copy: "Ad copy, extensions, and landing pages that pass review and still win the click on trust, speed, and accessibility." },
    { title: "Scaling by state", copy: "Budget goes up only in campaigns that keep delivering cheap qualified leads, monitored weekly against the lenders you're competing with." },
  ],
  measure: {
    title: "Cost per qualified lead.",
    copy: "Not cost per form fill. We wire tracking into your CRM so every dollar is judged on verified, loan-ready contacts, and we train the bidding on that data. It's the only number that survives a long payback window.",
  },
  proof: {
    client: "Society Mortgage",
    logo: { src: "/images/logos/society-mortgage.jpg", alt: "Society Mortgage logo" },
    video: videoBy("Molly Kauffman"),
    tagline: "A fast-growing lender operating across multiple U.S. states, competing with Rocket Mortgage, CrossCountry, and Fairway on search.",
    stats: [
      { value: "62%", label: "Lower cost per qualified lead" },
      { value: "$47 to under $20", label: "Cost per qualified lead, before and after" },
      { value: "30%", label: "Higher conversion rate from ongoing testing" },
    ],
    story:
      "We audited and rebuilt the account from the ground up: CRM-integrated tracking that counted only qualified leads, a three-tier keyword structure with competitor conquesting, new ad copy and extensions, Target CPA bidding trained on CRM data, and 250 negative keywords to cut low-intent traffic. Society's ads began outranking Rocket Mortgage and Fairway on competitor and non-branded searches.",
    caseStudy: "/case-studies/society-mortgage",
  },
  faqs: [
    {
      q: "We're regulated. Can you work inside that?",
      a: "Yes. Copy, extensions, and landing pages are built to pass review from the start, not bolted on after. If something can't be said, we find the version that can.",
    },
    {
      q: "Do you need access to our CRM?",
      a: "Yes. Qualified-lead tracking depends on it. We connect conversion tracking to the stage in your CRM that means a real, verified contact, so the platforms optimize toward that instead of raw inquiries.",
    },
    {
      q: "How long before qualified leads get cheaper?",
      a: "The audit and rebuild come first, because bidding on bad data only gets you more bad data faster. Cost per qualified lead moves once the tracking is honest, and it keeps moving as the bidding learns from your CRM.",
    },
    {
      q: "Which channels do you run?",
      a: "Google Search is the core, because that's where intent lives in lending. Meta where it earns its place. We'll tell you on the first call what makes sense for your products and states.",
    },
    {
      q: "Is there a long-term contract?",
      a: "No long lock-in. We earn next month by performing this month, and we keep clients because the numbers hold, not because they're stuck.",
    },
  ],
  closing: {
    title: (
      <>
        Outrank the national lenders <span className="text-teal">on the searches that matter.</span>
      </>
    ),
    copy: "Apply with your numbers. On the first call we'll look at your account, your tracking, and your states, and tell you straight whether we can bring cost per qualified lead down.",
  },
};

export const Route = createFileRoute("/consumer-finance")({
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
