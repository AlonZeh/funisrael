"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle, Puzzle, Sparkles, Star } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-hero-blob" />
      <div className="absolute inset-0 -z-10 bg-cream-50/40" />

      <div className="container-page pt-10 md:pt-20 pb-16 md:pb-24">
        <div className="grid gap-10 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 space-y-7">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="pill text-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-brand-500" />
              מתנפחים, חבילות ותוספות לאירועי ילדים
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="heading-1 text-balance"
            >
              מתנפחים והשכרת ציוד לשמחות —{" "}
              <span className="text-brand-500">בלי לחץ, בלי תשלום באתר.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="body-lead max-w-xl"
            >
              בוחרים מתנפח או חבילה, מוסיפים שדרוגים, בודקים זמינות בוואטסאפ —
              ויוצרים לילדים אירוע שהם לא ישכחו. שירות ברחובות, נס ציונה, יבנה,
              גדרה ובכל אזור השפלה.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="flex flex-wrap items-center gap-3"
            >
              <a
                href={buildWhatsAppLink(
                  siteConfig.whatsapp,
                  "היי, אשמח לבדוק זמינות לאירוע 🎈"
                )}
                target="_blank"
                rel="noreferrer"
                className="btn-whatsapp"
              >
                <MessageCircle className="h-4 w-4" />
                בדיקת זמינות בוואטסאפ
              </a>
              <Link href="/build-package" className="btn-brand">
                <Puzzle className="h-4 w-4" />
                בנו חבילה אישית
              </Link>
              <Link
                href="/catalog"
                className="btn-ghost text-sm"
              >
                לקטלוג המתנפחים <ArrowLeft className="h-4 w-4" />
              </Link>
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
                <span>· מאות משפחות מרוצות</span>
              </div>
              <Stat label="חבילות מומלצות" value="7" />
              <Stat label="מתנפחים בקטלוג" value="8" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] rounded-4xl overflow-hidden shadow-card ring-1 ring-ink-100 bg-white">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1530878869293-44c79c5f04a8?w=1400&q=80)"
                }}
              />
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/60 to-transparent text-white">
                <p className="text-sm/relaxed opacity-90">חבילת הקיץ הכי מבוקשת</p>
                <p className="font-display font-extrabold text-xl">
                  Double Splash · שני מתנפחי מים
                </p>
              </div>
            </div>
            <div className="absolute -top-4 -left-4 animate-float">
              <div className="card-surface px-4 py-3 flex items-center gap-2">
                <div className="h-9 w-9 rounded-full bg-mint-100 grid place-items-center">
                  <Sparkles className="h-4 w-4 text-mint-600" />
                </div>
                <div>
                  <p className="text-[11px] text-ink-400 leading-tight">
                    ניקיון מקיף
                  </p>
                  <p className="text-sm font-semibold text-ink-800 leading-tight">
                    בין כל השכרה
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 animate-float [animation-delay:1s]">
              <div className="card-surface px-4 py-3">
                <p className="text-[11px] text-ink-400">תגובה ממוצעת</p>
                <p className="font-display font-extrabold text-ink-800">
                  ב-7 דקות
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="font-display font-extrabold text-lg text-ink-800">
        {value}
      </span>
      <span className="text-sm text-ink-500">{label}</span>
    </div>
  );
}
