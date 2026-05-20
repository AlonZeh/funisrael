import { siteConfig } from "@/lib/site";
import type { Article } from "@/lib/articles/types";

export function ArticleSchema({ article }: { article: Article }) {
  const url = `${siteConfig.url}/blog/${article.slug}`;
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    image: article.coverImage,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Organization",
      name: article.author
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/og.png`
      }
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: [article.targetKeyword, ...article.secondaryKeywords].join(", "),
    articleSection: article.category
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbSchema({
  items
}: {
  items: { label: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: item.url.startsWith("http") ? item.url : `${siteConfig.url}${item.url}`
    }))
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
