import logo from "@/assets/echo27-logo.png";
import { Container } from "./Container";
import type { LandingContent } from "@/content/types";

/** Minimal footer: mark, copyright, privacy link. No nav, so nothing leads away from the page. */
export function Footer({ content }: { content: LandingContent }) {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-background py-8 text-sm text-muted-foreground">
      <Container className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-3">
          <img src={logo} alt={content.brand.name} className="h-7 w-auto" />
          <span>&copy; {year}</span>
        </p>
        {content.footer.privacyHref ? (
          <a href={content.footer.privacyHref} className="underline underline-offset-4 hover:text-foreground">
            {content.footer.privacyLabel}
          </a>
        ) : (
          <span>[{content.footer.privacyLabel}: add link]</span>
        )}
      </Container>
    </footer>
  );
}
