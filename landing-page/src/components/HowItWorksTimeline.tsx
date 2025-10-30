import { howItWorksSteps } from "@/lib/content";

export function HowItWorksTimeline() {
  return (
    <section className="bg-background pt-4 pb-20">
      <div className="mx-auto w-full max-w-[var(--grid-max-width)] px-6">
        <div className="rounded-[var(--radius-lg)] bg-white/80 p-8 shadow-[var(--shadow-soft)]">
          <ol className="relative border-l border-primary/20 pl-8">
            {howItWorksSteps.map((step) => (
              <li key={step.step} className="mb-10 ml-6 last:mb-0">
                <span className="absolute -left-[37px] flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white shadow-[var(--shadow-soft)]">
                  {step.step}
                </span>
                <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm text-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
