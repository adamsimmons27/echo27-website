import { Section } from "./Section";
import type { LandingContent } from "@/content/types";

/**
 * Section 5: the comparison, on the pale mint band. A real table inside a white slab at md and up, with ink
 * rules between rows and columns and the Echo 27 column on deep teal. Below md, one white cell per row inside
 * a slab grid so nothing scrolls sideways on a phone. Both renderings are in the DOM and toggled with display classes.
 */
export function Compare({ content }: { content: LandingContent }) {
  const { why } = content;
  const { columns, rows, highlight, points } = why;

  const cell = "px-5 py-4 align-top text-[15px] leading-snug";
  const rule = "border-b-2 border-foreground";
  const colRule = "border-l-2 border-foreground";

  return (
    <Section id="why" tone="mist" labelledBy="why-heading">
      <h2 id="why-heading" className="headline headline-lg max-w-[22ch]">
        {why.header}
      </h2>

      {/* (a) md and up: a real table in a white slab. Rules are drawn on the cells so the slab's own border stays 2px. */}
      <div className="slab mt-10 hidden bg-surface md:block lg:mt-12">
        <table className="w-full border-separate border-spacing-0 text-left">
          <caption className="sr-only">{why.header}</caption>
          <thead>
            <tr>
              <td className={`${cell} ${rule} w-[22%] bg-surface`} />
              {columns.map((column, i) => {
                const isHighlight = i === highlight;
                return (
                  <th
                    key={column}
                    scope="col"
                    className={`${cell} ${rule} ${colRule} text-base font-bold ${
                      isHighlight ? "bg-teal-deep text-white" : "bg-surface text-foreground"
                    }`}
                  >
                    {column}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => {
              const rowRule = r === rows.length - 1 ? "" : rule;
              return (
                <tr key={row.label}>
                  <th scope="row" className={`${cell} ${rowRule} bg-surface font-bold text-foreground`}>
                    {row.label}
                  </th>
                  {row.values.map((value, i) => {
                    const isHighlight = i === highlight;
                    return (
                      <td
                        key={columns[i]}
                        className={`${cell} ${rowRule} ${colRule} ${
                          isHighlight ? "bg-teal-deep font-bold text-white" : "bg-surface text-foreground"
                        }`}
                      >
                        {value}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* (b) below md: one white cell per row inside a slab grid, values as a definition list. */}
      <ul className="slab slab-grid mt-10 grid-cols-1 md:hidden">
        {rows.map((row) => (
          <li key={row.label} className="bg-surface p-5">
            <h3 className="text-[19px] font-extrabold leading-[1.05] tracking-[-0.03em] text-foreground">{row.label}</h3>
            <dl className="mt-4 flex flex-col gap-3">
              {row.values.map((value, i) => {
                const isHighlight = i === highlight;
                return (
                  <div
                    key={columns[i]}
                    className={isHighlight ? "rounded-r-lg border-l-4 border-teal bg-mint px-4 py-3" : "px-4 py-1"}
                  >
                    <dt className="text-[12px] font-bold uppercase tracking-[0.08em] text-teal-deep">{columns[i]}</dt>
                    <dd className={`mt-1 text-[15px] leading-snug text-foreground ${isHighlight ? "font-bold" : ""}`}>
                      {value}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </li>
        ))}
      </ul>

      {/* Three supporting points, each marked with the site's teal dot. */}
      <ul className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-3 lg:gap-8">
        {points.map((point) => (
          <li key={point.title} className="max-w-[40ch]">
            <span aria-hidden="true" className="block h-2.5 w-2.5 rounded-full bg-teal" />
            <h3 className="headline headline-md mt-4 text-foreground">{point.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{point.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
