import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { TOOLS } from "@/components/echo/calc/CalcKit";

export function FreeTools() {
  return (
    <section id="tools" className="border-y-2 border-foreground bg-sky py-20 md:py-28">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="eyebrow mb-7">Free tools</p>
            <h2 className="max-w-[16ch] text-[38px] md:text-[52px] font-extrabold leading-[0.98] tracking-[-0.04em] text-foreground">
              Run your own numbers before you talk to anyone.
            </h2>
          </div>
          <p className="max-w-[40ch] text-[15px] md:text-base text-muted-foreground leading-relaxed md:pb-2">
            The same models we use on client accounts. No sign-up, no email
            gate. If a number surprises you, that's the conversation to have.
          </p>
        </div>

        <div className="slab mt-12 grid grid-cols-1 gap-[2px] bg-foreground md:grid-cols-3">
          {TOOLS.map((t) => (
            <div
              key={t.to}
              className="card-flip group relative flex flex-col bg-surface p-7 md:p-8"
            >
              <p className="text-[22px] font-extrabold tracking-[-0.02em]">{t.name}</p>
              <p className="mt-3 flex-1 text-[15px] text-muted-foreground leading-relaxed">
                {t.blurb}
              </p>
              {/* The link's ::after stretches over the card so the whole thing is the link. The button look sits on an
                  inner span: a pressed (transformed) link would become the containing block for that overlay and shrink it. */}
              <Link to={t.to} className="mt-7 block rounded-[12px] after:absolute after:inset-0 after:content-[''] focus-visible:outline-[3px] focus-visible:outline-offset-[6px] focus-visible:outline-foreground">
                <span className="btn-primary btn-press w-full">
                  Open calculator
                  <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
