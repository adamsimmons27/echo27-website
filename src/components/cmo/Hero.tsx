import { Container } from "./Container";
import { CtaButton } from "./CtaButton";
import type { LandingContent } from "@/content/types";

/** Above the fold, in the main site's hero style: cream paper, ink type, one teal button, a mint marker on the promise. */
export function Hero({ content }: { content: LandingContent }) {
  const { hero, cta } = content;
  const parts = splitHighlight(hero.headline);
  return (
    <section id="top" aria-labelledby="hero-heading" className="bg-background text-foreground">
      <Container className="grid gap-12 pt-14 pb-14 sm:pt-20 sm:pb-16 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:items-center lg:gap-16 lg:pt-20 lg:pb-20">
        <div>
          <p className="eyebrow">{hero.eyebrow}</p>
          <p className="mt-6 max-w-[56ch] text-lg font-semibold">{hero.lead}</p>
          <h1 id="hero-heading" className="headline headline-xl mt-3 max-w-[20ch]">
            {parts.before}
            <span className="hl">{parts.mark}</span>
            {parts.after}
          </h1>
          <p className="lede mt-7 max-w-[56ch] text-muted-foreground">{hero.subhead}</p>
          <div className="mt-9 flex flex-col items-start gap-4">
            <CtaButton location="hero" targetId={cta.targetId} className="w-full sm:w-auto">
              {cta.label}
            </CtaButton>
            <p className="max-w-[52ch] text-sm leading-relaxed text-muted-foreground">{hero.ctaNote}</p>
            <p className="max-w-[52ch] text-sm font-semibold leading-relaxed text-foreground">{hero.promise}</p>
          </div>
        </div>
        {/* PHOTO SLOT: replace this frame with a real photo, 4:5. Keep the 2px ink border to match the site. */}
        <div className="photo-slot hidden aspect-[4/5] max-h-[520px] lg:flex" aria-hidden="true">
          [Photo slot]
        </div>
      </Container>
    </section>
  );
}

/** Puts the marker on the revenue figure in the headline without touching the words. */
function splitHighlight(headline: string): { before: string; mark: string; after: string } {
  const key = "$500K to $2M";
  const i = headline.indexOf(key);
  if (i < 0) return { before: headline, mark: "", after: "" };
  return { before: headline.slice(0, i), mark: key, after: headline.slice(i + key.length) };
}
