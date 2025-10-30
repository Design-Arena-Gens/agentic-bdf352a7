import Link from "next/link";
import { navigation, product, brand, offerDetails } from "@/lib/content";

export function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-surface/90 border-b border-white/40">
      <div className="mx-auto flex w-full max-w-[var(--grid-max-width)] items-center justify-between gap-6 px-6 py-4">
        <Link href="#hero" aria-label={`${brand.name} home`} className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary text-lg font-semibold">
            SL
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-wide text-foreground">
              {brand.name}
            </span>
            <span className="text-xs text-muted">{brand.tagline}</span>
          </div>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring text-muted hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href={offerDetails.checkoutUrl}
            className="focus-ring hidden rounded-full border border-primary/30 px-5 py-2 text-sm font-semibold text-primary transition-colors hover:border-primary hover:text-primary-accent md:inline-flex"
          >
            Preview ritual
          </Link>
          <Link
            href={offerDetails.checkoutUrl}
            className="focus-ring rounded-full bg-primary px-6 py-2 text-sm font-semibold text-white shadow-[var(--shadow-soft)] transition hover:bg-primary-accent"
            data-cta="header"
          >
            {product.ctaLabel}
          </Link>
        </div>
      </div>
    </header>
  );
}
