import type { ReactNode } from "react";
import { track } from "@/lib/tracking";

/** Every call to action on the page: a real anchor to the booking section, plus a tracked click. */
export function CtaButton({
  location,
  targetId,
  children,
  variant = "primary",
  className = "",
}: {
  location: string;
  targetId: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "on-dark";
  className?: string;
}) {
  const cls = variant === "ghost" ? "btn-ghost" : variant === "on-dark" ? "btn-on-dark" : "btn-primary";
  return (
    <a href={`#${targetId}`} className={`${cls} ${className}`} onClick={() => track("cta_click", { location })}>
      {children}
    </a>
  );
}
