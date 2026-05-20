"use client";

import { useMemo, useState } from "react";
import { useArticleStore } from "@/store/article-store";
import {
  articleCategories,
  articleCategoryLabel
} from "@/lib/articles/categories";
import type { ArticleCategory } from "@/lib/articles/types";
import { ArticleCard } from "./article-card";
import { cn } from "@/lib/utils";
import { CommunityBanner } from "@/components/marketing/community-banner";

export function BlogIndexView() {
  const articles = useArticleStore((s) => s.articles);
  const hydrated = useArticleStore((s) => s.hydrated);
  const [active, setActive] = useState<ArticleCategory | "all">("all");

  const list = useMemo(() => {
    const published = articles.filter((a) => a.isPublished);
    if (active === "all") return published;
    return published.filter((a) => a.category === active);
  }, [articles, active]);

  if (!hydrated) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="card-surface aspect-[16/9] animate-pulse bg-cream-100"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="-mx-4 px-4 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 min-w-max pb-1">
          <FilterChip
            active={active === "all"}
            onClick={() => setActive("all")}
          >
            ✨ הכל
          </FilterChip>
          {articleCategories.map((c) => (
            <FilterChip
              key={c.id}
              active={active === c.id}
              onClick={() => setActive(c.id)}
            >
              {c.emoji} {articleCategoryLabel(c.id)}
            </FilterChip>
          ))}
        </div>
      </div>

      {active === "all" && list.length > 24 ? (
        <>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.slice(0, 6).map((a, i) => (
              <ArticleCard key={a.id} article={a} index={i} />
            ))}
          </div>

          <div className="pt-6">
            <h2 className="heading-3 mb-1">
              מדריכים נוספים להורים שמתכננים יום הולדת
            </h2>
            <p className="text-ink-500 max-w-2xl">
              ריכזנו מדריכים פרקטיים שיעזרו לכם לבחור מתנפח, להבין מה מתאים לגיל
              הילדים, איך לתכנן אירוע בחצר, ומה כדאי לבדוק לפני שסוגרים חבילה.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.slice(6, 12).map((a, i) => (
              <ArticleCard key={a.id} article={a} index={i + 6} />
            ))}
          </div>

          <div className="pt-6">
            <h2 className="heading-3 mb-1">
              מדריכים לפי גיל, עונה וסוג אירוע
            </h2>
            <p className="text-ink-500 max-w-2xl">
              כדי לעזור להורים לתכנן יום הולדת בצורה פשוטה יותר, ריכזנו מדריכים
              לפי גיל הילדים, עונות השנה, חופשות, מסיבות סוף שנה ואירועים
              משפחתיים.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.slice(12, 24).map((a, i) => (
              <ArticleCard key={a.id} article={a} index={i + 12} />
            ))}
          </div>

          <div className="pt-6">
            <h2 className="heading-3 mb-1">
              מדריכים מהירים להורים שצריכים פתרון עכשיו
            </h2>
            <p className="text-ink-500 max-w-2xl">
              אם אתם מתחת ללחץ, נזכרתם ברגע האחרון, או רק רוצים לדעת מה לשאול
              ספק לפני שמזמינים — המדריכים האלה ייתנו לכם תשובות קצרות ובהירות
              באזור רחובות והשפלה.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.slice(24).map((a, i) => (
              <ArticleCard key={a.id} article={a} index={i + 24} />
            ))}
          </div>
        </>
      ) : active === "all" && list.length > 12 ? (
        <>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.slice(0, 6).map((a, i) => (
              <ArticleCard key={a.id} article={a} index={i} />
            ))}
          </div>

          <div className="pt-6">
            <h2 className="heading-3 mb-1">
              מדריכים נוספים להורים שמתכננים יום הולדת
            </h2>
            <p className="text-ink-500 max-w-2xl">
              ריכזנו מדריכים פרקטיים שיעזרו לכם לבחור מתנפח, להבין מה מתאים לגיל
              הילדים, איך לתכנן אירוע בחצר, ומה כדאי לבדוק לפני שסוגרים חבילה.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.slice(6, 12).map((a, i) => (
              <ArticleCard key={a.id} article={a} index={i + 6} />
            ))}
          </div>

          <div className="pt-6">
            <h2 className="heading-3 mb-1">
              מדריכים לפי גיל, עונה וסוג אירוע
            </h2>
            <p className="text-ink-500 max-w-2xl">
              כדי לעזור להורים לתכנן יום הולדת בצורה פשוטה יותר, ריכזנו מדריכים
              לפי גיל הילדים, עונות השנה, חופשות, מסיבות סוף שנה ואירועים
              משפחתיים.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.slice(12).map((a, i) => (
              <ArticleCard key={a.id} article={a} index={i + 12} />
            ))}
          </div>
        </>
      ) : active === "all" && list.length > 6 ? (
        <>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.slice(0, 6).map((a, i) => (
              <ArticleCard key={a.id} article={a} index={i} />
            ))}
          </div>

          <div className="pt-6">
            <h2 className="heading-3 mb-1">
              מדריכים נוספים להורים שמתכננים יום הולדת
            </h2>
            <p className="text-ink-500 max-w-2xl">
              ריכזנו מדריכים פרקטיים שיעזרו לכם לבחור מתנפח, להבין מה מתאים לגיל
              הילדים, איך לתכנן אירוע בחצר, ומה כדאי לבדוק לפני שסוגרים חבילה.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.slice(6).map((a, i) => (
              <ArticleCard key={a.id} article={a} index={i + 6} />
            ))}
          </div>
        </>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((a, i) => (
            <ArticleCard key={a.id} article={a} index={i} />
          ))}
        </div>
      )}

      <CommunityBanner />
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full px-4 py-2 text-sm font-medium ring-1 transition",
        active
          ? "bg-ink-800 text-white ring-ink-800"
          : "bg-white text-ink-600 ring-ink-100 hover:bg-cream-100"
      )}
    >
      {children}
    </button>
  );
}
