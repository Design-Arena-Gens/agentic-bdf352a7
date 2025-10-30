"use client";

import Link from "next/link";
import { trackConversion } from "./AnalyticsScripts";

type CTAButtonProps = {
  href: string;
  label: string;
  variant?: "primary" | "secondary" | "ghost";
  analyticsEvent?: string;
  className?: string;
};

export function CTAButton({
  href,
  label,
  variant = "primary",
  analyticsEvent = "cta_click",
  className = "",
}: CTAButtonProps) {
  const baseStyles =
    "focus-ring inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors";

  const variants: Record<typeof variant, string> = {
    primary:
      "bg-primary text-white shadow-[var(--shadow-soft)] hover:bg-primary-accent",
    secondary:
      "border border-white/70 bg-white/90 text-primary hover:text-primary-accent",
    ghost:
      "border border-primary/40 text-primary hover:border-primary hover:text-primary-accent",
  };

  return (
    <Link
      href={href}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={() => trackConversion(analyticsEvent)}
    >
      {label}
    </Link>
  );
}
