"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Check,
  Clock,
  MessageCircle,
  Sparkles,
  Star,
  Truck,
  Users
} from "lucide-react";
import type { RentalPackage } from "@/lib/packages/types";
import { pickLocalized, useLocale, useTranslations } from "@/lib/i18n/hooks";
import { packageWhatsAppLink } from "@/lib/packages/whatsapp";
import { cn } from "@/lib/utils";
import { AddToReservationButton } from "@/components/reservation/add-to-reservation-button";

const THEME_BG: Record<RentalPackage["colorTheme"], string> = {
  coral: "from-brand-100 via-cream-50 to-brand-50",
  mint: "from-mint-100 via-cream-50 to-mint-50",
  sun: "from-sun-100 via-cream-50 to-brand-50",
  sky: "from-sky-100 via-cream-50 to-sky-50",
  ink: "from-ink-100 via-cream-50 to-cream-100",
  cream: "from-cream-100 via-white to-cream-50"
};

interface Props {
  pkg: RentalPackage;
  index?: number;
  compact?: boolean;
}

export function PackageCard({ pkg, index = 0, compact = false }: Props) {
  const locale = useLocale();
  const t = useTranslations();
  const title = pickLocalized(pkg.title, locale);
  const subtitle = pickLocalized(pkg.subtitle, locale);
  const bestFor = pickLocalized(pkg.bestFor, locale);
  const childMood = pickLocalized(pkg.childMood, locale);
  const includes = pickLocalized(pkg.includes, locale);
  const priceLabel = pickLocalized(pkg.priceLabel, locale);
  const whatsappHref = packageWhatsAppLink(pkg, locale);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.35) }}
      className="card-surface card-hover overflow-hidden flex flex-col h-full"
    >
      {/* Visual */}
      <div
        className={cn(
          "relative aspect-[5/3] overflow-hidden bg-gradient-to-br",
          THEME_BG[pkg.colorTheme]
        )}
      >
        <Image
          src={pkg.image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover mix-blend-multiply opacity-90"
        />
        <div className="absolute top-3 right-3 flex flex-wrap gap-1.5 max-w-[80%]">
          {pkg.isPopular && (
            <span className="badge-popular">
              <Star className="h-3 w-3" />
              {t.common.popular}
            </span>
          )}
          {pkg.tags.includes("premium") && (
            <span className="badge-premium">
              <Sparkles className="h-3 w-3" />
              {t.common.premium}
            </span>
          )}
          {pkg.tags.includes("summer") && (
            <span className="badge-summer">{t.common.summer}</span>
          )}
          {pkg.tags.includes("toddler-safe") && (
            <span className="badge-toddler">{t.common.toddlerSafe}</span>
          )}
          {pkg.tags.includes("best-value") && (
            <span className="badge bg-mint-100 text-mint-700">
              {t.common.bestValue}
            </span>
          )}
          {pkg.tags.includes("luxury") && (
            <span className="badge bg-ink-800 text-cream-100">
              {t.common.luxuryLook}
            </span>
          )}
          {pkg.tags.includes("instagram") && (
            <span className="badge-instagram">Instagram</span>
          )}
          {pkg.tags.includes("custom") && (
            <span className="badge bg-cream-200 text-ink-700">
              {t.common.custom}
            </span>
          )}
        </div>
        {/* Child mood label */}
        <span className="absolute bottom-3 right-3 pill bg-white/90">
          🎈 {childMood}
        </span>
      </div>

      {/* Body */}
      <div className="p-5 md:p-6 flex flex-col flex-1 gap-3">
        <div>
          <h3 className="font-display font-extrabold text-xl text-ink-800 leading-tight">
            {title}
          </h3>
          <p className="text-sm text-ink-500 mt-1">{subtitle}</p>
        </div>

        <div className="flex items-center gap-2 flex-wrap text-xs text-ink-500">
          <span className="inline-flex items-center gap-1">
            <Users className="h-3.5 w-3.5" /> {t.packagesPage.ageBadge} {pkg.recommendedAges}
          </span>
          <span className="text-ink-200">·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {t.packagesPage.durationLabel}
          </span>
          <span className="text-ink-200">·</span>
          <span className="inline-flex items-center gap-1">
            <Truck className="h-3.5 w-3.5" />
            {t.packagesPage.pickupLabel}
          </span>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-widest text-brand-600 font-bold mt-1">
            {t.packagesPage.bestFor}
          </p>
          <p className="text-sm text-ink-700">{bestFor}</p>
        </div>

        {!compact && (
          <div>
            <p className="text-[11px] uppercase tracking-widest text-ink-400 font-bold">
              {t.packagesPage.includes}
            </p>
            <ul className="mt-1.5 space-y-1.5">
              {includes.slice(0, 4).map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-ink-600"
                >
                  <Check className="h-4 w-4 text-mint-500 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-auto pt-3 border-t border-ink-100/70 space-y-2">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] text-ink-400">
                {t.packagesPage.priceFrom}
              </p>
              <p className="font-display font-extrabold text-xl text-ink-800">
                {priceLabel}
              </p>
            </div>
            <AddToReservationButton
              item={{
                key: `package:${pkg.id}`,
                kind: "package",
                id: pkg.id,
                slug: pkg.slug,
                name: pickLocalized(pkg.title, "he"),
                imageUrl: pkg.image,
                unitPrice: pkg.priceFrom,
                priceLabel: pickLocalized(pkg.priceLabel, "he"),
                category: pkg.category,
                tags: pkg.tags,
                suggestedAddonIds: pkg.optionalAddons
              }}
              label="הוספה לשיריון"
              className="text-sm"
            />
          </div>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-ink-500 hover:text-brand-600 inline-flex items-center gap-1 ltr:font-medium"
            aria-label={`${t.cta.checkAvailabilityWA} — ${title}`}
          >
            <MessageCircle className="h-3.5 w-3.5" />
            <span>{t.cta.checkAvailabilityWA}</span>
          </a>
        </div>
      </div>
    </motion.article>
  );
}
