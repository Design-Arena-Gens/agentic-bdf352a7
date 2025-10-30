import Image from "next/image";
import { CTAButton } from "@/components/CTAButton";
import { hero, product, offerDetails } from "@/lib/content";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-br from-white via-[#f5f6ff] to-[#e5e7ff]"
    >
      <div className="absolute inset-0 -z-10 opacity-70" aria-hidden="true">
        <div className="grain-overlay" />
        <div className="pointer-events-none absolute -right-20 top-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-10 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />
      </div>
      <div className="mx-auto flex w-full max-w-[var(--grid-max-width)] flex-col gap-12 px-6 py-16 md:flex-row md:items-center md:justify-between md:py-24">
        <div className="flex max-w-xl flex-col gap-6">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary shadow-sm">
            Built for {product.targetAudience}
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-foreground md:text-5xl">
            {hero.headline}
          </h1>
          <p className="text-lg text-muted md:text-xl">{hero.subhead}</p>
          <ul className="flex flex-wrap items-center gap-6 text-sm text-muted">
            <li className="flex items-center gap-2">
              <span aria-hidden>🕒</span> 7-minute wind-down ritual
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden>💤</span> Sleep insights synced to your calendar
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden>🛡️</span> {product.guarantee}
            </li>
          </ul>
          <div className="flex flex-wrap gap-4">
            <CTAButton
              href={offerDetails.checkoutUrl}
              label={product.ctaLabel}
              analyticsEvent="cta_primary_click"
            />
            <CTAButton
              href={`${product.url}?utm_source=site&utm_medium=secondary&utm_campaign=${product.utmCampaignSlug}`}
              label="Watch a guided preview"
              variant="secondary"
              analyticsEvent="cta_secondary_click"
            />
          </div>
          <div className="grid gap-4 rounded-[var(--radius-md)] border border-white/60 bg-white/70 p-5 shadow-[var(--shadow-soft)] backdrop-blur">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted">
              Trusted calm
            </p>
            <div className="grid gap-3 md:grid-cols-3 md:gap-4">
              {hero.trustBadges.map((badge) => (
                <div key={badge.label} className="flex flex-col gap-1 text-sm text-muted">
                  <span className="font-semibold text-foreground">{badge.label}</span>
                  <span>{badge.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="relative flex w-full max-w-lg justify-center">
          <div className="relative overflow-hidden rounded-[var(--radius-lg)] bg-[#1a1a2e] p-1 shadow-[var(--shadow-hard)]">
            <div className="rounded-[calc(var(--radius-lg)-0.5rem)] bg-gradient-to-br from-[#2b2d66] via-[#1a1a2e] to-[#4e4efa] p-6">
              <Image
                src="/images/hero_lunawave_2400x1600.png"
                alt="LunaWave Smart Sleep Mask hovering with adaptive light trails"
                width={720}
                height={480}
                className="h-auto w-full drop-shadow-[0_32px_60px_rgba(36,37,89,0.55)]"
                priority
              />
              <div className="mt-6 grid gap-3 rounded-[var(--radius-sm)] bg-white/10 p-4 text-sm text-white/90">
                <div className="flex items-center justify-between">
                  <span>Tonight’s ritual</span>
                  <span className="text-white/70">9m 30s</span>
                </div>
                <div className="flex items-center justify-between text-xs text-white/70">
                  <span>Stress level</span>
                  <span className="flex items-center gap-2 font-semibold text-success">
                    ↘︎ 34% calmer
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/20">
                  <div
                    className="h-full rounded-full bg-secondary"
                    style={{ width: "72%" }}
                    aria-hidden
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
