"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/lib/products";

type WishlistStore = {
  items: Product[];
  toggle: (product: Product) => void;
  has: (id: number) => boolean;
  clear: () => void;
};

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      toggle: (product) => {
        const { items } = get();
        const exists = items.some((p) => p.id === product.id);
        set({
          items: exists
            ? items.filter((p) => p.id !== product.id)
            : [...items, product],
        });
      },

      has: (id) => get().items.some((p) => p.id === id),

      clear: () => set({ items: [] }),
    }),
    { name: "bathhub-wishlist", skipHydration: true }
  )
);
