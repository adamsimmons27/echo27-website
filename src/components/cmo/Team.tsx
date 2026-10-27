import { Check } from "lucide-react";
import { Section } from "./Section";
import type { LandingContent } from "@/content/types";

/** Section 8: who leads the engagement. Photo slot on the left, bio and three checked credentials on the right. */
export function Team({ content }: { content: LandingContent }) {
  const { team } = content;
  return (
    <Section id="team" tone="light" labelledBy="team-heading">
      <div className="grid gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-center lg:gap-16">
        {/* PHOTO SLOT: replace this frame with a real photo of Adam, 4:5. Keep the 2px ink border to match the site. */}
        <div className="photo-slot aspect-[4/5] max-h-[520px] w-full" aria-hidden="true">
          [Photo slot]
        </div>
        <div>
          <h2 id="team-heading" className="headline headline-lg max-w-[22ch]">
            {team.header}
          </h2>
          <p className="lede mt-6 max-w-[56ch] text-muted-foreground">{team.body}</p>
          <ul className="mt-8 space-y-3">
            {team.points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <Check aria-hidden="true" size={22} strokeWidth={2} className="mt-0.5 shrink-0 text-teal-deep" />
                <span className="max-w-[48ch] font-medium leading-relaxed text-foreground">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
