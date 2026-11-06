import { Fragment, type CSSProperties } from "react";
import { CalendarCheck, Check, ClipboardCheck, MessagesSquare, PhoneIncoming, Repeat, type LucideIcon } from "lucide-react";
import { Section } from "./Section";
import { CtaButton } from "./CtaButton";
import type { LandingContent, StepIcon } from "@/content/types";

const icons: Record<StepIcon, LucideIcon> = {
  phone: PhoneIncoming,
  messages: MessagesSquare,
  clipboard: ClipboardCheck,
  repeat: Repeat,
  calendar: CalendarCheck,
};

/**
 * The most prominent section: what happens after a lead comes in. Set out like a product walkthrough,
 * with the five-step path across the top, a sample text conversation, and what the system does.
 */
export function FollowUp({ content }: { content: LandingContent }) {
  const { followUp, cta } = content;
  const last = followUp.flow.length - 1;
  return (
    <Section id="follow-up" tone="mist" labelledBy="follow-up-heading">
      <div className="max-w-4xl">
        <p className="eyebrow cmo-eyebrow">{followUp.eyebrow}</p>
        <h2 id="follow-up-heading" className="headline headline-lg mt-5">
          {followUp.header}
        </h2>
        <p className="lede mt-5 max-w-[64ch] text-muted-foreground">{followUp.subhead}</p>
      </div>

      {/* The path from new lead to booked appointment. A row with travelling dots on desktop, a stack on phones. */}
      <ol aria-label={followUp.flowLabel} className="mt-10 flex flex-col lg:mt-12 lg:flex-row lg:items-stretch">
        {followUp.flow.map((step, i) => {
          const Icon = icons[step.icon];
          const done = i === last;
          return (
            <Fragment key={step.title}>
              <li
                className={`flex min-w-0 flex-1 items-start gap-4 rounded-xl border-2 border-foreground p-4 lg:flex-col lg:gap-3 lg:p-5 ${
                  done ? "bg-teal-deep text-white" : "bg-surface text-foreground"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 border-foreground bg-surface text-foreground"
                >
                  <Icon size={20} strokeWidth={2} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[13px] font-bold uppercase tracking-[0.08em]">{step.title}</span>
                  <span className={`mt-1.5 block text-[14px] leading-snug ${done ? "text-white" : "text-muted-foreground"}`}>{step.body}</span>
                </span>
              </li>
              {i < last && (
                <li aria-hidden="true" className="flow-link h-5 shrink-0 lg:h-auto lg:w-7">
                  <span className="flow-track hidden lg:block" style={{ "--d": `${i * 0.4}s` } as CSSProperties} />
                  <span className="mx-auto block h-full w-0.5 bg-foreground lg:hidden" />
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>

      <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
        <SmsDemo sms={followUp.sms} />

        <div>
          <h3 className="headline headline-md">{followUp.capabilitiesHeader}</h3>
          <ul data-stagger className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {followUp.capabilities.map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <Check aria-hidden="true" size={20} strokeWidth={2.5} className="mt-0.5 shrink-0 text-teal-deep" />
                <span>
                  <span className="block font-bold leading-snug text-foreground">{item.title}</span>
                  <span className="mt-1 block text-[14px] leading-relaxed text-muted-foreground">{item.body}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-xl border-2 border-foreground bg-surface p-5 sm:p-6">
            <h3 className="text-[17px] font-bold leading-snug text-foreground">{followUp.integrations.header}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{followUp.integrations.body}</p>
            <p className="mt-3 text-[12px] leading-relaxed text-muted-foreground">{followUp.integrations.disclaimer}</p>
          </div>

          <CtaButton location="follow-up" targetId={cta.targetId} className="mt-8 w-full text-center sm:w-auto">
            {followUp.cta}
          </CtaButton>
        </div>
      </div>
    </Section>
  );
}

/** A sample text thread in a slab: business on the left, homeowner on the right, the booking confirmed at the bottom. */
function SmsDemo({ sms }: { sms: LandingContent["followUp"]["sms"] }) {
  return (
    <figure className="mx-auto w-full max-w-md lg:mx-0">
      <div role="img" aria-label={sms.label} className="slab bg-surface">
        <div aria-hidden="true">
          <div className="flex items-center justify-between gap-4 border-b-2 border-foreground bg-surface px-5 py-3">
            <span className="font-bold leading-tight text-foreground">{sms.business}</span>
            <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground">{sms.channel}</span>
          </div>
          <div data-stagger className="flex flex-col gap-2.5 bg-background px-4 py-5">
            {sms.lines.map((line, i) =>
              line.from === "note" ? (
                <p key={i} className="py-1 text-center text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground">
                  {line.text}
                </p>
              ) : (
                <p
                  key={i}
                  className={`max-w-[84%] border-2 border-foreground px-3.5 py-2.5 text-[14px] leading-snug text-foreground ${
                    line.from === "homeowner" ? "self-end rounded-xl rounded-br-sm bg-sky" : "self-start rounded-xl rounded-bl-sm bg-surface"
                  }`}
                >
                  {line.text}
                </p>
              ),
            )}
          </div>
          <div className="flex items-center gap-2.5 border-t-2 border-foreground bg-mint px-5 py-3 text-[14px] font-bold text-foreground">
            <CalendarCheck size={18} strokeWidth={2.25} className="shrink-0" />
            {sms.outcome}
          </div>
        </div>
      </div>
      <figcaption className="mt-5 text-[13px] leading-relaxed text-muted-foreground">{sms.caption}</figcaption>
    </figure>
  );
}
