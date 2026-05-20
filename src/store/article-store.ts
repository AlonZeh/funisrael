"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { seedArticles } from "@/lib/articles/seed";
import type { Article } from "@/lib/articles/types";

interface ArticleStore {
  articles: Article[];
  hydrated: boolean;
  setHydrated: (h: boolean) => void;
  addArticle: (article: Article) => void;
  updateArticle: (id: string, patch: Partial<Article>) => void;
  removeArticle: (id: string) => void;
  togglePublished: (id: string) => void;
  resetToSeed: () => void;
}

/**
 * Merge any seed articles that don't yet exist in the persisted state by id.
 * Used by the persist `migrate` callback so existing localStorage installs
 * automatically pick up new seed articles after a deploy.
 */
function mergeNewSeeds(existing: Article[]): Article[] {
  const knownIds = new Set(existing.map((a) => a.id));
  const additions = seedArticles.filter((a) => !knownIds.has(a.id));
  return additions.length ? [...additions, ...existing] : existing;
}

export const useArticleStore = create<ArticleStore>()(
  persist(
    (set) => ({
      articles: seedArticles,
      hydrated: false,
      setHydrated: (h) => set({ hydrated: h }),
      addArticle: (article) =>
        set((s) => ({ articles: [article, ...s.articles] })),
      updateArticle: (id, patch) =>
        set((s) => ({
          articles: s.articles.map((a) =>
            a.id === id
              ? { ...a, ...patch, updatedAt: new Date().toISOString().slice(0, 10) }
              : a
          )
        })),
      removeArticle: (id) =>
        set((s) => ({ articles: s.articles.filter((a) => a.id !== id) })),
      togglePublished: (id) =>
        set((s) => ({
          articles: s.articles.map((a) =>
            a.id === id ? { ...a, isPublished: !a.isPublished } : a
          )
        })),
      resetToSeed: () => set({ articles: seedArticles })
    }),
    {
      name: "fun-israel:articles",
      version: 4,
      migrate: (persistedState) => {
        // `mergeNewSeeds` is idempotent — only adds seed articles missing
        // from the persisted state by id. So we run it on every version
        // bump regardless of the previous version number, which guarantees
        // existing localStorage installs receive new wave articles without
        // duplicating or overwriting any admin edits.
        const state = persistedState as Partial<ArticleStore> | undefined;
        if (!state || !Array.isArray(state.articles)) {
          return { articles: seedArticles } as unknown as ArticleStore;
        }
        return {
          ...state,
          articles: mergeNewSeeds(state.articles)
        } as unknown as ArticleStore;
      },
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      }
    }
  )
);
