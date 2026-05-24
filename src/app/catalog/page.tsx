import type { Metadata } from "next";
import { CatalogView } from "@/components/catalog/catalog-view";
import { PageHeader } from "@/components/layout/page-header";
import { TermsReminder } from "@/components/terms/terms-reminder";

export const metadata: Metadata = {
  title: "קטלוג מתנפחים",
  description: "כל המתנפחים של FUN-ISRAEL — מתנפחי מים, פרימיום, פעוטות, אינדור ועוד.",
  alternates: { canonical: "/catalog" }
};

export default function CatalogPage() {
  return (
    <>
      <PageHeader
        eyebrow="קטלוג"
        title="כל המתנפחים שלנו במקום אחד."
        description="פילטר חכם, חיפוש מהיר, כל המידע שאתם צריכים. בחירה בעיניים עצומות."
      />
      <section className="container-page pb-4">
        <TermsReminder variant="card" />
      </section>
      <section className="container-page pb-16">
        <CatalogView />
      </section>
    </>
  );
}
