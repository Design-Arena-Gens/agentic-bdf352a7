"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "somnia-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = window.localStorage.getItem(STORAGE_KEY);
    if (!consent) {
      const timer = window.setTimeout(() => setVisible(true), 1200);
      return () => window.clearTimeout(timer);
    }
  }, []);

  const handleConsent = (value: "accepted" | "declined") => {
    window.localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside
      className="fixed bottom-6 left-1/2 z-50 w-[92%] max-w-xl -translate-x-1/2 rounded-[var(--radius-md)] bg-surface p-5 shadow-lg backdrop-blur-md border border-white/60"
      role="dialog"
      aria-live="polite"
    >
      <div className="flex flex-col gap-4 text-sm text-muted">
        <p className="font-medium text-foreground">
          We use cookies to personalize your LunaWave experience, measure campaign
          performance, and remember your preferences. You can change this any time in
          the cookie settings link below.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            className="focus-ring rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-primary-accent"
            onClick={() => handleConsent("accepted")}
          >
            Accept all
          </button>
          <button
            className="focus-ring rounded-full border border-primary/40 px-5 py-2 text-sm font-medium text-foreground/80 transition hover:border-primary hover:text-foreground"
            onClick={() => handleConsent("declined")}
          >
            Decline non-essential
          </button>
          <a
            className="focus-ring px-3 py-2 text-sm underline underline-offset-4"
            href="#cookies"
          >
            Cookie settings
          </a>
        </div>
      </div>
    </aside>
  );
}
