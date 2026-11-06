import type { LandingContent } from "@/content/types";
import { Header } from "./Header";
import { StickyCta } from "./StickyCta";
import { Footer } from "./Footer";
import { Analytics } from "./Analytics";
import { Hero } from "./Hero";
import { TrustStrip } from "./TrustStrip";
import { Changed } from "./Changed";
import { System } from "./System";
import { FollowUp } from "./FollowUp";
import { Aeo } from "./Aeo";
import { Compare } from "./Compare";
import { Leadership } from "./Leadership";
import { HowItWorks } from "./HowItWorks";
import { Proof } from "./Proof";
import { Faq } from "./Faq";
import { Booking } from "./Booking";

/** The landing page is the content file rendered in order. Trade variants pass a different content object. */
export function FractionalCmoLanding({ content }: { content: LandingContent }) {
  return (
    <div className="cmo-page bg-background text-foreground">
      <Header content={content} />
      <main className="pb-20 md:pb-0">
        <Hero content={content} />
        <TrustStrip content={content} />
        <Changed content={content} />
        <System content={content} />
        <FollowUp content={content} />
        <Aeo content={content} />
        <Compare content={content} />
        <Leadership content={content} />
        <HowItWorks content={content} />
        <Proof content={content} />
        <Faq faq={content.faq} />
        <Booking content={content} />
        <StickyCta content={content} />
      </main>
      <Footer content={content} />
      <Analytics bookingId={content.cta.targetId} />
    </div>
  );
}
