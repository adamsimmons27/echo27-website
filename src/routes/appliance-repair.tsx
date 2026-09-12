import { createFileRoute } from "@tanstack/react-router";
import { ApplianceRepairLanding } from "@/components/echo/ApplianceRepairLanding";

const title = "Marketing for Appliance Repair Businesses | Echo 27";
const description =
  "Done-for-you ads, website, and local SEO for appliance repair owners. More booked jobs, transparent cost per job, no long contracts. Book a free strategy call.";
const url = "https://echo-27.com/appliance-repair";

export const Route = createFileRoute("/appliance-repair")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      // Analytics placeholders — replace IDs and uncomment when ready
      // { name: "facebook-domain-verification", content: "REPLACE_WITH_PIXEL_ID" },
      // { name: "google-site-verification", content: "REPLACE_WITH_GOOGLE_ID" },
    ],
    links: [{ rel: "canonical", href: url }],
  }),
  component: ApplianceRepairLanding,
});