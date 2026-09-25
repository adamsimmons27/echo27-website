import type { LandingContent } from "./types";

/**
 * Fractional CMO landing page, home services (all trades).
 *
 * To make a trade-specific variant: copy this file to src/content/fractional-cmo.hvac.ts, change the strings,
 * add a route file like src/routes/fractional-cmo.tsx that imports it, and add the URL to public/sitemap.xml.
 *
 * Rules for every string in here:
 * - No em dashes. Use periods or commas.
 * - No invented stats, client names, logos, or testimonials. Placeholders are wrapped in [square brackets].
 */
export const fractionalCmo: LandingContent = {
  meta: {
    title: "Fractional CMO for Home Service Companies | Echo 27",
    description:
      "Echo 27 takes ownership of your whole growth engine, from ads and search to the AI answers homeowners now trust, with a senior team based entirely in North America.",
    siteName: "Echo 27",
    url: "https://echo-27.com/fractional-cmo",
    variant: "Home Services",
  },

  brand: {
    name: "Echo 27",
    description: "Fractional CMO and growth marketing for home service companies.",
  },

  cta: {
    label: "Book a Growth Audit",
    targetId: "book",
  },

  hero: {
    eyebrow: "For home service companies doing $1M to $10M",
    headline: "Your entire marketing department, run by a fractional CMO who owns the growth number.",
    subhead:
      "Stop juggling an SEO guy, an ads agency, and a web person who never talk to each other. Echo 27 takes ownership of your whole growth engine, from ads and search to the AI answers homeowners now trust, with a senior team based entirely in North America.",
    ctaNote:
      "30 minutes. We'll show you where you're losing booked jobs, including whether AI search recommends you or your competitor.",
    trust: ["12+ years in performance marketing", "23+ industries served", "100% North American team"],
  },

  problem: {
    header: "You've outgrown agencies. You're not ready for a $250K CMO.",
    cards: [
      {
        title: "Nobody owns the result.",
        body: "Your ads agency blames the website. The web guy blames the leads. The SEO company sends a report nobody reads. You're the one stitching it together at 9pm.",
      },
      {
        title: "You're paying for junior work.",
        body: "Most agencies sell you on the founder, then hand your account to a coordinator or an overseas contractor who has never seen a service truck.",
      },
      {
        title: "The basics stopped being enough.",
        body: "Everyone in your market runs Google Ads and LSAs now. Costs keep climbing and the same playbook gets you less every year.",
      },
    ],
  },

  shift: {
    header: "Homeowners are changing how they find you. Most contractors haven't noticed.",
    body: "A growing share of homeowners now ask ChatGPT, Google's AI Overviews, and voice assistants who to call. Those tools name a handful of companies, not ten blue links. Getting named is a different discipline called answer engine optimization, or AEO. Most agencies aren't doing it. The companies that establish themselves in AI answers now will be very hard to displace later.",
    mock: {
      question: "Who's the best HVAC company near me?",
      answers: ["[Your competitor]", "[Another competitor]", "[Not you, yet]"],
    },
    miniCta: "See if AI recommends you. It's part of the free audit.",
  },

  offer: {
    header: "One team. One strategy. One number we're accountable for.",
    subhead:
      "We operate as your marketing department, led by a fractional CMO who sits in your leadership meetings and reports on revenue, not clicks.",
    items: [
      { icon: "compass", label: "Strategy and budget allocation" },
      { icon: "megaphone", label: "Google Ads, LSAs, and Meta" },
      { icon: "search", label: "SEO and AEO (AI search visibility)" },
      { icon: "mouse-pointer-click", label: "Website and landing page conversion" },
      { icon: "star", label: "Reviews and reputation" },
      {
        icon: "phone-call",
        label: "Call tracking, CRM, and follow-up automation (ServiceTitan, Housecall Pro, Jobber, GoHighLevel)",
      },
      { icon: "refresh", label: "Reactivation and membership marketing to your existing customer list" },
      { icon: "bar-chart", label: "Reporting tied to booked jobs and revenue" },
    ],
  },

  why: {
    header: "What makes this different from the agency you just fired",
    columns: ["Typical agency", "In-house hire", "Echo 27"],
    highlight: 2,
    rows: [
      { label: "Who owns strategy", values: ["You do", "One person, one skillset", "Your fractional CMO"] },
      {
        label: "Who does the work",
        values: ["Juniors and offshore contractors", "One generalist", "Senior North American specialists"],
      },
      { label: "AI and AEO capability", values: ["Rarely", "Depends on the hire", "Built into everything"] },
      { label: "Accountable for", values: ["Clicks and impressions", "Activity", "Booked jobs and revenue"] },
      {
        label: "Cost",
        values: ["Multiple retainers", "$150K to $400K+ in payroll", "One fee, a fraction of a department"],
      },
      {
        label: "Speed to launch",
        values: ["Weeks of onboarding per vendor", "Months to hire and ramp", "Live in two weeks"],
      },
    ],
    points: [
      {
        title: "AI-native, not AI-curious.",
        body: "We use AI across research, creative, and optimization so you get more output and faster testing than a team three times the size.",
      },
      {
        title: "100% North American team.",
        body: "Senior people in your time zones who understand your market and pick up the phone.",
      },
      {
        title: "12+ years of performance marketing.",
        body: "Across 23+ industries, so we bring what's working elsewhere into a category that's slow to adapt.",
      },
    ],
  },

  proof: {
    header: "Results we've driven",
    labels: { situation: "The situation", change: "What we changed", result: "Result" },
    cases: [
      {
        company: "[CASE STUDY 1: company type, revenue size]",
        situation: "[PLACEHOLDER: the situation when they came to us]",
        change: "[PLACEHOLDER: what we changed]",
        result: "[PLACEHOLDER: the result, with a real number]",
      },
      {
        company: "[CASE STUDY 2: company type, revenue size]",
        situation: "[PLACEHOLDER: the situation when they came to us]",
        change: "[PLACEHOLDER: what we changed]",
        result: "[PLACEHOLDER: the result, with a real number]",
      },
      {
        company: "[CASE STUDY 3: company type, revenue size]",
        situation: "[PLACEHOLDER: the situation when they came to us]",
        change: "[PLACEHOLDER: what we changed]",
        result: "[PLACEHOLDER: the result, with a real number]",
      },
    ],
  },

  how: {
    header: "How it works",
    steps: [
      {
        title: "Growth Audit (free).",
        body: "We review your ads, site, tracking, reviews, and AI search visibility.",
      },
      {
        title: "90-Day Plan.",
        body: "You get a prioritized roadmap with budget and targets, whether or not you hire us.",
      },
      {
        title: "We take over.",
        body: "Onboarding in the first two weeks, quick wins in the first 30 days.",
      },
      {
        title: "Weekly and monthly rhythm.",
        body: "A standing call with your CMO, plus a dashboard tied to booked jobs.",
      },
    ],
  },

  fit: {
    forYou: {
      header: "This is for you if:",
      items: [
        "you're doing $1M to $10M in revenue",
        "you have capacity to take on more jobs",
        "you want one accountable partner instead of a pile of vendors.",
      ],
    },
    notForYou: {
      header: "This is not for you if:",
      items: [
        "you're under $1M",
        "you're shopping for the cheapest option",
        "you want a vendor to take orders rather than a leader to make decisions.",
      ],
    },
  },

  faq: {
    header: "Frequently asked questions",
    items: [
      { question: "How is this different from a marketing agency?", answer: "[ANSWER]" },
      { question: "What does it cost?", answer: "[ANSWER, will include a starting price]" },
      { question: "Do you work with my competitors?", answer: "[ANSWER]" },
      { question: "What is AEO and does it matter for my trade?", answer: "[ANSWER]" },
      {
        question: "Do I keep ownership of my ad accounts, website, and data?",
        answer: "Yes. Everything is built in accounts you own. If we ever part ways, you keep all of it.",
      },
      { question: "How long until I see results?", answer: "[ANSWER]" },
      { question: "What's the commitment?", answer: "[ANSWER]" },
    ],
  },

  finalCta: {
    header: "Find out where your next $1M in booked jobs is hiding.",
    body: "Book the Growth Audit. You'll leave with a clear picture of what's working, what's wasted, and whether AI search is sending your jobs to a competitor.",
  },

  booking: {
    heading: "Book your Growth Audit",
    embedTitle: "Book a Growth Audit",
    form: {
      labels: {
        name: "Name",
        email: "Email",
        phone: "Phone",
        company: "Company",
        trade: "Trade",
        revenue: "Annual revenue",
        spend: "Current monthly marketing spend",
      },
      placeholderOption: "Select one",
      trades: ["HVAC", "Plumbing", "Roofing", "Electrical", "Other home service"],
      revenue: ["Under $1M", "$1M to $3M", "$3M to $5M", "$5M to $10M", "$10M+"],
      spend: ["Under $5K", "$5K to $15K", "$15K to $30K", "$30K to $60K", "$60K+"],
      submit: "Book a Growth Audit",
      sending: "Sending",
      success: {
        title: "Got it. Thanks.",
        body: "We'll email you to schedule your Growth Audit.",
      },
      errors: {
        required: "This field is required.",
        email: "Enter a valid email address.",
        phone: "Enter a valid phone number.",
        notConnected: "This form isn't taking submissions right now. Please try again shortly.",
        failed: "Something went wrong sending that. Please try again in a moment.",
      },
    },
  },

  footer: {
    privacyLabel: "Privacy policy",
    /** Leave empty until the policy page exists; the footer then shows a bracketed placeholder instead of a dead link. */
    privacyHref: "/privacy",
  },
};

export type { LandingContent } from "./types";
