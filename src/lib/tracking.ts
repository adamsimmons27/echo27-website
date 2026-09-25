type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Fires one event to whichever tags are present. Safe to call anywhere: it does nothing on the server
 * and never throws if a tag is missing or blocked.
 */
export function track(eventName: string, params: Params = {}): void {
  if (typeof window === "undefined") return;
  try {
    window.fbq?.("trackCustom", eventName, params);
  } catch {
    /* tag blocked or broken; ignore */
  }
  try {
    window.gtag?.("event", eventName, params);
  } catch {
    /* tag blocked or broken; ignore */
  }
}
