/**
 * Shape of a landing page variant. Every visible word on the page comes from a file of this type,
 * so a trade-specific variant (HVAC, plumbing, roofing) is one duplicated file with different strings.
 */

export type Card = { title: string; body: string };

export type FaqItem = { question: string; answer: string };

export type PillarIcon = "search" | "messages" | "compass";
export type StepIcon = "phone" | "messages" | "clipboard" | "repeat" | "calendar";
export type StageIcon = "search" | "blocks" | "trending";

export type Pillar = {
  icon: PillarIcon;
  title: string;
  tagline: string;
  items: string[];
  /** The business outcome, shown under the list. */
  outcome: string;
};

/** One line of the sample text conversation. "note" lines are centred system notes, not bubbles. */
export type SmsLine = { from: "business" | "homeowner" | "note"; text: string };

export type CaseResult = {
  company: string;
  /** What kind of business it is, so nobody mistakes it for a home service client. */
  kind: string;
  stats: [{ value: string; label: string }, { value: string; label: string }];
  detail: string;
  href: string;
};

export type LandingContent = {
  meta: {
    /** Used for <title>, Open Graph, and Twitter. */
    title: string;
    description: string;
    siteName: string;
    /** Absolute URL of this page. */
    url: string;
    /** Short label for the variant, used in the JSON-LD service name. */
    variant: string;
    /** Who the service is for, in the Service schema. */
    audience: string;
  };
  brand: {
    name: string;
    /** One line for the Organization schema. */
    description: string;
  };
  /** The single conversion action. Every booking button scrolls to #book. */
  cta: {
    label: string;
    /** Shorter label for the header button. */
    short: string;
    targetId: string;
  };
  /** Display text for the header phone link. Leave it in [square brackets] until there is a real number and the link stays hidden. */
  phone: string;
  hero: {
    eyebrow: string;
    /** The headline as separate sentences. The first one carries the marker highlight. */
    headline: [string, string, string];
    subhead: string;
    subheadNote: string;
    ctaNote: string;
    /** The illustrated growth system beside the headline. */
    visual: {
      label: string;
      title: string;
      steps: { title: string; body: string; pillar: string }[];
      footer: { title: string; body: string };
    };
    trust: string[];
  };
  changed: {
    header: string;
    intro: string;
    shifts: Card[];
    turnEyebrow: string;
    keyMessage: string;
    keyBody: string;
  };
  system: {
    header: string;
    subhead: string;
    pillars: [Pillar, Pillar, Pillar];
  };
  followUp: {
    eyebrow: string;
    header: string;
    subhead: string;
    flowLabel: string;
    flow: { icon: StepIcon; title: string; body: string }[];
    sms: {
      label: string;
      business: string;
      channel: string;
      lines: SmsLine[];
      outcome: string;
      caption: string;
    };
    capabilitiesHeader: string;
    capabilities: Card[];
    integrations: { header: string; body: string; platforms: string[]; disclaimer: string };
    cta: string;
  };
  aeo: {
    eyebrow: string;
    header: string;
    body: string;
    honesty: string;
    helpHeader: string;
    items: string[];
    visual: {
      label: string;
      traditional: { title: string; caption: string };
      ai: { title: string; question: string; answers: [string, string, string]; caption: string };
      foundations: { title: string; items: string[] };
    };
    check: {
      header: string;
      body: string;
      inputLabel: string;
      placeholder: string;
      button: string;
      note: string;
      /** The existing checker page; the form sends the website there. */
      action: string;
    };
  };
  compare: {
    header: string;
    columns: [string, string];
    rows: { label: string; them: string; us: string }[];
    /** Name of the person in src/components/echo/Testimonials.tsx whose quote sits under the table. */
    quote: string;
  };
  leadership: {
    header: string;
    body: string;
    benefit: string;
    listHeader: string;
    items: string[];
    visual: {
      label: string;
      before: { title: string; you: string; vendors: string[]; note: string };
      after: { title: string; you: string; cmo: string; team: string[]; note: string };
    };
    lead: { header: string; body: string; points: [string, string, string] };
  };
  how: {
    header: string;
    steps: [{ icon: StageIcon } & Card, { icon: StageIcon } & Card, { icon: StageIcon } & Card];
  };
  proof: {
    header: string;
    subhead: string;
    cases: CaseResult[];
    caseLink: string;
    /** Names of the people in src/components/echo/Testimonials.tsx whose quotes appear here. */
    quotes: string[];
  };
  faq: {
    header: string;
    items: FaqItem[];
  };
  finalCta: {
    header: string;
    body: string;
    note: string;
  };
  booking: {
    /** Screen-reader heading for the booking region. */
    heading: string;
    embedTitle: string;
    form: {
      labels: {
        name: string;
        email: string;
        phone: string;
        company: string;
        trade: string;
        revenue: string;
        spend: string;
      };
      placeholderOption: string;
      trades: string[];
      revenue: string[];
      spend: string[];
      submit: string;
      sending: string;
      success: { title: string; body: string };
      errors: {
        required: string;
        email: string;
        phone: string;
        notConnected: string;
        failed: string;
      };
    };
  };
  footer: {
    privacyLabel: string;
    privacyHref: string;
  };
};
