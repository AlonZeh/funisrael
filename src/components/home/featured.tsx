"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProductsProvider } from "@/components/products/products-provider";
import { SectionHeader } from "./category-grid";

export function FeaturedProducts() {
  return (
    <section className="py-16 md:py-20">
      <div className="container-page">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <SectionHeader
            eyebrow="המתנפחים שלנו"
            title="הקטלוג שכבר חטפו בשבת."
            description="פריטים נבחרים מהקטלוג. כל מתנפח עובר ניקיון מקיף ובדיקת בטיחות לפני כל השכרה."
          />
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 text-brand-600 font-semibold hover:gap-3 transition-all"
          >
            לכל הקטלוג <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10">
          <ProductsProvider limit={6} />
        </div>
      </div>
    </section>
  );
}
