import { createFileRoute } from "@tanstack/react-router";
import { WebDesignLanding, webDesign } from "@/components/echo/WebDesignLanding";

const URL = "https://echo-27.com/web-design";
const TITLE = "Web Design and Hosting | Echo 27";
const DESCRIPTION =
  "A website designed and built to win customers, then hosted, maintained, and updated for you. $1,000 up front, then $250 per month for hosting and maintenance. No long lock-in.";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${URL}#service`,
      name: "Web design and hosting",
      serviceType: "Web design",
      description: DESCRIPTION,
      provider: { "@id": "https://echo-27.com/#organization" },
      url: URL,
    },
    {
      "@type": "FAQPage",
      "@id": `${URL}#faq`,
      mainEntity: webDesign.faq.items.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ],
};

export const Route = createFileRoute("/web-design")({
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
  component: WebDesignLanding,
});
