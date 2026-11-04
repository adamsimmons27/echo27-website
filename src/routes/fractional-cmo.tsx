import { createFileRoute } from "@tanstack/react-router";
import { fractionalCmo as content } from "@/content/fractional-cmo";
import { landingJsonLd } from "@/components/cmo/jsonLd";
import { FractionalCmoLanding } from "@/components/cmo/FractionalCmoLanding";
import { tagScripts } from "@/lib/tagScripts";

export const Route = createFileRoute("/fractional-cmo")({
  head: () => ({
    meta: [
      { title: content.meta.title },
      { name: "description", content: content.meta.description },
      { property: "og:title", content: content.meta.title },
      { property: "og:description", content: content.meta.description },
      { property: "og:url", content: content.meta.url },
      { name: "twitter:title", content: content.meta.title },
      { name: "twitter:description", content: content.meta.description },
    ],
    links: [{ rel: "canonical", href: content.meta.url }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(landingJsonLd(content, content.meta.url)) },
      ...tagScripts,
    ],
  }),
  component: Page,
});

function Page() {
  return <FractionalCmoLanding content={content} />;
}
