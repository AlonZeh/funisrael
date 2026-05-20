"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useReservationStore } from "@/store/reservation-store";

/**
 * Header cart icon with a badge showing the current item count.
 * Renders only after hydration to avoid SSR/CSR mismatch.
 */
export function CartNavIcon({ className }: { className?: string }) {
  const items = useReservationStore((s) => s.items);
  const hydrated = useReservationStore((s) => s.hydrated);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const count = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <Link
      href="/cart"
      aria-label={`עגלת שיריון${count > 0 ? ` — ${count} פריטים` : ""}`}
      className={
        "relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-soft ring-1 ring-ink-100 hover:bg-cream-100 transition " +
        (className ?? "")
      }
    >
      <ShoppingBag className="h-4 w-4 text-ink-700" />
      <AnimatePresence>
        {mounted && hydrated && count > 0 && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="absolute -top-1 -end-1 grid h-5 min-w-5 px-1 place-items-center rounded-full bg-brand-500 text-white text-[11px] font-bold shadow-soft"
            aria-hidden
          >
            {count > 99 ? "99+" : count}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
}
