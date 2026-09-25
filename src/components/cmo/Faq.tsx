import { useState } from "react";
import { Plus } from "lucide-react";
import { Section } from "./Section";
import type { LandingContent } from "@/content/types";
import { track } from "@/lib/tracking";

/** Section 9: an accessible accordion in one white slab, divided by ink rules. Native buttons, hidden panels, several open at once. */
export function Faq({ faq }: { faq: LandingContent["faq"] }) {
  const [open, setOpen] = useState<Set<number>>(() => new Set());

  function toggle(index: number, question: string) {
    const opening = !open.has(index);
    if (opening) track("faq_open", { question });
    setOpen((current) => {
      const next = new Set(current);
      if (opening) {
        next.add(index);
      } else {
        next.delete(index);
      }
      return next;
    });
  }

  return (
    <Section id="faq" tone="light" labelledBy="faq-heading">
      <div className="mx-auto max-w-3xl">
        <h2 id="faq-heading" className="headline headline-lg">
          {faq.header}
        </h2>
        <div className="slab mt-10 divide-y-2 divide-foreground bg-surface">
          {faq.items.map((item, index) => {
            const isOpen = open.has(index);
            const buttonId = `faq-button-${index}`;
            const panelId = `faq-panel-${index}`;
            return (
              <div key={item.question} className="bg-surface">
                <h3 className="m-0">
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(index, item.question)}
                    className="flex min-h-[56px] w-full items-center justify-between gap-6 px-6 py-5 text-left text-[17px] font-bold leading-snug text-foreground transition-colors hover:bg-surface-alt"
                  >
                    <span>{item.question}</span>
                    <Plus
                      aria-hidden="true"
                      size={22}
                      strokeWidth={2}
                      className={`shrink-0 text-teal-deep motion-safe:transition-transform motion-safe:duration-200 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    />
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen} className="px-6 pb-6">
                  <p className="max-w-[60ch] leading-relaxed text-muted-foreground">{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
