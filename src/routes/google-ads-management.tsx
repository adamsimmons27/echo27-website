import { createFileRoute } from "@tanstack/react-router";
import { GoogleAdsLanding } from "@/components/echo/GoogleAdsLanding";

const URL = "https://echo-27.com/google-ads-management";
const TITLE = "Google Ads Management | Echo 27";
const DESCRIPTION =
  "Google Ads management with landing page development and testing, run by one senior person and reported on customers and revenue. $1,850 per month, ad spend separate, no long lock-in.";

/* A sales-call page: public URL, kept out of search results and the sitemap on purpose. */
export const Route = createFileRoute("/google-ads-management")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: GoogleAdsLanding,
});
