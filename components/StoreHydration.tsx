"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/store/useCart";
import { useWishlist } from "@/lib/store/useWishlist";
import { useFilters } from "@/lib/store/useFilters";

/**
 * Triggers localStorage rehydration for all persisted Zustand stores
 * after the first client render, preventing SSR/hydration mismatches.
 */
export function StoreHydration() {
  useEffect(() => {
    useCart.persist.rehydrate();
    useWishlist.persist.rehydrate();
    useFilters.persist.rehydrate();
  }, []);

  return null;
}
