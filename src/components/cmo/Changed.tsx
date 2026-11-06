import { Section } from "./Section";
import { CtaButton } from "./CtaButton";
import type { LandingContent } from "@/content/types";

/** What changed in the market, then the turn: one white slab on the deep teal band carrying the key message. */
export function Changed({ content }: { content: LandingContent }) {
  const { changed, cta } = content;
  return (
    <Section id="changed" tone="dark" labelledBy="changed-heading">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
        <div>
          <h2 id="changed-heading" className="headline headline-lg max-w-[18ch] text-white">
            {changed.header}
          </h2>
          <p className="lede mt-5 max-w-[52ch] text-white">{changed.intro}</p>
          <ul data-stagger className="mt-8 divide-y-2 divide-white/25 border-y-2 border-white/25">
            {changed.shifts.map((shift) => (
              <li key={shift.title} className="py-4">
                <h3 className="text-[17px] font-bold leading-snug text-white">{shift.title}</h3>
                <p className="mt-1 max-w-[60ch] text-[15px] leading-relaxed text-white/85">{shift.body}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="card-dark self-center sm:p-8">
          <p className="eyebrow">{changed.turnEyebrow}</p>
          <p className="headline headline-md mt-5 text-foreground">{changed.keyMessage}</p>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{changed.keyBody}</p>
          <CtaButton location="changed" targetId={cta.targetId} className="mt-7 w-full text-center">
            {cta.label}
          </CtaButton>
        </div>
      </div>
    </Section>
  );
}
