import type { Metadata } from "next";
import { Plus_Jakarta_Sans, IBM_Plex_Sans } from "next/font/google";
import { AnalyticsScripts } from "@/components/AnalyticsScripts";
import { CookieBanner } from "@/components/CookieBanner";
import "./globals.css";

const heading = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const body = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://agentic-bdf352a7.vercel.app"),
  title: {
    default: "LunaWave Smart Sleep Mask | Somnia Labs",
    template: "%s | LunaWave Smart Sleep Mask",
  },
  description:
    "Fall asleep faster and wake refreshed with the LunaWave Smart Sleep Mask by Somnia Labs. Personalized light therapy, adaptive soundscapes, and a 60-night risk-free trial.",
  keywords: [
    "sleep mask",
    "smart sleep wearables",
    "Somnia Labs",
    "LunaWave",
    "improve sleep",
    "light therapy",
    "guided sleep",
  ],
  authors: [{ name: "Somnia Labs" }],
  creator: "Somnia Labs",
  publisher: "Somnia Labs",
  alternates: {
    canonical: "https://agentic-bdf352a7.vercel.app",
  },
  openGraph: {
    type: "website",
    url: "https://agentic-bdf352a7.vercel.app",
    title: "LunaWave Smart Sleep Mask | Somnia Labs",
    description:
      "Fall asleep faster and wake refreshed with LunaWave. Personalized light therapy, adaptive soundscapes, and sleep insights built for busy professionals.",
    siteName: "Somnia Labs",
    locale: "en_US",
    images: [
      {
        url: "/images/hero_lunawave_2400x1600.jpg",
        width: 2400,
        height: 1600,
        alt: "LunaWave Smart Sleep Mask gliding over a calm bedroom backdrop",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LunaWave Smart Sleep Mask | Somnia Labs",
    description:
      "Experience deeper rest with adaptive light and sound therapy plus a 60-night risk-free trial.",
    creator: "@SomniaLabs",
    images: ["/images/hero_lunawave_2400x1600.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  category: "Health & Wellness",
  assets: ["/images", "/video", "/thumbnails"],
  other: {
    "preconnect:fonts": "https://fonts.gstatic.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body
        className={`${heading.variable} ${body.variable} antialiased bg-background text-foreground`}
      >
        <AnalyticsScripts />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
