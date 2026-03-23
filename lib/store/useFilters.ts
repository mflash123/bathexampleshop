"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SortOption =
  | "default"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "newest";

type FiltersStore = {
  search: string;
  categories: string[];
  brands: string[];
  colors: string[];
  materials: string[];
  priceRange: [number, number];
  inStockOnly: boolean;
  sort: SortOption;

  setSearch: (v: string) => void;
  toggleCategory: (v: string) => void;
  toggleBrand: (v: string) => void;
  toggleColor: (v: string) => void;
  toggleMaterial: (v: string) => void;
  setPriceRange: (v: [number, number]) => void;
  setInStockOnly: (v: boolean) => void;
  setSort: (v: SortOption) => void;
  reset: () => void;
};

const defaults = {
  search: "",
  categories: [] as string[],
  brands: [] as string[],
  colors: [] as string[],
  materials: [] as string[],
  priceRange: [0, 300000] as [number, number],
  inStockOnly: false,
  sort: "default" as SortOption,
};

const toggle = (arr: string[], v: string) =>
  arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];

export const useFilters = create<FiltersStore>()(
  persist(
    (set) => ({
      ...defaults,

      setSearch: (v) => set({ search: v }),
      toggleCategory: (v) =>
        set((s) => ({ categories: toggle(s.categories, v) })),
      toggleBrand: (v) => set((s) => ({ brands: toggle(s.brands, v) })),
      toggleColor: (v) => set((s) => ({ colors: toggle(s.colors, v) })),
      toggleMaterial: (v) =>
        set((s) => ({ materials: toggle(s.materials, v) })),
      setPriceRange: (v) => set({ priceRange: v }),
      setInStockOnly: (v) => set({ inStockOnly: v }),
      setSort: (v) => set({ sort: v }),
      reset: () => set(defaults),
    }),
    { name: "bathhub-filters", skipHydration: true }
  )
);
