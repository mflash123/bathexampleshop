"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/lib/products";
import { useCart } from "@/lib/store/useCart";
import { useWishlist } from "@/lib/store/useWishlist";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  const addItem = useCart((s) => s.addItem);
  const openCart = useCart((s) => s.openCart);
  const wishlistHas = useWishlist((s) => s.has);
  const wishlistToggle = useWishlist((s) => s.toggle);
  const inWishlist = wishlistHas(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, product.colors[0], product.materials[0]);
    toast.success(`${product.name} добавлен в корзину`, {
      action: { label: "Открыть", onClick: openCart },
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    wishlistToggle(product);
    toast(inWishlist ? "Удалено из избранного" : "Добавлено в избранное");
  };

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link href={`/product/${product.id}`} className="block">
        {/* Image container */}
        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 mb-3">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
            unoptimized
          />

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges top-left */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
            {product.isNew && (
              <Badge className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-md font-semibold shadow-sm">
                NEW
              </Badge>
            )}
            {discount && (
              <Badge className="bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-md font-semibold shadow-sm">
                −{discount}%
              </Badge>
            )}
            {!product.inStock && (
              <Badge className="bg-slate-800/80 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-md">
                Нет в наличии
              </Badge>
            )}
          </div>

          {/* Wishlist button */}
          <button
            onClick={handleWishlist}
            className={cn(
              "absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200",
              inWishlist
                ? "bg-white shadow-md scale-100"
                : "bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 shadow-sm hover:shadow-md"
            )}
            aria-label="Избранное"
          >
            <Heart
              className={cn(
                "w-4 h-4 transition-colors",
                inWishlist ? "fill-rose-500 text-rose-500" : "text-slate-500"
              )}
            />
          </button>

          {/* Add to cart — bottom overlay */}
          <div className="absolute bottom-0 inset-x-0 p-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full flex items-center justify-center gap-2 bg-white/95 backdrop-blur-sm text-slate-900 text-xs font-semibold py-2.5 rounded-xl shadow-lg hover:bg-white transition-colors disabled:opacity-50"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              В корзину
            </button>
          </div>
        </div>

        {/* Info below image */}
        <div className="px-0.5">
          <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider mb-1">
            {product.brand}
          </p>
          <h3 className="text-sm font-medium text-slate-900 leading-snug line-clamp-2 mb-2">
            {product.name}
          </h3>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1 mb-2">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="text-xs text-slate-600 font-medium">{product.rating}</span>
              <span className="text-xs text-slate-400">({product.reviewCount})</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-slate-900">
              {product.price.toLocaleString("ru-RU")} ₽
            </span>
            {product.oldPrice && (
              <span className="text-xs text-slate-400 line-through">
                {product.oldPrice.toLocaleString("ru-RU")} ₽
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
