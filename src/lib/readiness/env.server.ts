let loaded = false;

/** Server-only settings. Vite doesn't copy non-VITE_ values from .env into process.env in development, so do it once here. */
export function env(name: string): string | undefined {
  if (!loaded) {
    loaded = true;
    if ((import.meta as { env?: { DEV?: boolean } }).env?.DEV) {
      /* .env.local is what `vercel env pull` writes; it carries the Blob store credentials. */
      for (const file of [".env", ".env.local"]) {
        try {
          process.loadEnvFile(file);
        } catch {
          /* file not present */
        }
      }
    }
  }
  return process.env[name]?.trim() || undefined;
}

export const isDev = () => Boolean((import.meta as { env?: { DEV?: boolean } }).env?.DEV);

/** Integrations with no credentials. Each one only downgrades its checks to unverified; nothing is simulated. */
export function missingSetup(): string[] {
  const missing: string[] = [];
  if (!env("FIRECRAWL_API_KEY")) missing.push("FIRECRAWL_API_KEY");
  if (!env("OPENAI_API_KEY")) missing.push("OPENAI_API_KEY");
  if (!env("PAGESPEED_API_KEY")) missing.push("PAGESPEED_API_KEY");
  if (!env("BLOB_READ_WRITE_TOKEN") && !env("BLOB_STORE_ID")) missing.push("Vercel Blob store (BLOB_READ_WRITE_TOKEN)");
  if (!env("GHL_WEBHOOK_URL")) missing.push("GHL_WEBHOOK_URL");
  return missing;
}
