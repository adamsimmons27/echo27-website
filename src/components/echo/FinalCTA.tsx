import { openBookingModal } from "./BookingModal";

export function FinalCTA() {
  return (
    <section
      id="contact"
      className="border-y-2 border-foreground bg-yellow py-20 text-foreground md:py-28"
    >
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-20">
          <div>
            <p className="eyebrow mb-7">Ready when you are</p>
            <h2 className="max-w-[14ch] text-[44px] md:text-[68px] lg:text-[80px] font-extrabold leading-[0.94] tracking-[-0.04em]">
              Grow without <span className="text-teal-deep">guessing.</span>
            </h2>
          </div>

          <div>
            <p className="max-w-[40ch] text-lg text-foreground/75 leading-snug">
              We take on a limited number of new clients each quarter. If you're
              serious about revenue, tell us what you're working on and we'll
              tell you straight whether we can help.
            </p>
            <div className="mt-8">
              <button
                type="button"
                onClick={openBookingModal}
                className="btn-primary"
              >
                Apply to partner with us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
