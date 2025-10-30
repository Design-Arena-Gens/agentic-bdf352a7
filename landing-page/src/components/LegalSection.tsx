export function LegalSection() {
  return (
    <section className="bg-background-elevated py-16" id="legal">
      <div className="mx-auto w-full max-w-[var(--grid-max-width)] px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <article id="privacy" className="rounded-[var(--radius-md)] bg-white/80 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground">Privacy</h3>
            <p className="mt-3 text-sm text-muted">
              We collect only the data needed to deliver adaptive rituals and improve LunaWave. Session
              biometrics stay encrypted in transit and at rest, and you can export or delete insights from your
              dashboard anytime.
            </p>
          </article>
          <article id="terms" className="rounded-[var(--radius-md)] bg-white/80 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground">Terms</h3>
            <p className="mt-3 text-sm text-muted">
              By activating LunaWave you agree to our hardware warranty, respectful community rules, and
              responsible usage policy. The mask is not intended to diagnose, treat, or cure any medical
              condition.
            </p>
          </article>
          <article id="cookies" className="rounded-[var(--radius-md)] bg-white/80 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground">Cookie policy</h3>
            <p className="mt-3 text-sm text-muted">
              Essential cookies keep the site secure. Analytics cookies measure campaign performance and can be
              toggled in the banner. Marketing cookies personalize retargeting and only run after explicit
              consent.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
