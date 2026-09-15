import { createFileRoute } from "@tanstack/react-router";
import { IndustryPage, type IndustryConfig } from "@/components/echo/IndustryPage";
import { videoBy } from "@/components/echo/Testimonials";

const URL = "https://echo-27.com/ecommerce";
const TITLE = "Ecommerce Marketing Agency | Echo 27";
const DESCRIPTION =
  "Paid media, creative, and conversion rate optimization for DTC and ecommerce brands, run against real margins and repeat purchase rates. Customer research first, then creative, then scale.";

const config: IndustryConfig = {
  industry: "Ecommerce",
  qualifier: "Best fit: brands with proven product-market fit and the margin to scale",
  title: "Ecommerce that pays.",
  subtitle: "Ads, creative, and a site that convert against real margins, with a return on ad spend that holds when the budget goes up.",
  subVerticals: [
    { name: "Beauty and skincare", copy: "Creator content and reviews turned into creative, with repeat purchase rate weighed as heavily as the first order." },
    { name: "Supplements and health", copy: "Compliant claims, subscription economics, and creative that survives platform review." },
    { name: "Apparel and accessories", copy: "Seasonal drops, sizing friction, and returns, all built into how we judge a campaign." },
    { name: "Food and beverage", copy: "Low-ticket, high-frequency products where subscription and bundle offers carry the margin." },
    { name: "Home and lifestyle", copy: "Considered purchases with longer paths to buy, where retargeting and email do the closing." },
    { name: "Hardware and gaming", copy: "Where we did our Mountain work: premium products, technical buyers, and PR assets most brands leave unused." },
  ],
  problems: [
    "Return on ad spend looks fine on the platform and terrible in the P&L.",
    "You're not sure who actually buys, so the creative talks to everyone.",
    "Assets you already own, reviews, press, creator content, sit unused.",
    "Scaling spend makes everything worse, not better.",
  ],
  services: [
    { title: "Customer research", copy: "Who actually buys and why, segmented by use case, seriousness, and experience. The creative and targeting are built from this, not guessed." },
    { title: "Creative from what you own", copy: "Product video, feature images, reviews, press, and creator content turned into ad assets and tested at volume until the winners compound." },
    { title: "Paid media", copy: "Meta, Google, YouTube, and TikTok with retargeting, creative rotation, and budget moved in real time to what's working." },
    { title: "Conversion on the site", copy: "Layout, speed, and messaging on the store and landing pages, tested with real users and iterated until the traffic you pay for converts." },
  ],
  measure: {
    title: "CAC and contribution margin.",
    copy: "Not platform return on ad spend. We optimize to profitability first, then scale, and we say so plainly when scaling would lose money. Repeat purchase rate counts as much as the first order.",
  },
  proof: {
    client: "Mountain",
    logo: { src: "/images/logos/mountain.svg", alt: "Mountain logo", className: "h-14 w-auto object-contain" },
    video: videoBy("Marc Lafleur"),
    tagline: "Premium gaming and content-creation hardware, recently acquired and rebuilding its growth marketing from scratch.",
    stats: [
      { value: "41%", label: "Lower customer acquisition cost, from $138 to $82 in four months" },
      { value: "68%", label: "Higher return on ad spend, from 1.9 to 3.2" },
      { value: "3 weeks", label: "To a profitable return on ad spend" },
    ],
    story:
      "We started with customer research and found four distinct segments the brand had been treating as one. We overhauled the creative using PR and creator assets the team was sitting on, built paid campaigns across Meta, Twitter, and YouTube with retargeting, and redesigned the site and landing pages for conversion. Once profitable, we scaled spend and expanded into Germany, Austria, and Switzerland.",
    caseStudy: "/case-studies/mountain-gaming",
  },
  faqs: [
    {
      q: "Do you work with our platform?",
      a: "We work in whatever stack you're on. Tracking, testing, and CRO tools get added to it, not swapped out. If something in the stack is actively costing you sales, we'll say so.",
    },
    {
      q: "How fast can we get to profitable?",
      a: "Mountain took three weeks to reach a profitable return on ad spend. Every account is different, so we set the target together on the first call and report against it from week one.",
    },
    {
      q: "Do you make the creative?",
      a: "Yes, with our video editing partner, and usually from assets you already have. Reviews, press, creator content, and product footage tend to outperform anything made from scratch.",
    },
    {
      q: "What happens when we scale spend?",
      a: "We increase budget gradually and only where performance holds, rotate creative to stay ahead of fatigue, and pull back the moment margin slips. Scaling is a decision made on data, not a default.",
    },
    {
      q: "Is there a long-term contract?",
      a: "No long lock-in. We earn next month by performing this month.",
    },
  ],
  closing: {
    title: (
      <>
        Profitable first. <span className="text-teal">Then scale.</span>
      </>
    ),
    copy: "Apply with your numbers. On the first call we'll look at your margins, your creative, and your funnel, and tell you straight whether we can bring CAC down.",
  },
};

export const Route = createFileRoute("/ecommerce")({
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
