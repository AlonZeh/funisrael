"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useArticleStore } from "@/store/article-store";
import { ArticleCard } from "@/components/blog/article-card";
import { TermsReminder } from "@/components/terms/terms-reminder";

export function BlogTeaser() {
  const articles = useArticleStore((s) => s.articles);
  const hydrated = useArticleStore((s) => s.hydrated);
  const list = articles.filter((a) => a.isPublished).slice(0, 3);

  return (
    <section className="py-16 md:py-20">
      <div className="container-page">
        <TermsReminder variant="card" className="mb-8" />

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold tracking-widest text-brand-600 uppercase">
              מדריכים להורים
            </span>
            <h2 className="heading-2 text-balance">
              10 מדריכים שכל הורה ברחובות צריך לקרוא לפני יום הולדת.
            </h2>
            <p className="body-lead">
              איך בוחרים מתנפח לפי גיל, איך מודדים חצר, מתי מים, מתי לבן —
              והכל בעברית פשוטה.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-brand-600 font-semibold hover:gap-3 transition-all"
          >
            לכל המדריכים <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>

        {hydrated && list.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-3">
            {list.map((a, i) => (
              <ArticleCard key={a.id} article={a} index={i} />
            ))}
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="card-surface aspect-[16/9] animate-pulse bg-cream-100"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
