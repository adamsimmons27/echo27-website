import logo from "@/assets/echo27-logo.png";
import { CtaButton } from "./CtaButton";
import { Container } from "./Container";
import type { LandingContent } from "@/content/types";

/** Slim header with the logo and one CTA. Sticky on desktop; on phones the sticky bottom bar takes over. */
export function Header({ content }: { content: LandingContent }) {
  return (
    <header className="border-b-2 border-foreground bg-background md:sticky md:top-0 md:z-40">
      <Container className="flex h-[68px] items-center justify-between">
        <a href="#top" className="flex items-center" aria-label={content.brand.name}>
          <img src={logo} alt="" className="h-7 w-auto" />
        </a>
        <div className="hidden md:block">
          <CtaButton location="header" targetId={content.cta.targetId} className="text-sm px-4 py-2">
            {content.cta.label}
          </CtaButton>
        </div>
      </Container>
    </header>
  );
}
