import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";
import { track } from "@/lib/tracking";

/**
 * Captures UTM and click ids on load, fires booking_view once when the booking section enters the viewport,
 * and flags the body while it is on screen so the mobile sticky bar can get out of the way.
 * The pixel and GA4 tags themselves are injected from the route's head() when their ids are set.
 */
export function Analytics({ bookingId }: { bookingId: string }) {
  useEffect(() => {
    captureAttribution();
    const target = document.getElementById(bookingId);
    if (!target) return;
    let seen = false;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((e) => e.isIntersecting);
        document.body.dataset.bookingVisible = visible ? "true" : "false";
        if (visible && !seen) {
          seen = true;
          track("booking_view");
        }
      },
      { threshold: 0.2 },
    );
    io.observe(target);
    return () => {
      io.disconnect();
      delete document.body.dataset.bookingVisible;
    };
  }, [bookingId]);
  return null;
}
