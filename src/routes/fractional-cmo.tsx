import { createFileRoute } from "@tanstack/react-router";
import { fractionalCmo as content } from "@/content/fractional-cmo";
import { landingJsonLd } from "@/components/cmo/jsonLd";
import { FractionalCmoLanding } from "@/components/cmo/FractionalCmoLanding";

const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined;
const GA4_ID = import.meta.env.VITE_GA4_ID as string | undefined;

/* Tags load only when their ids are set. Events are sent through src/lib/tracking.ts. */
const tagScripts = [
  ...(PIXEL_ID
    ? [
        {
          children: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_ID}');fbq('track','PageView');`,
        },
      ]
    : []),
  ...(GA4_ID
    ? [
        { src: `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`, async: true },
        {
          children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA4_ID}');`,
        },
      ]
    : []),
];

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
