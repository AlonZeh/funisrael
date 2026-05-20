"use client";

import { useState } from "react";
import { Check, Plus, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useReservationStore } from "@/store/reservation-store";
import type { ReservationItem } from "@/lib/reservation/types";
import { cn } from "@/lib/utils";
import { AddToReservationDrawer } from "./add-to-reservation-drawer";

interface Props {
  /** The item to add — same shape as cart, minus quantity. */
  item: Omit<ReservationItem, "quantity">;
  /** Visual variant */
  variant?: "primary" | "brand" | "ghost" | "icon";
  /** Optional label override */
  label?: string;
  /** Show the drawer after adding (default: true) */
  showDrawer?: boolean;
  className?: string;
}

/**
 * Universal "Add to reservation" button. Works for products, packages and addons.
 *
 * On click: adds the item to the reservation store, shows a quick confirmation,
 * and (by default) opens a drawer with recommended add-ons.
 */
export function AddToReservationButton({
  item,
  variant = "brand",
  label = "הוספה לשיריון",
  showDrawer = true,
  className
}: Props) {
  const addItem = useReservationStore((s) => s.addItem);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  function handleClick() {
    addItem({ ...item, quantity: 1 });
    setJustAdded(true);
    if (showDrawer) {
      // Tiny delay so the user sees the click feedback before the drawer opens
      setTimeout(() => setDrawerOpen(true), 80);
    }
    setTimeout(() => setJustAdded(false), 1800);
  }

  const variantClass =
    variant === "primary"
      ? "btn-primary"
      : variant === "brand"
        ? "btn-brand"
        : variant === "ghost"
          ? "btn-ghost"
          : "inline-flex items-center justify-center h-10 w-10 rounded-full bg-brand-500 text-white shadow-glow hover:bg-brand-600 transition";

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={cn(variantClass, className)}
        aria-label={label}
      >
        <AnimatePresence mode="wait" initial={false}>
          {justAdded ? (
            <motion.span
              key="added"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="inline-flex items-center gap-1.5"
            >
              <Check className="h-4 w-4" />
              {variant !== "icon" && <span>נוסף!</span>}
            </motion.span>
          ) : (
            <motion.span
              key="idle"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="inline-flex items-center gap-1.5"
            >
              {variant === "icon" ? (
                <Plus className="h-4 w-4" />
              ) : (
                <ShoppingBag className="h-4 w-4" />
              )}
              {variant !== "icon" && <span>{label}</span>}
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {showDrawer && (
        <AddToReservationDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          addedItem={item}
        />
      )}
    </>
  );
}
