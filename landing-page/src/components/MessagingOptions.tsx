import { hero } from "@/lib/content";

export function MessagingOptions() {
  return (
    <section className="bg-background py-12">
      <div className="mx-auto flex w-full max-w-[var(--grid-max-width)] flex-wrap gap-10 px-6">
        <div className="flex-1 min-w-[240px]">
          <h2 className="text-lg font-semibold text-muted uppercase tracking-[0.3em]">
            Messaging toolkit
          </h2>
          <p className="mt-3 max-w-md text-muted">
            Rapid-test these variations across paid, email, and on-page hero states to keep the brand
            consistent while optimizing conversion.
          </p>
        </div>
        <div className="grid flex-1 gap-8 md:grid-cols-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">Hero headlines</p>
            <ul className="mt-4 space-y-2 text-sm text-foreground">
              {hero.headlineOptions.map((line) => (
                <li key={line} className="rounded-[var(--radius-sm)] bg-white/70 p-3 shadow-sm ring-1 ring-primary/10">
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">Subheads</p>
            <ul className="mt-4 space-y-2 text-sm text-foreground">
              {hero.subheadOptions.map((line) => (
                <li key={line} className="rounded-[var(--radius-sm)] bg-white/70 p-3 shadow-sm ring-1 ring-primary/10">
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">CTA labels</p>
            <ul className="mt-4 space-y-2 text-sm text-foreground">
              {hero.ctaVariants.map((cta) => (
                <li key={cta} className="rounded-[var(--radius-sm)] bg-white/70 p-3 shadow-sm ring-1 ring-primary/10">
                  {cta}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
