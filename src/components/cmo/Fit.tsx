import { Check, X } from "lucide-react";
import { Section } from "./Section";
import type { LandingContent } from "@/content/types";

/** Section 8: two pastel slabs, who this is for and who it is not for. Labelled by the first slab's heading. */
export function Fit({ content }: { content: LandingContent }) {
  const { forYou, notForYou } = content.fit;
  return (
    <Section id="fit" tone="light" labelledBy="fit-for-heading fit-not-heading">
      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        <div className="card bg-mint sm:p-8">
          <h2 id="fit-for-heading" className="headline headline-md">
            {forYou.header}
          </h2>
          <ul className="mt-6 space-y-3">
            {forYou.items.map((item) => (
              <li key={item} className="flex min-h-[44px] items-start gap-3">
                <Check aria-hidden="true" size={22} strokeWidth={2} className="mt-0.5 shrink-0 text-teal-deep" />
                <span className="max-w-[48ch] font-medium leading-relaxed text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card bg-peach sm:p-8">
          <h2 id="fit-not-heading" className="headline headline-md">
            {notForYou.header}
          </h2>
          <ul className="mt-6 space-y-3">
            {notForYou.items.map((item) => (
              <li key={item} className="flex min-h-[44px] items-start gap-3">
                <X aria-hidden="true" size={22} strokeWidth={2} className="mt-0.5 shrink-0 text-foreground" />
                <span className="max-w-[48ch] font-medium leading-relaxed text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
