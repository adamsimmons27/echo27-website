import type { ReactNode } from "react";
import { Container } from "./Container";

type Tone = "light" | "mist" | "sky" | "lilac" | "peach" | "dark";

/* Bands in the site's own colours. Every band except cream carries the 2px ink rules top and bottom.
   The root layout's scroll reveal picks these sections up automatically. */
const tones: Record<Tone, string> = {
  light: "bg-background text-foreground",
  mist: "border-y-2 border-foreground bg-surface-alt text-foreground",
  sky: "border-y-2 border-foreground bg-sky text-foreground",
  lilac: "border-y-2 border-foreground bg-lilac text-foreground",
  peach: "border-y-2 border-foreground bg-peach text-foreground",
  dark: "on-dark border-y-2 border-foreground bg-teal-deep text-white",
};

export function Section({
  id,
  tone = "light",
  labelledBy,
  className = "",
  children,
}: {
  id?: string;
  tone?: Tone;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${tones[tone]} py-16 sm:py-20 lg:py-28 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}
