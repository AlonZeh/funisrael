"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PackageCard } from "./package-card";
import { getActivePackages } from "@/lib/packages/data";
import { useLocale, useTranslations } from "@/lib/i18n/hooks";
import { localizePath } from "@/lib/i18n/config";

/**
 * Homepage "Our Packages" section.
 * Shows up to 3 featured packages — falls back to popular if none featured.
 */
export function PackagesSection() {
  const locale = useLocale();
  const t = useTranslations();
  const all = getActivePackages();
  const featured = all.filter((p) => p.isFeatured).slice(0, 3);
  const list = featured.length > 0 ? featured : all.slice(0, 3);

  const Arrow = locale === "he" ? ArrowLeft : ArrowRight;

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-cream-50 via-white to-cream-50">
      <div className="container-page">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold tracking-widest text-brand-600 uppercase">
              {t.packagesPage.eyebrow}
            </span>
            <h2 className="heading-2 text-balance">{t.packagesPage.title}</h2>
            <p className="body-lead">{t.packagesPage.subtitle}</p>
          </div>
          <Link
            href={localizePath("/packages", locale)}
            className="inline-flex items-center gap-2 text-brand-600 font-semibold hover:gap-3 transition-all"
          >
            {t.cta.viewAllPackages} <Arrow className="h-4 w-4" />
          </Link>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid gap-5 md:grid-cols-3">
          {list.map((p, i) => (
            <PackageCard key={p.id} pkg={p} index={i} />
          ))}
        </div>

        {/* Mobile horizontal swipe */}
        <div className="md:hidden -mx-4 px-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 snap-x snap-mandatory">
            {list.map((p, i) => (
              <div
                key={p.id}
                className="snap-start min-w-[85%] first:pl-0 last:pr-4"
              >
                <PackageCard pkg={p} index={i} compact />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
