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

## Fractional CMO page: trade-specific variants (HVAC, plumbing, roofing)

1. Copy `src/content/fractional-cmo.ts` to `src/content/fractional-cmo.hvac.ts` and change the strings. Keep the shape; TypeScript will tell you if a field is missing. Rules: no em dashes, no invented stats or client names, placeholders in `[square brackets]`.
2. Copy `src/routes/fractional-cmo.tsx` to `src/routes/fractional-cmo.hvac.tsx`, import the new content, and change the route path to `/fractional-cmo/hvac`. Set that variant's `meta.url` to match.
3. Add the new URL to `public/sitemap.xml`.

Everything else, from the comparison table to the FAQ schema, is generated from the content file. The FAQ schema only includes answers that are no longer placeholders.

## Placeholders on the fractional CMO page

Search `src/content/fractional-cmo.ts` for `[` to find them: three case studies and six FAQ answers. Photo slots are marked in `src/components/cmo/Hero.tsx` and `src/components/cmo/Proof.tsx`. The homepage stats in `src/components/echo/Results.tsx` and the result lines on the video testimonials are also placeholders awaiting real figures.
