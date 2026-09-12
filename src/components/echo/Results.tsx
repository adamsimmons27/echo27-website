const stats = [
  /* PLACEHOLDER: replace with real figure */
  { value: "$50M+", label: "Ad spend managed" },
  /* PLACEHOLDER: replace with real figure */
  { value: "4.3x", label: "Average ROAS" },
  /* PLACEHOLDER: replace with real figure */
  { value: "12+", label: "Years in performance marketing" },
  /* PLACEHOLDER: replace with real figure */
  { value: "23+", label: "Industries served" },
  /* PLACEHOLDER: replace with real figure */
  { value: "90%", label: "Client retention" },
];

export function Results() {
  return (
    <section id="results" className="bg-background pb-20 md:pb-28">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="slab grid grid-cols-2 gap-[2px] bg-foreground sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((s) => (
            <div key={s.label} className="bg-surface p-6 md:p-7">
              <p className="text-[34px] md:text-[40px] font-extrabold tracking-[-0.04em] leading-none text-foreground">
                {s.value}
              </p>
              <p className="mt-2 text-[13px] text-muted-foreground leading-snug">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
