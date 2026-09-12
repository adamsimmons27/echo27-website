import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  CalcPage,
  Field,
  FormCard,
  HeroResult,
  ResultCard,
  Rows,
  money0,
  money2,
  num1,
  parse,
} from "@/components/echo/calc/CalcKit";

export const Route = createFileRoute("/cac-calculator")({
  head: () => ({
    meta: [
      { title: "Customer Acquisition Cost Calculator — Echo 27" },
      {
        name: "description",
        content:
          "Answer four questions and see what every new customer is actually costing you in ad spend, plus which stage of your funnel is leaking.",
      },
    ],
  }),
  component: CacCalculator,
});

const SPEND = 1000;

type Form = { cpl: string; leadToCall: string; showUp: string; close: string };
type Errors = Partial<Record<keyof Form, string>>;

const EMPTY: Form = { cpl: "", leadToCall: "", showUp: "", close: "" };

function validate(f: Form): Errors {
  const e: Errors = {};
  const pct = (k: keyof Form) => {
    const n = parse(f[k]);
    if (!(n > 0 && n <= 100)) e[k] = "Enter a percentage from 1 to 100.";
  };
  if (!(parse(f.cpl) > 0)) e.cpl = "Enter a cost greater than 0.";
  pct("leadToCall");
  pct("showUp");
  pct("close");
  return e;
}

function CacCalculator() {
  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [result, setResult] = useState<Form | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const set = (k: keyof Form) => (v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length) {
      setResult(null);
      return;
    }
    setResult({ ...form });
  };

  useEffect(() => {
    if (result) {
      setTimeout(
        () => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
        60,
      );
    }
  }, [result]);

  const r = result && {
    cpl: parse(result.cpl),
    leadToCall: parse(result.leadToCall) / 100,
    showUp: parse(result.showUp) / 100,
    close: parse(result.close) / 100,
  };
  const leads = r ? SPEND / r.cpl : 0;
  const calls = r ? leads * r.leadToCall : 0;
  const showed = r ? calls * r.showUp : 0;
  const customers = r ? showed * r.close : 0;
  const cac = customers > 0 ? SPEND / customers : NaN;

  const losses = [
    { stage: "lead to booked call", lost: leads - calls, fix: "Faster follow-up and a clearer reason to book." },
    { stage: "booking to show-up", lost: calls - showed, fix: "Reminders, a shorter gap to the call, and a reason to keep the slot." },
    { stage: "show-up to close", lost: showed - customers, fix: "The offer, the price, and the conversation itself." },
  ];
  const worst = losses.reduce((a, b) => (b.lost > a.lost ? b : a), losses[0]);

  return (
    <CalcPage
      eyebrow="Free tool"
      title="What does a customer actually cost you?"
      intro="Answer four quick questions and we'll show you exactly what every new customer is costing you in ad spend, then trace where the budget goes."
      note="Cost per lead is the number everyone quotes. It's also the one that hides the problem."
    >
      <FormCard submitLabel="Calculate my cost per customer" onSubmit={submit}>
        <Field
          label="What's your cost per lead?"
          help="Total ad spend divided by total leads generated, over the last 30 days."
          value={form.cpl}
          onChange={set("cpl")}
          placeholder="25"
          prefix="$"
          step={0.01}
          error={errors.cpl}
        />
        <Field
          label="What percentage of your leads book a call?"
          help="Of every 100 leads, how many actually put a call or appointment on the calendar."
          value={form.leadToCall}
          onChange={set("leadToCall")}
          placeholder="30"
          suffix="%"
          max={100}
          error={errors.leadToCall}
        />
        <Field
          label="Of the calls that get booked, what percentage actually happen?"
          help="Booked calls where the person showed up."
          value={form.showUp}
          onChange={set("showUp")}
          placeholder="70"
          suffix="%"
          max={100}
          error={errors.showUp}
        />
        <Field
          label="Of the calls that happen, what percentage become customers?"
          help="Completed calls that turned into a paying customer."
          value={form.close}
          onChange={set("close")}
          placeholder="25"
          suffix="%"
          max={100}
          error={errors.close}
        />
      </FormCard>

      {r && (
        <div ref={resultsRef} className="mt-12 space-y-5 scroll-mt-24">
          <HeroResult
            label="Your cost to acquire a customer"
            value={customers > 0 ? money0(cac) : "—"}
            caption="Per paying customer, based on your funnel as it stands today."
          />

          <ResultCard
            title={`What ${money0(SPEND)} in ad spend produces for you`}
            sub="Your funnel, traced step by step."
          >
            <Rows
              rows={[
                { label: "Ad spend", value: money0(SPEND) },
                { label: "Leads generated", value: num1(leads), detail: `at ${money2(r.cpl)} each` },
                { label: "Calls booked", value: num1(calls), detail: `${num1(r.leadToCall * 100)}% of leads` },
                { label: "Calls that happened", value: num1(showed), detail: `${num1(r.showUp * 100)}% of bookings` },
                { label: "New customers", value: num1(customers), detail: `${num1(r.close * 100)}% of calls` },
                { label: "Cost per customer", value: customers > 0 ? money2(cac) : "—", strong: true },
              ]}
            />
          </ResultCard>

          {customers > 0 && (
            <ResultCard title="Where you're losing the most people">
              <p className="text-[20px] font-bold leading-snug tracking-[-0.02em]">
                Between <span className="text-teal">{worst.stage}</span>. About{" "}
                {num1(worst.lost)} people drop out there for every {money0(SPEND)} you spend.
              </p>
              <p className="mt-4 text-[15px] text-muted-foreground leading-relaxed">
                Usually that comes down to {worst.fix.toLowerCase()} Fixing that one
                stage moves your cost per customer more than any bidding change will. A
                10-point gain there is worth more than a 10% cut in cost per lead.
              </p>
            </ResultCard>
          )}
        </div>
      )}
    </CalcPage>
  );
}
