import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { seedArticles, getArticleBySlug } from "@/lib/articles/seed";
import { ArticleView } from "@/components/blog/article-view";
import { siteConfig } from "@/lib/site";

interface Params {
  params: { slug: string };
}

export function generateStaticParams() {
  return seedArticles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) return { title: "מדריך" };
  const url = `${siteConfig.url}/blog/${article.slug}`;
  return {
    title: article.metaTitle,
    description: article.metaDescription,
    keywords: [article.targetKeyword, ...article.secondaryKeywords],
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      type: "article",
      locale: "he_IL",
      url,
      title: article.metaTitle,
      description: article.metaDescription,
      images: [{ url: article.coverImage, alt: article.coverImageAlt }],
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author]
    },
    twitter: {
      card: "summary_large_image",
      title: article.metaTitle,
      description: article.metaDescription,
      images: [article.coverImage]
    }
  };
}

export default function ArticlePage({ params }: Params) {
  const article = getArticleBySlug(params.slug);
  if (!article) return notFound();
  return <ArticleView initial={article} />;
}
