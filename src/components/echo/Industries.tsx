const items = [
  {
    name: "SaaS",
    copy: "Acquisition and retention for subscription products, measured on what a customer is worth over time.",
  },
  {
    name: "Consumer finance",
    copy: "Lead generation for lending and fintech, built around compliance and long payback windows.",
  },
  {
    name: "Ecommerce",
    copy: "Ads, offers, and email run against real margins and repeat purchase rates.",
  },
  {
    name: "Local business",
    copy: "Local SEO and paid lead generation for service businesses that need booked jobs.",
  },
];

export function Industries() {
  return (
    <section id="industries" className="bg-background pb-20 md:pb-28">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-7">Industries</p>
            <h2 className="max-w-[14ch] text-[38px] md:text-[52px] font-extrabold leading-[0.98] tracking-[-0.04em] text-foreground">
              Who we work with.
            </h2>
          </div>
          <p className="max-w-[34ch] text-[15px] text-muted-foreground leading-relaxed md:pb-2">
            Twenty-three industries so far. These four are where we've done the
            most volume and know the maths cold.
          </p>
        </div>

        <div className="slab mt-14 grid grid-cols-1 gap-[2px] bg-foreground sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.name} className="bg-surface p-7 md:p-8">
              <h3 className="text-[24px] font-extrabold leading-none tracking-[-0.03em]">
                {item.name}
              </h3>
              <p className="mt-3 text-[14px] text-muted-foreground leading-relaxed">
                {item.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
