import { CTAButton } from "@/components/CTAButton";
import { product, offerDetails } from "@/lib/content";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-primary to-secondary py-16">
      <div className="absolute inset-0 opacity-30" aria-hidden>
        <div className="grain-overlay" />
      </div>
      <div className="relative mx-auto flex w-full max-w-[var(--grid-max-width)] flex-col items-center gap-6 px-6 text-center text-white">
        <span className="text-xs font-semibold uppercase tracking-[0.4em] text-white/80">
          It’s your turn to sleep deep
        </span>
        <h2 className="text-3xl font-semibold md:text-4xl">
          Ready for the night where your mind finally powers down?
        </h2>
        <p className="max-w-2xl text-sm md:text-base text-white/85">
          Slide into LunaWave tonight and wake up to insights that energize tomorrow. You’re covered by a
          60-night guarantee—no risk, just deep rest.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <CTAButton
            href={offerDetails.checkoutUrl}
            label={product.ctaLabel}
            analyticsEvent="cta_final_click"
          />
          <CTAButton
            href={`${product.url}?utm_source=site&utm_medium=secondary&utm_campaign=${product.utmCampaignSlug}`}
            label="Download the product deck"
            variant="secondary"
            analyticsEvent="cta_deck_click"
          />
        </div>
      </div>
    </section>
  );
}
