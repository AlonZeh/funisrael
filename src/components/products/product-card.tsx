"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Ruler, Users } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatILS } from "@/lib/utils";
import { ProductBadge } from "./product-badge";
import { getCategory } from "@/lib/categories";
import { AddToReservationButton } from "@/components/reservation/add-to-reservation-button";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const category = getCategory(product.category);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.4) }}
      className="card-surface card-hover overflow-hidden flex flex-col group"
    >
      <Link
        href={`/products/${product.slug}`}
        className="relative aspect-[4/3] overflow-hidden bg-cream-100 block"
        aria-label={`לפרטי ${product.name}`}
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 flex flex-wrap gap-1.5 max-w-[70%]">
          {product.badges.slice(0, 2).map((b) => (
            <ProductBadge key={b} type={b} />
          ))}
        </div>
        {category && (
          <span className="absolute bottom-3 right-3 pill">
            <span>{category.emoji}</span>
            {category.name}
          </span>
        )}
      </Link>

      <div className="p-5 space-y-3 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display font-extrabold text-lg text-ink-800 leading-tight">
            <Link
              href={`/products/${product.slug}`}
              className="hover:text-brand-600 transition"
            >
              {product.name}
            </Link>
          </h3>
          <div className="text-left shrink-0">
            <div className="text-[11px] text-ink-400 leading-tight">החל מ-</div>
            <div className="font-display font-extrabold text-lg text-ink-800">
              {formatILS(product.price)}
            </div>
          </div>
        </div>
        <p className="text-sm text-ink-500 line-clamp-2">{product.shortDescription}</p>

        <div className="flex items-center gap-3 text-xs text-ink-500 pt-1">
          <span className="inline-flex items-center gap-1">
            <Users className="h-3.5 w-3.5" /> גילאי {product.ageRange}
          </span>
          <span className="inline-flex items-center gap-1">
            <Ruler className="h-3.5 w-3.5" />
            {product.setupArea.length}×{product.setupArea.width} מ׳
          </span>
        </div>

        <div className="mt-auto pt-3 border-t border-ink-100/80 flex items-center justify-between gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-ink-600 hover:text-brand-600 hover:gap-2 transition-all whitespace-nowrap"
          >
            לפרטים <ArrowLeft className="h-4 w-4" />
          </Link>
          <AddToReservationButton
            item={{
              key: `product:${product.id}`,
              kind: "product",
              id: product.id,
              slug: product.slug,
              name: product.name,
              imageUrl: product.images[0],
              unitPrice: product.price,
              priceLabel: formatILS(product.price),
              category: product.category,
              tags: product.badges
            }}
            label="לשיריון"
            className="text-sm py-2 px-3"
          />
        </div>
      </div>
    </motion.article>
  );
}
