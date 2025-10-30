import Link from "next/link";
import { brand, legalLinks, socialHashtags, product } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-background text-sm text-muted" id="footer">
      <div className="mx-auto flex w-full max-w-[var(--grid-max-width)] flex-col gap-10 px-6 py-12">
        <div className="flex flex-col gap-6 md:flex-row md:justify-between">
          <div className="max-w-md space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
              {brand.name}
            </p>
            <p>
              Somnia Labs builds evidence-backed rituals for high-achieving humans who want to rest like it’s fuel for their next big move.
            </p>
            <p className="text-xs text-muted">
              {product.complianceDisclaimer}
            </p>
          </div>
          <div className="grid gap-6 text-sm md:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">Contact</p>
              <ul className="mt-3 space-y-2">
                <li>
                  <a className="focus-ring hover:text-foreground" href={`mailto:${brand.social.supportEmail}`}>
                    {brand.social.supportEmail}
                  </a>
                </li>
                <li>
                  <a className="focus-ring hover:text-foreground" href={`tel:${brand.social.supportPhone}`}>
                    {brand.social.supportPhone}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">Follow</p>
              <ul className="mt-3 space-y-2">
                <li>
                  <a
                    className="focus-ring hover:text-foreground"
                    href={brand.social.instagram}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    className="focus-ring hover:text-foreground"
                    href={brand.social.youtube}
                    target="_blank"
                    rel="noreferrer"
                  >
                    YouTube
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">Hashtags</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {socialHashtags.slice(0, 6).map((tag) => (
                  <span key={tag} className="rounded-full bg-white/80 px-3 py-1 text-xs text-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t border-primary/15 pt-6 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-4 text-xs">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link className="focus-ring hover:text-foreground" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Somnia Labs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
