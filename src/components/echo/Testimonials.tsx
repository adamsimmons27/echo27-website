import { useState, type ReactNode } from "react";
import { Play, X, Linkedin } from "lucide-react";
import justinImg from "@/assets/justin.jpg";
import tobiasImg from "@/assets/tobias.jpeg";
import louImg from "@/assets/lou.jpeg";

export type Video = { src: string; name: string; title: string; poster: string; linkedin?: string; result?: string };
export type Written = { quote: string; name: string; title: string; photo?: string; linkedin?: string; result?: string };

export const videos: Video[] = [
  /* PLACEHOLDER: replace with real figure */
  { src: "/videos/marc-lafleur.mp4", poster: "/images/thumbs/marc-lafleur.jpg", name: "Marc Lafleur", title: "Founder, Trulocal & DB8 Labs", linkedin: "https://www.linkedin.com/in/marclafleur1/", result: "Scaled DTC subscriptions at 3.1x ROAS" },
  /* PLACEHOLDER: replace with real figure */
  { src: "/videos/molly-kauffman.mp4", poster: "/images/thumbs/molly-kauffman.jpg", name: "Molly Kauffman", title: "Director of Marketing, Society Mortgage", linkedin: "https://www.linkedin.com/in/mollykauf/", result: "42% lower cost per qualified lead" },
  /* PLACEHOLDER: replace with real figure */
  { src: "/videos/marc-steiniger.mp4", poster: "/images/thumbs/marc-steiniger.jpg", name: "Marc Steiniger", title: "Co-Founder, The Sweat Box", linkedin: "https://www.linkedin.com/in/marc-steiniger-015494/", result: "2.4x membership sign-ups" },
  /* PLACEHOLDER: replace with real figure */
  { src: "/videos/thibaut-bannelier.mp4", poster: "/images/thumbs/thibaut-bannelier.jpg", name: "Thibaut Bannelier", title: "Founder, Music and Company", linkedin: "https://www.linkedin.com/in/thibaut-b-382884b3/", result: "5x return on Google Ads spend" },
];

export const written: Written[] = [
  {
    quote:
      "I would highly recommend working with Echo 27 and have referred them to several friends. We've worked with several agencies but none of them delivered results as consistently or professionally as Adam and his team.",
    name: "Tobias Brinkmann",
    title: "CEO, Mountain",
    photo: tobiasImg,
    linkedin: "https://www.linkedin.com/in/tobiasbrinkmann/",
    /* PLACEHOLDER: replace with real figure */
    result: "Replaced three agencies with one",
  },
  {
    quote:
      "Thanks to Echo 27's Google ads management service, my business has seen continuous success year over year. He is very easy to work with and I would not hesitate to recommend him to others looking to grow their business.",
    name: "Justin Lui",
    title: "Founder, The Physio Loft",
    photo: justinImg,
    linkedin: "https://www.linkedin.com/in/justin-lui-31071886/",
    /* PLACEHOLDER: replace with real figure */
    result: "Year over year growth, 4 years running",
  },
  {
    quote:
      "Working with Adam and his team has been a game-changer for our company. Their understanding of marketing strategies, coupled with a great attitude and a creative approach, has significantly enhanced our brand presence.",
    name: "Lou Jimenez",
    title: "Founder, Choose Charters",
    photo: louImg,
    linkedin: "https://www.linkedin.com/in/loujimenez/",
    /* PLACEHOLDER: replace with real figure */
    result: "Doubled qualified booking inquiries",
  },
];

/** Look a person up by name so pages can place a specific testimonial. */
export const videoBy = (name: string) => videos.find((v) => v.name === name)!;
export const writtenBy = (name: string) => written.find((w) => w.name === name)!;

