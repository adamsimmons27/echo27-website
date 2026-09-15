import { createFileRoute } from "@tanstack/react-router";
import { AuditLanding } from "@/components/echo/AuditLanding";

const URL = "https://echo-27.com/free-audit";
const TITLE = "Free Marketing Audit for Local Businesses | Echo 27";
const DESCRIPTION =
  "For local business owners. Tell us about your business and get a personal video back showing where your marketing is losing you customers, across your website, Google presence, ads, and follow-up, and what to fix first. Free, no call, no pitch.";

export const Route = createFileRoute("/free-audit")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: URL },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: AuditLanding,
});
