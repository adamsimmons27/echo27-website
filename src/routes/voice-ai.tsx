import { createFileRoute } from "@tanstack/react-router";
import { VoiceAiLanding } from "@/components/echo/VoiceAiLanding";

const URL = "https://echo-27.com/voice-ai";
const TITLE = "AI Receptionist for Local Businesses | Echo 27";
const DESCRIPTION =
  "An AI receptionist that answers every call in seconds, day or night, qualifies the caller, and books the appointment into your calendar. Built, trained, and run by Echo 27.";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${URL}#service`,
      name: "AI receptionist and voice AI for local businesses",
      serviceType: "AI receptionist",
      description: DESCRIPTION,
      provider: { "@id": "https://echo-27.com/#organization" },
      audience: { "@type": "BusinessAudience", audienceType: "Local businesses" },
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
