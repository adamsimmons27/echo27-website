import { Check } from "lucide-react";
import { Section } from "./Section";
import { track } from "@/lib/tracking";
import type { LandingContent } from "@/content/types";

/**
 * AI search as a differentiator: the copy, an illustration of how the two kinds of search differ and what they share,
 * and a box that sends a website to the existing AI Search Readiness Checker. Nothing is scored on this page.
 */
export function Aeo({ content }: { content: LandingContent }) {
  const { aeo } = content;
  return (
    <Section id="ai-search" tone="lilac" labelledBy="aeo-heading">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="eyebrow cmo-eyebrow">{aeo.eyebrow}</p>
          <h2 id="aeo-heading" className="headline headline-lg mt-5">
            {aeo.header}
          </h2>
          <p className="lede mt-5 max-w-[58ch] text-foreground">{aeo.body}</p>
          <p className="mt-4 max-w-[58ch] text-[15px] font-semibold leading-relaxed text-foreground">{aeo.honesty}</p>

          <h3 className="mt-8 text-[13px] font-bold uppercase tracking-[0.08em] text-foreground">{aeo.helpHeader}</h3>
          <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {aeo.items.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[15px] font-medium leading-snug text-foreground">
                <Check aria-hidden="true" size={18} strokeWidth={2.5} className="mt-0.5 shrink-0 text-teal-deep" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-8">
          <SearchVisual visual={aeo.visual} />
          <CheckBox check={aeo.check} />
        </div>
      </div>
    </Section>
  );
}

/** Two panels, links on one side and a short answer on the other, sitting on the foundations they share. */
function SearchVisual({ visual }: { visual: LandingContent["aeo"]["visual"] }) {
  const label = "text-[12px] font-bold uppercase tracking-[0.08em] text-foreground";
  return (
    <div role="img" aria-label={visual.label} className="slab bg-foreground">
      <div aria-hidden="true" className="grid grid-cols-1 gap-[2px] sm:grid-cols-2">
        <div className="flex flex-col bg-surface p-5">
          <p className={label}>{visual.traditional.title}</p>
          <div className="mt-4 flex flex-1 flex-col gap-3.5">
            {[78, 64, 86, 58].map((w, i) => (
              <div key={i}>
                <span className="block h-2.5 rounded-sm bg-teal-deep" style={{ width: `${w}%` }} />
                <span className="mt-1.5 block h-1.5 w-full rounded-sm bg-foreground/15" />
                <span className="mt-1 block h-1.5 w-3/5 rounded-sm bg-foreground/15" />
              </div>
            ))}
          </div>
          <p className="mt-4 text-[13px] leading-snug text-muted-foreground">{visual.traditional.caption}</p>
        </div>

        <div className="flex flex-col bg-surface p-5">
          <p className={label}>{visual.ai.title}</p>
          <div className="mt-4 flex flex-1 flex-col gap-2.5">
            <p className="max-w-[92%] self-end rounded-xl rounded-br-sm border-2 border-foreground bg-sky px-3 py-2 text-[13px] font-bold leading-snug text-foreground">
              {visual.ai.question}
            </p>
            <ol className="self-start rounded-xl rounded-bl-sm border-2 border-foreground bg-background px-3 py-2.5 text-[13px] leading-snug">
              {visual.ai.answers.map((answer, i) => {
                const you = i === visual.ai.answers.length - 1;
                return (
                  <li key={answer} className="flex gap-2 py-0.5">
                    <span className="font-bold tabular-nums text-teal-deep">{i + 1}.</span>
                    <span className={you ? "hl font-bold" : "font-bold text-foreground"}>{answer}</span>
                  </li>
                );
              })}
            </ol>
          </div>
          <p className="mt-4 text-[13px] leading-snug text-muted-foreground">{visual.ai.caption}</p>
        </div>

        <div className="bg-butter p-5 sm:col-span-2">
          <p className={label}>{visual.foundations.title}</p>
          <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {visual.foundations.items.map((item) => (
              <li key={item} className="flex items-start gap-2 text-[14px] font-medium leading-snug text-foreground">
                <Check size={16} strokeWidth={2.5} className="mt-0.5 shrink-0 text-teal-deep" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/**
 * Secondary lead magnet. A plain GET form to the checker page, which fills in the website and asks for the trade
 * and city before it runs. It works without JavaScript; the click is tracked when tags are present.
 */
function CheckBox({ check }: { check: LandingContent["aeo"]["check"] }) {
  return (
    <form
      action={check.action}
      method="get"
      onSubmit={() => track("aeo_check_start", { location: "fractional-cmo" })}
      className="card sm:p-7"
    >
      <h3 className="headline headline-md text-foreground">{check.header}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{check.body}</p>
      <label htmlFor="aeo-url" className="field-label mt-5">
        {check.inputLabel}
      </label>
      <div className="mt-2 flex flex-col gap-3">
        <input
          id="aeo-url"
          name="url"
          type="text"
          inputMode="url"
          autoComplete="url"
          autoCapitalize="none"
          spellCheck={false}
          required
          placeholder={check.placeholder}
          className="field"
        />
        <button type="submit" className="btn-ghost w-full">
          {check.button}
        </button>
      </div>
      <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">{check.note}</p>
    </form>
  );
}
