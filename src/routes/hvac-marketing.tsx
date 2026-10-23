import { createFileRoute } from "@tanstack/react-router";
import { HvacMarketingLanding } from "@/components/echo/HvacMarketingLanding";

const URL = "https://echo-27.com/hvac-marketing";
const TITLE = "HVAC Growth Partner Program | Echo 27";
const DESCRIPTION =
  "Qualified replacement estimates booked onto your calendar. We generate the demand, qualify every homeowner, and book the estimate. You show up and close. One HVAC company per metro.";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${URL}#service`,
      name: "HVAC growth partner program",
      serviceType: "Marketing agency",
      description: DESCRIPTION,
      provider: { "@id": "https://echo-27.com/#organization" },
      audience: { "@type": "BusinessAudience", audienceType: "Residential HVAC companies" },
      url: URL,
    },
  ],
};

export const Route = createFileRoute("/hvac-marketing")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: URL },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  }),
  component: HvacMarketingLanding,
});
