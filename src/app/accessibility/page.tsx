import type { Metadata } from "next";
import { AccessibilityStatementContent } from "@/components/a11y/accessibility-statement";

export const metadata: Metadata = {
  title: "הצהרת נגישות",
  description: "הצהרת הנגישות של FUN-ISRAEL — איך אנחנו דואגים לחוויה נגישה לכל המבקרים.",
  alternates: {
    canonical: "/accessibility",
    languages: { he: "/accessibility", en: "/en/accessibility", ru: "/ru/accessibility" }
  }
};

export default function Page() {
  return <AccessibilityStatementContent />;
}
