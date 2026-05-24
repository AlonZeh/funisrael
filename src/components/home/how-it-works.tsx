"use client";

import { motion } from "framer-motion";
import { Calendar, MessageCircle, PackageCheck, Puzzle } from "lucide-react";
import { SectionHeader } from "./category-grid";

const steps = [
  {
    icon: <PackageCheck className="h-6 w-6" />,
    title: "בוחרים מתקן או חבילה",
    description:
      "גולשים בקטלוג או בחבילות המומלצות, ומסמנים את מה שמתאים לאירוע."
  },
  {
    icon: <Puzzle className="h-6 w-6" />,
    title: "מוסיפים שדרוגים",
    description:
      "פופקורן, בובות ענק, גנרטור, צידנית, רקע לצילומים — מה שהופך את האירוע לחוויה."
  },
  {
    icon: <Calendar className="h-6 w-6" />,
    title: "בוחרים תאריך רצוי",
    description:
      "מסמנים תאריך מועדף לבדיקת זמינות. בלי תשלום באתר, בלי התחייבות."
  },
  {
    icon: <MessageCircle className="h-6 w-6" />,
    title: "שולחים לוואטסאפ",
    description:
      "אנחנו מאשרים זמינות, סוגרים פרטים אחרונים ומתאמים תיאום בוואטסאפ."
  }
];

export function HowItWorks() {
  return (
    <section className="py-16 md:py-20 bg-white border-y border-ink-100">
      <div className="container-page">
        <SectionHeader
          eyebrow="איך זה עובד"
          title="הזמנה פשוטה. אירוע בלי דאגות."
          description="כל התהליך מתוכנן כך שתשקיעו את האנרגיה שלכם באירוע — לא בלוגיסטיקה."
          align="center"
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-12">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card-surface p-6 relative"
            >
              <div className="absolute -top-3 -right-3 grid h-9 w-9 place-items-center rounded-full bg-ink-800 text-cream-50 text-sm font-bold">
                {i + 1}
              </div>
              <div className="h-12 w-12 rounded-2xl bg-brand-50 text-brand-600 grid place-items-center">
                {s.icon}
              </div>
              <h3 className="font-display font-extrabold text-lg text-ink-800 mt-4">
                {s.title}
              </h3>
              <p className="text-sm text-ink-500 mt-2">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
