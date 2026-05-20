"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function ProductGallery({
  images,
  name
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-3">
      <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-cream-100 shadow-soft">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={images[active]}
              alt={`${name} ${active + 1}`}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority={active === 0}
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "relative aspect-square rounded-2xl overflow-hidden ring-2 transition",
                active === i
                  ? "ring-brand-500"
                  : "ring-transparent hover:ring-ink-200"
              )}
            >
              <Image
                src={src}
                alt={`${name} thumbnail ${i + 1}`}
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
