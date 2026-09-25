import { Section } from "./Section";
import type { LandingContent } from "@/content/types";

/**
 * Section 7: four numbered steps on the sky band, as one slab grid of white cells divided by ink rules.
 * The ordinal is rendered here, not in content, as a big teal headline the way the main site sets its stats.
 */
export function HowItWorks({ content }: { content: LandingContent }) {
  const { how } = content;

  return (
    <Section id="how" tone="sky" labelledBy="how-heading">
      <h2 id="how-heading" className="headline headline-lg max-w-[22ch]">
        {how.header}
      </h2>

      <ol className="slab slab-grid mt-10 grid-cols-1 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
        {how.steps.map((step, index) => (
          <li key={step.title} className="flex flex-col bg-surface p-6 md:p-7">
            <span aria-hidden="true" className="headline headline-lg tabular-nums text-teal">
              {index + 1}
            </span>
            <h3 className="headline headline-md mt-4 max-w-[18ch] text-foreground">{step.title}</h3>
            <p className="mt-3 max-w-[34ch] text-[15px] leading-relaxed text-muted-foreground">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
