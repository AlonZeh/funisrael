import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { seedProducts } from "@/lib/seed-products";
import { ProductDetail } from "@/components/products/product-detail";

interface Params {
  params: { slug: string };
}

export function generateStaticParams() {
  return seedProducts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const product = seedProducts.find((p) => p.slug === params.slug);
  if (!product) return { title: "מתנפח" };
  return {
    title: product.name,
    description: product.shortDescription,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [{ url: product.images[0] }]
    }
  };
}

export default function ProductPage({ params }: Params) {
  // Build-time fallback (seed). Client-side store will override if admin edited.
  const product = seedProducts.find((p) => p.slug === params.slug);
  if (!product) return notFound();
  return <ProductDetail initialProduct={product} />;
}
