import { specs } from "@/lib/content";

export function SpecsGrid() {
  return (
    <section className="bg-background py-16" id="how-it-works">
      <div className="mx-auto w-full max-w-[var(--grid-max-width)] px-6">
        <div className="grid gap-12 md:grid-cols-[0.9fr,1.1fr]">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.28em] text-muted">
              How LunaWave fits in
            </span>
            <h2 className="mt-3 text-3xl font-semibold text-foreground">
              Slip it on, press play, wake up to insights that stick
            </h2>
            <p className="mt-4 text-muted">
              Each element is engineered for comfort and calm, so you focus on the ritual rather than the
              hardware.
            </p>
          </div>
          <div className="grid gap-6 rounded-[var(--radius-md)] bg-white/80 p-6 shadow-[var(--shadow-soft)] ring-1 ring-primary/10">
            <dl className="grid gap-4 sm:grid-cols-2">
              {specs.map((spec) => (
                <div key={spec.label}>
                  <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                    {spec.label}
                  </dt>
                  <dd className="mt-2 text-sm text-foreground">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
