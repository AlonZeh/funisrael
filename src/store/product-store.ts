"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { seedProducts } from "@/lib/seed-products";
import type { Product } from "@/lib/types";

interface ProductStore {
  products: Product[];
  hydrated: boolean;
  setHydrated: (h: boolean) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, patch: Partial<Product>) => void;
  removeProduct: (id: string) => void;
  duplicateProduct: (id: string) => void;
  resetToSeed: () => void;
  importProducts: (products: Product[]) => void;
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      products: seedProducts,
      hydrated: false,
      setHydrated: (h) => set({ hydrated: h }),
      addProduct: (product) =>
        set((state) => ({ products: [product, ...state.products] })),
      updateProduct: (id, patch) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...patch } : p
          )
        })),
      removeProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id)
        })),
      duplicateProduct: (id) =>
        set((state) => {
          const original = state.products.find((p) => p.id === id);
          if (!original) return state;
          const copy: Product = {
            ...original,
            id: `${original.id}-copy-${Date.now()}`,
            slug: `${original.slug}-copy`,
            name: `${original.name} (עותק)`,
            active: false
          };
          return { products: [copy, ...state.products] };
        }),
      resetToSeed: () => set({ products: seedProducts }),
      importProducts: (products) => set({ products })
    }),
    {
      name: "fun-israel:products",
      // Bump when the seed catalog changes so cached client storage doesn't
      // shadow the real inventory.
      version: 2,
      migrate: () => ({ products: seedProducts }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      }
    }
  )
);
