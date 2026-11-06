import { Blocks, Search, TrendingUp, type LucideIcon } from "lucide-react";
import { Section } from "./Section";
import type { LandingContent, StageIcon } from "@/content/types";

const icons: Record<StageIcon, LucideIcon> = { search: Search, blocks: Blocks, trending: TrendingUp };

/** Three stages in one slab on the sky band. Each cell leads with its icon; the order reads left to right. */
export function HowItWorks({ content }: { content: LandingContent }) {
  const { how } = content;
  return (
    <Section id="how" tone="sky" labelledBy="how-heading">
      <h2 id="how-heading" className="headline headline-lg">
        {how.header}
      </h2>
      <ol className="slab slab-grid mt-10 grid-cols-1 lg:mt-12 lg:grid-cols-3">
        {how.steps.map((step) => {
          const Icon = icons[step.icon];
          return (
            <li key={step.title} className="flex flex-col bg-surface p-6 md:p-8">
              <span aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-foreground bg-mint text-foreground">
                <Icon size={24} strokeWidth={2} />
              </span>
              <h3 className="headline headline-md mt-5 text-foreground">{step.title}</h3>
              <p className="mt-3 max-w-[40ch] text-[15px] leading-relaxed text-muted-foreground">{step.body}</p>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
