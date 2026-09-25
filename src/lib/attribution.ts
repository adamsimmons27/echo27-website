const KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "fbclid", "gclid"] as const;
const STORAGE_KEY = "e27_attribution";

export type Attribution = Partial<Record<(typeof KEYS)[number], string>> & {
  landing_page?: string;
  referrer?: string;
};

/** Reads UTM and click ids from the current URL and keeps them for the session. Call once on load. */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const found: Attribution = {};
    for (const key of KEYS) {
      const value = params.get(key);
      if (value) found[key] = value.slice(0, 200);
    }
    const existing = getAttribution();
    if (Object.keys(found).length === 0 && Object.keys(existing).length > 0) return;
    const merged: Attribution = {
      landing_page: existing.landing_page ?? window.location.href.slice(0, 500),
      referrer: existing.referrer ?? document.referrer.slice(0, 500),
      ...existing,
      ...found,
    };
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch {
    /* storage unavailable; attribution is best effort */
  }
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}
