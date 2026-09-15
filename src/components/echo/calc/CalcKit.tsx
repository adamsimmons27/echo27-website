import type { ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/echo/Navbar";
import { Footer } from "@/components/echo/Footer";
import { openBookingModal } from "@/components/echo/BookingModal";

export const money0 = (n: number) =>
  Number.isFinite(n)
    ? n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
    : "—";

export const money2 = (n: number) =>
  Number.isFinite(n)
    ? n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 })
    : "—";

export const num1 = (n: number) =>
  Number.isFinite(n) ? n.toLocaleString("en-US", { maximumFractionDigits: 1 }) : "—";

export const int0 = (n: number) =>
  Number.isFinite(n) ? n.toLocaleString("en-US", { maximumFractionDigits: 0 }) : "—";

/** Parse a form string; blank → NaN so validation can tell "empty" from "0". */
export const parse = (v: string) => (v.trim() === "" ? NaN : Number(v));

export const TOOLS = [
  {
    to: "/cac-calculator",
    name: "Cost per customer",
    blurb: "Turn cost per lead into the number that actually matters, and find the stage of the funnel that's leaking.",
  },
  {
    to: "/growth-calculator",
    name: "Growth projection",
    blurb: "Project customers and monthly revenue forward from a given ad spend, with churn working against you.",
  },
  {
    to: "/growth-ceiling",
    name: "Growth ceiling",
    blurb: "Your churn rate caps how big you can get. Find the cap and see which lever raises it fastest.",
  },
] as const;

