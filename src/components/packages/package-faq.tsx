"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { packageFaqs } from "@/lib/packages/faqs";
import { pickLocalized, useLocale } from "@/lib/i18n/hooks";
import { cn } from "@/lib/utils";

export function PackageFAQ() {
  const locale = useLocale();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-16 md:py-20">
      <div className="container-page max-w-3xl">
        <div className="space-y-3 mb-8">
          <h2 className="heading-2">
            {locale === "he"
              ? "שאלות נפוצות על החבילות"
              : locale === "ru"
                ? "Вопросы по пакетам"
                : "Package FAQ"}
          </h2>
        </div>
        <div className="grid gap-3">
          {packageFaqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={cn(
                  "card-surface overflow-hidden",
                  isOpen && "ring-brand-200"
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-right ltr:text-left"
                >
                  <span className="font-semibold text-ink-800">
                    {pickLocalized(f.q, locale)}
                  </span>
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
                        {pickLocalized(f.a, locale)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
