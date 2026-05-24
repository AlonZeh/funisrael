"use client";

import Link from "next/link";
import { ArrowLeft, MessageCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { packageAddons } from "@/lib/packages/addons";
import { buildWhatsAppLink } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import { SectionHeader } from "./category-grid";

/**
 * Home-page upsell showcase for event extras (popcorn, mascots, generator,
 * cooler, photo backdrop). Placed below the primary blocks to capture
 * higher-intent visitors and lift attach rate without crowding the hero.
 */
export function ExtrasShowcase() {
  const list = packageAddons.filter((a) => a.isActive);

  return (
    <section className="py-16 md:py-20 bg-cream-50/70 border-y border-ink-100">
      <div className="container-page">
        <SectionHeader
          eyebrow="תוספות שמעלות אירוע"
          title="השדרוגים שהופכים יום הולדת לחוויה"
          description="פופקורן, בובות ענק, גנרטור, צידנית ורקעי צילום — כל אחד מהם הוא הפרט הקטן שגורם להורים ולילדים לזכור את האירוע. אפשר להוסיף לכל חבילה או לבחור במסגרת בנייה אישית."
          align="center"
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-10">
          {list.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="card-surface overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[5/3] bg-cream-100">
                {a.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={a.image}
                    alt={a.name.he}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <span
                    className="absolute inset-0 grid place-items-center text-5xl"
                    aria-hidden
                  >
                    {a.icon ?? "✨"}
                  </span>
                )}
                <span className="absolute top-3 start-3 rounded-full bg-white/95 backdrop-blur px-2.5 py-1 text-xs font-bold text-ink-700 ring-1 ring-ink-100">
                  {a.priceLabel.he}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col gap-2">
                <h3 className="font-display font-extrabold text-ink-800">
                  {a.name.he}
                </h3>
                <p className="text-sm text-ink-500 leading-relaxed flex-1">
                  {a.description.he}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Link
                    href="/build-package"
                    className="text-xs font-semibold text-brand-600 hover:text-brand-700 inline-flex items-center gap-1"
                  >
                    הוספה לחבילה
                    <ArrowLeft className="h-3.5 w-3.5" />
                  </Link>
                  <a
                    href={buildWhatsAppLink(
                      siteConfig.whatsapp,
                      `שלום, אשמח לפרטים על "${a.name.he}" 🎈`
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-ink-500 hover:text-ink-800 inline-flex items-center gap-1"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    שאלה בוואטסאפ
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl bg-white ring-1 ring-ink-100 p-6 md:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-50 text-brand-600 shrink-0">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display font-extrabold text-ink-800">
                לא בטוחים מה לבחור?
              </p>
              <p className="text-sm text-ink-500 mt-1 max-w-xl">
                בנו חבילה אישית ב-5 שלבים — בוחרים מתנפחים, מוסיפים את התוספות
                שהכי מתאימות לאירוע, ושולחים לבדיקת זמינות בוואטסאפ.
              </p>
            </div>
          </div>
          <Link href="/build-package" className="btn-brand shrink-0">
            לבונה חבילה
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>

        <p className="mt-6 text-center text-xs text-ink-500">
          לפני שימוש בכל מתקן — חובה לעבור על{" "}
          <Link
            href="/terms"
            className="underline underline-offset-2 text-brand-600 hover:text-brand-700"
          >
            תקנון FUN-ISRAEL במלואו
          </Link>
          , כולל נספח הבטיחות ונהלי החירום.
        </p>
      </div>
    </section>
  );
}
