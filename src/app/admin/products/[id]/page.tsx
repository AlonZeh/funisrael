"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useProductStore } from "@/store/product-store";
import { ProductEditor } from "@/components/admin/product-editor";

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const products = useProductStore((s) => s.products);
  const hydrated = useProductStore((s) => s.hydrated);

  const product = products.find((p) => p.id === params.id);

  useEffect(() => {
    if (hydrated && !product) {
      router.replace("/admin/products");
    }
  }, [hydrated, product, router]);

  if (!hydrated || !product) {
    return <div className="card-surface p-12 animate-pulse h-80" />;
  }

  return <ProductEditor mode="edit" initial={product} />;
}
