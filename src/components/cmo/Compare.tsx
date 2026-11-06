import { Check, X } from "lucide-react";
import { Section } from "./Section";
import { Byline, writtenBy } from "@/components/echo/Testimonials";
import type { LandingContent } from "@/content/types";

/**
 * Traditional agency against Echo 27. A real two-column table in a white slab at md and up, with the Echo 27 column
 * on deep teal. Below md, one cell per row so nothing scrolls sideways. A real client quote sits underneath.
 */
export function Compare({ content }: { content: LandingContent }) {
  const { compare } = content;
  const { columns, rows } = compare;
  const quote = writtenBy(compare.quote);

  const cell = "px-5 py-4 align-middle text-[15px] leading-snug";
  const rule = "border-b-2 border-foreground";

  return (
    <Section id="difference" tone="light" labelledBy="difference-heading">
      <h2 id="difference-heading" className="headline headline-lg max-w-[22ch]">
        {compare.header}
      </h2>

      <div className="slab mt-10 hidden bg-surface md:block lg:mt-12">
        <table className="w-full border-separate border-spacing-0 text-left">
          <caption className="sr-only">{compare.header}</caption>
          <thead>
            <tr>
              <td className={`${cell} ${rule} w-[20%] bg-surface`} />
              <th scope="col" className={`${cell} ${rule} w-[36%] border-l-2 border-foreground bg-surface text-base font-bold text-muted-foreground`}>
                {columns[0]}
              </th>
              <th scope="col" className={`${cell} ${rule} border-l-2 border-foreground bg-teal-deep text-base font-bold text-white`}>
                {columns[1]}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => {
              const rowRule = r === rows.length - 1 ? "" : rule;
              return (
                <tr key={row.label}>
                  <th scope="row" className={`${cell} ${rowRule} bg-surface text-[13px] font-bold uppercase tracking-[0.08em] text-foreground`}>
                    {row.label}
                  </th>
                  <td className={`${cell} ${rowRule} border-l-2 border-foreground bg-surface text-muted-foreground`}>
                    <span className="flex items-center gap-3">
                      <X aria-hidden="true" size={18} strokeWidth={2.5} className="shrink-0" />
                      {row.them}
                    </span>
                  </td>
                  <td className={`${cell} ${rowRule} border-l-2 border-foreground bg-teal-deep text-[16px] font-bold text-white`}>
                    <span className="flex items-center gap-3">
                      <Check aria-hidden="true" size={20} strokeWidth={2.5} className="shrink-0" />
                      {row.us}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ul className="slab slab-grid mt-10 grid-cols-1 md:hidden">
        {rows.map((row) => (
          <li key={row.label} className="bg-surface p-5">
            <h3 className="text-[12px] font-bold uppercase tracking-[0.08em] text-teal-deep">{row.label}</h3>
            <p className="mt-3 flex items-start gap-2.5 text-[15px] leading-snug text-muted-foreground">
              <X aria-hidden="true" size={18} strokeWidth={2.5} className="mt-0.5 shrink-0" />
              <span>
                <span className="sr-only">{columns[0]}: </span>
                {row.them}
              </span>
            </p>
            <p className="mt-2 flex items-start gap-2.5 rounded-lg bg-teal-deep px-3 py-2.5 text-[15px] font-bold leading-snug text-white">
              <Check aria-hidden="true" size={18} strokeWidth={2.5} className="mt-0.5 shrink-0" />
              <span>
                <span className="sr-only">{columns[1]}: </span>
                {row.us}
              </span>
            </p>
          </li>
        ))}
      </ul>

      <figure className="mt-12 grid gap-6 border-l-4 border-teal pl-6 md:mt-14 md:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] md:items-center md:gap-10 md:pl-8">
        <blockquote className="text-[19px] font-medium leading-snug text-foreground md:text-[22px]">“{quote.quote}”</blockquote>
        <figcaption>
          <Byline person={quote} />
        </figcaption>
      </figure>
    </Section>
  );
}
