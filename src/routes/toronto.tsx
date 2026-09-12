import { createFileRoute } from "@tanstack/react-router";
import { GtaLanding } from "@/components/echo/GtaLanding";

const title = "Toronto Small Business Marketing | GTA Lead Generation — Echo 27";
const description =
  "Echo 27 helps Greater Toronto Area small businesses get more local customers with paid ads, funnels, and local lead generation. Results, not reports.";
const canonical = "https://echo-27.com/gta-small-business";

export const Route = createFileRoute("/toronto")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonical },
    ],
    // Point canonical at the primary URL so this alias doesn't compete in search.
    links: [{ rel: "canonical", href: canonical }],
  }),
  component: GtaLanding,
});