import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { seedProducts } from "@/lib/seed-products";
import { categories } from "@/lib/categories";
import { seedArticles } from "@/lib/articles/seed";
import { serviceAreas } from "@/lib/areas";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes = [
    "",
    "/catalog",
    "/packages",
    "/blog",
    "/en",
    "/en/packages",
    "/en/accessibility",
    "/ru",
    "/ru/packages",
    "/ru/accessibility",
    "/about",
    "/faq",
    "/contact",
    "/booking",
    "/birthday-packages",
    "/pickup",
    "/safety",
    "/terms",
    "/privacy",
    "/accessibility"
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7
  }));

  const categoryRoutes = categories.map((c) => ({
    url: `${base}/categories/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8
  }));

  const productRoutes = seedProducts.map((p) => ({
    url: `${base}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9
  }));

  const articleRoutes = seedArticles
    .filter((a) => a.isPublished)
    .map((a) => ({
      url: `${base}/blog/${a.slug}`,
      lastModified: new Date(a.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.85
    }));

  const areaRoutes = serviceAreas
    .filter((a) => a.pageReady)
    .map((a) => ({
      url: `${base}/areas/${a.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9
    }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...productRoutes,
    ...articleRoutes,
    ...areaRoutes
  ];
}
