import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { TrustStrip } from "@/components/home/trust-strip";
import { CategoryGrid } from "@/components/home/category-grid";
import { FeaturedProducts } from "@/components/home/featured";
import { HowItWorks } from "@/components/home/how-it-works";
import { Testimonials } from "@/components/home/testimonials";
import { CTABanner } from "@/components/home/cta-banner";
import { HomeFaqTeaser } from "@/components/home/faq-teaser";
import { OrganizationSchema } from "@/components/seo/schema";
import { PackagesSection } from "@/components/packages/packages-section";
import { LocalSEOBlock } from "@/components/home/local-seo";
import { BlogTeaser } from "@/components/home/blog-teaser";
import { CommunityBanner } from "@/components/marketing/community-banner";
import { ExtrasShowcase } from "@/components/home/extras-showcase";

export const metadata: Metadata = {
  title:
    "השכרת מתנפחים ברחובות | FUN-ISRAEL — מתנפחים פרימיום לימי הולדת",
  description:
    "השכרת מתנפחים פרימיום ברחובות והשפלה. חבילות יום הולדת, מתנפחי מים, פעוטות, פרימיום ולבן. השכרה ל-12 שעות, איסוף עצמי, אישור מהיר בוואטסאפ.",
  keywords: [
    "השכרת מתנפחים ברחובות",
    "מתנפחים ברחובות",
    "מתנפחים לימי הולדת ברחובות",
    "השכרת מתנפחים לילדים ברחובות",
    "מתנפחי מים להשכרה ברחובות",
    "חבילת יום הולדת ברחובות",
    "מתנפחים בנס ציונה",
    "השכרת מתנפחים ביבנה",
    "מתנפחים בגדרה",
    "מתנפחים בשפלה"
  ],
  alternates: { canonical: "/" }
};

export default function HomePage() {
  return (
    <>
      <OrganizationSchema />
      <Hero />
      <TrustStrip />
      <LocalSEOBlock />
      <CategoryGrid />
      <PackagesSection />
      <FeaturedProducts />
      <section className="container-page py-10 md:py-14">
        <CommunityBanner />
      </section>
      <BlogTeaser />
      <HowItWorks />
      <ExtrasShowcase />
      <Testimonials />
      <HomeFaqTeaser />
      <CTABanner />
    </>
  );
}
