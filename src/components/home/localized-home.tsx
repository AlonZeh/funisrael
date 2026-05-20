"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, MessageCircle, Sparkles, Star } from "lucide-react";
import { TrustStrip } from "./trust-strip";
import { PackagesSection } from "@/components/packages/packages-section";
import { useLocale, useTranslations } from "@/lib/i18n/hooks";
import { localizePath } from "@/lib/i18n/config";
import { buildWhatsAppLink } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

/**
 * Localized (en/ru) homepage variant.
 * Hebrew homepage uses the original component tree at /.
 */
export function LocalizedHome() {
  const locale = useLocale();
  const t = useTranslations();
  const Arrow = locale === "he" ? ArrowLeft : ArrowRight;

  const heroCopy = {
    en: {
      eyebrow: "Premium inflatable experiences for families",
      title: ["The birthday your kids will remember —", "stress-free."],
      lead:
        "Premium, clean, and styled inflatables. 12-hour rentals, self-pickup from Derech Yavne 52 — confirm a date on WhatsApp and we'll handle the rest.",
      whatsappPrompt: "Hi, I'd love a package recommendation 🎈"
    },
    ru: {
      eyebrow: "Премиум-аренда батутов для семей",
      title: ["День рождения, который запомнят —", "без хлопот."],
      lead:
        "Премиум, чистые и стильные батуты. Аренда 12 часов, самовывоз с Дерех Явне 52 — согласуем дату в WhatsApp, остальное на нас.",
      whatsappPrompt: "Здравствуйте, посоветуйте пакет 🎈"
    },
    he: {
      eyebrow: "חוויות מתנפחים פרימיום למשפחות",
      title: ["יום ההולדת שהילדים יזכרו —", "בלי מאמץ."],
      lead:
        "מתנפחים יוקרתיים, נקיים ומעוצבים. השכרה ל-12 שעות, איסוף עצמי מדרך יבנה 52.",
      whatsappPrompt: "היי, אשמח להמלצה למתנפח 🎈"
    }
  } as const;

  const h = heroCopy[locale];

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-hero-blob" />
        <div className="absolute inset-0 -z-10 bg-cream-50/40" />
        <div className="container-page pt-10 md:pt-20 pb-16 md:pb-24 grid gap-10 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 space-y-7">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="pill text-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-brand-500" />
              {h.eyebrow}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="heading-1 text-balance"
            >
              {h.title[0]}{" "}
              <span className="text-brand-500">{h.title[1]}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="body-lead max-w-xl"
            >
              {h.lead}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Link
                href={localizePath("/packages", locale)}
                className="btn-brand"
              >
                {t.cta.viewAllPackages} <Arrow className="h-4 w-4" />
              </Link>
              <a
                href={buildWhatsAppLink(siteConfig.whatsapp, h.whatsappPrompt)}
                target="_blank"
                rel="noreferrer"
                className="btn-whatsapp"
              >
                <MessageCircle className="h-4 w-4" />
                {t.cta.whatsapp}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2"
            >
              <div className="flex items-center gap-1.5 text-sm text-ink-500">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-sun-400 text-sun-400"
                    />
                  ))}
                </div>
                <span className="font-semibold text-ink-700">4.9</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[4/5] rounded-4xl overflow-hidden shadow-card ring-1 ring-ink-100">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1530878869293-44c79c5f04a8?w=1400&q=80)"
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      <TrustStrip />
      <PackagesSection />
    </>
  );
}
