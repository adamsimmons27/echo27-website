import { CtaButton } from "./CtaButton";
import type { LandingContent } from "@/content/types";

/** Fixed bottom bar on phones. Slides away while the booking section is on screen. */
export function StickyCta({ content }: { content: LandingContent }) {
  return (
    <div className="sticky-cta fixed inset-x-0 bottom-0 z-40 border-t-2 border-foreground bg-background p-3 md:hidden">
      <CtaButton location="sticky" targetId={content.cta.targetId} className="w-full">
        {content.cta.label}
      </CtaButton>
    </div>
  );
}
