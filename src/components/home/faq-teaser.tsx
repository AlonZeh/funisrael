"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "./category-grid";
import { faqs } from "@/lib/faqs";
import { cn } from "@/lib/utils";

export function HomeFaqTeaser() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-16 md:py-20 bg-white border-y border-ink-100">
      <div className="container-page grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeader
            eyebrow="שאלות נפוצות"
            title="כל מה שרציתם לדעת — בקצרה."
            description="לא מצאתם תשובה? אנחנו תמיד פה בוואטסאפ."
          />
          <Link
            href="/faq"
            className="btn-ghost mt-6 inline-flex"
          >
            לכל השאלות
          </Link>
        </div>
        <div className="space-y-3">
          {faqs.slice(0, 5).map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={cn(
                  "card-surface overflow-hidden transition-all",
                  isOpen && "ring-brand-200"
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-right"
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
      </div>
    </section>
  );
}
