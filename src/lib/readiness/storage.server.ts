import { env, isDev } from "./env.server";
import type { Report, Teaser, UnlockInput } from "./types";

/**
 * Report storage in Supabase, through PostgREST with the service role key, so no client library is needed.
 * Table: see supabase/migrations/20261101000000_readiness.sql. Without Supabase, development falls back to memory.
 */

export type StoredReport = {
  id: string;
  host: string;
  cache_key: string;
  created_at: string;
  teaser: Teaser;
  report: Report;
  unlocked_at: string | null;
  lead: Record<string, unknown> | null;
};

const memory = new Map<string, StoredReport>();

function config(): { url: string; key: string } | null {
  const url = env("SUPABASE_URL");
  const key = env("SUPABASE_SERVICE_ROLE_KEY");
  return url && key ? { url: url.replace(/\/$/, ""), key } : null;
}

export const storageEnabled = () => Boolean(config());

async function rest<T>(path: string, init: RequestInit & { prefer?: string } = {}): Promise<T | null> {
  const c = config();
  if (!c) return null;
  try {
    const res = await fetch(`${c.url}/rest/v1/${path}`, {
      ...init,
      headers: {
        apikey: c.key,
        Authorization: `Bearer ${c.key}`,
        "Content-Type": "application/json",
        ...(init.prefer ? { Prefer: init.prefer } : {}),
        ...(init.headers ?? {}),
      },
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error(`Supabase ${res.status} on ${path}: ${(await res.text()).slice(0, 200)}`);
      return null;
    }
    const text = await res.text();
    return text ? (JSON.parse(text) as T) : ({} as T);
  } catch (err) {
    console.error("Supabase request failed:", err instanceof Error ? err.message : err);
    return null;
  }
}

export async function saveReport(row: Omit<StoredReport, "unlocked_at" | "lead">): Promise<boolean> {
  if (!storageEnabled()) {
    if (!isDev()) console.error("Report not saved: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are not set.");
    memory.set(row.id, { ...row, unlocked_at: null, lead: null });
    return true;
  }
  const saved = await rest("readiness_reports", { method: "POST", body: JSON.stringify(row), prefer: "return=minimal" });
  return saved !== null;
}

export async function getReport(id: string): Promise<StoredReport | null> {
  if (!storageEnabled()) return memory.get(id) ?? null;
  const rows = await rest<StoredReport[]>(`readiness_reports?id=eq.${encodeURIComponent(id)}&limit=1`);
  return rows?.[0] ?? null;
}

/** The newest report for the same site, category, and city within `maxAgeMs`. */
export async function findRecent(cacheKey: string, maxAgeMs: number): Promise<StoredReport | null> {
  const since = new Date(Date.now() - maxAgeMs).toISOString();
  if (!storageEnabled()) {
    return [...memory.values()].filter((r) => r.cache_key === cacheKey && r.created_at >= since).sort((a, b) => (a.created_at < b.created_at ? 1 : -1))[0] ?? null;
  }
  const rows = await rest<StoredReport[]>(
    `readiness_reports?cache_key=eq.${encodeURIComponent(cacheKey)}&created_at=gte.${encodeURIComponent(since)}&order=created_at.desc&limit=1`,
  );
  return rows?.[0] ?? null;
}

export async function markUnlocked(id: string, lead: UnlockInput & { ip?: string }): Promise<boolean> {
  const patch = { unlocked_at: new Date().toISOString(), lead: { ...lead, company: undefined } };
  if (!storageEnabled()) {
    const row = memory.get(id);
    if (!row) return false;
    memory.set(id, { ...row, ...patch });
    return true;
  }
  const res = await rest(`readiness_reports?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify(patch),
    prefer: "return=minimal",
  });
  return res !== null;
}
