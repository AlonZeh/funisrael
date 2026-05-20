"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, MapPin } from "lucide-react";
import type { Article } from "@/lib/articles/types";
import { articleCategoryLabel } from "@/lib/articles/categories";

export function ArticleCard({
  article,
  index = 0
}: {
  article: Article;
  index?: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.4) }}
      className="card-surface card-hover overflow-hidden flex flex-col h-full"
    >
      <Link
        href={`/blog/${article.slug}`}
        className="block relative aspect-[16/9] bg-cream-100 overflow-hidden"
      >
        <Image
          src={article.coverImage}
          alt={article.coverImageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
        <span className="absolute top-3 right-3 pill bg-white/90 text-xs">
          {articleCategoryLabel(article.category)}
        </span>
      </Link>
      <div className="p-5 md:p-6 flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-3 text-xs text-ink-500">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {article.readingTimeMinutes} דקות קריאה
          </span>
          {article.city && (
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {article.city}
            </span>
          )}
        </div>
        <h3 className="font-display font-extrabold text-lg md:text-xl text-ink-800 leading-tight">
          <Link href={`/blog/${article.slug}`} className="hover:text-brand-600">
            {article.title}
          </Link>
        </h3>
        <p className="text-sm text-ink-500 line-clamp-3">{article.excerpt}</p>
        <div className="mt-auto pt-3">
          <Link
            href={`/blog/${article.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:gap-2 transition-all"
          >
            לקריאת המדריך <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
