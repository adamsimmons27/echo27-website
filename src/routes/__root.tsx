import { useEffect } from "react";
import { Outlet, Link, createRootRoute, HeadContent, Scripts, useLocation } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { BookingModal } from "@/components/echo/BookingModal";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Echo 27 — Growth Marketing Agency" },
      {
        name: "description",
        content:
          "Echo 27 is a Toronto growth marketing agency running paid ads, SEO and AEO, web and UX design, funnel building, and fractional CMO work for founders who want revenue, not reports.",
      },
      { name: "author", content: "Echo 27" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "theme-color", content: "#1F8F85" },
      { property: "og:site_name", content: "Echo 27" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_CA" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&display=swap",
      },
    ],
    scripts: [
      {
        children: `!function(w,d,s,u){if(w.oaiq)return;var q=function(){q.q.push(arguments)};q.q=[];w.oaiq=q;var j=d.createElement(s);j.async=1;j.src=u;var f=d.getElementsByTagName(s)[0];f.parentNode.insertBefore(j,f)}(window,document,"script","https://bzrcdn.openai.com/sdk/oaiq.min.js");oaiq("init",{pixelId:"WsiWT8rFsJHuK5rLwHZbRn",debug:true});`,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { pathname } = useLocation();

  // Sections rise in as they enter the viewport, with the cells inside each slab following in a stagger.
  // Runs on the client after hydration through the Web Animations API, so server HTML is never hidden and no
  // attribute is changed under React. Anything already on screen when the page loads is left exactly as rendered.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.innerHeight) return;
    const EASE = "cubic-bezier(0.2, 0.7, 0.2, 1)";
    const handled = new WeakSet<Element>();
    const pending = new Map<Element, Animation[]>();

    const prepare = (section: Element) => {
      const anims: Animation[] = [];
      const add = (el: Element, y: number, duration: number, delay: number) => {
        const a = el.animate(
          [
            { opacity: 0, transform: `translateY(${y}px)` },
            { opacity: 1, transform: "none" },
          ],
          { duration, delay, easing: EASE, fill: "both" },
        );
        a.pause();
        anims.push(a);
      };
      add(section, 28, 700, 0);
      section.querySelectorAll(".slab > *, [data-stagger] > *").forEach((cell, i) => add(cell, 18, 550, 120 + Math.min(i, 5) * 70));
      pending.set(section, anims);
    };

    const reveal = (section: Element) => {
      const anims = pending.get(section);
      pending.delete(section);
      io.unobserve(section);
      anims?.forEach((a) => {
        a.onfinish = () => a.cancel();
        a.play();
      });
    };

    // When a section comes into view, everything above it is revealed too, so an anchor jump or a fast
    // scroll never leaves earlier sections blank on the way back up.
    const revealThrough = (target: Element) => {
      const all = Array.from(document.querySelectorAll("main section"));
      const i = all.indexOf(target);
      (i < 0 ? [target] : all.slice(0, i + 1)).forEach((s) => pending.has(s) && reveal(s));
    };
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && revealThrough(e.target)),
      { threshold: 0.06, rootMargin: "0px 0px -6% 0px" },
    );
    // Fallbacks for browsers that deliver intersection updates late: a plain geometry check on scroll and
    // resize, plus a slow timer that does not depend on animation frames, so content can never stay hidden.
    const check = () => {
      if (!pending.size) return;
      const vh = window.innerHeight;
      Array.from(pending.keys()).forEach((s) => {
        const r = s.getBoundingClientRect();
        if (r.top < vh * 0.94 && r.bottom > 0) revealThrough(s);
      });
    };
    let ticking = false;
    const onScroll = () => {
      if (ticking || !pending.size) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        check();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    const safety = window.setInterval(check, 700);

    const scan = () => {
      const vh = window.innerHeight;
      document.querySelectorAll("main section").forEach((s) => {
        if (handled.has(s)) return;
        handled.add(s);
        if (s.getBoundingClientRect().top < vh) return;
        prepare(s);
        io.observe(s);
      });
    };
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      mo.disconnect();
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearInterval(safety);
      pending.forEach((anims) => anims.forEach((a) => a.cancel()));
    };
  }, [pathname]);

  return (
    <>
      <Outlet />
      <BookingModal />
    </>
  );
}
