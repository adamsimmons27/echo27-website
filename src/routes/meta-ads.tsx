import { createFileRoute } from "@tanstack/react-router";
import { MetaAdsLanding } from "@/components/echo/MetaAdsLanding";

const title = "Full-Service Meta Ads Management | Echo 27";
const description =
  "Echo 27 runs your Facebook and Instagram ads end to end: strategy, creative production, copywriting, testing, tracking, and scaling. Done for you.";
const url = "https://echo-27.com/meta-ads";

export const Route = createFileRoute("/meta-ads")({
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
    ],
    links: [{ rel: "canonical", href: url }],
  }),
  component: MetaAdsLanding,
});
