import type { Metadata } from "next";
import { faqs } from "@/lib/faqs";
import { PageHeader } from "@/components/layout/page-header";
import { FAQAccordion } from "@/components/faq/faq-accordion";
import { FAQSchema } from "@/components/seo/schema";

export const metadata: Metadata = {
  title: "שאלות נפוצות",
  description: "כל מה שצריך לדעת על השכרת מתנפחים — תהליך הזמנה, איסוף, ביטולים, בטיחות ועוד.",
  alternates: { canonical: "/faq" }
};

export default function FAQPage() {
  return (
    <>
      <FAQSchema faqs={faqs} />
      <PageHeader
        eyebrow="שאלות נפוצות"
        title="התשובות לכל שאלה — לפני שתשאלו."
        description="לא מצאתם פה? כתבו לנו בוואטסאפ ונחזור תוך דקות."
      />
      <section className="container-page pb-20">
        <FAQAccordion items={faqs} />
      </section>
    </>
  );
}
