import { useState, type FormEvent } from "react";
import { getAttribution } from "@/lib/attribution";
import { track } from "@/lib/tracking";
import type { LandingContent } from "@/content/types";

const WEBHOOK_URL = import.meta.env.VITE_GHL_WEBHOOK_URL as string | undefined;

type Field = "name" | "email" | "phone" | "company" | "trade" | "revenue" | "spend";
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "sending" | "sent" | "error";

const input = "field mt-2";
const label = "field-label";

/** Fallback when no calendar embed is configured. Posts JSON to a GoHighLevel inbound webhook. */
export function BookingForm({ form }: { form: LandingContent["booking"]["form"] }) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  function validate(data: Record<string, string>): Errors {
    const next: Errors = {};
    for (const key of ["name", "email", "phone", "company", "trade", "revenue", "spend"] as Field[]) {
      if (!data[key]?.trim()) next[key] = form.errors.required;
    }
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) next.email = form.errors.email;
    if (data.phone && data.phone.replace(/\D/g, "").length < 10) next.phone = form.errors.phone;
    return next;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const el = e.currentTarget;
    const data = Object.fromEntries(new FormData(el)) as Record<string, string>;
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = (Object.keys(found) as Field[])[0];
      el.querySelector<HTMLElement>(`#book-${first}`)?.focus();
      return;
    }
    if (!WEBHOOK_URL) {
      console.warn("Booking form: set VITE_GHL_WEBHOOK_URL (or VITE_BOOKING_URL) and redeploy.");
      setStatus("error");
      setMessage(form.errors.notConnected);
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          ...getAttribution(),
          form: "growth-audit",
          source: "echo-27.com/fractional-cmo",
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      track("form_submit", { form: "growth-audit", trade: data.trade, revenue: data.revenue });
      setStatus("sent");
    } catch {
      setStatus("error");
      setMessage(form.errors.failed);
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="card-dark">
        <p className="headline headline-md">{form.success.title}</p>
        <p className="mt-3 text-muted-foreground">{form.success.body}</p>
      </div>
    );
  }

  const field = (name: Field, children: React.ReactNode) => (
    <div>
      <label htmlFor={`book-${name}`} className={label}>
        {form.labels[name]}
      </label>
      {children}
      {errors[name] && (
        <p id={`book-${name}-error`} className="mt-1.5 text-sm font-semibold text-foreground">
          {errors[name]}
        </p>
      )}
    </div>
  );

  const a11y = (name: Field) => ({
    id: `book-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `book-${name}-error` : undefined,
  });

  const select = (name: Field, options: string[]) =>
    field(
      name,
      <select {...a11y(name)} defaultValue="" className={input} required>
        <option value="" disabled>
          {form.placeholderOption}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>,
    );

  return (
    <form onSubmit={onSubmit} noValidate className="card-dark space-y-5 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        {field("name", <input {...a11y("name")} type="text" autoComplete="name" required className={input} />)}
        {field("email", <input {...a11y("email")} type="email" autoComplete="email" required className={input} />)}
        {field("phone", <input {...a11y("phone")} type="tel" inputMode="tel" autoComplete="tel" required className={input} />)}
        {field("company", <input {...a11y("company")} type="text" autoComplete="organization" required className={input} />)}
        {select("trade", form.trades)}
        {select("revenue", form.revenue)}
        <div className="sm:col-span-2">{select("spend", form.spend)}</div>
      </div>
      {status === "error" && (
        <p role="alert" className="text-sm font-semibold text-foreground">
          {message}
        </p>
      )}
      <button type="submit" disabled={status === "sending"} aria-busy={status === "sending"} className="btn btn-primary w-full disabled:cursor-wait">
        {status === "sending" ? form.sending : form.submit}
      </button>
    </form>
  );
}
