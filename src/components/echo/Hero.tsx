import { openBookingModal } from "./BookingModal";

const logos = [
  { name: "Client 1", src: "https://storage.googleapis.com/msgsndr/gIII1KIC3cd7xxjCBh3C/media/67c721dc66af95489e40cddc.png" },
  { name: "Client 2", src: "https://assets.cdn.filesafe.space/gIII1KIC3cd7xxjCBh3C/media/67c7199a001d0180e5371508.png" },
  { name: "Client 3", src: "https://assets.cdn.filesafe.space/gIII1KIC3cd7xxjCBh3C/media/67c7195ed26b7b0239b0c335.png" },
  { name: "Client 4", src: "https://assets.cdn.filesafe.space/gIII1KIC3cd7xxjCBh3C/media/67c723eb0a638d11db2feb38.png" },
  { name: "Client 5", src: "https://assets.cdn.filesafe.space/gIII1KIC3cd7xxjCBh3C/media/67c724490a638d96032feb5d.png" },
  { name: "Client 6", src: "https://assets.cdn.filesafe.space/gIII1KIC3cd7xxjCBh3C/media/67c724f1a5debb509d5744b2.png" },
  { name: "Client 7", src: "https://assets.cdn.filesafe.space/gIII1KIC3cd7xxjCBh3C/media/67c7255bac9d4a7f6c41c667.png" },
  { name: "Client 8", src: "https://assets.cdn.filesafe.space/gIII1KIC3cd7xxjCBh3C/media/67c73ed3d029102d517c26dc.png" },
];

export function Hero() {
  const loop = [...logos, ...logos];

  return (
    <section id="top" className="relative pt-[68px] bg-background">
      <div className="mx-auto max-w-[1180px] px-6">
        {/* Headline block — left aligned, no centering, no glow */}
        <div className="pt-28 pb-20 md:pt-40 md:pb-28">
          <h1 className="max-w-[15ch] text-[46px] sm:text-[68px] md:text-[86px] lg:text-[100px] font-extrabold leading-[0.94] tracking-[-0.04em] text-foreground">
            Business growth made{" "}
            <span className="strike-easy">easy</span>{" "}
            <span className="text-teal">less hard.</span>
          </h1>
          <p className="mt-10 max-w-[46ch] text-lg md:text-2xl text-muted-foreground leading-snug">
            Paid ads, web design, funnels, and fractional CMO work for founders
            who want revenue, not reports.
          </p>
          <div className="mt-11 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={openBookingModal}
              className="btn-primary"
            >
              Apply to partner with us
            </button>
            <a href="#services" className="btn-ghost">
              See how we work
            </a>
          </div>
        </div>
      </div>

      {/* Full-bleed ink band for the client logos (they're light marks) */}
      <div className="border-y-2 border-foreground bg-foreground">
        <div className="mx-auto max-w-[1180px] px-6 py-7">
          <div
            className="relative overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            }}
          >
            <div className="marquee-track flex w-max items-center gap-14 md:gap-20">
              {loop.map((logo, i) => (
                <div
                  key={`${logo.name}-${i}`}
                  className="flex h-9 w-32 shrink-0 items-center justify-center md:h-10 md:w-40"
                >
                  <img
                    src={logo.src}
                    alt={`${logo.name} logo`}
                    loading="eager"
                    decoding="async"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
