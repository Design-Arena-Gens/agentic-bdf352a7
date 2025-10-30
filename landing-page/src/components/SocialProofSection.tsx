import { testimonials } from "@/lib/content";

export function SocialProofSection() {
  return (
    <section id="social-proof" className="bg-background-elevated py-20">
      <div className="mx-auto w-full max-w-[var(--grid-max-width)] px-6">
        <div className="rounded-[var(--radius-lg)] bg-white/85 p-8 shadow-[var(--shadow-soft)] ring-1 ring-primary/10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-muted">
                Loved by night owls now sleeping deep
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-foreground">
                {testimonials.averageRating}★ from {testimonials.totalReviews.toLocaleString()} calm converts
              </h2>
            </div>
            <div className="flex items-center gap-3 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              <span aria-hidden>⭐️⭐️⭐️⭐️⭐️</span>
              60-night risk-free promise
            </div>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {testimonials.highlights.map((testimonial) => (
              <blockquote
                key={testimonial.name}
                className="flex h-full flex-col gap-4 rounded-[var(--radius-md)] bg-background p-6 text-sm text-muted shadow-sm"
              >
                <p className="text-base text-foreground">“{testimonial.quote}”</p>
                <footer className="mt-auto text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                  {testimonial.name} · {testimonial.role}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
