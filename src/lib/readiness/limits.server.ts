import { createHash } from "node:crypto";
import { getRequestIP } from "@tanstack/react-start/server";

/**
 * Per-visitor speed bumps, kept in memory per server instance. They slow abuse down; the hard caps on spend are the
 * monthly limits set in each provider's dashboard.
 */

const WINDOW_MS = 60 * 60 * 1000;
const buckets = new Map<string, number[]>();

export function clientIp(): string {
  try {
    return getRequestIP({ xForwardedFor: true }) ?? "unknown";
  } catch {
    return "unknown";
  }
}

/** Visitors are never stored by raw address. */
export const hashIp = (ip: string) => createHash("sha256").update(`readiness:${ip}`).digest("hex").slice(0, 32);

export function allow(key: string, limit: number): boolean {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= limit) return false;
  recent.push(now);
  buckets.set(key, recent);
  if (buckets.size > 10_000) {
    for (const [k, v] of buckets) if (!v.some((t) => now - t < WINDOW_MS)) buckets.delete(k);
  }
  return true;
}

/** Only this many audits run at once per instance, so one burst can't exhaust the function's time or the API budgets. */
let running = 0;
export const MAX_CONCURRENT = 4;
export function acquireSlot(): (() => void) | null {
  if (running >= MAX_CONCURRENT) return null;
  running++;
  let released = false;
  return () => {
    if (!released) {
      released = true;
      running--;
    }
  };
}
