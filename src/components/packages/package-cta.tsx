"use client";

import { MessageCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { customPackageWhatsAppLink } from "@/lib/packages/whatsapp";
import { useLocale, useTranslations } from "@/lib/i18n/hooks";

export function PackageCTA() {
  const locale = useLocale();
  const t = useTranslations();
  return (
    <section className="py-16 md:py-20">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-4xl bg-ink-800 text-cream-50 p-8 md:p-12 grid gap-6 lg:grid-cols-[1.4fr_1fr] items-center"
        >
          <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-brand-500/25 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-sun-400/20 blur-3xl" />
          <div className="relative space-y-3">
            <span className="pill bg-white/10 text-cream-100 ring-white/10">
              <Sparkles className="h-3.5 w-3.5 text-brand-300" />
              {t.packagesPage.whyTitle}
            </span>
            <h2 className="heading-3 text-white">{t.packagesPage.notSure}</h2>
            <p className="text-cream-200/85 max-w-lg">
              {t.packagesPage.whyParents} {t.packagesPage.whyKids}
            </p>
          </div>
          <div className="relative flex flex-col items-stretch lg:items-end gap-2">
            <a
              href={customPackageWhatsAppLink(locale)}
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp justify-center"
            >
              <MessageCircle className="h-4 w-4" />
              {t.cta.consult}
            </a>
            <p className="text-xs text-cream-200/70 text-center lg:text-right">
              050-933-1313
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
