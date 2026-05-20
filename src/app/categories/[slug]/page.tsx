import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategoryBySlug } from "@/lib/categories";
import { CatalogView } from "@/components/catalog/catalog-view";
import { PageHeader } from "@/components/layout/page-header";

interface Params {
  params: { slug: string };
}

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const cat = getCategoryBySlug(params.slug);
  if (!cat) return { title: "קטגוריה" };
  return {
    title: `${cat.name} — ${cat.tagline}`,
    description: cat.description,
    alternates: { canonical: `/categories/${cat.slug}` }
  };
}

export default function CategoryPage({ params }: Params) {
  const cat = getCategoryBySlug(params.slug);
  if (!cat) return notFound();

  return (
    <>
      <PageHeader
        eyebrow={`קטגוריה · ${cat.emoji} ${cat.name}`}
        title={cat.tagline}
        description={cat.description}
      />
      <section className="container-page pb-16">
        <CatalogView initialCategory={cat.id} />
      </section>
    </>
  );
}
