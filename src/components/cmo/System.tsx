import { Check, Compass, MessagesSquare, Search, type LucideIcon } from "lucide-react";
import { Section } from "./Section";
import type { LandingContent, PillarIcon } from "@/content/types";

const icons: Record<PillarIcon, LucideIcon> = { search: Search, messages: MessagesSquare, compass: Compass };
const tones = ["bg-sky", "bg-mint", "bg-peach"] as const;

/** The three pillars, one card each, each ending in the outcome it is there to produce. */
export function System({ content }: { content: LandingContent }) {
  const { system } = content;
  return (
    <Section id="system" tone="light" labelledBy="system-heading">
      <div className="max-w-3xl">
        <h2 id="system-heading" className="headline headline-lg">
          {system.header}
        </h2>
        <p className="lede mt-4 text-muted-foreground">{system.subhead}</p>
      </div>
      <ul data-stagger className="mt-10 grid gap-6 lg:mt-12 lg:grid-cols-3">
        {system.pillars.map((pillar, i) => {
          const Icon = icons[pillar.icon];
          return (
            <li key={pillar.title} className={`card cmo-lift flex flex-col p-0 ${tones[i % tones.length]}`}>
              <div className="p-6 sm:p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-foreground bg-surface text-foreground" aria-hidden="true">
                  <Icon size={24} strokeWidth={2} />
                </span>
                <h3 className="headline headline-md mt-5 text-foreground">{pillar.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-foreground">{pillar.tagline}</p>
              </div>
              <div className="flex flex-1 flex-col rounded-b-[16px] border-t-2 border-foreground bg-surface p-6 sm:p-7">
                <ul className="space-y-2.5">
                  {pillar.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[15px] font-medium leading-snug text-foreground">
                      <Check aria-hidden="true" size={18} strokeWidth={2.5} className="mt-0.5 shrink-0 text-teal-deep" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-auto pt-6 text-[15px] font-bold leading-snug text-foreground">{pillar.outcome}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
