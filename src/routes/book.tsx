import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import logo from "@/assets/echo27-logo.png";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a Call — Echo 27" },
      {
        name: "description",
        content:
          "Book a no-pressure call with Echo 27 to see how we'd grow your business.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: BookPage,
});

function BookPage() {
  useEffect(() => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://link.msgsndr.com/js/form_embed.js"]',
    );
    if (!existing) {
      const s = document.createElement("script");
      s.src = "https://link.msgsndr.com/js/form_embed.js";
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b border-border">
        <div className="mx-auto max-w-[1000px] px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Echo 27" className="h-8 w-auto" />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-teal transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <div className="mx-auto max-w-[900px] px-6 py-10 md:py-14">
          <div className="text-center mb-8">
            <p className="eyebrow mb-3">Book a call</p>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Let's get you <span className="text-teal">more customers</span>
            </h1>
            <p className="mt-3 text-muted-foreground">
              Pick a time that works. No pitch deck, no pressure.
            </p>
          </div>
          <div className="bg-surface rounded-2xl shadow-lg overflow-hidden">
            <iframe
              src="https://api.leadconnectorhq.com/widget/form/AnMIIMLKgCUCGdNJagAy"
              style={{ width: "100%", height: "900px", border: "none" }}
              id="inline-AnMIIMLKgCUCGdNJagAy"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Form 0"
              data-height="900"
              data-layout-iframe-id="inline-AnMIIMLKgCUCGdNJagAy"
              data-form-id="AnMIIMLKgCUCGdNJagAy"
              title="Booking form"
            />
          </div>
        </div>
      </main>
    </div>
  );
}