import { useEffect, useState } from "react";
import { X } from "lucide-react";

export const BOOKING_EVENT = "open-booking-modal";

export function openBookingModal() {
  window.dispatchEvent(new Event(BOOKING_EVENT));
}

const WEBHOOK_URL = import.meta.env.VITE_GHL_WEBHOOK_URL as string | undefined;

const revenueBands = [
  "Under $10k / month",
  "$10k – $50k / month",
  "$50k – $250k / month",
  "$250k – $1M / month",
  "$1M+ / month",
];

const budgetBands = [
  "Under $5k / month",
  "$5k – $15k / month",
  "$15k – $50k / month",
  "$50k+ / month",
  "Not running ads yet",
];

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "w-full border-2 border-foreground bg-surface px-4 py-3 text-[15px] text-foreground outline-none focus:border-teal";

const labelClass =
  "block text-[13px] font-bold uppercase tracking-[0.08em] text-foreground";

export function BookingModal() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const handler = () => {
      setOpen(true);
      setStatus("idle");
      setError("");
    };
    window.addEventListener(BOOKING_EVENT, handler);
    return () => window.removeEventListener(BOOKING_EVENT, handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    if (!WEBHOOK_URL) {
      setStatus("error");
      setError(
        "The form isn't connected yet. Set VITE_GHL_WEBHOOK_URL and redeploy.",
      );
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          form: "application",
          source: "echo-27.com application form",
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setStatus("sent");
    } catch {
      setStatus("error");
      setError(
        "Something went wrong sending that. Please try again in a moment.",
      );
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-foreground/60 p-4 md:items-center md:p-8">
      <div
        className="absolute inset-0"
        onClick={() => setOpen(false)}
        aria-hidden
      />

      <div className="relative my-auto w-full max-w-[560px] border-2 border-foreground bg-background">
        <div className="flex items-start justify-between gap-6 border-b-2 border-foreground p-7 md:p-9">
          <div>
            <h2 className="text-[28px] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[34px]">
              Apply to partner with us.
            </h2>
            <p className="mt-3 text-[15px] text-muted-foreground leading-snug">
              We take on a limited number of clients. Tell us where you're at
              and we'll tell you straight whether we can help.
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="shrink-0 border-2 border-foreground p-1.5 hover:bg-foreground hover:text-background"
          >
            <X className="h-4 w-4" strokeWidth={2.5} />
          </button>
        </div>

        {status === "sent" ? (
          <div className="p-7 md:p-9">
            <p className="text-[22px] font-extrabold tracking-[-0.02em]">
              Got it — thanks.
            </p>
            <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed">
              Adam reviews these personally and comes back within one business
              day. If we're not the right fit, we'll say so.
            </p>
            <button
              onClick={() => setOpen(false)}
              className="btn-primary mt-7 w-full"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 p-7 md:p-9">
            <div>
              <label className={labelClass} htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                autoComplete="name"
                className={`${fieldClass} mt-2.5`}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={`${fieldClass} mt-2.5`}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="phone">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="tel"
                required
                autoComplete="tel"
                className={`${fieldClass} mt-2.5`}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="website">
                Website
              </label>
              <input
                id="website"
                name="website"
                required
                placeholder="yourcompany.com"
                className={`${fieldClass} mt-2.5`}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="revenue">
                Monthly revenue
              </label>
              <select
                id="revenue"
                name="revenue"
                required
                defaultValue=""
                className={`${fieldClass} mt-2.5`}
              >
                <option value="" disabled>
                  Select a range
                </option>
                {revenueBands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass} htmlFor="budget">
                Marketing budget
              </label>
              <select
                id="budget"
                name="budget"
                required
                defaultValue=""
                className={`${fieldClass} mt-2.5`}
              >
                <option value="" disabled>
                  Select a range
                </option>
                {budgetBands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {status === "error" && (
              <p className="border-l-2 border-pink pl-4 text-[14px] font-medium text-foreground">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-primary w-full disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Submit application"}
            </button>

            <p className="text-[13px] text-muted-foreground">
              No pitch. We'll tell you if we're not a fit.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
