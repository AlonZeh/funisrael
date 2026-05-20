"use client";

import { Check, MessageCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { communityPopupConfig } from "@/lib/community-config";
import { cn } from "@/lib/utils";

interface Props {
  /**
   * Visual variant.
   *  - "hero"   : large section banner (homepage, packages page, blog index).
   *  - "compact": small card for sidebars (cart summary, article sidebar).
   *  - "inline" : medium-width call-out (success states, in-flow promos).
   */
  variant?: "hero" | "compact" | "inline";
  /** Override heading (defaults to brand copy) */
  title?: string;
  /** Override subhead */
  description?: string;
  /** Override CTA label */
  ctaLabel?: string;
  /** Override the WhatsApp join link */
  href?: string;
  /** Show the benefit bullet list (default: true on hero, false on others) */
  showBenefits?: boolean;
  /** Show launch coupon (default: matches config.showLaunchCoupon) */
  showCoupon?: boolean;
  className?: string;
}

const BENEFITS = [
  "עדכוני זמינות לפני כולם",
  "חבילות חדשות ומתנפחים עונתיים",
  "רעיונות לימי הולדת לפי גיל הילדים",
  "הטבות ומבצעי השקה לחברי הקהילה"
];

/**
 * Static, in-page community CTA. Designed to live inside the page flow
 * without disrupting layout. Pairs with the floating popup but stays visible
 * even after a user dismisses the popup for the current view.
 */
export function CommunityBanner({
  variant = "hero",
  title = "ההורים החכמים כבר בקהילת FUN-ISRAEL 🎈",
  description = "עדכוני זמינות, חבילות השקה ורעיונות לימי הולדת — ישירות לוואטסאפ.",
  ctaLabel = "הצטרפות לקהילה בוואטסאפ",
  href = communityPopupConfig.communityWhatsAppLink,
  showBenefits,
  showCoupon,
  className
}: Props) {
  const showBenefitsList = showBenefits ?? variant === "hero";
  const showCouponBox =
    (showCoupon ?? communityPopupConfig.showLaunchCoupon) &&
    variant !== "compact";

  if (variant === "compact") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={cn(
          "group block rounded-3xl bg-gradient-to-br from-brand-50 via-cream-50 to-mint-50 ring-1 ring-brand-100 p-4 hover:shadow-soft transition",
          className
        )}
      >
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-whatsapp text-white shadow-glow shrink-0">
            <MessageCircle className="h-5 w-5" />
          </span>
          <div className="flex-1 min-w-0">
            <p className="font-display font-extrabold text-ink-800 text-sm leading-tight">
              קהילת FUN-ISRAEL
            </p>
            <p className="text-xs text-ink-600 mt-0.5 line-clamp-2">
              עדכוני זמינות וחבילות בוואטסאפ.
            </p>
          </div>
        </div>
        <span className="mt-3 inline-flex items-center justify-center gap-1.5 w-full rounded-2xl bg-whatsapp text-white text-sm font-semibold py-2 group-hover:bg-whatsapp-dark transition">
          <MessageCircle className="h-4 w-4" />
          הצטרפות לקהילה
        </span>
      </a>
    );
  }

  if (variant === "inline") {
    return (
      <div
        className={cn(
          "rounded-3xl bg-gradient-to-br from-brand-50 via-cream-50 to-mint-50 ring-1 ring-brand-100 p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4",
          className
        )}
      >
        <div className="flex items-start gap-3 flex-1">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-whatsapp text-white shadow-glow shrink-0">
            <MessageCircle className="h-5 w-5" />
          </span>
          <div>
            <p className="font-display font-extrabold text-ink-800 text-base md:text-lg leading-tight">
              {title}
            </p>
            <p className="text-sm text-ink-600 mt-1 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="btn-whatsapp whitespace-nowrap shrink-0"
        >
          <MessageCircle className="h-4 w-4" />
          {ctaLabel}
        </a>
      </div>
    );
  }

  // hero variant — section-sized, eye-catching
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "relative overflow-hidden rounded-4xl ring-2 ring-brand-200 shadow-card",
        className
      )}
    >
      {/* Background pattern + glow */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-brand-100 via-cream-100 to-mint-100"
        aria-hidden
      />
      <div
        className="absolute -top-24 -end-24 h-72 w-72 rounded-full bg-brand-300/40 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute -bottom-24 -start-24 h-72 w-72 rounded-full bg-mint-300/40 blur-3xl"
        aria-hidden
      />

      {/* Pulse strip */}
      <div className="relative h-1.5 bg-gradient-to-r from-brand-500 via-sun-400 to-mint-500">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-y-0 w-1/3 bg-white/40 blur-sm"
          aria-hidden
        />
      </div>

      <div className="relative p-6 md:p-10 grid gap-6 md:grid-cols-[1.4fr_1fr] items-center">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-whatsapp text-white shadow-glow">
              <MessageCircle className="h-6 w-6" />
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-bold tracking-wide text-ink-700 ring-1 ring-ink-100 shadow-soft">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
              </span>
              FUN-ISRAEL Community
            </span>
          </div>

          <h2 className="font-display font-black text-2xl md:text-3xl lg:text-4xl text-ink-800 leading-tight text-balance">
            {title}
          </h2>
          <p className="text-ink-700 leading-relaxed md:text-lg max-w-xl">
            {description}
          </p>

          {showBenefitsList && (
            <ul className="grid gap-1.5 sm:grid-cols-2 max-w-2xl">
              {BENEFITS.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2 text-sm text-ink-700"
                >
                  <Check className="h-4 w-4 text-mint-600 mt-0.5 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}

          {showCouponBox && (
            <div className="inline-flex items-center gap-3 rounded-2xl bg-white/80 ring-2 ring-brand-200 px-4 py-2.5 shadow-soft">
              <Sparkles className="h-4 w-4 text-brand-500" />
              <span className="text-sm text-ink-700">
                קוד השקה לחברי הקהילה:
              </span>
              <span className="font-display font-black text-brand-600 tracking-[0.2em] ltr">
                {communityPopupConfig.couponCode}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 md:items-end">
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="btn-whatsapp w-full md:w-auto py-3.5 text-base font-bold shadow-glow"
          >
            <MessageCircle className="h-5 w-5" />
            {ctaLabel}
          </a>
          <p className="text-xs text-ink-500 text-center md:text-end max-w-xs">
            בלי ספאם. רק עדכונים שווים להורים שמתכננים אירוע.
          </p>
        </div>
      </div>
    </motion.section>
  );
}
