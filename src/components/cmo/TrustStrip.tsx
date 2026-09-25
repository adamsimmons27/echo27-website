import { Container } from "./Container";
import type { LandingContent } from "@/content/types";

const tones = ["bg-sky", "bg-mint", "bg-peach"];

/** Three plain facts as one slab of pastel cells, the way the main site shows its results strip. */
export function TrustStrip({ content }: { content: LandingContent }) {
  return (
    <div className="bg-background pb-14 sm:pb-16">
      <Container>
        <ul className="slab slab-grid grid-cols-1 sm:grid-cols-3">
          {content.hero.trust.map((item, i) => (
            <li key={item} className={`${tones[i % tones.length]} px-5 py-5 text-[15px] font-bold leading-snug text-foreground sm:px-6`}>
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
