import { createFileRoute } from "@tanstack/react-router";
import { LocalServicesLanding } from "@/components/echo/LocalServicesLanding";

const URL = "https://echo-27.com/local-services";
const TITLE = "Marketing for Local Businesses | Echo 27";
const DESCRIPTION =
  "Do you want more customers? Echo 27 fills the calendars of local businesses through paid ads, a website built to rank and convert, and automated follow-up. For clinics, gyms and studios, professional services, retail and hospitality, and home services.";

export const Route = createFileRoute("/local-services")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: URL },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: LocalServicesLanding,
});
