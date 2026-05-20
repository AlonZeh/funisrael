"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, Sparkles } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

export function CTABanner() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-4xl bg-ink-800 text-cream-50 p-8 md:p-14"
        >
          <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-brand-500/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-sun-400/20 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-2 items-center">
            <div className="space-y-4">
              <span className="pill bg-white/10 text-cream-100 ring-white/10">
                <Sparkles className="h-3.5 w-3.5 text-brand-300" />
                זמינות עכשיו לסופי שבוע קרובים
              </span>
              <h2 className="heading-2 text-white text-balance">
                מתחילים לתכנן את האירוע. אנחנו פה כדי שיהיה{" "}
                <span className="text-brand-300">קל ויפה.</span>
              </h2>
              <p className="text-cream-200/80 max-w-xl">
                ספרו לנו על האירוע, גיל הילדים וסגנון — נחזיר המלצה מותאמת אישית
                והצעת מחיר תוך דקות.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
              <a
                href={buildWhatsAppLink(
                  siteConfig.whatsapp,
                  "היי, מתכנן/ת אירוע ורוצה המלצה לאירוע 🎈"
                )}
                target="_blank"
                rel="noreferrer"
                className="btn-whatsapp"
              >
                <MessageCircle className="h-4 w-4" />
                ייעוץ בוואטסאפ
              </a>
              <Link
                href="/catalog"
                className="btn bg-white text-ink-800 px-5 py-3 hover:bg-cream-100"
              >
                לעיון בקטלוג
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
