/** Shared between the AI Search Readiness page and its server routes. Safe to import in the browser. */

export const CATEGORIES = [
  "HVAC",
  "Plumbing",
  "Roofing",
  "Electrical",
  "Landscaping",
  "Garage doors",
  "Pest control",
  "Cleaning",
  "Painting",
  "Other home service",
] as const;
export type Category = (typeof CATEGORIES)[number];

export type ScanInput = { url: string; category: Category; city: string; company?: string };

export type CategoryId = "crawler" | "coverage" | "answers" | "trust" | "schema" | "experience";

export const CATEGORY_META: Record<CategoryId, { label: string; max: number }> = {
  crawler: { label: "AI crawler accessibility", max: 20 },
  coverage: { label: "Service and location coverage", max: 25 },
  answers: { label: "Answer-friendly content", max: 20 },
  trust: { label: "Trust and credibility", max: 20 },
  schema: { label: "Structured data", max: 10 },
  experience: { label: "Page experience", max: 5 },
};

export type CheckStatus = "pass" | "partial" | "fail" | "unknown";
export type Effort = "quick" | "medium" | "bigger";

export type Evidence = { url?: string; quote?: string; note?: string };

export type Check = {
  id: string;
  category: CategoryId;
  label: string;
  points: number;
  status: CheckStatus;
  /** Null when the check could not be verified. */
  earned: number | null;
  finding: string;
  fix: string;
  effort: Effort;
  evidence: Evidence[];
};

export type CategoryScore = {
  id: CategoryId;
  label: string;
  max: number;
  earned: number;
  /** Points that could actually be tested. Lower than max when checks are unverified. */
  verifiedMax: number;
  unverified: number;
};

export type Issue = Pick<Check, "id" | "label" | "finding" | "status" | "category">;

export type Counts = Record<CheckStatus, number>;

/** Everything a visitor sees before the email gate. Holds no fixes or evidence. */
export type Teaser = {
  reportId: string;
  url: string;
  host: string;
  city: string;
  category: string;
  /** Null when too little could be verified to give an honest overall score. */
  score: number | null;
  verifiedPoints: number;
  categories: CategoryScore[];
  counts: Counts;
  issues: Issue[];
  pagesReviewed: number;
  createdAt: string;
  /** Development only: integrations with no credentials. */
  missingSetup?: string[];
};

export type PlanStep = { checkId: string; label: string; fix: string };

export type Report = Teaser & {
  checks: Check[];
  priorities: Check[];
  plan: { thisWeek: PlanStep[]; thisMonth: PlanStep[]; next90Days: PlanStep[] };
  pages: { url: string; kinds: string[]; source: "firecrawl" | "direct" }[];
};

export type ScanEvent =
  | { type: "progress"; percent: number; message: string; detail?: string }
  | { type: "result"; teaser: Teaser }
  | { type: "error"; message: string };

export const CONSENT_TEXT =
  "Yes, Echo 27 can email me marketing and follow-up about my website. I can unsubscribe at any time.";

export type UnlockInput = {
  reportId: string;
  name: string;
  email: string;
  marketingConsent: boolean;
  attribution?: Record<string, string>;
  company?: string;
};
