"use client";

import Link from "next/link";
import { CheckCircle2, MessageCircle, Phone, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site";
import { CommunityBanner } from "@/components/marketing/community-banner";

interface Props {
  whatsappHref: string;
  /** Called when the user starts a new request from the success state */
  onStartOver: () => void;
}

export function ReservationSuccess({ whatsappHref, onStartOver }: Props) {
  return (
    <section className="container-page py-14 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-surface p-8 md:p-12 max-w-2xl mx-auto text-center space-y-6"
      >
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-mint-100 text-mint-600">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <div>
          <h1 className="heading-2">בקשת השיריון התקבלה!</h1>
          <p className="body-lead mt-3">
            קיבלנו את הפרטים ונבדוק זמינות לציוד ולתאריך שבחרתם. נחזור אליכם
            בהקדם לאישור סופי ותיאום בוואטסאפ.
          </p>
        </div>

        <div className="rounded-2xl bg-cream-100 p-4 text-sm text-ink-600 leading-relaxed">
          לחיצה על "דברו איתנו בוואטסאפ" תפתח לכם הודעה מוכנה עם סיכום הבקשה.
          שלחו אותה — וצוות FUN-ISRAEL יראה אותה מיד.
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="btn-whatsapp"
          >
            <MessageCircle className="h-4 w-4" />
            דברו איתנו בוואטסאפ
          </a>
          <a href={`tel:${siteConfig.phone}`} className="btn-ghost">
            <Phone className="h-4 w-4" />
            חיוג ישיר
          </a>
        </div>

        <div className="pt-4 border-t border-ink-100 flex flex-wrap justify-center gap-3 text-sm">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-1.5 text-ink-600 hover:text-ink-800"
          >
            <ShoppingBag className="h-4 w-4" />
            המשך לעיין במתנפחים
          </Link>
          <button
            type="button"
            onClick={onStartOver}
            className="text-ink-500 hover:text-brand-600"
          >
            בקשה חדשה
          </button>
        </div>
      </motion.div>

      <div className="max-w-3xl mx-auto mt-6">
        <CommunityBanner variant="inline" />
      </div>
    </section>
  );
}
