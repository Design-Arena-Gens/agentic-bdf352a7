import { strategySummary } from "@/lib/content";

export function StrategySummary() {
  return (
    <section className="bg-background py-12">
      <div className="mx-auto flex w-full max-w-[var(--grid-max-width)] flex-col gap-4 rounded-[var(--radius-lg)] bg-white/80 px-6 py-8 shadow-[var(--shadow-soft)] ring-1 ring-primary/10">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <h2 className="text-lg font-semibold uppercase tracking-[0.28em] text-muted">
            Conversion strategy snapshot
          </h2>
          <span className="text-xs text-muted">120–160 words</span>
        </div>
        <p className="text-sm leading-relaxed text-muted">{strategySummary}</p>
      </div>
    </section>
  );
}
