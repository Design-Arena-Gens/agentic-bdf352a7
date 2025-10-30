import { CTAButton } from "@/components/CTAButton";
import { offerDetails, product } from "@/lib/content";

export function OfferSection() {
  return (
    <section className="bg-background py-20" id="offer">
      <div className="mx-auto w-full max-w-[var(--grid-max-width)] px-6">
        <div className="grid gap-10 rounded-[var(--radius-lg)] bg-gradient-to-br from-[#1a1a2e] via-[#23245a] to-[#4e4efa] p-8 text-white shadow-[var(--shadow-hard)] md:grid-cols-[1fr,0.8fr] md:gap-12">
          <div className="space-y-4">
            <span className="text-sm font-semibold uppercase tracking-[0.28em] text-white/70">
              Exclusive launch offer
            </span>
            <h2 className="text-3xl font-semibold md:text-4xl">
              {product.price} · {product.offer}
            </h2>
            <p className="text-white/80">
              Split the investment over four interest-free payments at checkout. Change your mind within 60
              nights and we’ll cover the return shipping.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-white/85">
              {offerDetails.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3">
                  <span aria-hidden className="mt-1 text-secondary">
                    ●
                  </span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6 rounded-[var(--radius-md)] bg-white/10 p-6 backdrop-blur">
            <div className="flex items-center justify-between text-white/80">
              <span className="text-sm font-semibold uppercase tracking-[0.2em]">Today’s checkout</span>
              <span className="text-lg font-semibold">{product.price}</span>
            </div>
            <div className="rounded-[var(--radius-sm)] bg-black/20 p-4 text-sm text-white/80">
              <p className="font-semibold">Bonus:</p>
              <p>Download the guided nap library (usually $49) instantly after purchase.</p>
            </div>
            <CTAButton
              href={offerDetails.checkoutUrl}
              label={product.ctaLabel}
              analyticsEvent="cta_offer_click"
              className="w-full justify-center"
            />
            <CTAButton
              href={`${product.url}?utm_source=site&utm_medium=checkout-info&utm_campaign=${product.utmCampaignSlug}`}
              label="Chat with a sleep guide"
              variant="ghost"
              analyticsEvent="cta_chat_click"
              className="w-full justify-center border-white/40 text-white/90 hover:border-white hover:text-white"
            />
            <p className="text-xs text-white/70">
              {product.complianceDisclaimer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
