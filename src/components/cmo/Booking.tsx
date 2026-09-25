import { Section } from "./Section";
import { BookingEmbed } from "./BookingEmbed";
import type { LandingContent } from "@/content/types";

/** Section 10: the closing headline on a deep teal band, then the calendar or form in a white slab. id="book". */
export function Booking({ content }: { content: LandingContent }) {
  const { finalCta, booking, cta } = content;
  return (
    <Section id={cta.targetId} tone="dark" labelledBy="final-heading">
      <div className="mx-auto max-w-3xl text-center">
        <h2 id="final-heading" className="headline headline-lg">
          {finalCta.header}
        </h2>
        <p className="lede mt-5 text-white/90">{finalCta.body}</p>
      </div>
      <div className="mx-auto mt-10 max-w-3xl">
        <h3 className="sr-only">{booking.heading}</h3>
        <BookingEmbed content={content} />
      </div>
    </Section>
  );
}
