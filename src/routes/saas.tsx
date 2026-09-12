import { createFileRoute } from "@tanstack/react-router";
import { SaasLanding } from "@/components/echo/SaasLanding";

const title = "B2B SaaS Performance Marketing — Lower CAC, More Trials | Echo 27";
const description =
  "Echo 27 builds paid acquisition engines for B2B SaaS. Lower CAC, more trials, predictable MRR. Run by a SaaS Academy coach — book a Growth Call.";
const url = "https://echo-27.com/saas";

export const Route = createFileRoute("/saas")({
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
  component: SaasLanding,
});