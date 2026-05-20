"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { FAQ } from "@/lib/faqs";

export function FAQAccordion({ items }: { items: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="grid gap-3 max-w-3xl mx-auto">
      {items.map((f, i) => {
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
  );
}
