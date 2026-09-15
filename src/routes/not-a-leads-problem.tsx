import { createFileRoute } from "@tanstack/react-router";
import { LeakLanding } from "@/components/echo/LeakLanding";

const URL = "https://echo-27.com/not-a-leads-problem";
const TITLE = "You Don't Have a Leads Problem — Echo 27";
const DESCRIPTION =
  "Most local service businesses already get enough leads to fill the calendar. They lose them between the click and the booked job. Put your numbers in, see where they go, and find out what plugging the leak is worth before you buy another lead.";

export const Route = createFileRoute("/not-a-leads-problem")({
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
  component: LeakLanding,
});
