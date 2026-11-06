import type { LandingContent } from "./types";

/**
 * Fractional CMO landing page, home services (all trades).
 *
 * To make a trade-specific variant: copy this file to src/content/fractional-cmo.hvac.ts, change the strings,
 * add a route file like src/routes/fractional-cmo.tsx that imports it, and add the URL to public/sitemap.xml.
 *
 * Rules for every string in here:
 * - No em dashes and no exclamation marks. Use periods or commas.
 * - No invented stats, client names, logos, or testimonials. Quotes come from src/components/echo/Testimonials.tsx
 *   and the two results come from the published case study pages.
 * - No promise that an AI platform will recommend anyone, and no claim that every feature works with every platform.
 */
export const fractionalCmo: LandingContent = {
  meta: {
    title: "Fractional CMO for Home Service Businesses | Echo 27",
    description:
      "Echo 27 gives home service businesses a Fractional CMO, a marketing team, and AI lead follow-up. Ads, SEO, and AEO that turn more inquiries into booked jobs.",
    siteName: "Echo 27",
    url: "https://echo-27.com/fractional-cmo",
    variant: "Home Services",
    audience: "Home service businesses generating $1M to $10M in annual revenue",
  },

  brand: {
    name: "Echo 27",
    description: "The AI-powered growth department for home service businesses.",
  },

  cta: {
    label: "Book Your Free Growth Audit",
    short: "Book a Free Audit",
    targetId: "book",
  },

  /** Shown in the header as a tel: link once it holds a real number. While it is in brackets the link is hidden. */
  phone: "[PHONE]",

  hero: {
    eyebrow: "The AI-powered growth department for home service businesses",
    headline: ["More Booked Jobs.", "Less Wasted Ad Spend.", "One Team Accountable for Growth."],
    subhead:
      "Get a Fractional CMO, an experienced marketing team, and AI-powered systems that attract more customers, follow up with leads automatically, and help turn more inquiries into booked jobs.",
    subheadNote: "All without building an expensive in-house marketing department.",
    ctaNote: "For home service businesses generating $1M to $10M annually.",
    visual: {
      label:
        "Illustration of the growth system: a homeowner searches, contacts the business, gets an AI response in seconds, and books a job, with a Fractional CMO accountable for every step",
      title: "Your growth system",
      steps: [
        { title: "A homeowner searches", body: "Google, Maps, and AI answers", pillar: "Get found" },
        { title: "They call or request an estimate", body: "Ads and landing pages built to convert", pillar: "Get found" },
        { title: "AI responds in seconds", body: "Voice, text, and missed-call recovery", pillar: "Convert" },
        { title: "The job is booked", body: "On your schedule, with the details your team needs", pillar: "Convert" },
      ],
      footer: { title: "Your Fractional CMO", body: "One leader accountable for every step." },
    },
    trust: [
      "$12M+ in ad spend managed",
      "12+ years in performance marketing",
      "23+ industries served",
      "100% North American team",
    ],
  },

  changed: {
    header: "Marketing Has Changed. Has Your Agency?",
    intro: "The playbook that filled schedules a few years ago costs more and delivers less today.",
    shifts: [
      {
        title: "Google Ads keeps getting more competitive.",
        body: "More companies bid on the same searches in your service area, so every wasted click costs you more.",
      },
      {
        title: "Homeowners are asking AI who to call.",
        body: "ChatGPT and Google's AI answers name a few businesses, not a page of links.",
      },
      {
        title: "Speed wins the job.",
        body: "Homeowners expect a fast answer when they call or request an estimate. If they wait, they call the next company.",
      },
      {
        title: "Unanswered leads are lost revenue.",
        body: "A missed call or an estimate nobody followed up on is money you already paid to earn.",
      },
      {
        title: "Most agencies still report clicks.",
        body: "Impressions, clicks, and a monthly report. None of it tells you how many jobs were booked.",
      },
    ],
    turnEyebrow: "A different approach",
    keyMessage: "Most agencies generate leads. We build the entire system that turns those leads into revenue.",
    keyBody:
      "Echo 27 works as your growth department. One team covers how homeowners find you, what happens when they reach out, and who is accountable for the result.",
  },

  system: {
    header: "The Complete Growth System",
    subhead: "Three parts, one team, and one goal: more booked jobs.",
    pillars: [
      {
        icon: "search",
        title: "Get Found",
        tagline: "Be the company homeowners find, in traditional search and in AI-powered search.",
        items: ["Google Ads", "Meta Ads", "SEO and local search", "AEO for AI search", "Conversion-focused landing pages"],
        outcome: "More of the right homeowners finding you and reaching out.",
      },
      {
        icon: "messages",
        title: "Convert More Leads",
        tagline: "Answer every lead fast, and keep following up until they book.",
        items: ["AI voice agents", "Automated SMS follow-up", "Missed-call recovery", "Lead nurturing", "Appointment scheduling"],
        outcome: "More booked jobs from the demand you already generate.",
      },
      {
        icon: "compass",
        title: "Grow Smarter",
        tagline: "A senior marketing leader who owns the plan and the numbers.",
        items: ["Fractional CMO strategy", "Marketing execution", "Performance tracking", "Continuous optimization"],
        outcome: "Every part of your marketing working toward the same goal.",
      },
    ],
  },

  followUp: {
    eyebrow: "Your marketing doesn't stop when a lead comes in",
    header: "The Leads You're Already Paying For Could Be Worth More.",
    subhead:
      "Getting someone interested is only half the battle. What happens after they call or submit a form can make the difference between a lost opportunity and a booked job.",
    flowLabel: "How a lead moves through AI follow-up, from first contact to a booked appointment",
    flow: [
      { icon: "phone", title: "New lead", body: "A call, form, or message comes in." },
      { icon: "messages", title: "AI response", body: "Answered by voice or text in seconds, day or night." },
      { icon: "clipboard", title: "Qualification", body: "Service needed, location, and timing confirmed." },
      { icon: "repeat", title: "Follow-up", body: "Reminders and check-ins until they decide." },
      { icon: "calendar", title: "Booked appointment", body: "On your schedule with the details your team needs." },
    ],
    sms: {
      label: "Example text conversation: a missed call is answered by text, the homeowner's problem is qualified, and a visit is booked",
      business: "Acme Heating & Air",
      channel: "Text message",
      lines: [
        { from: "note", text: "Missed call, 7:42 pm" },
        { from: "business", text: "Hi, this is Acme Heating & Air. Sorry we missed your call. What can we help you with?" },
        { from: "homeowner", text: "Our furnace stopped working and the house is getting cold" },
        { from: "business", text: "Sorry to hear that. Is it blowing cold air, or not turning on at all?" },
        { from: "homeowner", text: "Not turning on at all" },
        { from: "business", text: "Understood. We can have a technician there tomorrow between 8 and 10 am, or between 1 and 3 pm. Which works better?" },
        { from: "homeowner", text: "8 to 10 please" },
        { from: "business", text: "You're booked for tomorrow, 8 to 10 am. We'll text you when the technician is on the way." },
      ],
      outcome: "Appointment added to the schedule",
      caption: "An example. Yours runs in your business name, with your services, hours, and booking rules.",
    },
    capabilitiesHeader: "What the system does for you",
    capabilities: [
      { title: "AI voice answering", body: "Incoming calls and after-hours inquiries get picked up, not sent to voicemail." },
      { title: "Automated SMS responses", body: "Form requests and messages get a reply while the homeowner is still looking." },
      { title: "Missed-call text-back", body: "If a call slips through, the caller gets a text asking how you can help." },
      { title: "AI-powered lead qualification", body: "The questions your office would ask, answered before anyone is dispatched." },
      { title: "Appointment scheduling", body: "Qualified leads are offered a time and booked." },
      { title: "Estimate follow-up", body: "Sequences for open estimates and leads that went quiet." },
      { title: "Customer reactivation", body: "Campaigns that bring past customers back for the next job." },
    ],
    integrations: {
      header: "Built around the tools you already run",
      body: "Our systems can integrate with major platforms such as ServiceTitan, Jobber, Housecall Pro, GoHighLevel, and other tools. What connects, and how, depends on what each platform and your plan support. We confirm your setup during the audit.",
      platforms: ["ServiceTitan", "Jobber", "Housecall Pro", "GoHighLevel"],
      disclaimer: "Platform names belong to their owners. Echo 27 is not certified by or affiliated with these companies.",
    },
    cta: "See How AI Follow-Up Could Work for Your Business",
  },

  aeo: {
    eyebrow: "The next era of search is already here",
    header: "Will AI Recommend Your Business or Your Competitor?",
    body: "Homeowners are increasingly using ChatGPT and Google's AI-powered search to research who to call. Those tools give a short answer that names a few businesses, not a page of links. You still need strong visibility in traditional search, and you need to be a business AI can understand and trust.",
    honesty:
      "Nobody can guarantee a recommendation in ChatGPT or any other AI platform, and we won't promise one. We get the foundations right and track where you show up.",
    helpHeader: "What we work on",
    items: [
      "Answer engine optimization (AEO) strategy",
      "Traditional SEO foundations",
      "Local search visibility",
      "Structured business information",
      "Helpful, authoritative service content",
      "Website technical improvements",
      "AI search visibility monitoring",
    ],
    visual: {
      label:
        "Illustration comparing traditional search, which shows a page of links, with AI search, which names a few businesses, and the foundations both rely on",
      traditional: { title: "Traditional search", caption: "A page of links. The homeowner picks." },
      ai: {
        title: "AI search",
        question: "Who should I call for a leaking water heater?",
        answers: ["A competitor", "Another competitor", "Your business?"],
        caption: "A short answer that names a few businesses.",
      },
      foundations: {
        title: "Both rely on the same foundations",
        items: ["Accurate business information", "Reviews and reputation", "Helpful service content", "A technically sound website"],
      },
    },
    check: {
      header: "How ready is your website for AI search?",
      body: "Enter your website. Our free checker reads up to 10 of your pages and scores them out of 100 for AI search readiness. It takes about a minute.",
      inputLabel: "Your website",
      placeholder: "yourcompany.com",
      button: "Check Your AI Search Visibility",
      note: "A real audit of your site, not an estimate. The full report asks for your email.",
      action: "/ai-search-readiness",
    },
  },

  compare: {
    header: "The Difference Between Echo\u00a027 and Traditional Agencies",
    columns: ["Traditional agency", "Echo 27"],
    rows: [
      { label: "The goal", them: "Lead generation", us: "Booked job optimization" },
      { label: "The scope", them: "Individual campaigns", us: "A complete growth system" },
      { label: "Lead follow-up", them: "Basic automation", us: "AI-powered voice and SMS follow-up" },
      { label: "Search", them: "Traditional SEO", us: "SEO plus AEO" },
      { label: "Who leads", them: "An account manager", us: "A Fractional CMO" },
      { label: "Reporting", them: "Clicks and cost per lead", us: "Revenue-focused performance tracking" },
      { label: "The team", them: "Separate vendors", us: "One coordinated team" },
    ],
    quote: "Tobias Brinkmann",
  },

  leadership: {
    header: "A Marketing Leader in Your Corner. An Entire Team Behind Them.",
    body: "You shouldn't have to coordinate an ads agency, an SEO company, a web developer, and an automation specialist. Your Fractional CMO sets the strategy, directs the team, and answers for the results.",
    benefit: "You focus on running the business. An experienced team works on growing it.",
    listHeader: "What your Fractional CMO oversees",
    items: [
      "Growth strategy and planning",
      "Paid advertising oversight",
      "Landing page optimization",
      "AI automation implementation",
      "SEO and AEO",
      "Marketing analytics",
      "Conversion optimization",
      "Team coordination",
      "Ongoing improvements",
    ],
    visual: {
      label:
        "Illustration of two setups. Without a marketing leader, the owner coordinates four separate vendors. With Echo 27, the owner works with one Fractional CMO who directs the whole team.",
      before: {
        title: "Without a marketing leader",
        you: "You",
        vendors: ["Ads agency", "SEO company", "Web developer", "Automation freelancer"],
        note: "Four vendors, four reports, and you in the middle.",
      },
      after: {
        title: "With Echo 27",
        you: "You",
        cmo: "Your Fractional CMO",
        team: ["Paid ads", "SEO and AEO", "Website", "AI follow-up"],
        note: "One conversation, one plan, one number.",
      },
    },
    lead: {
      header: "Who leads your account",
      body: "Adam Simmons leads every Echo 27 engagement. He's spent 12 years running paid media on Google, Meta, TikTok, and YouTube across 23+ industries, built a class-based business past $1M and sold it, and coaches growth-stage founders inside SaaS Academy. He sits in your leadership meeting, not a coordinator.",
      points: [
        "Built and sold a seven-figure service business",
        "12+ years buying media on every major platform",
        "Coach inside SaaS Academy",
      ],
    },
  },

  how: {
    header: "How It Works",
    steps: [
      {
        icon: "search",
        title: "Find the Opportunities",
        body: "We audit your existing advertising, website, lead conversion processes, search visibility, and marketing performance.",
      },
      {
        icon: "blocks",
        title: "Build Your Growth System",
        body: "We create the strategy, implement the highest-impact improvements, and connect customer acquisition with AI-powered follow-up.",
      },
      {
        icon: "trending",
        title: "Optimize for Revenue",
        body: "Your Fractional CMO continuously monitors performance and looks for opportunities to generate more qualified inquiries and booked jobs.",
      },
    ],
  },

  proof: {
    header: "Results From Accounts We Run",
    subhead:
      "Two published case studies and what clients say. These two clients are outside home services. The method is the same one we bring to yours: fix the tracking, cut the waste, and improve what happens after the click.",
    cases: [
      {
        company: "Society Mortgage",
        kind: "Mortgage lender",
        stats: [
          { value: "62%", label: "lower cost per lead" },
          { value: "128%", label: "more qualified leads" },
        ],
        detail: "Cost per lead went from $47 to $18 in 90 days.",
        href: "/case-studies/society-mortgage",
      },
      {
        company: "Mountain",
        kind: "Consumer hardware brand",
        stats: [
          { value: "41%", label: "lower customer acquisition cost" },
          { value: "68%", label: "higher return on ad spend" },
        ],
        detail: "Acquisition cost went from $138 to $82 in four months.",
        href: "/case-studies/mountain-gaming",
      },
    ],
    caseLink: "Read the case study",
    quotes: ["Justin Lui", "Lou Jimenez"],
  },

  faq: {
    header: "Questions Owners Ask Us",
    items: [
      {
        question: "How is this different from a marketing agency?",
        answer:
          "An agency runs campaigns and reports on leads. We run the whole path from the first search to the booked job: ads and search to get you found, AI follow-up on every lead, and a Fractional CMO who owns the plan and reports on revenue.",
      },
      {
        question: "Do I need to understand AI to use this?",
        answer:
          "No. We set up, train, and manage the voice and text systems. What you see is answered calls, booked appointments, and a plain report on what it handled.",
      },
      {
        question: "Will it work with the software we already use?",
        answer:
          "In most cases, yes. Our systems can integrate with major platforms such as ServiceTitan, Jobber, Housecall Pro, and GoHighLevel. What connects depends on your platform, your plan, and the access it allows, so we review your setup during the audit and tell you exactly what is possible before anything is built.",
      },
      {
        question: "Do we have to replace what we have now?",
        answer:
          "No. We start with the audit, keep what is working, and fix or replace only what is costing you booked jobs. There is no software migration and nothing gets rebuilt for the sake of it.",
      },
      {
        question: "What does it cost?",
        answer:
          "One monthly fee based on the scope your business needs. We set it out after the audit, before you commit to anything. It is built to cost less than hiring a marketing leader plus the specialists they would need. The audit itself is free.",
      },
      {
        question: "How long does it take to get started?",
        answer:
          "Onboarding happens in the first two weeks, and the first improvements go live in the first 30 days. The timing for AI follow-up depends on your phone system and software, which we confirm during the audit.",
      },
      {
        question: "Can you guarantee that ChatGPT will recommend us?",
        answer:
          "No, and nobody honestly can. AI platforms decide what they recommend. We improve the things they rely on, such as accurate business information, reviews, helpful service content, and a technically sound website, and we monitor where you appear.",
      },
      {
        question: "Do I keep ownership of my ad accounts, website, and data?",
        answer: "Yes. Everything is built in accounts you own. If we ever part ways, you keep all of it.",
      },
    ],
  },

  finalCta: {
    header: "Your Next Stage of Growth Starts With a Better System.",
    body: "We'll show you where your business may be losing opportunities, how AI could improve your lead conversion, and what we'd prioritize to generate more booked jobs.",
    note: "No generic marketing pitch. Just a practical conversation about growing your business.",
  },

  booking: {
    heading: "Book your free Growth Audit",
    embedTitle: "Book your free Growth Audit",
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
      trades: ["HVAC", "Plumbing", "Electrical", "Roofing", "Landscaping", "Appliance repair", "Remodeling", "Other home service"],
      revenue: ["Under $1M", "$1M to $3M", "$3M to $5M", "$5M to $10M", "$10M+"],
      spend: ["Under $5K", "$5K to $15K", "$15K to $30K", "$30K to $60K", "$60K+"],
      submit: "Book Your Free Growth Audit",
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
    privacyHref: "/privacy",
  },
};

export type { LandingContent } from "./types";
