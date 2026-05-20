"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { SectionHeader } from "./category-grid";

const testimonials = [
  {
    name: "מאי כהן",
    role: "אמא לרז · ראשון לציון",
    text: "המתנפח הגיע נקי ויפהפה — הילדים לא ירדו ממנו 5 שעות. שירות נדיר.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80"
  },
  {
    name: "טל ושחר",
    role: "יום הולדת לתאומות · רעננה",
    text: "ארמון לבן מהאינסטגרם — הצילומים יצאו חלום. כל החברות שאלו מאיפה.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80"
  },
  {
    name: "רון ל.",
    role: "מסיבת סוף שנה · בית ספר",
    text: "ארגנתי לראשונה לבד — תהליך מטורף קל. ההמלצה שלי לכל הורה.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80"
  }
];

export function Testimonials() {
  return (
    <section className="py-16 md:py-20">
      <div className="container-page">
        <SectionHeader
          eyebrow="הורים מספרים"
          title="הקסם בעיניים של ההורים."
          description="כי שביעות הרצון של ההורה היא ההצלחה האמיתית של האירוע."
        />

        <div className="grid gap-5 md:grid-cols-3 mt-10">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card-surface p-6 relative"
            >
              <Quote className="absolute top-4 left-4 h-6 w-6 text-brand-200" />
              <div className="flex mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-sun-400 text-sun-400" />
                ))}
              </div>
              <blockquote className="text-ink-700 leading-relaxed">
                “{t.text}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 pt-4 border-t border-ink-100">
                <span
                  className="h-10 w-10 rounded-full bg-cover bg-center ring-2 ring-white shadow-soft"
                  style={{ backgroundImage: `url(${t.avatar})` }}
                />
                <div>
                  <p className="font-semibold text-ink-800 text-sm">{t.name}</p>
                  <p className="text-xs text-ink-500">{t.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
