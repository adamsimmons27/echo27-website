import { CalendarCheck, MessagesSquare, PhoneIncoming, Search, type LucideIcon } from "lucide-react";
import { Container } from "./Container";
import { CtaButton } from "./CtaButton";
import type { LandingContent } from "@/content/types";

const stepIcons: LucideIcon[] = [Search, PhoneIncoming, MessagesSquare, CalendarCheck];
const stepTones = ["bg-sky", "bg-sky", "bg-mint", "bg-mint"];

/** Above the fold: cream paper, ink type, one teal button, and the growth system drawn as one slab. */
export function Hero({ content }: { content: LandingContent }) {
  const { hero, cta } = content;
  const [first, ...rest] = hero.headline;
  return (
    <section id="top" aria-labelledby="hero-heading" className="bg-background text-foreground">
      <Container className="grid gap-12 pt-12 pb-12 sm:pt-16 sm:pb-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-14 lg:pt-20 lg:pb-16">
        <div>
          <p className="eyebrow cmo-eyebrow">{hero.eyebrow}</p>
          <h1 id="hero-heading" className="headline cmo-h1 mt-6">
            <span className="block">
              <span className="hl">{first}</span>
            </span>
            {rest.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="lede mt-7 max-w-[58ch] text-muted-foreground">{hero.subhead}</p>
          <p className="mt-3 max-w-[58ch] font-bold leading-snug text-foreground">{hero.subheadNote}</p>
          <div className="mt-8 flex flex-col items-start gap-4">
            <CtaButton location="hero" targetId={cta.targetId} className="w-full sm:w-auto">
              {cta.label}
            </CtaButton>
            <p className="max-w-[52ch] text-sm font-semibold leading-relaxed text-muted-foreground">{hero.ctaNote}</p>
          </div>
        </div>

        <SystemVisual visual={hero.visual} />
      </Container>
    </section>
  );
}

/** The whole journey in one slab: four steps down a rail, with the Fractional CMO as the base they all sit on. */
function SystemVisual({ visual }: { visual: LandingContent["hero"]["visual"] }) {
  return (
    <div role="img" aria-label={visual.label} className="slab w-full max-w-md bg-foreground lg:ml-auto">
      <div aria-hidden="true" className="flex flex-col gap-[2px]">
        <p className="bg-surface px-5 py-3 text-[12px] font-bold uppercase tracking-[0.1em] text-foreground">{visual.title}</p>
        {visual.steps.map((step, i) => {
          const Icon = stepIcons[i % stepIcons.length];
          return (
            <div key={step.title} className={`${stepTones[i % stepTones.length]} flex items-center gap-4 px-5 py-4`}>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 border-foreground bg-surface text-foreground">
                <Icon size={20} strokeWidth={2} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-bold leading-tight text-foreground">{step.title}</span>
                <span className="mt-1 block text-[13px] leading-snug text-muted-foreground">{step.body}</span>
              </span>
              <span className="hidden shrink-0 text-[11px] font-bold uppercase tracking-[0.08em] text-teal-deep min-[400px]:block">{step.pillar}</span>
            </div>
          );
        })}
        <div className="bg-teal-deep px-5 py-4 text-white">
          <span className="block font-bold leading-tight">{visual.footer.title}</span>
          <span className="mt-1 block text-[13px] leading-snug">{visual.footer.body}</span>
        </div>
      </div>
    </div>
  );
}
