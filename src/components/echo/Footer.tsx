import logo from "@/assets/echo27-logo.png";

const nav = [
  { href: "#testimonials", label: "Testimonials" },
  { href: "#results", label: "Results" },
  { href: "#services", label: "What we do" },
  { href: "#industries", label: "Industries" },
];

const tools = [
  { href: "/cac-calculator", label: "Cost per customer" },
  { href: "/growth-calculator", label: "Growth projection" },
  { href: "/growth-ceiling", label: "Growth ceiling" },
];

const legal = [
  { href: "/meta-ads", label: "Meta Ads Management" },
  { href: "/privacy", label: "Privacy Policy" },
];

export function Footer() {
  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-[1180px] px-6 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <img src={logo} alt="Echo 27" className="h-8 w-auto" />
            <p className="mt-5 max-w-[34ch] text-[15px] text-muted-foreground leading-snug">
              A performance marketing partner for founders who want predictable
              revenue, not another slide deck.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-[12px] font-bold uppercase tracking-[0.1em]">
              Explore
            </p>
            <nav className="mt-5 flex flex-col gap-2.5">
              {nav.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-[15px] text-muted-foreground hover:text-foreground hover:underline underline-offset-4"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="md:col-span-3">
            <p className="text-[12px] font-bold uppercase tracking-[0.1em]">
              Free tools
            </p>
            <nav className="mt-5 flex flex-col gap-2.5">
              {tools.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-[15px] text-muted-foreground hover:text-foreground hover:underline underline-offset-4"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="md:col-span-2">
            <p className="text-[12px] font-bold uppercase tracking-[0.1em]">
              Legal
            </p>
            <nav className="mt-5 flex flex-col gap-2.5">
              {legal.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-[15px] text-muted-foreground hover:text-foreground hover:underline underline-offset-4"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t-2 border-foreground pt-5 text-[13px] text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Echo 27. All rights reserved.</p>
          <p>Toronto · working globally</p>
        </div>
      </div>
    </footer>
  );
}
