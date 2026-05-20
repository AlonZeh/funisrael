"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useArticleStore } from "@/store/article-store";
import { ArticleEditor } from "@/components/admin/article-editor";

export default function EditArticlePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const articles = useArticleStore((s) => s.articles);
  const hydrated = useArticleStore((s) => s.hydrated);
  const article = articles.find((a) => a.id === params.id);

  useEffect(() => {
    if (hydrated && !article) router.replace("/admin/articles");
  }, [hydrated, article, router]);

  if (!hydrated || !article) {
    return <div className="card-surface p-12 animate-pulse h-80" />;
  }
  return <ArticleEditor mode="edit" initial={article} />;
}
