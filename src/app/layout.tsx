import type { Metadata, Viewport } from "next";
import { Heebo, Rubik } from "next/font/google";
import { siteConfig } from "@/lib/site";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { StickyMobileCTA } from "@/components/layout/sticky-mobile-cta";
import { FloatingActions } from "@/components/layout/floating-actions";
import { LocaleHtmlSync } from "@/components/layout/locale-html-sync";
import { AccessibilityWidget } from "@/components/a11y/accessibility-widget";
import { CommunityPopup } from "@/components/marketing/community-popup";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"]
});

const rubik = Rubik({
  subsets: ["hebrew", "latin"],
  variable: "--font-rubik",
  display: "swap",
  weight: ["500", "600", "700", "800", "900"]
});

export const viewport: Viewport = {
  themeColor: "#FF5E33",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: [
    "השכרת מתנפחים",
    "מתנפחים לימי הולדת",
    "מתנפחי מים",
    "מתנפח לבן",
    "מתנפחים לילדים",
    "מתנפחים יוקרתיים",
    "מתנפחים לאירועים",
    "מתנפחים לפעוטות",
    "מתנפחים במרכז"
  ],
  authors: [{ name: "FUN-ISRAEL" }],
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: siteConfig.name
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteConfig.url }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} ${rubik.variable}`}>
      <body className="min-h-screen flex flex-col">
        <LocaleHtmlSync />
        <Navbar />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <FloatingActions />
        <StickyMobileCTA />
        <AccessibilityWidget />
        <CommunityPopup />
      </body>
    </html>
  );
}
