import { lookup as dnsLookup } from "node:dns";
import http from "node:http";
import https from "node:https";
import { isIP } from "node:net";
import zlib from "node:zlib";

/**
 * Fetching addresses typed in by strangers. Rules:
 * - http or https on the standard ports only, with no credentials and no IP literals.
 * - The address is checked when the socket connects (a custom DNS lookup), not before, so a hostname that resolves
 *   publicly once and privately the next time can't slip through.
 * - Redirects are followed by hand and every hop goes through the same checks.
 */

export const USER_AGENT = "Mozilla/5.0 (compatible; Echo27ReadinessBot/1.0; +https://echo-27.com/ai-search-readiness)";

export type SafeResponse = {
  ok: true;
  url: string;
  status: number;
  headers: Record<string, string>;
  text: string;
};
export type SafeFailure = { ok: false; reason: "blocked" | "network" | "timeout" | "redirects" | "too_large" };

/** Parses a visitor's address into a URL we are willing to contact, or null. */
export function parseTargetUrl(raw: string): URL | null {
  const value = raw.trim();
  if (!value || value.length > 2048 || /\s/.test(value)) return null;
  let url: URL;
  try {
    url = new URL(/^[a-z][a-z0-9+.-]*:\/\//i.test(value) ? value : `https://${value}`);
  } catch {
    return null;
  }
  return isAllowedUrl(url) ? url : null;
}

export function isAllowedUrl(url: URL): boolean {
  if (url.protocol !== "https:" && url.protocol !== "http:") return false;
  if (url.username || url.password) return false;
  if (url.port && url.port !== "80" && url.port !== "443") return false;
  const host = url.hostname.toLowerCase().replace(/\.$/, "");
  if (!host || host.startsWith("[") || isIP(host)) return false;
  if (!host.includes(".")) return false;
  return !/(^|\.)(localhost|local|internal|intranet|lan|home|corp|test|invalid|example)$/.test(host);
}

export function isPrivateAddress(address: string): boolean {
  let ip = address.toLowerCase();
  const mapped = ip.match(/^::ffff:(.+)$/);
  if (mapped) {
    ip = mapped[1];
    const hex = ip.match(/^([0-9a-f]{1,4}):([0-9a-f]{1,4})$/);
    if (hex) {
      const hi = parseInt(hex[1], 16);
      const lo = parseInt(hex[2], 16);
      ip = `${hi >> 8}.${hi & 255}.${lo >> 8}.${lo & 255}`;
    }
  }
  if (isIP(ip) === 4) {
    const [a, b, c] = ip.split(".").map(Number);
    return (
      a === 0 ||
      a === 10 ||
      a === 127 ||
      (a === 100 && b >= 64 && b <= 127) ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      (a === 192 && b === 0 && c === 0) ||
      (a === 192 && b === 0 && c === 2) ||
      (a === 198 && (b === 18 || b === 19)) ||
      (a === 198 && b === 51 && c === 100) ||
      (a === 203 && b === 0 && c === 113) ||
      a >= 224
    );
  }
  if (isIP(ip) === 6) {
    return (
      ip === "::" ||
      ip === "::1" ||
      /^f[cd]/.test(ip) ||
      /^fe[89ab]/.test(ip) ||
      /^ff/.test(ip) ||
      ip.startsWith("64:ff9b:") ||
      ip.startsWith("2001:db8") ||
      ip.startsWith("2002:") ||
      ip.startsWith("2001:0:")
    );
  }
  return true;
}

class BlockedAddressError extends Error {}

/** Resolves a hostname and refuses it if any address is private. Used as the socket's lookup, so it can't be raced. */
const guardedLookup: http.RequestOptions["lookup"] = (hostname, options, callback) => {
  dnsLookup(hostname, { ...options, all: true }, (err, addresses) => {
    const cb = callback as unknown as (e: Error | null, a?: unknown, f?: number) => void;
    if (err) return cb(err);
    const list = addresses as unknown as { address: string; family: number }[];
    if (!list.length || list.some((a) => isPrivateAddress(a.address))) {
      return cb(new BlockedAddressError(`Blocked address for ${hostname}`));
    }
    if ((options as { all?: boolean }).all) return cb(null, list);
    return cb(null, list[0].address, list[0].family);
  });
};

/** True if the host resolves and every address is public. */
export function hostResolvesPublic(hostname: string): Promise<boolean> {
  return new Promise((resolve) => {
    dnsLookup(hostname, { all: true }, (err, addresses) => {
      resolve(!err && addresses.length > 0 && addresses.every((a) => !isPrivateAddress(a.address)));
    });
  });
}

function requestOnce(
  url: URL,
  timeoutMs: number,
  maxBytes: number,
): Promise<{ status: number; headers: Record<string, string>; body: string } | SafeFailure> {
  return new Promise((resolve) => {
    const lib = url.protocol === "https:" ? https : http;
    let settled = false;
    const finish = (value: { status: number; headers: Record<string, string>; body: string } | SafeFailure) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve(value);
    };
    const req = lib.request(
      url,
      {
        method: "GET",
        lookup: guardedLookup,
        headers: {
          "User-Agent": USER_AGENT,
          Accept: "text/html,application/xhtml+xml,text/plain;q=0.9,application/xml;q=0.8,*/*;q=0.5",
          "Accept-Encoding": "gzip, deflate, br",
        },
      },
      (res) => {
        const headers: Record<string, string> = {};
        for (const [k, v] of Object.entries(res.headers)) headers[k] = [v].flat().join(", ");
        const status = res.statusCode ?? 0;
        if (status >= 300 && status < 400) {
          res.resume();
          return finish({ status, headers, body: "" });
        }
        const encoding = (headers["content-encoding"] ?? "").toLowerCase();
        const stream =
          encoding === "gzip"
            ? res.pipe(zlib.createGunzip())
            : encoding === "br"
              ? res.pipe(zlib.createBrotliDecompress())
              : encoding === "deflate"
                ? res.pipe(zlib.createInflate())
                : res;
        const chunks: Buffer[] = [];
        let size = 0;
        stream.on("data", (chunk: Buffer) => {
          size += chunk.length;
          if (size > maxBytes) {
            req.destroy();
            return finish({ status, headers, body: Buffer.concat(chunks).toString("utf8") });
          }
          chunks.push(chunk);
        });
        stream.on("end", () => finish({ status, headers, body: Buffer.concat(chunks).toString("utf8") }));
        stream.on("error", () => finish({ ok: false, reason: "network" }));
      },
    );
    const timer = setTimeout(() => {
      req.destroy();
      finish({ ok: false, reason: "timeout" });
    }, timeoutMs);
    req.on("error", (err) => finish({ ok: false, reason: err instanceof BlockedAddressError ? "blocked" : "network" }));
    req.end();
  });
}

export async function safeFetch(
  target: string,
  { timeoutMs = 10_000, maxBytes = 2_000_000 }: { timeoutMs?: number; maxBytes?: number } = {},
): Promise<SafeResponse | SafeFailure> {
  let current = target;
  const deadline = Date.now() + timeoutMs;
  for (let hop = 0; hop < 6; hop++) {
    let url: URL;
    try {
      url = new URL(current);
    } catch {
      return { ok: false, reason: "blocked" };
    }
    if (!isAllowedUrl(url)) return { ok: false, reason: "blocked" };
    const remaining = deadline - Date.now();
    if (remaining <= 0) return { ok: false, reason: "timeout" };
    const res = await requestOnce(url, remaining, maxBytes);
    if ("ok" in res) return res;
    if (res.status >= 300 && res.status < 400 && res.headers.location) {
      try {
        current = new URL(res.headers.location, url).href;
      } catch {
        return { ok: false, reason: "blocked" };
      }
      continue;
    }
    return { ok: true, url: url.href, status: res.status, headers: res.headers, text: res.body };
  }
  return { ok: false, reason: "redirects" };
}
