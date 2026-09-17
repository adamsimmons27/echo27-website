import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

// Each row carries one flat fill. Class names are written out in full so Tailwind can see them.
const items = [
  {
    name: "SaaS",
    to: "/saas",
    cta: "How we work with SaaS",
    copy: "Acquisition and retention for subscription products, measured on what a customer is worth over time.",
    tone: "bg-sky",
  },
  {
    name: "Consumer finance",
    to: "/consumer-finance",
    cta: "How we work with lenders",
    copy: "Lead generation for lending and fintech, built around compliance and long payback windows.",
    tone: "bg-lilac",
  },
  {
    name: "Ecommerce",
    to: "/ecommerce",
    cta: "How we work with ecommerce",
    copy: "Ads, offers, and email run against real margins and repeat purchase rates.",
    tone: "bg-peach",
  },
  {
    name: "Local business",
    to: "/local-services",
    cta: "How we work with local business",
    copy: "Local SEO, paid ads, and follow-up for businesses that win customers one at a time.",
    tone: "bg-mint",
  },
] as const;

// The visible button is a span inside the link, not the link itself. The link's ::after stretches over the
// whole row, and a transform on the link would shrink that overlay to the button while it is pressed in.
const button =
  "flex w-full items-center justify-between gap-3 rounded-[12px] border-2 border-foreground bg-surface px-5 py-[0.8rem] text-left text-[14px] font-bold leading-tight text-foreground shadow-[4px_4px_0_0_var(--foreground)] transition-[background-color,color,translate,box-shadow] duration-150 motion-reduce:transition-none xl:whitespace-nowrap";
const buttonLit =
  "group-hover:bg-teal-deep group-hover:text-white group-hover:shadow-[2px_2px_0_0_var(--foreground)] motion-safe:group-hover:translate-x-[2px] motion-safe:group-hover:translate-y-[2px] group-has-[a:focus-visible]:bg-teal-deep group-has-[a:focus-visible]:text-white group-has-[a:focus-visible]:shadow-[2px_2px_0_0_var(--foreground)] motion-safe:group-has-[a:focus-visible]:translate-x-[2px] motion-safe:group-has-[a:focus-visible]:translate-y-[2px]";

export function Industries() {
  return (
    <section id="industries" className="bg-background pb-20 md:pb-28">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-7">Industries</p>
            <h2 className="max-w-[14ch] text-[38px] md:text-[52px] font-extrabold leading-[0.98] tracking-[-0.04em] text-foreground">
              Who we work with.
            </h2>
          </div>
          <p className="max-w-[34ch] text-[15px] text-muted-foreground leading-relaxed md:pb-2">
            Twenty-three industries so far. These four are where we've done the
            most volume and know the maths cold.
          </p>
        </div>
      </div>

      {/* An index, not a grid: full-width colour rows split by ink rules, with the industry name set very large.
          Each row is one link. data-stagger lets the root reveal bring the rows in one after another. */}
      <ul role="list" data-stagger className="mt-14 border-t-2 border-foreground">
        {items.map((item) => (
          <li key={item.name} className={`group relative border-b-2 border-foreground ${item.tone}`}>
            <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-y-4 px-6 py-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-x-10 md:gap-y-5 md:py-10 xl:grid-cols-[minmax(0,1fr)_264px_328px] xl:items-center xl:py-11">
              <h3 className="text-[38px] font-extrabold leading-[0.95] tracking-[-0.04em] text-foreground md:row-span-2 md:self-center md:text-[40px] lg:text-[52px] xl:row-span-1 xl:text-[50px]">
                {item.name}
              </h3>
              <p className="max-w-[46ch] text-[15px] leading-relaxed text-foreground/75 transition-colors duration-200 group-hover:text-foreground group-has-[a:focus-visible]:text-foreground md:col-start-2">
                {item.copy}
              </p>
              {/* The link's ::after stretches over the whole row, including its 2px bottom rule (the li is the positioned parent), so the row is the click target. */}
              <Link
                to={item.to}
                className="mt-2 block rounded-[12px] after:absolute after:inset-0 after:-bottom-[2px] after:content-[''] focus-visible:outline-[3px] focus-visible:outline-offset-[6px] focus-visible:outline-foreground md:col-start-2 md:mt-0 xl:col-start-3"
              >
                <span className={`${button} ${buttonLit}`}>
                  {item.cta}
                  <ArrowRight
                    className="h-4 w-4 shrink-0 transition-transform duration-150 motion-safe:group-hover:translate-x-1 motion-safe:group-has-[a:focus-visible]:translate-x-1 motion-reduce:transition-none"
                    strokeWidth={2.5}
                  />
                </span>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
