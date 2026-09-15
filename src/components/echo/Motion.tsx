import { useEffect, useRef, useState } from "react";

const NUM = /^([^0-9]*)([0-9][0-9,]*(?:\.[0-9]+)?)(.*)$/;

/**
 * Renders a stat like "$50M+" or "4.3x" and counts the numeric part up from zero
 * the first time it scrolls into view. Server HTML carries the final value.
 */
export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const m = value.match(NUM);
  const pre = m?.[1] ?? "";
  const raw = m?.[2] ?? "";
  const post = m?.[3] ?? "";
  const target = m ? parseFloat(raw.replace(/,/g, "")) : NaN;
  const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
  const grouped = raw.includes(",");

  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(target);

  useEffect(() => {
    const el = ref.current;
    if (!el || !m || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const start = performance.now();
        const duration = 1100;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setShown(target * eased);
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        setShown(0);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!m) return <span className={className}>{value}</span>;

  const text = shown.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: grouped,
  });

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {`${pre}${text}${post}`}
    </span>
  );
}

/** A bold moving band of words. Pauses on hover. */
const TONES = {
  yellow: { band: "bg-yellow text-foreground", dot: "bg-foreground" },
  teal: { band: "bg-teal text-white", dot: "bg-white" },
  ink: { band: "bg-foreground text-white", dot: "bg-white" },
  pink: { band: "bg-pink text-white", dot: "bg-white" },
} as const;

export function Ticker({ items, tone = "yellow" }: { items: readonly string[]; tone?: keyof typeof TONES }) {
  const loop = [...items, ...items, ...items, ...items];
  const palette = TONES[tone];
  return (
    <div aria-hidden className={`overflow-hidden border-y-2 border-foreground ${palette.band}`}>
      <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap py-4 md:gap-10 md:py-5" style={{ animationDuration: "28s" }}>
        {loop.map((t, i) => (
          <span key={`${t}-${i}`} className="flex items-center gap-8 text-[15px] font-extrabold uppercase tracking-[0.08em] md:gap-10 md:text-[18px]">
            {t}
            <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${palette.dot}`} />
          </span>
        ))}
      </div>
    </div>
  );
}