export function Byline({ person }: { person: Written }) {
  return (
    <div className="flex items-center gap-3">
      {person.photo && (
        <img src={person.photo} alt={person.name} className="h-11 w-11 border-2 border-foreground object-cover" />
      )}
      <div>
        <div className="flex items-center gap-2">
          <p className="font-bold leading-tight">{person.name}</p>
          {person.linkedin && (
            <a href={person.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${person.name} on LinkedIn`} className="text-muted-foreground hover:text-teal">
              <Linkedin className="h-4 w-4" />
            </a>
          )}
        </div>
        <p className="text-[13px] text-muted-foreground leading-tight">{person.title}</p>
      </div>
    </div>
  );
}

/** A grid of video testimonial cards with one shared player modal. */
export function VideoTestimonials({
  items,
  columns = 2,
  showResult = true,
  className = "",
}: {
  items: Video[];
  columns?: 1 | 2;
  showResult?: boolean;
  className?: string;
}) {
  const [active, setActive] = useState<Video | null>(null);
  return (
    <>
      <div className={`grid grid-cols-1 gap-6 ${columns === 2 ? "sm:grid-cols-2" : ""} ${className}`}>
        {items.map((v) => (
          <button key={v.src} onClick={() => setActive(v)} className="group appearance-none p-0 text-left">
            <div className="relative aspect-video overflow-hidden border-2 border-foreground bg-foreground">
              <img src={v.poster} alt={v.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute bottom-0 left-0 flex h-11 w-11 items-center justify-center border-r-2 border-t-2 border-foreground bg-background group-hover:bg-teal">
                <Play className="ml-0.5 h-4 w-4 fill-current text-foreground group-hover:text-white" strokeWidth={2} />
              </span>
            </div>
            <div className="mt-3">
              <p className="font-bold leading-tight">{v.name}</p>
              <p className="text-[13px] text-muted-foreground leading-snug">{v.title}</p>
              {showResult && v.result && (
                <p className="mt-2 text-[13px] font-bold text-teal leading-snug">{v.result}</p>
              )}
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/90 p-6" onClick={() => setActive(null)}>
          <button
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center border-2 border-white text-white hover:bg-white hover:text-foreground"
            onClick={() => setActive(null)}
            aria-label="Close video"
          >
            <X className="h-5 w-5" strokeWidth={2.5} />
          </button>
          <div className="aspect-video w-full max-w-4xl overflow-hidden border-2 border-white bg-black" onClick={(e) => e.stopPropagation()}>
            <video src={active.src} poster={active.poster} controls autoPlay className="h-full w-full" />
          </div>
        </div>
      )}
    </>
  );
}

/** Written quotes in a hairline-divided slab. */
export function WrittenQuotes({ items, columns = 3 }: { items: Written[]; columns?: 2 | 3 }) {
  return (
    <div className={`slab grid grid-cols-1 gap-[2px] bg-foreground ${columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
      {items.map((w, i) => (
        <article key={w.name} className={`flex flex-col ${["bg-butter", "bg-sky", "bg-peach"][i % 3]} p-7 md:p-9`}>
          {w.result && (
            <p className="mb-5 text-[13px] font-bold uppercase tracking-[0.08em] text-teal">{w.result}</p>
          )}
          <p className="flex-1 text-[17px] leading-snug">“{w.quote}”</p>
          <div className="mt-7">
            <Byline person={w} />
          </div>
        </article>
      ))}
    </div>
  );
}

/** The full set: every video, then every written quote. Used on the homepage and the audit page. */
export function Testimonials({ header }: { header?: ReactNode }) {
  return (
    <section id="testimonials" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-[1180px] px-6">
        {header ?? (
          <div>
            <p className="eyebrow mb-7">Testimonials</p>
            <h2 className="max-w-[16ch] text-[38px] md:text-[52px] font-extrabold leading-[0.98] tracking-[-0.04em] text-foreground">
              Don't take our word for it.
            </h2>
          </div>
        )}
        <VideoTestimonials items={videos} className="mt-14 md:mt-16" />
        <div className="mt-6">
          <WrittenQuotes items={written} />
        </div>
      </div>
    </section>
  );
}
