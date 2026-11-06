import { Container } from "./Container";
import type { LandingContent } from "@/content/types";

const tones = ["bg-sky", "bg-mint", "bg-peach", "bg-lilac"];

/** Plain facts as one slab of pastel cells, the way the main site shows its results strip. */
export function TrustStrip({ content }: { content: LandingContent }) {
  return (
    <div className="bg-background pb-12 sm:pb-14">
      <Container>
        <ul className="slab slab-grid grid-cols-2 lg:grid-cols-4">
          {content.hero.trust.map((item, i) => (
            <li key={item} className={`${tones[i % tones.length]} px-4 py-4 text-[14px] font-bold leading-snug text-foreground sm:px-6 sm:py-5 sm:text-[15px]`}>
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
