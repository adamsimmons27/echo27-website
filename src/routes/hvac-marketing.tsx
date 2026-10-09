import { createFileRoute } from "@tanstack/react-router";
import { HvacMarketingLanding, hvac } from "@/components/echo/HvacMarketingLanding";

const URL = "https://echo-27.com/hvac-marketing";
const TITLE = "HVAC Marketing That Books In-Home Estimates | Echo 27";
const DESCRIPTION =
  "Ads, follow-up, and booking run as one system for residential HVAC companies, so the homeowners who are ready to replace a system end up on your techs' calendars. Reporting tied to booked estimates and revenue.";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${URL}#service`,
      name: "HVAC marketing and appointment booking",
      serviceType: "Marketing agency",
      description: DESCRIPTION,
      provider: { "@id": "https://echo-27.com/#organization" },
      audience: { "@type": "BusinessAudience", audienceType: "Residential HVAC companies" },
      url: URL,
    },
    {
      "@type": "FAQPage",
      "@id": `${URL}#faq`,
      mainEntity: hvac.faq.items.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
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
