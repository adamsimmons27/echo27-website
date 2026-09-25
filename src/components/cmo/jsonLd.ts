import type { LandingContent } from "@/content/types";

/** Organization, Service, and FAQPage schema from the content file. Placeholder FAQ answers are left out. */
export function landingJsonLd(content: LandingContent, url: string) {
  const site = "https://echo-27.com";
  const orgId = `${site}/#organization`;
  const answered = content.faq.items.filter((f) => !/^\[.*\]$/.test(f.answer.trim()));
  const graph: Record<string, unknown>[] = [
    { "@type": "Organization", "@id": orgId, name: content.brand.name, url: site, description: content.meta.description },
    {
      "@type": "Service",
      "@id": `${url}#service`,
      name: `Fractional CMO for ${content.meta.variant}`,
      serviceType: "Fractional CMO",
      description: content.meta.description,
      provider: { "@id": orgId },
      audience: { "@type": "BusinessAudience", audienceType: content.hero.eyebrow },
      url,
    },
  ];
  if (answered.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: answered.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}
