import {
  BarChart3,
  Compass,
  Megaphone,
  MousePointerClick,
  PhoneCall,
  RefreshCw,
  Search,
  Star,
  type LucideIcon,
} from "lucide-react";
import { Section } from "./Section";
import type { IconName, LandingContent } from "@/content/types";

/** Content icon names mapped to lucide components. Add a row here when a new IconName is introduced. */
const icons: Record<IconName, LucideIcon> = {
  compass: Compass,
  megaphone: Megaphone,
  search: Search,
  "mouse-pointer-click": MousePointerClick,
  star: Star,
  "phone-call": PhoneCall,
  refresh: RefreshCw,
  "bar-chart": BarChart3,
};

/* One flat fill per cell, chosen so no two neighbours share a colour at any column count. Written out in full for Tailwind. */
const tones = ["bg-sky", "bg-mint", "bg-surface", "bg-peach", "bg-lilac", "bg-sky", "bg-mint", "bg-surface"] as const;

/** Section 4: what the fractional CMO team covers. Cream band, one slab of eight pastel cells split by ink rules. */
export function Offer({ content }: { content: LandingContent }) {
  const { offer } = content;
  return (
    <Section id="offer" tone="light" labelledBy="offer-heading">
      <div className="max-w-3xl">
        <h2 id="offer-heading" className="headline headline-lg max-w-[22ch]">
          {offer.header}
        </h2>
        <p className="lede mt-5 max-w-[60ch] text-muted-foreground">{offer.subhead}</p>
      </div>
      <ul className="slab slab-grid mt-12 grid-cols-1 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
        {offer.items.map((item, i) => {
          const Icon = icons[item.icon];
          return (
            <li key={item.label} className={`${tones[i % tones.length]} flex min-w-0 flex-col gap-5 p-6`}>
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border-2 border-foreground bg-surface text-foreground"
                aria-hidden="true"
              >
                <Icon size={22} strokeWidth={2} />
              </span>
              <span className="font-bold leading-snug text-foreground break-words">{item.label}</span>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
