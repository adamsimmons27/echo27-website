import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Download, RotateCcw } from "lucide-react";
import {
  CalcPage,
  Field,
  InputPanel,
  Stat,
  money0,
  num1,
} from "@/components/echo/calc/CalcKit";

export const Route = createFileRoute("/growth-calculator")({
  head: () => ({
    meta: [
      { title: "Growth Projection Calculator — Echo 27" },
      {
        name: "description",
        content:
          "See exactly how many customers you'll win and how your monthly revenue grows month over month from your ad spend, with churn accounted for.",
      },
    ],
  }),
  component: GrowthCalculator,
});

const PERIODS = [6, 12, 18, 24];

const DEFAULTS = {
  customers: "100",
  value: "150",
  adSpend: "5000",
  cpl: "25",
  leadToCall: "30",
  showUp: "70",
  close: "25",
  churn: "5",
};
type Inputs = typeof DEFAULTS;

function GrowthCalculator() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);
  const [months, setMonths] = useState(12);

  const set = (k: keyof Inputs) => (v: string) => setInputs((p) => ({ ...p, [k]: v }));
  const n = (k: keyof Inputs) => (inputs[k].trim() === "" ? 0 : Number(inputs[k]) || 0);

  const rows = useMemo(() => {
    const conv = (n("leadToCall") / 100) * (n("showUp") / 100) * (n("close") / 100);
    const leads = n("cpl") > 0 ? n("adSpend") / n("cpl") : 0;
    const won = leads * conv;
    let active = n("customers");
    const out: { month: number; won: number; lost: number; active: number; revenue: number }[] = [];
    for (let m = 1; m <= months; m++) {
      const lost = active * (n("churn") / 100);
      active = active - lost + won;
      out.push({ month: m, won, lost, active, revenue: active * n("value") });
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs, months]);

  const conv = (n("leadToCall") / 100) * (n("showUp") / 100) * (n("close") / 100);
  const cac = conv > 0 ? n("cpl") / conv : NaN;
  const wonPerMonth = rows[0]?.won ?? 0;
  const lostFirst = rows[0]?.lost ?? 0;
  const startRevenue = n("customers") * n("value");
  const endRevenue = rows[rows.length - 1]?.revenue ?? startRevenue;
  const delta = endRevenue - startRevenue;
  const payback = n("value") > 0 && Number.isFinite(cac) ? cac / n("value") : NaN;

  const exportCsv = () => {
    const lines = [
      ["Month", "New customers", "Churned", "Active customers", "Monthly revenue", "Revenue minus ad spend"].join(","),
      ["Today", "", "", n("customers"), startRevenue.toFixed(2), startRevenue.toFixed(2)].join(","),
    ];
    rows.forEach((r) =>
      lines.push(
        [r.month, r.won.toFixed(2), r.lost.toFixed(2), r.active.toFixed(2), r.revenue.toFixed(2), (r.revenue - n("adSpend")).toFixed(2)].join(","),
      ),
    );
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "echo27-growth-projection.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <CalcPage
      wide
      eyebrow="Free tool"
      title="What does your ad spend actually build?"
      intro="See exactly how many customers you'll win and how your monthly revenue grows month over month from your ad spend. Change any number and everything updates."
      note="Pre-filled with example numbers. Replace them with yours."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[400px_1fr] lg:gap-8">
        <div className="space-y-5 lg:sticky lg:top-[88px] lg:h-fit">
          {/* Where you are today, before any projection */}
          <div className="slab border-teal bg-teal p-6 text-white">
            <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-white/80">Your revenue today</p>
            <p className="mt-2 text-[40px] font-extrabold leading-none tracking-[-0.03em]">{money0(startRevenue)}</p>
            <p className="mt-2 text-[13px] text-white/85">
              {num1(n("customers"))} customers × {money0(n("value"))} a month
            </p>
          </div>

          <InputPanel title="Your numbers">
            <Field
              label="How many paying customers do you have today?"
              value={inputs.customers}
              onChange={set("customers")}
              step={1}
            />
            <Field
              label="What's a customer worth to you each month?"
              help="Average monthly revenue per customer. For one-off purchases, use average order value."
              value={inputs.value}
              onChange={set("value")}
              prefix="$"
            />
            <Field
              label="How much do you spend on ads each month?"
              value={inputs.adSpend}
              onChange={set("adSpend")}
              prefix="$"
            />
            <Field
              label="What's your cost per lead?"
              help="Ad spend divided by leads, last 30 days."
              value={inputs.cpl}
              onChange={set("cpl")}
              prefix="$"
            />
            <Field
              label="What percentage of leads book a call?"
              value={inputs.leadToCall}
              onChange={set("leadToCall")}
              suffix="%"
              max={100}
            />
            <Field
              label="What percentage of booked calls actually happen?"
              value={inputs.showUp}
              onChange={set("showUp")}
              suffix="%"
              max={100}
            />
            <Field
              label="What percentage of those calls become customers?"
              value={inputs.close}
              onChange={set("close")}
              suffix="%"
              max={100}
            />
            <Field
              label="What percentage of customers do you lose each month?"
              help="Your monthly churn. If you're not sure, 3–5% is typical for a subscription business."
              value={inputs.churn}
              onChange={set("churn")}
              suffix="%"
              max={100}
            />

            <div>
              <p className="text-[16px] font-bold leading-snug tracking-[-0.01em]">How far ahead should we project?</p>
              <div className="mt-2.5 grid grid-cols-4 gap-[2px] border-2 border-foreground bg-foreground">
                {PERIODS.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMonths(m)}
                    aria-pressed={months === m}
                    className={`py-2.5 text-[14px] font-bold ${months === m ? "bg-teal text-white" : "bg-surface hover:bg-background"}`}
                  >
                    {m} mo
                  </button>
                ))}
              </div>
            </div>

            <button type="button" onClick={() => { setInputs(DEFAULTS); setMonths(12); }} className="btn-ghost w-full text-[14px]">
              <RotateCcw className="h-4 w-4" />
              Reset to example numbers
            </button>
          </InputPanel>
        </div>

        <div className="space-y-5">
          <div className="slab grid grid-cols-1 gap-[2px] bg-foreground sm:grid-cols-3">
            <Stat
              label="Cost per customer"
              value={Number.isFinite(cac) ? money0(cac) : "—"}
              note={Number.isFinite(payback) ? `Pays back in ${num1(payback)} months of revenue` : "Enter your funnel rates"}
              tone="teal"
            />
            <Stat label="New customers a month" value={num1(wonPerMonth)} note={`From ${money0(n("adSpend"))} in ad spend`} />
            <Stat
              label={`Revenue in month ${months}`}
              value={money0(endRevenue)}
              note={`${delta >= 0 ? "Up" : "Down"} ${money0(Math.abs(delta))} from today`}
            />
          </div>

          <div className={`slab p-6 md:p-7 ${wonPerMonth > lostFirst ? "bg-surface" : "border-pink bg-background"}`}>
            <p className="text-[19px] md:text-[22px] font-bold leading-snug tracking-[-0.02em]">
              {wonPerMonth > lostFirst ? (
                <>
                  Your revenue grows from <span className="text-teal">{money0(startRevenue)}</span> to{" "}
                  <span className="text-teal">{money0(endRevenue)}</span> a month over {months} months.
                  That's a <span className="text-teal">{money0(delta)}</span> increase.
                </>
              ) : (
                <>
                  Churn is outrunning your ads. You lose{" "}
                  <span className="text-pink">{num1(lostFirst)}</span> customers a month and replace only{" "}
                  <span className="text-pink">{num1(wonPerMonth)}</span>. More spend won't fix this on its own.
                  Retention has to come first.
                </>
              )}
            </p>
            {wonPerMonth > lostFirst && (
              <p className="mt-3 text-[14px] text-muted-foreground leading-relaxed">
                You win {num1(wonPerMonth)} customers a month and lose {num1(lostFirst)} to churn, so you net{" "}
                {num1(wonPerMonth - lostFirst)} in month one. As your base grows, churn takes a bigger bite.
              </p>
            )}
          </div>

          <div className="slab bg-surface">
            <div className="flex items-center justify-between gap-4 border-b-2 border-foreground px-6 py-4 md:px-7">
              <div>
                <h2 className="text-[20px] font-extrabold tracking-[-0.02em]">Month by month</h2>
                <p className="mt-0.5 text-[13px] text-muted-foreground">Customers and revenue, one row per month.</p>
              </div>
              <button onClick={exportCsv} className="btn-ghost px-4 py-2 text-[14px]">
                <Download className="h-4 w-4" />
                CSV
              </button>
            </div>
            <div className="max-h-[480px] overflow-auto">
              <table className="w-full text-[14px]">
                <thead className="sticky top-0 bg-background">
                  <tr className="border-b-2 border-foreground text-left">
                    {["Month", "New", "Churned", "Active", "Revenue", "After ad spend"].map((h) => (
                      <th key={h} className="whitespace-nowrap px-4 py-3 text-[12px] font-bold uppercase tracking-[0.06em]">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b-2 border-foreground bg-background">
                    <td className="px-4 py-2.5 font-bold">Today</td>
                    <td className="px-4 py-2.5 text-muted-foreground">—</td>
                    <td className="px-4 py-2.5 text-muted-foreground">—</td>
                    <td className="px-4 py-2.5 font-bold">{num1(n("customers"))}</td>
                    <td className="whitespace-nowrap px-4 py-2.5 font-bold text-teal">{money0(startRevenue)}</td>
                    <td className="whitespace-nowrap px-4 py-2.5">{money0(startRevenue)}</td>
                  </tr>
                  {rows.map((r) => (
                    <tr key={r.month} className="border-b border-border last:border-0">
                      <td className="px-4 py-2.5 font-bold">{r.month}</td>
                      <td className="px-4 py-2.5">{num1(r.won)}</td>
                      <td className="px-4 py-2.5">{num1(r.lost)}</td>
                      <td className="px-4 py-2.5 font-bold">{num1(r.active)}</td>
                      <td className="whitespace-nowrap px-4 py-2.5 font-bold text-teal">{money0(r.revenue)}</td>
                      <td className="whitespace-nowrap px-4 py-2.5">{money0(r.revenue - n("adSpend"))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </CalcPage>
  );
}
