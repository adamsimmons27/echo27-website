import { Check } from "lucide-react";
import { Section } from "./Section";
import type { LandingContent } from "@/content/types";

const tones = ["bg-surface", "bg-butter", "bg-surface", "bg-butter", "bg-surface", "bg-butter", "bg-surface", "bg-butter", "bg-surface"];

/**
 * The Fractional CMO runs the whole system. Copy on the left, the before and after of who coordinates the work on
 * the right, then what the CMO oversees as one slab and a short note on who leads the account.
 */
export function Leadership({ content }: { content: LandingContent }) {
  const { leadership } = content;
  return (
    <Section id="leadership" tone="peach" labelledBy="leadership-heading">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:items-center lg:gap-14">
        <div>
          <h2 id="leadership-heading" className="headline headline-lg max-w-[20ch]">
            {leadership.header}
          </h2>
          <p className="lede mt-5 max-w-[56ch] text-foreground">{leadership.body}</p>
          <p className="mt-5 max-w-[56ch] text-[18px] font-bold leading-snug text-foreground">
            <span className="hl cmo-hl-white">{leadership.benefit}</span>
          </p>
        </div>
        <CoordinationVisual visual={leadership.visual} />
      </div>

      <h3 className="headline headline-md mt-12 lg:mt-16">{leadership.listHeader}</h3>
      <ul className="slab slab-grid mt-6 grid-cols-1 sm:grid-cols-3">
        {leadership.items.map((item, i) => (
          <li key={item} className={`${tones[i % tones.length]} flex items-center gap-3 px-5 py-4 text-[15px] font-bold leading-snug text-foreground`}>
            <Check aria-hidden="true" size={18} strokeWidth={2.5} className="shrink-0 text-teal-deep" />
            {item}
          </li>
        ))}
      </ul>

      <div className="card mt-10 grid gap-6 sm:p-8 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-10 lg:mt-12">
        <div>
          <h3 className="headline headline-md">{leadership.lead.header}</h3>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{leadership.lead.body}</p>
        </div>
        <ul className="space-y-3 md:self-center">
          {leadership.lead.points.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <Check aria-hidden="true" size={20} strokeWidth={2.5} className="mt-0.5 shrink-0 text-teal-deep" />
              <span className="font-bold leading-snug text-foreground">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/** Two small org charts: the owner wired to four vendors, then the owner wired to one leader who directs the team. */
function CoordinationVisual({ visual }: { visual: LandingContent["leadership"]["visual"] }) {
  const node = "rounded-lg border-2 border-foreground px-3 py-2 text-center text-[13px] font-bold leading-tight";
  const stem = "mx-auto block h-4 w-0.5 bg-foreground";
  const title = "text-[12px] font-bold uppercase tracking-[0.08em] text-foreground";
  return (
    <div role="img" aria-label={visual.label} className="slab bg-foreground">
      <div aria-hidden="true" className="grid grid-cols-1 gap-[2px] sm:grid-cols-2">
        <div className="flex flex-col bg-surface p-5">
          <p className={title}>{visual.before.title}</p>
          <div className="mt-4 flex-1">
            <p className={`${node} bg-background text-foreground`}>{visual.before.you}</p>
            <span className={stem} />
            <ul className="grid grid-cols-2 gap-2 border-t-2 border-dashed border-foreground pt-3">
              {visual.before.vendors.map((vendor) => (
                <li key={vendor} className={`${node} border-dashed bg-surface font-semibold text-muted-foreground`}>
                  {vendor}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-4 text-[13px] leading-snug text-muted-foreground">{visual.before.note}</p>
        </div>

        <div className="flex flex-col bg-mint p-5">
          <p className={title}>{visual.after.title}</p>
          <div className="mt-4 flex-1">
            <p className={`${node} bg-surface text-foreground`}>{visual.after.you}</p>
            <span className={stem} />
            <p className={`${node} bg-teal-deep text-white`}>{visual.after.cmo}</p>
            <span className={stem} />
            <ul className="grid grid-cols-2 gap-2">
              {visual.after.team.map((member) => (
                <li key={member} className={`${node} bg-surface text-foreground`}>
                  {member}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-4 text-[13px] font-semibold leading-snug text-foreground">{visual.after.note}</p>
        </div>
      </div>
    </div>
  );
}
