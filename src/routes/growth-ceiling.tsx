import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  CalcPage,
  Field,
  FormCard,
  HeroResult,
  ResultCard,
  Segmented,
  money0,
  int0,
  num1,
  parse,
} from "@/components/echo/calc/CalcKit";

export const Route = createFileRoute("/growth-ceiling")({
  head: () => ({
    meta: [
      { title: "Growth Ceiling Calculator — Echo 27" },
      {
        name: "description",
        content:
          "Most businesses plateau at the same customer count and can't see why. Four inputs show you exactly where your ceiling is and the two levers that move it.",
      },
    ],
  }),
  component: GrowthCeiling,
});

type ChurnMode = "number" | "percent";
type Form = { customers: string; won: string; churnMode: ChurnMode; churn: string; value: string };
type Errors = Partial<Record<"customers" | "won" | "churn" | "value", string>>;

const EMPTY: Form = { customers: "", won: "", churnMode: "number", churn: "", value: "" };

function project(start: number, won: number, churnRate: number, months: number) {
  const out: number[] = [];
  let c = start;
  for (let m = 0; m <= months; m++) {
    if (m > 0) c = c - c * churnRate + won;
    out.push(Math.max(0, Math.round(c)));
  }
  return out;
}

function validate(f: Form): Errors {
  const e: Errors = {};
  const cs = parse(f.customers);
  const w = parse(f.won);
  const ch = parse(f.churn);
  const v = parse(f.value);
  if (!(cs >= 0)) e.customers = "Enter a number, 0 or more.";
  if (!(w >= 0)) e.won = "Enter a number, 0 or more.";
  if (!(ch >= 0)) e.churn = "Enter a number.";
  else if (f.churnMode === "number" && cs > 0 && ch > cs) e.churn = "You can't lose more customers than you have.";
  else if (f.churnMode === "percent" && ch > 100) e.churn = "A percentage can't be over 100.";
  if (f.value.trim() !== "" && !(v >= 0)) e.value = "Enter an amount, or leave it blank.";
  return e;
}

