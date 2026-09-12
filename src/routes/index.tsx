import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/echo/Navbar";
import { Hero } from "@/components/echo/Hero";
import { Testimonials } from "@/components/echo/Testimonials";
import { HonestTruth } from "@/components/echo/HonestTruth";
import { Results } from "@/components/echo/Results";
import { Services } from "@/components/echo/Services";
import { Industries } from "@/components/echo/Industries";
import { FreeTools } from "@/components/echo/FreeTools";
import { FinalCTA } from "@/components/echo/FinalCTA";
import { Footer } from "@/components/echo/Footer";
import { TOOLS } from "@/components/echo/calc/CalcKit";

const SITE_URL = "https://echo-27.com";
const TITLE = "Echo 27 — Growth Marketing Agency in Toronto";
const DESCRIPTION =
  "Echo 27 is a Toronto growth marketing agency that runs paid ads, web and UX design, funnel building, and fractional CMO work for founders who want revenue, not reports.";

const SERVICES = [
  { name: "Paid advertising management", description: "Meta, Google, YouTube and TikTok campaigns managed against customer value, not click cost." },
  { name: "Web and UX design", description: "Sites and landing pages built around the decision a visitor is making." },
  { name: "Funnel building", description: "Offers, landing pages, and email and SMS follow-up that convert paid traffic." },
  { name: "Fractional CMO", description: "Senior marketing leadership, strategy and oversight for a fraction of a full-time hire." },
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#organization`,
    name: "Echo 27",
    alternateName: "Echo27",
    url: SITE_URL,
    description: DESCRIPTION,
    slogan: "Business growth made less hard.",
    founder: { "@type": "Person", givenName: "Adam", jobTitle: "Founder" },
    address: { "@type": "PostalAddress", addressLocality: "Toronto", addressRegion: "ON", addressCountry: "CA" },
    areaServed: "Worldwide",
    knowsAbout: ["Performance marketing", "Paid advertising", "Conversion funnels", "Customer acquisition cost", "Fractional CMO"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Growth marketing services",
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name, description: s.description, provider: { "@id": `${SITE_URL}/#organization` } },
      })),
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Echo 27",
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Free growth marketing calculators",
    itemListElement: TOOLS.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { "@type": "WebApplication", name: t.name, description: t.blurb, url: `${SITE_URL}${t.to}`, applicationCategory: "BusinessApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } },
    })),
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: SITE_URL },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(structuredData) },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Testimonials />
        <Results />
        <HonestTruth />
        <Services />
        <Industries />
        <FreeTools />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
