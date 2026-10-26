import { createFileRoute } from "@tanstack/react-router";
import { VoiceAiLanding } from "@/components/echo/VoiceAiLanding";

const URL = "https://echo-27.com/voice-ai";
const TITLE = "AI Receptionist for Home Service Businesses | Echo 27";
const DESCRIPTION =
  "An AI receptionist for HVAC, plumbing, electrical, roofing, and other home service companies. Answers every call in seconds, qualifies the caller, and books the appointment into ServiceTitan, Jobber, Housecall Pro, or your CRM. Built, trained, and run by Echo 27.";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${URL}#service`,
      name: "AI receptionist and voice AI for home service businesses",
      serviceType: "AI receptionist",
      description: DESCRIPTION,
      provider: { "@id": "https://echo-27.com/#organization" },
      audience: { "@type": "BusinessAudience", audienceType: "Home service businesses" },
      url: URL,
    },
  ],
};

export const Route = createFileRoute("/voice-ai")({
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
  component: VoiceAiLanding,
});