function GrowthCeiling() {
  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState<Form | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof Form>(k: K) => (v: Form[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (k in errors) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length) {
      setSubmitted(null);
      return;
    }
    setSubmitted({ ...form });
  };

  useEffect(() => {
    if (submitted) {
      setTimeout(
        () => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
        60,
      );
    }
  }, [submitted]);

  // Live hint under the churn field so people can sanity-check what they typed.
  const liveCustomers = parse(form.customers);
  const liveChurn = parse(form.churn);
  const churnHint = (() => {
    if (!(liveChurn > 0)) return null;
    if (form.churnMode === "number") {
      if (!(liveCustomers > 0)) return "Enter your current customers above to see this as a percentage.";
      const pct = (liveChurn / liveCustomers) * 100;
      return `That's a monthly churn rate of ${num1(pct)}%, losing ${int0(liveChurn)} of ${int0(liveCustomers)} customers.`;
    }
    if (!(liveCustomers > 0)) return null;
    return `That's about ${int0((liveChurn / 100) * liveCustomers)} customers a month at your current size.`;
  })();

  const m = useMemo(() => {
    if (!submitted) return null;
    const customers = parse(submitted.customers) || 0;
    const won = parse(submitted.won) || 0;
    const churnIn = parse(submitted.churn) || 0;
    const value = submitted.value.trim() === "" ? 0 : parse(submitted.value) || 0;
    const churnRate =
      submitted.churnMode === "number" ? (customers > 0 ? churnIn / customers : 0) : churnIn / 100;

    const noChurn = churnRate < 0.001;
    const noWins = won <= 0;
    if (noChurn || noWins) return { blocked: true as const, noChurn, noWins };

    const ceiling = Math.round(won / churnRate);
    const monthsToCeiling = Math.min(60, Math.round(-Math.log(0.05) / churnRate));
    const betterChurn = Math.max(churnRate - 0.02, 0.005);
    const lever1 = Math.round(won / betterChurn);
    const lever2 = Math.round((won + 3) / churnRate);

    const base = project(customers, won, churnRate, 36);
    const lower = project(customers, won, betterChurn, 36);
    const more = project(customers, won + 3, churnRate, 36);
    const chart = base.map((v, i) => ({ month: i, current: v, lowerChurn: lower[i], moreNew: more[i] }));

    let scenario: "below" | "at" | "above";
    if (customers > ceiling * 1.05) scenario = "above";
    else if (customers >= ceiling || Math.abs(customers - ceiling) <= 5) scenario = "at";
    else scenario = "below";

    return {
      blocked: false as const,
      customers, won, value, churnRate, ceiling, monthsToCeiling, scenario,
      churnPct: churnRate * 100,
      betterChurnPct: betterChurn * 100,
      lever1, lever2,
      lever1Delta: (lever1 - ceiling) * value,
      lever2Delta: (lever2 - ceiling) * value,
      revenueMonth: ceiling * value,
      lifetimeMonths: 1 / churnRate,
      chart,
      final36: { current: base[36], lower: lower[36], more: more[36] },
    };
  }, [submitted]);

  return (
    <CalcPage
      eyebrow="Free tool"
      title="Your business has a growth ceiling. Here's where it is."
      intro="Most businesses plateau at the same customer count year after year and can't figure out why. The answer is maths, not effort. Four quick inputs show you exactly where your ceiling is and the two levers that move it."
    >
      <FormCard submitLabel="Show me my ceiling" onSubmit={submit}>
        <Field
          label="How many paying customers do you have right now?"
          help="Anyone who paid you this month."
          value={form.customers}
          onChange={set("customers")}
          placeholder="200"
          step={1}
          error={errors.customers}
        />
        <Field
          label="On average, how many new customers do you win per month?"
          help="A rough average over the last six months is fine."
          value={form.won}
          onChange={set("won")}
          placeholder="15"
          step={1}
          error={errors.won}
        />
        <div>
          <Field
            label="How many customers do you lose per month?"
            help="Pick whichever is easier for you to estimate."
            value={form.churn}
            onChange={set("churn")}
            placeholder={form.churnMode === "number" ? "10" : "5"}
            suffix={form.churnMode === "number" ? "customers" : "%"}
            step={form.churnMode === "number" ? 1 : 0.1}
            max={form.churnMode === "percent" ? 100 : undefined}
            error={errors.churn}
          >
            <Segmented
              value={form.churnMode}
              onChange={set("churnMode")}
              options={[
                { value: "number", label: "As a number" },
                { value: "percent", label: "As a percentage" },
              ]}
            />
          </Field>
          {churnHint && (
            <p className="mt-2.5 border-l-2 border-teal pl-3 text-[13px] font-medium leading-snug">
              {churnHint}
            </p>
          )}
        </div>
        <Field
          label="What's your average monthly revenue per customer?"
          help="A blended average is fine. For one-off purchases, use average order value. Optional, but it prices the answer in dollars."
          value={form.value}
          onChange={set("value")}
          placeholder="150"
          prefix="$"
          step={1}
          error={errors.value}
        />
      </FormCard>

      {m && (
        <div ref={resultsRef} className="mt-12 space-y-5 scroll-mt-24">
          {m.blocked ? (
            <ResultCard>
              {m.noChurn ? (
                <>
                  <p className="eyebrow mb-4">Check your churn number</p>
                  <p className="text-[24px] font-extrabold leading-tight tracking-[-0.02em]">
                    With no churn, your ceiling is theoretically unlimited.
                  </p>
                  <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed">
                    Double-check the number. If it really is zero, you don't need this calculator.
                  </p>
                </>
              ) : (
                <>
                  <p className="eyebrow mb-4">No new customers</p>
                  <p className="text-[24px] font-extrabold leading-tight tracking-[-0.02em]">
                    If you're not winning anyone, your ceiling is whatever you have now.
                  </p>
                  <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed">
                    And it's slowly declining to zero. That's the thing to fix first.
                  </p>
                </>
              )}
            </ResultCard>
          ) : (
            <>
              {/* A. The reveal */}
              <HeroResult
                label="Your growth ceiling"
                value={int0(m.ceiling)}
                unit="customers"
                caption="That's the most customers your current maths supports. Every new customer you win above this number is cancelled out by one leaving."
              >
                {m.value > 0 && (
                  <p className="mt-5 text-[15px] leading-relaxed text-white">
                    At {money0(m.value)} per customer, that's a ceiling of{" "}
                    <strong>{money0(m.revenueMonth)} a month</strong>, or{" "}
                    <strong>{money0(m.revenueMonth * 12)} a year</strong>.
                  </p>
                )}
              </HeroResult>

              {/* B. The gap */}
              <ResultCard>
                {m.scenario === "below" && (
                  <>
                    <p className="text-[24px] font-extrabold leading-tight tracking-[-0.02em]">
                      You have {int0(m.ceiling - m.customers)} customers of runway left.
                    </p>
                    <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed">
                      At your current pace you'll hit the ceiling in roughly{" "}
                      <strong className="text-foreground">{m.monthsToCeiling} months</strong>. After
                      that, growth stops unless something changes.
                    </p>
                  </>
                )}
                {m.scenario === "at" && (
                  <>
                    <p className="text-[24px] font-extrabold leading-tight tracking-[-0.02em]">
                      You've hit your ceiling.
                    </p>
                    <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed">
                      This is the maths behind the plateau you're feeling. You're not doing anything
                      wrong: every customer you win is being cancelled out by one leaving. That's why
                      growth feels impossible right now.
                    </p>
                  </>
                )}
                {m.scenario === "above" && (
                  <>
                    <p className="text-[24px] font-extrabold leading-tight tracking-[-0.02em]">
                      You're above your long-term ceiling.
                    </p>
                    <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed">
                      You may be coming off a recent spike. If your win rate and churn stay where they
                      are, your customer count drifts back down to{" "}
                      <strong className="text-foreground">{int0(m.ceiling)}</strong> over time. The
                      maths eventually wins.
                    </p>
                  </>
                )}

                {(() => {
                  const max = Math.max(m.ceiling, m.customers) * 1.05 || 1;
                  const cur = Math.min((m.customers / max) * 100, 100);
                  const cap = Math.min((m.ceiling / max) * 100, 100);
                  return (
                    <div className="relative mt-7">
                      <div className="h-4 overflow-hidden border-2 border-foreground bg-background">
                        <div className="h-full bg-teal transition-[width] duration-700" style={{ width: `${cur}%` }} />
                      </div>
                      <div
                        className="absolute -top-1.5 h-7 w-[3px] bg-pink"
                        style={{ left: `calc(${cap}% - 1px)` }}
                        aria-hidden
                      />
                      <div className="mt-3 flex justify-between text-[13px] text-muted-foreground">
                        <span><strong className="text-foreground">{int0(m.customers)}</strong> today</span>
                        <span>Ceiling <strong className="text-pink">{int0(m.ceiling)}</strong></span>
                      </div>
                    </div>
                  );
                })()}
              </ResultCard>

              {/* C. Three years out */}
              <ResultCard title="Three years out" sub="Where you end up in 36 months under three scenarios.">
                <div className="h-[280px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={m.chart} margin={{ top: 8, right: 8, bottom: 0, left: -12 }}>
                      <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={false} />
                      <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                      <Tooltip
                        contentStyle={{ border: "2px solid var(--foreground)", borderRadius: 8, fontSize: 13 }}
                        formatter={(v: number, key: string) => [
                          int0(v),
                          key === "current" ? "Today's numbers" : key === "lowerChurn" ? "Lower churn" : "3 more a month",
                        ]}
                        labelFormatter={(l) => `Month ${l}`}
                      />
                      <Line type="monotone" dataKey="current" stroke="var(--foreground)" strokeWidth={2.5} dot={false} />
                      <Line type="monotone" dataKey="lowerChurn" stroke="var(--teal)" strokeWidth={2.5} dot={false} />
                      <Line type="monotone" dataKey="moreNew" stroke="var(--pink)" strokeWidth={2.5} strokeDasharray="5 4" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-[2px] border-2 border-foreground bg-foreground">
                  {[
                    { label: "Today's numbers", value: m.final36.current, cls: "text-foreground" },
                    { label: `Churn at ${num1(m.betterChurnPct)}%`, value: m.final36.lower, cls: "text-teal" },
                    { label: "3 more a month", value: m.final36.more, cls: "text-pink" },
                  ].map((s) => (
                    <div key={s.label} className="bg-surface p-3 text-center md:p-4">
                      <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground">{s.label}</p>
                      <p className={`mt-1 text-[26px] font-extrabold leading-none tracking-[-0.03em] ${s.cls}`}>{int0(s.value)}</p>
                      <p className="mt-1 text-[11px] text-muted-foreground">customers at month 36</p>
                    </div>
                  ))}
                </div>
              </ResultCard>

              {/* D. The two levers */}
              <ResultCard title="There are only two ways to raise the ceiling.">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="border-2 border-foreground border-l-[6px] border-l-teal bg-background p-5">
                    <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-teal">Lever 1</p>
                    <p className="mt-1 text-[18px] font-extrabold tracking-[-0.02em]">Lose fewer customers</p>
                    <p className="mt-3 text-[14px] leading-relaxed">
                      Cut churn from <strong>{num1(m.churnPct)}%</strong> to{" "}
                      <strong>{num1(m.betterChurnPct)}%</strong> and your ceiling moves to{" "}
                      <strong>{int0(m.lever1)} customers</strong>.
                    </p>
                    {m.value > 0 && (
                      <p className="mt-2 text-[14px] leading-relaxed">
                        That's <strong>{money0(m.lever1Delta)}</strong> more a month.{" "}
                        <strong>{money0(m.lever1Delta * 12)}</strong> a year.
                      </p>
                    )}
                    <p className="mt-3 text-[12px] text-muted-foreground leading-relaxed">
                      Costs nothing in ad spend, and every customer you keep also refers, renews, and buys again.
                    </p>
                  </div>
                  <div className="border-2 border-foreground border-l-[6px] border-l-pink bg-background p-5">
                    <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-pink">Lever 2</p>
                    <p className="mt-1 text-[18px] font-extrabold tracking-[-0.02em]">Win more customers</p>
                    <p className="mt-3 text-[14px] leading-relaxed">
                      Add 3 more customers a month and your ceiling moves to{" "}
                      <strong>{int0(m.lever2)} customers</strong>.
                    </p>
                    {m.value > 0 && (
                      <p className="mt-2 text-[14px] leading-relaxed">
                        That's <strong>{money0(m.lever2Delta)}</strong> more a month.{" "}
                        <strong>{money0(m.lever2Delta * 12)}</strong> a year.
                      </p>
                    )}
                    <p className="mt-3 text-[12px] text-muted-foreground leading-relaxed">
                      Linear, not compounding. You have to keep producing them every month, and it costs spend every month.
                    </p>
                  </div>
                </div>
              </ResultCard>

              {/* E. The point */}
              <div className="border-2 border-foreground bg-background p-6 md:p-7">
                <p className="text-[15px] leading-relaxed">
                  Lowering churn is almost always the higher-leverage move. Adding customers is linear:
                  you have to keep producing them. Keeping customers compounds: at {num1(m.churnPct)}%
                  churn the average customer stays {num1(m.lifetimeMonths)} months, and every month you
                  add to that lifts the value of every customer you've ever won. Fixing the leak is
                  usually worth more than widening the top of the funnel.
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </CalcPage>
  );
}
