import { Phone } from "lucide-react";
import logo from "@/assets/echo27-logo.png";
import { track } from "@/lib/tracking";
import { CtaButton } from "./CtaButton";
import { Container } from "./Container";
import type { LandingContent } from "@/content/types";

/** Slim header with the logo, a phone link on every screen size, and one CTA. Sticky on desktop; on phones the sticky bottom bar takes over the CTA. */
export function Header({ content }: { content: LandingContent }) {
  return (
    <header className="border-b-2 border-foreground bg-background md:sticky md:top-0 md:z-40">
      <Container className="flex h-[68px] items-center justify-between">
        <a href="#top" className="flex min-h-11 items-center" aria-label={content.brand.name}>
          <img src={logo} alt="" className="h-7 w-auto" />
        </a>
        <div className="flex items-center gap-5">
          <a
            href={`tel:${content.phone.replace(/[^\d+]/g, "")}`}
            className="flex min-h-11 items-center gap-2 text-sm font-bold text-foreground underline-offset-4 hover:underline"
            onClick={() => track("phone_click", { location: "header" })}
          >
            <Phone aria-hidden="true" size={16} strokeWidth={2.25} />
            {content.phone}
          </a>
          <div className="hidden md:block">
            <CtaButton location="header" targetId={content.cta.targetId} className="text-sm px-4 py-2">
              {content.cta.label}
            </CtaButton>
          </div>
        </div>
      </Container>
    </header>
  );
}
