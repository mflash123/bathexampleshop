"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/lib/products";

export type CartItem = {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedMaterial: string;
};

type CartStore = {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (
    product: Product,
    color: string,
    material: string,
    qty?: number
  ) => void;
  removeItem: (productId: number, color: string, material: string) => void;
  updateQuantity: (
    productId: number,
    color: string,
    material: string,
    qty: number
  ) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
};

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      addItem: (product, color, material, qty = 1) => {
        const { items } = get();
        const key = `${product.id}-${color}-${material}`;
        const existing = items.find(
          (i) =>
            i.product.id === product.id &&
            i.selectedColor === color &&
            i.selectedMaterial === material
        );
        if (existing) {
          set({
            items: items.map((i) =>
              i.product.id === product.id &&
              i.selectedColor === color &&
              i.selectedMaterial === material
                ? { ...i, quantity: i.quantity + qty }
                : i
            ),
          });
        } else {
          set({
            items: [
              ...items,
              { product, quantity: qty, selectedColor: color, selectedMaterial: material },
            ],
          });
        }
        void key;
      },

      removeItem: (productId, color, material) => {
        set({
          items: get().items.filter(
            (i) =>
              !(
                i.product.id === productId &&
                i.selectedColor === color &&
                i.selectedMaterial === material
              )
          ),
        });
      },

      updateQuantity: (productId, color, material, qty) => {
        if (qty <= 0) {
          get().removeItem(productId, color, material);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.product.id === productId &&
            i.selectedColor === color &&
            i.selectedMaterial === material
              ? { ...i, quantity: qty }
              : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      totalItems: () =>
        get().items.reduce((acc, i) => acc + i.quantity, 0),

      totalPrice: () =>
        get().items.reduce(
          (acc, i) => acc + i.product.price * i.quantity,
          0
        ),
    }),
    { name: "bathhub-cart", skipHydration: true }
  )
);
