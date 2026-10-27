import { Section } from "./Section";
import type { LandingContent } from "@/content/types";

/**
 * Section 6: three case study cards on cream, each a white slab with a marked photo slot on top.
 * Every field is a bracketed placeholder until real numbers exist. The result pair sits on a mint block.
 * Below the cards, a two-column list of shorter one-line results.
 */
export function Proof({ content }: { content: LandingContent }) {
  const { proof } = content;
  const { labels, cases } = proof;

  const term = "text-[12px] font-bold uppercase tracking-[0.08em] text-teal-deep";

  return (
    <Section id="proof" tone="light" labelledBy="proof-heading">
      <h2 id="proof-heading" className="headline headline-lg max-w-[22ch]">
        {proof.header}
      </h2>

      <ul className="mt-10 grid gap-6 md:gap-8 lg:mt-12 lg:grid-cols-3">
        {cases.map((item) => (
          <li key={item.company} className="card flex flex-col">
            {/*
              PHOTO SLOT. To replace: swap this div for a plain img with a 16:9 source,
              give it alt text that names the company and the job, remove aria-hidden, and drop the
              .photo-slot class. Keep aspect-video, rounded-[18px], and mb-5 so the card layout does not shift.
            */}
            <div className="photo-slot mb-5 aspect-video w-full" aria-hidden="true">
              [Photo slot]
            </div>

            <h3 className="headline headline-md text-foreground">{item.company}</h3>

            <dl className="mt-5 flex flex-1 flex-col gap-4">
              <div>
                <dt className={term}>{labels.situation}</dt>
                <dd className="mt-1 text-[15px] leading-relaxed text-foreground">{item.situation}</dd>
              </div>
              <div>
                <dt className={term}>{labels.change}</dt>
                <dd className="mt-1 text-[15px] leading-relaxed text-foreground">{item.change}</dd>
              </div>
              <div className="mt-auto rounded-lg bg-mint p-4">
                <dt className={term}>{labels.result}</dt>
                <dd className="mt-1 text-[15px] font-bold leading-relaxed text-foreground">{item.result}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>

      <div className="mt-14 lg:mt-16">
        <h3 className="headline headline-md">{proof.more.header}</h3>
        <ul className="mt-6 grid gap-x-10 gap-y-3 md:grid-cols-2">
          {proof.more.items.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <span aria-hidden="true" className="mt-[0.6em] size-2 shrink-0 rounded-full bg-teal-deep" />
              <span className="max-w-[52ch] font-medium leading-relaxed text-foreground">{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm italic text-muted-foreground">{proof.more.note}</p>
      </div>
    </Section>
  );
}
