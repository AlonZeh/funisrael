"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { reservationFaqs } from "@/lib/reservation/faqs";
import { cn } from "@/lib/utils";

export function ReservationFAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="space-y-5 max-w-3xl mx-auto">
      <header className="text-center">
        <span className="inline-flex items-center gap-1.5 pill text-xs">
          <HelpCircle className="h-3.5 w-3.5 text-brand-500" />
          שאלות לפני שאתם שולחים
        </span>
        <h2 className="heading-3 mt-3">איך עובד תהליך השיריון?</h2>
        <p className="text-ink-500 mt-2 max-w-xl mx-auto">
          התשובות הקצרות לשאלות הכי נפוצות על שיריון, תשלום, ביטולים והובלה.
          לכל שאר השאלות — כתבו לנו בוואטסאפ.
        </p>
      </header>
      <div className="grid gap-3">
        {reservationFaqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div
              key={f.q}
              className={cn(
                "card-surface overflow-hidden transition",
                isOpen && "ring-brand-200"
              )}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-right"
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-ink-800">{f.q}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-ink-400 transition-transform",
                    isOpen && "rotate-180 text-brand-500"
                  )}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 text-ink-600 leading-relaxed">
                      {f.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
