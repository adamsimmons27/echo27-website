import type { LandingContent } from "@/content/types";
import { Header } from "./Header";
import { StickyCta } from "./StickyCta";
import { Footer } from "./Footer";
import { Analytics } from "./Analytics";
import { Hero } from "./Hero";
import { TrustStrip } from "./TrustStrip";
import { Problem } from "./Problem";
import { Shift } from "./Shift";
import { Offer } from "./Offer";
import { Compare } from "./Compare";
import { Proof } from "./Proof";
import { HowItWorks } from "./HowItWorks";
import { Fit } from "./Fit";
import { Faq } from "./Faq";
import { Booking } from "./Booking";

/** The landing page is the content file rendered in order. Trade variants pass a different content object. */
export function FractionalCmoLanding({ content }: { content: LandingContent }) {
  return (
    <div className="bg-background text-foreground">
      <Header content={content} />
      <main className="pb-20 md:pb-0">
        <Hero content={content} />
        <TrustStrip content={content} />
        <Problem content={content} />
        <Shift content={content} />
        <Offer content={content} />
        <Compare content={content} />
        <Proof content={content} />
        <HowItWorks content={content} />
        <Fit content={content} />
        <Faq faq={content.faq} />
        <Booking content={content} />
        <StickyCta content={content} />
      </main>
      <Footer content={content} />
      <Analytics bookingId={content.cta.targetId} />
    </div>
  );
}
