import { BookingForm } from "./BookingForm";
import type { LandingContent } from "@/content/types";

const BOOKING_URL = import.meta.env.VITE_BOOKING_URL as string | undefined;

/** The calendar embed when VITE_BOOKING_URL is set, otherwise the styled fallback form. */
export function BookingEmbed({ content }: { content: LandingContent }) {
  if (BOOKING_URL) {
    return (
      <div className="slab bg-surface">
        <iframe
          src={BOOKING_URL}
          title={content.booking.embedTitle}
          loading="lazy"
          className="block h-[760px] w-full"
          allow="payment"
        />
      </div>
    );
  }
  return <BookingForm form={content.booking.form} />;
}
