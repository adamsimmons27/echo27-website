/**
 * Shape of a landing page variant. Every visible word on the page comes from a file of this type,
 * so a trade-specific variant (HVAC, plumbing, roofing) is one duplicated file with different strings.
 */

export type IconName =
  | "compass"
  | "megaphone"
  | "search"
  | "mouse-pointer-click"
  | "star"
  | "phone-call"
  | "refresh"
  | "bar-chart";

export type Card = { title: string; body: string };

export type CompareRow = {
  label: string;
  /** Values in column order: typical agency, in-house hire, Echo 27. */
  values: [string, string, string];
};

export type CaseStudy = {
  company: string;
  situation: string;
  change: string;
  result: string;
};

export type FaqItem = { question: string; answer: string };

export type LandingContent = {
  meta: {
    /** Used for <title>, Open Graph, and Twitter. */
    title: string;
    description: string;
    siteName: string;
    /** Absolute URL of this page. Overridden by NEXT_PUBLIC_SITE_URL when set. */
    url: string;
    /** Short label for the variant, used in the OG image and JSON-LD service name. */
    variant: string;
  };
  brand: {
    name: string;
    /** One line for the Organization schema. */
    description: string;
  };
  /** The single conversion action. Every button on the page uses this label and scrolls to #book. */
  cta: {
    label: string;
    targetId: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    subhead: string;
    ctaNote: string;
    trust: [string, string, string];
  };
  problem: {
    header: string;
    cards: [Card, Card, Card];
  };
  shift: {
    header: string;
    body: string;
    mock: {
      question: string;
      answers: [string, string, string];
    };
    miniCta: string;
  };
  offer: {
    header: string;
    subhead: string;
    items: { icon: IconName; label: string }[];
  };
  why: {
    header: string;
    columns: [string, string, string];
    /** Index of the column to highlight. */
    highlight: 0 | 1 | 2;
    rows: CompareRow[];
    points: [Card, Card, Card];
  };
  proof: {
    header: string;
    labels: { situation: string; change: string; result: string };
    cases: [CaseStudy, CaseStudy, CaseStudy];
  };
  how: {
    header: string;
    steps: [Card, Card, Card, Card];
  };
  fit: {
    forYou: { header: string; items: [string, string, string] };
    notForYou: { header: string; items: [string, string, string] };
  };
  faq: {
    header: string;
    items: FaqItem[];
  };
  finalCta: {
    header: string;
    body: string;
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
