import { Section } from "./Section";
import { CtaButton } from "./CtaButton";
import type { LandingContent } from "@/content/types";

/**
 * Section 3: homeowners now ask AI who to call. Deep teal band, text left, a stylised chat answer right.
 * The mock is pure HTML and CSS in a white slab, with no product UI or brand marks.
 */
export function Shift({ content }: { content: LandingContent }) {
  const { shift, cta } = content;
  return (
    <Section id="shift" tone="dark" labelledBy="shift-heading">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-16">
        <div>
          <h2 id="shift-heading" className="headline headline-lg max-w-[22ch] text-white">
            {shift.header}
          </h2>
          <p className="lede mt-6 max-w-[60ch] text-white/90">{shift.body}</p>
          <CtaButton
            location="shift"
            targetId={cta.targetId}
            variant="on-dark"
            className="mt-8 w-full text-center sm:w-auto"
          >
            {shift.miniCta}
          </CtaButton>
        </div>

        <div
          role="img"
          aria-label="Illustration of an AI answer listing competitors instead of your company"
          className="card-dark w-full max-w-md lg:ml-auto"
        >
          <div aria-hidden="true" className="flex flex-col gap-4">
            {/* User bubble, right aligned, on the sky fill. */}
            <div className="flex justify-end">
              <p className="max-w-[85%] rounded-xl rounded-br-sm bg-sky px-4 py-3 text-[15px] font-bold leading-snug text-foreground break-words">
                {shift.mock.question}
              </p>
            </div>

            {/* Answer bubble, left aligned, on the pale mint fill, with a teal dot as the only ornament. */}
            <div className="flex items-end gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-foreground bg-surface">
                <span className="h-2.5 w-2.5 rounded-full bg-teal" />
              </span>
              <div className="min-w-0 max-w-[85%] rounded-xl rounded-bl-sm bg-surface-alt px-4 py-3">
                <ol className="space-y-2 text-[15px] leading-snug">
                  {shift.mock.answers.map((answer, index) => {
                    const last = index === shift.mock.answers.length - 1;
                    return (
                      <li
                        key={answer}
                        className={`flex gap-3 break-words ${last ? "text-muted-foreground" : "text-foreground"}`}
                      >
                        <span className={`shrink-0 font-bold tabular-nums ${last ? "" : "text-teal-deep"}`}>
                          {index + 1}.
                        </span>
                        <span className={last ? "" : "font-bold"}>{answer}</span>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
