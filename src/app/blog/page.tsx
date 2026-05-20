import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { BlogIndexView } from "@/components/blog/blog-index-view";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "מדריכים להורים | FUN-ISRAEL",
  description:
    "מדריכים פרקטיים להורים שמתכננים יום הולדת לילדים — מתנפחים, חבילות, בטיחות, מים, וטיפים אזוריים לרחובות והסביבה.",
  keywords: [
    "מדריכים להורים",
    "יום הולדת",
    "מתנפחים",
    "השכרת מתנפחים ברחובות",
    "חבילת יום הולדת",
    "מתנפחי מים"
  ],
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: `${siteConfig.url}/blog`,
    title: "מדריכים להורים | FUN-ISRAEL",
    description:
      "מדריכים פרקטיים להורים שמתכננים יום הולדת — מתנפחים, חבילות, בטיחות, ומים. ברחובות והסביבה."
  }
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="מרכז המדריכים"
        title="ברוכים הבאים למרכז המדריכים של FUN-ISRAEL"
        description="מדריכים פרקטיים להורים שמתכננים ימי הולדת, אירועי ילדים, מסיבות גן ושמחות משפחתיות ברחובות והסביבה. המטרה פשוטה: לעזור לכם לבחור מתנפח, ציוד או חבילה שמתאימים לגיל הילדים, למקום האירוע ולתקציב, בלי לחץ ובלי ניחושים."
      />
      <section className="container-page pb-20">
        <BlogIndexView />
      </section>
    </>
  );
}
