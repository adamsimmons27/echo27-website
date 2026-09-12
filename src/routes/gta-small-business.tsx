import { createFileRoute } from "@tanstack/react-router";
import { GtaLanding } from "@/components/echo/GtaLanding";

const title = "Toronto Small Business Marketing | GTA Lead Generation — Echo 27";
const description =
  "Echo 27 helps Greater Toronto Area small businesses get more local customers with paid ads, funnels, and local lead generation. Results, not reports.";
const url = "https://echo-27.com/gta-small-business";

export const Route = createFileRoute("/gta-small-business")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      {
        name: "keywords",
        content:
          "Toronto small business marketing, GTA marketing agency, local lead generation Toronto, Toronto paid ads, GTA small business growth",
      },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: url }],
  }),
  component: GtaLanding,
});