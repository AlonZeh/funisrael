"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { categories } from "@/lib/categories";
import { cn } from "@/lib/utils";

export function CategoryGrid() {
  return (
    <section className="py-16 md:py-20">
      <div className="container-page">
        <SectionHeader
          eyebrow="קטגוריות"
          title="בוחרים את הסגנון של האירוע"
          description="כל קטגוריה — חוויה אחרת. מהאסתטיקה הלבנה של אינסטגרם ועד פארקי מים אקסטרים."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-10">
          {categories.slice(0, 4).map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={`/categories/${cat.slug}`}
                className={cn(
                  "group block h-full rounded-3xl p-6 ring-1 ring-ink-100 shadow-soft hover:shadow-hover transition-all hover:-translate-y-1 bg-gradient-to-br",
                  cat.gradient
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="text-5xl">{cat.emoji}</div>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-ink-700 group-hover:bg-white transition">
                    <ArrowLeft className="h-4 w-4" />
                  </span>
                </div>
                <div className="mt-8">
                  <p className="text-xs font-medium text-ink-500">
                    {cat.tagline}
                  </p>
                  <h3 className="font-display font-extrabold text-2xl text-ink-800 mt-1">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-ink-600 mt-2 line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-3 mt-4">
          {categories.slice(4).map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={`/categories/${cat.slug}`}
                className={cn(
                  "group flex items-center justify-between rounded-3xl p-5 ring-1 ring-ink-100 shadow-soft hover:shadow-hover transition-all bg-gradient-to-br",
                  cat.gradient
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{cat.emoji}</span>
                  <div>
                    <p className="font-display font-bold text-ink-800">
                      {cat.name}
                    </p>
                    <p className="text-xs text-ink-500">{cat.tagline}</p>
                  </div>
                </div>
                <ArrowLeft className="h-4 w-4 text-ink-500 group-hover:-translate-x-1 transition" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "start"
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "start" | "center";
}) {
  return (
    <div
      className={cn(
        "max-w-2xl space-y-3",
        align === "center" && "mx-auto text-center"
      )}
    >
      {eyebrow && (
        <span className="inline-block text-xs font-bold tracking-widest text-brand-600 uppercase">
          {eyebrow}
        </span>
      )}
      <h2 className="heading-2 text-balance">{title}</h2>
      {description && <p className="body-lead">{description}</p>}
    </div>
  );
}