/** Page chrome shared by every calculator. Narrow single column by default. */
export function CalcPage({
  eyebrow,
  title,
  intro,
  note,
  wide = false,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  note?: string;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="bg-background text-foreground">
      <Navbar />
      <main className="pt-[68px]">
        <div className={`mx-auto px-6 ${wide ? "max-w-[1180px]" : "max-w-[760px]"}`}>
          <section className="pt-16 pb-10 md:pt-24 md:pb-12">
            <p className="eyebrow mb-6">{eyebrow}</p>
            <h1
              className={`font-extrabold leading-[0.98] tracking-[-0.04em] ${
                wide
                  ? "max-w-[18ch] text-[40px] sm:text-[56px] md:text-[68px]"
                  : "text-[36px] sm:text-[46px] md:text-[54px]"
              }`}
            >
              {title}
            </h1>
            <p className="mt-6 max-w-[58ch] text-lg md:text-xl text-muted-foreground leading-snug">
              {intro}
            </p>
            {note && (
              <p className="mt-4 text-[14px] text-muted-foreground">{note}</p>
            )}
          </section>
          <section>{children}</section>
          <section>
            <ToolLinks />
            <CalcCTA />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function CalcCTA() {
  return (
    <div className="slab my-16 bg-teal-deep p-8 text-white md:my-24 md:p-12">
      <h2 className="max-w-[20ch] text-[30px] md:text-[42px] font-extrabold leading-[1.02] tracking-[-0.03em]">
        These are your numbers. We fix the ones that are wrong.
      </h2>
      <p className="mt-5 max-w-[56ch] text-[15px] md:text-base text-white/70 leading-relaxed">
        A model is only as good as the inputs behind it. If a number above looks
        worse than you expected, that's the one worth a conversation.
      </p>
      <button type="button" onClick={openBookingModal} className="btn-on-dark mt-8">
        Apply to partner with us
      </button>
    </div>
  );
}

/** Cross-links to the other calculators, excluding the one you're on. */
function ToolLinks() {
  const { pathname } = useLocation();
  const others = TOOLS.filter((t) => t.to !== pathname);
  return (
    <div className="mt-16 md:mt-24">
      <p className="eyebrow mb-6">More free tools</p>
      <div className="slab grid grid-cols-1 gap-[2px] bg-foreground md:grid-cols-2">
        {others.map((t) => (
          <Link
            key={t.to}
            to={t.to}
            className="card-flip group flex flex-col bg-surface p-6 md:p-7"
          >
            <p className="flex items-center gap-2 text-[20px] font-extrabold tracking-[-0.02em]">
              {t.name}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                strokeWidth={2.5}
              />
            </p>
            <p className="mt-2 text-[15px] text-muted-foreground leading-relaxed">{t.blurb}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/**
 * A question-style input. The label asks the question; `help` tells people
 * where to find the number. Empty by default with an example placeholder.
 */
export function Field({
  label,
  help,
  value,
  onChange,
  placeholder,
  prefix,
  suffix,
  min = 0,
  max,
  step,
  error,
  children,
}: {
  label: string;
  help?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
  error?: string;
  /** Extra controls rendered between the help text and the input (e.g. a mode toggle). */
  children?: ReactNode;
}) {
  const id = slug(label);
  return (
    <div>
      <label htmlFor={id} className="block text-[16px] font-bold leading-snug tracking-[-0.01em]">
        {label}
      </label>
      {help && (
        <p id={`${id}-help`} className="mt-1 text-[13px] text-muted-foreground leading-snug">
          {help}
        </p>
      )}
      {children}
      <div className="relative mt-2.5">
        {prefix && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[15px] text-muted-foreground">
            {prefix}
          </span>
        )}
        <input
          id={id}
          aria-describedby={help ? `${id}-help` : undefined}
          aria-invalid={error ? true : undefined}
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full border-2 bg-surface py-3 text-[16px] outline-none placeholder:text-muted-foreground/50 focus:border-teal ${
            error ? "border-pink" : "border-foreground"
          } ${prefix ? "pl-8" : "pl-4"} ${suffix ? "pr-24" : "pr-4"}`}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[14px] text-muted-foreground">
            {suffix}
          </span>
        )}
      </div>
      {error && <p className="mt-2 text-[13px] font-medium text-pink">{error}</p>}
    </div>
  );
}

/** Two-option segmented control in the ink-border style. */
export function Segmented<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <div className="mt-2.5 inline-grid grid-flow-col gap-[2px] border-2 border-foreground bg-foreground">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          aria-pressed={value === o.value}
          className={`px-4 py-2 text-[14px] font-bold ${
            value === o.value ? "bg-teal text-white" : "bg-surface hover:bg-background"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** The form card: fields stacked, one full-width submit. */
export function FormCard({
  title,
  submitLabel,
  onSubmit,
  children,
  footer,
}: {
  title?: string;
  submitLabel: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <form onSubmit={onSubmit} noValidate className="slab bg-surface">
      {title && (
        <div className="border-b-2 border-foreground px-6 py-5 md:px-8">
          <h2 className="text-[20px] font-extrabold tracking-[-0.02em]">{title}</h2>
        </div>
      )}
      <div className="space-y-7 p-6 md:p-8">
        {children}
        <button type="submit" className="btn-primary w-full text-[16px]">
          {submitLabel}
        </button>
        {footer}
      </div>
    </form>
  );
}

/** The one number that matters, big, on a teal card. */
export function HeroResult({
  label,
  value,
  unit,
  caption,
  children,
}: {
  label: string;
  value: string;
  unit?: string;
  caption: string;
  children?: ReactNode;
}) {
  return (
    <div className="slab border-teal bg-teal px-6 py-10 text-center text-white md:px-10 md:py-12">
      <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-white/80">{label}</p>
      <p className="mt-3 text-[64px] font-extrabold leading-none tracking-[-0.04em] md:text-[88px]">
        {value}
        {unit && (
          <>
            {" "}
            <span className="text-[0.4em] font-bold text-white/80">{unit}</span>
          </>
        )}
      </p>
      <p className="mx-auto mt-4 max-w-[46ch] text-[15px] leading-relaxed text-white/85">{caption}</p>
      {children}
    </div>
  );
}

/** A results card with a heading and optional subheading. */
export function ResultCard({
  title,
  sub,
  children,
  className = "",
}: {
  title?: string;
  sub?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`slab bg-surface ${className}`}>
      {title && (
        <div className="border-b-2 border-foreground px-6 py-5 md:px-8">
          <h3 className="text-[20px] font-extrabold tracking-[-0.02em]">{title}</h3>
          {sub && <p className="mt-1 text-[14px] text-muted-foreground">{sub}</p>}
        </div>
      )}
      <div className="p-6 md:p-8">{children}</div>
    </div>
  );
}

/** Label / value rows, the "trace it step by step" pattern. */
export function Rows({
  rows,
}: {
  rows: { label: string; value: string; detail?: string; strong?: boolean }[];
}) {
  return (
    <div className="divide-y-2 divide-foreground border-2 border-foreground">
      {rows.map((r) => (
        <div
          key={r.label}
          className={`flex items-baseline justify-between gap-6 px-4 py-3.5 md:px-5 ${
            r.strong ? "bg-background" : "bg-surface"
          }`}
        >
          <div>
            <p className={`leading-tight ${r.strong ? "font-extrabold" : "font-medium"}`}>{r.label}</p>
            {r.detail && (
              <p className="mt-0.5 text-[13px] text-muted-foreground leading-snug">{r.detail}</p>
            )}
          </div>
          <p
            className={`shrink-0 tracking-[-0.02em] ${
              r.strong ? "text-[24px] font-extrabold text-teal" : "text-[18px] font-bold"
            }`}
          >
            {r.value}
          </p>
        </div>
      ))}
    </div>
  );
}

/** Headline number in a slab panel (for stat rows). */
export function Stat({
  label,
  value,
  note,
  tone = "ink",
}: {
  label: string;
  value: string;
  note?: string;
  tone?: "ink" | "teal";
}) {
  return (
    <div className="bg-surface p-6 md:p-7">
      <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-muted-foreground">{label}</p>
      <p
        className={`mt-3 text-[34px] md:text-[42px] font-extrabold leading-none tracking-[-0.03em] ${
          tone === "teal" ? "text-teal" : "text-foreground"
        }`}
      >
        {value}
      </p>
      {note && <p className="mt-3 text-[14px] text-muted-foreground leading-snug">{note}</p>}
    </div>
  );
}

/** Inputs column for the wide, live-updating layout. */
export function InputPanel({
  title,
  children,
  sticky = false,
}: {
  title: string;
  children: ReactNode;
  sticky?: boolean;
}) {
  return (
    <div className={`slab h-fit bg-surface ${sticky ? "lg:sticky lg:top-[88px]" : ""}`}>
      <div className="border-b-2 border-foreground px-6 py-5 md:px-7">
        <h2 className="text-[20px] font-extrabold tracking-[-0.02em]">{title}</h2>
      </div>
      <div className="space-y-6 p-6 md:p-7">{children}</div>
    </div>
  );
}
