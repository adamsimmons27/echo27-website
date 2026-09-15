import { createFileRoute } from "@tanstack/react-router";
import { HvacLanding } from "@/components/echo/HvacLanding";

const URL = "https://echo-27.com/hvac";
const TITLE = "HVAC Marketing That Books Kept Calls, Not Leads | Echo 27";
const DESCRIPTION =
  "HVAC marketing for $1M to $5M residential companies. Booked and kept service calls, follow-up that stops leads going cold, reactivation of your customer list, and maintenance agreements that fill the off-season. No long-term contract. One HVAC company per metro.";

// Drop your Google Tag Manager container ID here, e.g. "GTM-XXXXXXX". Leave empty to load nothing.
const GTM_ID = "";

export const Route = createFileRoute("/hvac")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: URL },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: GTM_ID
      ? [
          {
            children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
          },
        ]
      : [],
  }),
  component: HvacLanding,
});
