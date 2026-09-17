import type { CSSProperties } from "react";
import { openBookingModal } from "./BookingModal";
import { written } from "./Testimonials";

export const logos = [
  { name: "Client 1", src: "https://storage.googleapis.com/msgsndr/gIII1KIC3cd7xxjCBh3C/media/67c721dc66af95489e40cddc.png" },
  { name: "Client 2", src: "https://assets.cdn.filesafe.space/gIII1KIC3cd7xxjCBh3C/media/67c7199a001d0180e5371508.png" },
  { name: "Client 3", src: "https://assets.cdn.filesafe.space/gIII1KIC3cd7xxjCBh3C/media/67c7195ed26b7b0239b0c335.png" },
  { name: "Client 4", src: "https://assets.cdn.filesafe.space/gIII1KIC3cd7xxjCBh3C/media/67c723eb0a638d11db2feb38.png" },
  { name: "Client 5", src: "https://assets.cdn.filesafe.space/gIII1KIC3cd7xxjCBh3C/media/67c724490a638d96032feb5d.png" },
  { name: "Client 6", src: "https://assets.cdn.filesafe.space/gIII1KIC3cd7xxjCBh3C/media/67c724f1a5debb509d5744b2.png" },
  { name: "Client 7", src: "https://assets.cdn.filesafe.space/gIII1KIC3cd7xxjCBh3C/media/67c7255bac9d4a7f6c41c667.png" },
  { name: "Client 8", src: "https://assets.cdn.filesafe.space/gIII1KIC3cd7xxjCBh3C/media/67c73ed3d029102d517c26dc.png" },
];

// Three written testimonials shown as notes beside the headline. Mobile shows the first note, tablet the first
// two side by side, desktop all three. Class names are written out in full so Tailwind can see them.
// - "excerpt" must be a verbatim run of the client's own words. It is only shown if it is still found inside the
//   source quote in Testimonials.tsx; if someone edits that quote, the whole quote is shown instead, never a fragment.
// - Only quote, name, title, and photo are read. The "result" lines are placeholders and must not appear here.
// - Fills are chosen so nobody wears the same colour here as in the written testimonials further down the page.
const notes = [
  {
    name: "Tobias Brinkmann",
    excerpt: "We've worked with several agencies but none of them delivered results as consistently or professionally as Adam and his team.",
    tone: "bg-peach",
    r: "-2.5deg",
    d: "520ms",
    place: "lg:mr-7",
  },
  {
    name: "Justin Lui",
    excerpt: "Thanks to Echo 27's Google ads management service, my business has seen continuous success year over year.",
    tone: "bg-lilac",
    r: "2deg",
    d: "640ms",
    place: "hidden md:block md:mt-6 lg:-mt-4 lg:ml-9 lg:mr-1",
  },
  {
    name: "Lou Jimenez",
    excerpt: "Working with Adam and his team has been a game-changer for our company.",
    tone: "bg-sky",
    r: "-1.5deg",
    d: "760ms",
    place: "hidden lg:block lg:-mt-4 lg:ml-2 lg:mr-5",
  },
].flatMap((n) => {
  const person = written.find((w) => w.name === n.name);
  if (!person) return [];
  return [{ ...n, person, text: person.quote.includes(n.excerpt) ? n.excerpt : person.quote }];
});

export function Hero() {
  const loop = [...logos, ...logos];

  return (
    <section id="top" className="relative overflow-x-clip pt-[68px] bg-background">
      <div className="mx-auto max-w-[1180px] px-6">
        {/* Promise on the left, proof on the right. One column below lg. */}
        <div className="grid grid-cols-1 gap-9 pt-14 pb-12 md:gap-14 md:pt-20 md:pb-20 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center lg:gap-10 lg:pt-[clamp(4rem,10vh,7.5rem)] lg:pb-[clamp(4rem,9vh,6.5rem)] xl:grid-cols-[minmax(0,1fr)_420px] xl:gap-12">
          <div>
            <h1 className="hero-h1 max-w-[15ch] text-[46px] sm:text-[68px] md:text-[86px] lg:text-[72px] xl:text-[82px] font-extrabold leading-[0.94] tracking-[-0.04em] text-foreground">
              {["Business", "growth", "made"].map((w, i) => (
                <span key={w}>
                  <span className="hero-word" style={{ "--d": `${i * 90}ms` } as CSSProperties}>{w}</span>{" "}
                </span>
              ))}
              <span className="hero-word" style={{ "--d": "270ms" } as CSSProperties}>
                <span className="strike-easy">easy</span>
              </span>{" "}
              <span className="hero-word" style={{ "--d": "360ms" } as CSSProperties}>
                <span className="hl hl-wipe">less hard.</span>
              </span>
            </h1>
            <p className="mt-8 max-w-[46ch] text-balance text-lg md:mt-9 md:text-2xl text-muted-foreground leading-snug">
              Paid ads, SEO, web design, funnels, and fractional CMO work for
              founders who want{" "}
              <span className="font-semibold text-foreground">revenue, not reports.</span>
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center md:mt-10">
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
            <p className="mt-5 text-[14px] text-muted-foreground">
              No pitch. We'll tell you if we're not a fit.
            </p>
          </div>

          {/* Real client words as pinned notes. The tilt, entrance, drift, and hover live in .hero-note (styles.css).
              Nothing inside a note is a link, so the transform cannot trap a stretched overlay. */}
          <div
            role="group"
            aria-label="What clients say"
            className="flex max-w-[520px] flex-col md:max-w-none md:flex-row md:items-start md:gap-7 lg:flex-col lg:items-stretch lg:gap-0"
          >
            {notes.map((n, i) => (
              <figure
                key={n.name}
                className={`slab hero-note ${n.tone} p-4 md:min-w-0 md:flex-1 md:p-5 lg:flex-none xl:p-6 ${n.place}`}
                style={{ "--r": n.r, "--d": n.d } as CSSProperties}
              >
                <blockquote className="text-[15px] font-bold leading-[1.3] tracking-[-0.01em] text-foreground md:text-[16px] xl:text-[17px]">
                  “{n.text}”
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  {n.person.photo && (
                    <img
                      src={n.person.photo}
                      alt=""
                      width={40}
                      height={40}
                      loading={i === 0 ? "eager" : "lazy"}
                      decoding="async"
                      className="h-10 w-10 shrink-0 border-2 border-foreground object-cover"
                    />
                  )}
                  <div>
                    <p className="text-[15px] font-bold leading-tight">{n.person.name}</p>
                    <p className="text-[13px] leading-tight text-foreground/70">{n.person.title}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
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
