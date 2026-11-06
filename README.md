# Echo 27 website

TanStack Start (React 19), Vite, Tailwind CSS v4. Statically rendered pages with a small amount of client code for forms, calculators, and motion.

## Run it

```bash
npm install
cp .env.example .env     # fill in what you have; every value is optional
npm run dev              # http://localhost:8080
npm run build
```

Typecheck with `npx tsc --noEmit -p tsconfig.json`.

## Where things live

| Path | What |
|---|---|
| `src/routes/*.tsx` | One file per page. The file name is the URL slug (`hvac.tsx` is `/hvac`). Each route sets its own title, description, canonical, and Open Graph tags in `head()`. |
| `src/components/echo/*` | Homepage sections, landing pages, calculators, the application form. |
| `src/components/cmo/*` | The fractional CMO landing page at `/fractional-cmo`, section by section. |
| `src/content/fractional-cmo.ts` | Every word on the fractional CMO page. The only file to edit for its copy. |
| `src/lib/tracking.ts` | `track(eventName, params)` for Meta Pixel and GA4, used by the fractional CMO page. |
| `src/lib/attribution.ts` | Captures UTM, fbclid, gclid into sessionStorage and adds them to form payloads. |
| `src/styles.css` | Design tokens and the shared classes: slabs, buttons, eyebrows, pastel fills. |
| `public/sitemap.xml`, `public/robots.txt` | Add a line to the sitemap for every new page. |

## Environment variables

All documented in `.env.example`. `VITE_GHL_WEBHOOK_URL` is the GoHighLevel inbound webhook that every form posts to; each form sends a `form` field (`application`, `free-audit`, `growth-audit`) so one workflow can branch on it. The fractional CMO page also reads `VITE_BOOKING_URL` (calendar embed instead of the form), `VITE_META_PIXEL_ID`, and `VITE_GA4_ID`. Values are baked in at build time, so set them where the site builds and redeploy.

## AI Search Readiness Checker (`/ai-search-readiness`)

A lead magnet for the fractional CMO service: a real audit of a home service website, scored out of 100, with the full report behind an email gate. Code lives in `src/lib/readiness/` (audit, checks, integrations) and `src/routes/api.readiness.*.ts` (the three server endpoints: `scan` streams progress, `unlock` records the lead and returns the full report, `report` restores a report by id).

Nothing is simulated. Each integration that has no credentials only turns its checks into "unverified", which are left out of the score. In development the score card lists what is missing.

Setup, all server-side (no `VITE_` prefix, so none of it reaches the browser). On Vercel, add the keys under Settings > Environment Variables and create the Blob store under Storage:

| Variable | Where to get it | What it powers |
| --- | --- | --- |
| `FIRECRAWL_API_KEY` | firecrawl.dev > API keys | Page discovery and content extraction. Without it the audit still works from the sitemap and direct fetches. |
| `OPENAI_API_KEY` | platform.openai.com > API keys. Set a monthly budget under Limits. | The ten content questions (pricing, process, FAQs, people, reviews...). Each audit is one call of roughly 60K input tokens. `OPENAI_MODEL` overrides the default `gpt-5-mini`. |
| `PAGESPEED_API_KEY` | console.cloud.google.com > enable "PageSpeed Insights API" > Credentials > API key | Mobile performance and Core Web Vitals. Keyless requests are rate-limited to nothing. |
| Vercel Blob store | Vercel > Storage > Create > Blob, access **Private**, then Connect to Project. Vercel adds `BLOB_STORE_ID` and `BLOB_READ_WRITE_TOKEN` itself. | Report storage: the 24-hour cache, the unlock, and reloading a report by id. Private, so reports are never readable by URL. Locally, `vercel env pull` writes the credentials to `.env.local`; without them, development keeps reports in memory. |
| `GHL_WEBHOOK_URL` | GoHighLevel > Automation > Workflows > Inbound Webhook trigger | Where unlocked leads go, posted from the server with `form: "ai-search-readiness"`. Falls back to `VITE_GHL_WEBHOOK_URL`. |

Vercel: an audit takes one to three minutes and streams progress, so the function's max duration must be above the default. Set `maxDuration` to 300 in the project settings (Fluid Compute) before launching ads.

Abuse limits: 3 audits and 10 unlocks per visitor per hour, 4 audits at once per server instance, a 24-hour cache per site and city, and a bot honeypot on both forms. These slow abuse down; the hard cap on spend is the monthly limit set in each provider's dashboard.

## Fractional CMO page: trade-specific variants (HVAC, plumbing, roofing)

1. Copy `src/content/fractional-cmo.ts` to `src/content/fractional-cmo.hvac.ts` and change the strings. Keep the shape; TypeScript will tell you if a field is missing. Rules: no em dashes, no invented stats or client names, placeholders in `[square brackets]`.
2. Copy `src/routes/fractional-cmo.tsx` to `src/routes/fractional-cmo.hvac.tsx`, import the new content, and change the route path to `/fractional-cmo/hvac`. Set that variant's `meta.url` to match.
3. Add the new URL to `public/sitemap.xml`.

Everything else, from the comparison table to the FAQ schema, is generated from the content file.

## Placeholders on the fractional CMO page

The page shows no placeholders. Two things are waiting on real values in `src/content/fractional-cmo.ts`: `phone` (the header phone link stays hidden while the value is in `[brackets]`) and the booking calendar (`VITE_BOOKING_URL`, otherwise the form is used). Proof on the page is real: the two case study figures come from the published case study pages and the quotes from `src/components/echo/Testimonials.tsx`, with their placeholder result lines switched off. The homepage stats in `src/components/echo/Results.tsx` and the result lines on the video testimonials are still placeholders awaiting real figures.
