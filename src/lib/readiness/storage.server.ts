import { createHash } from "node:crypto";
import { get, put } from "@vercel/blob";
import { env, isDev } from "./env.server";
import type { Report, Teaser, UnlockInput } from "./types";

/**
 * Report storage in a private Vercel Blob store: one JSON blob per report, plus a small pointer blob per
 * site-and-city so a repeat audit within 24 hours can find the last one. Private blobs are only readable through
 * the SDK with the project's credentials, never by URL. Without a store, development keeps reports in memory.
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
const reportPath = (id: string) => `readiness/reports/${id}.json`;
const pointerPath = (cacheKey: string) => `readiness/latest/${createHash("sha256").update(cacheKey).digest("hex").slice(0, 32)}.json`;

/** On Vercel the SDK authenticates with OIDC (BLOB_STORE_ID); elsewhere with the read-write token. */
export const storageEnabled = () => Boolean(env("BLOB_READ_WRITE_TOKEN") || env("BLOB_STORE_ID"));

async function write(pathname: string, value: unknown): Promise<boolean> {
  try {
    await put(pathname, JSON.stringify(value), {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
      cacheControlMaxAge: 60,
    });
    return true;
  } catch (err) {
    console.error(`Blob write failed for ${pathname}:`, err instanceof Error ? err.message : err);
    return false;
  }
}

async function read<T>(pathname: string): Promise<T | null> {
  try {
    const result = await get(pathname, { access: "private", useCache: false });
    if (!result || result.statusCode !== 200 || !result.stream) return null;
    return JSON.parse(await new Response(result.stream).text()) as T;
  } catch (err) {
    console.error(`Blob read failed for ${pathname}:`, err instanceof Error ? err.message : err);
    return null;
  }
}

export async function saveReport(row: Omit<StoredReport, "unlocked_at" | "lead">): Promise<boolean> {
  const full: StoredReport = { ...row, unlocked_at: null, lead: null };
  if (!storageEnabled()) {
    if (!isDev()) console.error("Report kept in memory only: no Blob store is connected (BLOB_READ_WRITE_TOKEN or BLOB_STORE_ID).");
    memory.set(row.id, full);
    return true;
  }
  const saved = await write(reportPath(row.id), full);
  if (saved) await write(pointerPath(row.cache_key), { id: row.id, created_at: row.created_at });
  return saved;
}

export async function getReport(id: string): Promise<StoredReport | null> {
  if (!storageEnabled()) return memory.get(id) ?? null;
  return read<StoredReport>(reportPath(id));
}

/** The newest report for the same site, category, and city within `maxAgeMs`. */
export async function findRecent(cacheKey: string, maxAgeMs: number): Promise<StoredReport | null> {
  const since = new Date(Date.now() - maxAgeMs).toISOString();
  if (!storageEnabled()) {
    return [...memory.values()].filter((r) => r.cache_key === cacheKey && r.created_at >= since).sort((a, b) => (a.created_at < b.created_at ? 1 : -1))[0] ?? null;
  }
  const pointer = await read<{ id: string; created_at: string }>(pointerPath(cacheKey));
  if (!pointer || pointer.created_at < since) return null;
  return getReport(pointer.id);
}

export async function markUnlocked(id: string, lead: UnlockInput & { ip?: string }): Promise<boolean> {
  const patch = { unlocked_at: new Date().toISOString(), lead: { ...lead, company: undefined } };
  if (!storageEnabled()) {
    const row = memory.get(id);
    if (!row) return false;
    memory.set(id, { ...row, ...patch });
    return true;
  }
  const row = await read<StoredReport>(reportPath(id));
  if (!row) return false;
  return write(reportPath(id), { ...row, ...patch });
}
