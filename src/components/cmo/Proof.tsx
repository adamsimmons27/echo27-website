import { ArrowUpRight } from "lucide-react";
import { Section } from "./Section";
import { WrittenQuotes, writtenBy } from "@/components/echo/Testimonials";
import type { LandingContent } from "@/content/types";

const tones = ["bg-sky", "bg-butter"] as const;

/**
 * Proof from real work only: the two published case studies with their own figures, then two written client quotes.
 * The placeholder result lines on the quotes are switched off, so nothing unverified is shown.
 */
export function Proof({ content }: { content: LandingContent }) {
  const { proof } = content;
  return (
    <Section id="proof" tone="light" labelledBy="proof-heading">
      <div className="max-w-3xl">
        <h2 id="proof-heading" className="headline headline-lg">
          {proof.header}
        </h2>
        <p className="mt-5 text-[16px] leading-relaxed text-muted-foreground">{proof.subhead}</p>
      </div>

      <ul data-stagger className="mt-10 grid gap-6 md:grid-cols-2 lg:mt-12">
        {proof.cases.map((item, i) => (
          <li key={item.company} className={`card cmo-lift flex flex-col sm:p-7 ${tones[i % tones.length]}`}>
            <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-teal-deep">{item.kind}</p>
            <h3 className="headline headline-md mt-2 text-foreground">{item.company}</h3>
            <dl className="mt-6 grid grid-cols-2 gap-5">
              {item.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse">
                  <dt className="mt-2 text-[14px] font-medium leading-snug text-foreground">{stat.label}</dt>
                  <dd className="headline headline-lg tabular-nums text-foreground">{stat.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-[15px] leading-relaxed text-foreground">{item.detail}</p>
            <a
              href={item.href}
              target="_blank"
              rel="noopener"
              className="mt-5 inline-flex min-h-11 items-center gap-1.5 self-start text-[15px] font-bold text-foreground underline underline-offset-4 hover:text-teal-deep"
            >
              {proof.caseLink}
              <ArrowUpRight aria-hidden="true" size={18} strokeWidth={2.25} />
              <span className="sr-only">: {item.company} (opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <WrittenQuotes items={proof.quotes.map(writtenBy)} columns={2} showResult={false} />
      </div>
    </Section>
  );
}
