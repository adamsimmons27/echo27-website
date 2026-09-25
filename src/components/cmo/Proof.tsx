import { Section } from "./Section";
import type { LandingContent } from "@/content/types";

/**
 * Section 6: three case study cards on cream, each a white slab with a marked photo slot on top.
 * Every field is a bracketed placeholder until real numbers exist. The result pair sits on a mint block.
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
    </Section>
  );
}
