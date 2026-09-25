import { Section } from "./Section";
import type { LandingContent } from "@/content/types";

/* One pastel fill per card. Written out in full so Tailwind can see them. */
const tones = ["bg-sky", "bg-peach", "bg-lilac"] as const;

/** Section 2: the three reasons agencies stop working. Cream band, one slab of three pastel cells split by ink rules. */
export function Problem({ content }: { content: LandingContent }) {
  const { problem } = content;
  return (
    <Section id="problem" tone="light" labelledBy="problem-heading">
      <h2 id="problem-heading" className="headline headline-lg max-w-[22ch]">
        {problem.header}
      </h2>
      <ul className="slab slab-grid mt-12 grid-cols-1 sm:mt-14 lg:grid-cols-3">
        {problem.cards.map((card, i) => (
          <li key={card.title} className={`${tones[i % tones.length]} flex min-w-0 flex-col p-6 md:p-7`}>
            <span className="mb-5 block h-2.5 w-2.5 rounded-full bg-teal" aria-hidden="true" />
            <h3 className="headline headline-md text-foreground">{card.title}</h3>
            <p className="mt-4 max-w-[42ch] text-[15px] leading-relaxed text-muted-foreground">{card.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
