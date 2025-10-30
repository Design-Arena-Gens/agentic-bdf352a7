import { benefits } from "@/lib/content";

export function BenefitsSection() {
  return (
    <section id="benefits" className="bg-background-elevated py-20">
      <div className="mx-auto w-full max-w-[var(--grid-max-width)] px-6">
        <div className="mx-auto max-w-[var(--content-max-width)] text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.28em] text-muted">
            Why LunaWave works
          </span>
          <h2 className="mt-4 text-3xl font-semibold text-foreground md:text-4xl">
            Every detail accelerates calm and keeps it effortless
          </h2>
          <p className="mt-4 text-lg text-muted">
            Designed with sleep scientists, therapists, and 1,200 beta testers to build a ritual you
            actually stick with.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="group flex h-full flex-col gap-4 rounded-[var(--radius-md)] bg-white/80 p-6 shadow-[var(--shadow-soft)] ring-1 ring-primary/5 transition hover:-translate-y-1 hover:shadow-[var(--shadow-hard)]"
            >
              <span className="text-3xl" aria-hidden>
                {benefit.icon}
              </span>
              <h3 className="text-xl font-semibold text-foreground">{benefit.title}</h3>
              <p className="text-sm text-muted">{benefit.copy}</p>
              <span className="mt-auto text-xs font-medium uppercase tracking-[0.3em] text-primary/70">
                Built for momentum
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
