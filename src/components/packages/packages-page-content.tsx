"use client";

import { useTranslations } from "@/lib/i18n/hooks";
import { PageHeader } from "@/components/layout/page-header";
import { PackagesGrid } from "./packages-grid";
import { PackageComparison } from "./package-comparison";
import { PackageAddonsSection } from "./package-addons-section";
import { PackageFAQ } from "./package-faq";
import { PackageCTA } from "./package-cta";
import { CommunityBanner } from "@/components/marketing/community-banner";
import { TermsReminder } from "@/components/terms/terms-reminder";

export function PackagesPageContent() {
  const t = useTranslations();
  return (
    <>
      <PageHeader
        eyebrow={t.packagesPage.eyebrow}
        title={t.packagesPage.title}
        description={t.packagesPage.subtitle}
      />
      <section className="container-page pb-4">
        <TermsReminder variant="card" />
      </section>
      <section className="container-page pb-12">
        <PackagesGrid />
      </section>
      <PackageComparison />
      <PackageAddonsSection />
      <section className="container-page py-10 md:py-14">
        <CommunityBanner />
      </section>
      <PackageFAQ />
      <PackageCTA />
    </>
  );
}
