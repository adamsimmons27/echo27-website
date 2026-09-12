const services = [
  {
    title: "Paid ads",
    copy: "Meta, Google, YouTube and TikTok, managed against what a customer is worth to you, not what a click costs today.",
    points: [
      "Creative testing on a fixed weekly cadence",
      "Bidding tied to margin, not platform ROAS",
      "One owner on the account, start to finish",
    ],
  },
  {
    title: "Web and UX design",
    copy: "Sites and landing pages built around the decision a visitor is making. Clear in five seconds, fast on a phone.",
    points: [
      "Design and build handled in one place",
      "Laid out for conversion, not decoration",
      "Fast on mobile, where the traffic is",
    ],
  },
  {
    title: "Funnel building",
    copy: "The offers and follow-up that convert traffic you already pay for. Most accounts we inherit don't have an ad problem.",
    points: [
      "Landing pages built and tested, not themed",
      "Email and SMS flows that recover lost revenue",
      "Tracking and attribution set up properly, once",
    ],
  },
  {
    title: "Fractional CMO",
    copy: "Senior marketing leadership for a fraction of a full-time hire. Strategy, oversight, and hands-on execution.",
    points: [
      "Direct line to Adam, not an account manager",
      "Agency and freelancer oversight included",
      "Monthly plan tied to one revenue number",
    ],
  },
];

export function Services() {
  return (
    <section id="services" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-[1180px] px-6">
        <div>
          <p className="eyebrow mb-7">What we do</p>
          <h2 className="max-w-[16ch] text-[38px] md:text-[52px] font-extrabold leading-[0.98] tracking-[-0.04em] text-foreground">
            Four ways we drive growth.
          </h2>
        </div>

        <div className="slab mt-14 grid grid-cols-1 gap-[2px] bg-foreground sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div key={s.title} className="flex flex-col bg-surface p-7 md:p-8">
              <h3 className="text-[24px] font-extrabold leading-[1.05] tracking-[-0.03em]">
                {s.title}
              </h3>
              <p className="mt-4 flex-1 text-[15px] text-muted-foreground leading-relaxed">
                {s.copy}
              </p>
              <ul className="mt-7 space-y-3">
                {s.points.map((p) => (
                  <li
                    key={p}
                    className="border-l-2 border-teal pl-3 text-[14px] leading-snug"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
