import { useState } from "react";
import { Check } from "lucide-react";
import { openBookingModal } from "./BookingModal";

const symptoms = [
  "You're spending on ads but can't say which ones made money.",
  "The reports look fine. Revenue is flat.",
  "Budget leaks somewhere between the click and the sale.",
  "You hired a senior team and got handed to a junior.",
  "Strategy decks keep arriving. Execution doesn't.",
];

export function HonestTruth() {
  const [checked, setChecked] = useState<number[]>([]);

  const toggle = (i: number) =>
    setChecked((prev) =>
      prev.includes(i) ? prev.filter((n) => n !== i) : [...prev, i],
    );

  return (
    <section className="border-y-2 border-foreground bg-surface-alt py-20 md:py-28">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
          <div>
            <p className="eyebrow mb-7">The honest truth</p>
            <h2 className="text-[38px] md:text-[52px] font-extrabold leading-[0.98] tracking-[-0.04em] text-foreground">
              Most agencies keep you busy, not growing.
            </h2>
            <p className="mt-6 max-w-[46ch] text-lg text-muted-foreground leading-snug">
              We've taken over a lot of accounts from other agencies, and it's
              usually the same story: plenty of activity, a nice-looking
              dashboard, and nobody who can tell you what any of it did for
              revenue.
            </p>
          </div>

          <div>
            <div className="flex items-baseline justify-between gap-4 mb-4">
              <p className="text-[13px] font-bold uppercase tracking-[0.1em]">
                Sound familiar?
              </p>
              <p className="text-[13px] text-muted-foreground">
                Check all that apply
              </p>
            </div>

            <div className="slab grid gap-[2px] bg-foreground">
              {symptoms.map((s, i) => {
                const on = checked.includes(i);
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggle(i)}
                    aria-pressed={on}
                    className="flex w-full items-center gap-4 bg-surface px-5 py-4 text-left hover:bg-surface-alt md:px-6 md:py-5"
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center border-2 border-foreground ${
                        on ? "bg-teal" : "bg-background"
                      }`}
                    >
                      {on && (
                        <Check className="h-3.5 w-3.5 text-white" strokeWidth={4} />
                      )}
                    </span>
                    <span className="text-[15px] md:text-base leading-snug">
                      {s}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={openBookingModal}
                className="btn-primary"
              >
                {checked.length > 0
                  ? "Right, let's fix it"
                  : "Apply to partner with us"}
              </button>
              {checked.length > 0 && (
                <p className="text-[15px] text-muted-foreground">
                  {checked.length === 1
                    ? "That's one we fix constantly."
                    : `All ${checked.length} of those are the same root problem.`}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
