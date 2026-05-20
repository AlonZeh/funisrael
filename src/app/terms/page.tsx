import type { Metadata } from "next";
import { TermsPageContent } from "@/components/terms/terms-page-content";
import { FAQSchema } from "@/components/seo/schema";
import { BreadcrumbSchema } from "@/components/seo/article-schema";
import { termsFaqs } from "@/lib/terms-content";

export const metadata: Metadata = {
  title: "תקנון ותנאי השכרת ציוד | FUN-ISRAEL",
  description:
    "קראו את תקנון FUN-ISRAEL להשכרת מתנפחים וציוד לאירועים, כולל אחריות השוכר, בטיחות, תשלום, איסוף עצמי, ביטולים ותנאי שימוש.",
  keywords: [
    "תקנון FUN-ISRAEL",
    "תנאי השכרת מתנפחים",
    "אחריות השוכר",
    "השכרת ציוד לאירועים",
    "ביטולים",
    "בטיחות מתנפחים"
  ],
  alternates: { canonical: "/terms" },
  openGraph: {
    type: "website",
    locale: "he_IL",
    title: "תקנון ותנאי השכרת ציוד | FUN-ISRAEL",
    description:
      "תקנון מלא להשכרת מתנפחים וציוד מ-FUN-ISRAEL — אחריות, בטיחות, תשלום, איסוף, ביטולים ותנאי שימוש."
  }
};

export default function TermsPage() {
  return (
    <>
      <FAQSchema faqs={termsFaqs.map((f) => ({ q: f.q, a: f.a }))} />
      <BreadcrumbSchema
        items={[
          { label: "בית", url: "/" },
          { label: "תקנון", url: "/terms" }
        ]}
      />
      <TermsPageContent />
    </>
  );
}
