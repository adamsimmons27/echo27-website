import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/echo27-logo.png";
import { openBookingModal } from "./BookingModal";

const links = [
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/#results", label: "Results" },
  { href: "/#services", label: "What we do" },
  { href: "/#industries", label: "Industries" },
  { href: "/#tools", label: "Free tools" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 bg-background ${
        scrolled ? "border-b-2 border-foreground" : ""
      }`}
    >
      <div className="mx-auto max-w-[1180px] px-6 h-[68px] flex items-center justify-between gap-8">
        <a href="#top" className="flex items-center shrink-0">
          <img src={logo} alt="Echo 27" className="h-7 w-auto" />
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link text-sm font-medium text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <button
            type="button"
            onClick={openBookingModal}
            className="btn-ghost text-sm px-4 py-2"
          >
            Apply to partner
          </button>
        </div>

        <button
          className="lg:hidden -mr-2 p-2 text-foreground"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" strokeWidth={2.25} />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/30"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[300px] bg-background border-l-2 border-foreground p-6 flex flex-col">
            <div className="flex items-center justify-between">
              <img src={logo} alt="Echo 27" className="h-7 w-auto" />
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <X className="h-6 w-6" strokeWidth={2.25} />
              </button>
            </div>
            <nav className="mt-10 flex flex-col">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="border-t-2 border-foreground py-4 text-lg font-bold text-foreground"
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openBookingModal();
              }}
              className="mt-auto btn-primary w-full"
            >
              Apply to partner
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
