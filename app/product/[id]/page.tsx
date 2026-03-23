"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { getProductById, products } from "@/lib/products";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/store/useCart";
import { useWishlist } from "@/lib/store/useWishlist";
import {
  ShoppingCart,
  Heart,
  Star,
  Shield,
  Truck,
  ArrowLeft,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const COLOR_MAP: Record<string, string> = {
  chrome: "bg-slate-300",
  black: "bg-slate-900",
  gold: "bg-amber-400",
  brushed: "bg-slate-400",
  white: "bg-white border border-slate-200",
  graphite: "bg-slate-600",
  grey: "bg-slate-400",
  sage: "bg-green-300",
};

const COLOR_LABEL: Record<string, string> = {
  chrome: "Хром",
  black: "Чёрный",
  gold: "Золото",
  brushed: "Брашированный",
  white: "Белый",
  graphite: "Графит",
  grey: "Серый",
  sage: "Шалфей",
};

export default function ProductPage() {
  const params = useParams();
  const id = Number(params.id);
  const product = getProductById(id);

  const addItem = useCart((s) => s.addItem);
  const openCart = useCart((s) => s.openCart);
  const wishlistToggle = useWishlist((s) => s.toggle);
  const wishlistHas = useWishlist((s) => s.has);
  const inWishlist = wishlistHas(id);

  const [selectedColor, setSelectedColor] = useState(
    product?.colors[0] ?? ""
  );
  const [selectedMaterial, setSelectedMaterial] = useState(
    product?.materials[0] ?? ""
  );
  const [selectedSize, setSelectedSize] = useState(
    product?.sizes?.[0] ?? ""
  );
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <p className="text-6xl mb-6">🚿</p>
        <h1 className="text-2xl font-bold text-slate-900 mb-3">Товар не найден</h1>
        <p className="text-slate-500 mb-8">Возможно, он был снят с продажи или вы перешли по устаревшей ссылке.</p>
        <Link href="/products" className="inline-flex items-center gap-2 bg-slate-900 text-white rounded-xl px-6 py-3 font-medium hover:bg-slate-800 transition-colors">
          ← Вернуться в каталог
        </Link>
      </div>
    );
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addItem(product, selectedColor, selectedMaterial);
    }
    toast.success(`${product.name} добавлен в корзину`, {
      action: { label: "Открыть", onClick: openCart },
    });
  };

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-400 mb-8">
        <Link href="/products" className="hover:text-blue-600 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" />
          Каталог
        </Link>
        <span>/</span>
        <Link
          href={`/products?category=${encodeURIComponent(product.category)}`}
          className="hover:text-blue-600"
        >
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-slate-600 truncate max-w-xs">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Gallery */}
        <ProductGallery images={product.images} name={product.name} />

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <p className="text-sm font-medium text-blue-600 mb-1">
                {product.brand}
              </p>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                {product.name}
              </h1>
            </div>
            <button
              onClick={() => wishlistToggle(product)}
              className="mt-1 w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:border-red-300 transition-colors shrink-0"
              aria-label="Избранное"
            >
              <Heart
                className={cn(
                  "w-5 h-5 transition-colors",
                  inWishlist ? "fill-red-500 text-red-500" : "text-slate-400"
                )}
              />
            </button>
          </div>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={cn(
                      "w-4 h-4",
                      s <= Math.round(product.rating ?? 0)
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-200"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-slate-700">
                {product.rating}
              </span>
              <span className="text-sm text-slate-400">
                {product.reviewCount} отзывов
              </span>
            </div>
          )}

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-5">
            {!product.inStock && (
              <Badge variant="secondary">Нет в наличии</Badge>
            )}
            {product.isNew && (
              <Badge className="bg-blue-600 text-white">Новинка</Badge>
            )}
            {product.isFeatured && (
              <Badge variant="outline">Хит продаж</Badge>
            )}
            {discount && (
              <Badge className="bg-red-500 text-white">−{discount}%</Badge>
            )}
          </div>

          {/* Price */}
          <div className="flex items-end gap-3 mb-7">
            <span className="text-4xl font-bold text-slate-900">
              {product.price.toLocaleString("ru-RU")} ₽
            </span>
            {product.oldPrice && (
              <span className="text-lg text-slate-400 line-through mb-1">
                {product.oldPrice.toLocaleString("ru-RU")} ₽
              </span>
            )}
          </div>

          <Separator className="mb-6" />

          {/* Color selector */}
          <div className="mb-5">
            <p className="text-sm font-semibold text-slate-700 mb-3">
              Цвет/Отделка:{" "}
              <span className="font-normal text-slate-500">
                {COLOR_LABEL[selectedColor] ?? selectedColor}
              </span>
            </p>
            <div className="flex gap-3 flex-wrap">
              {product.colors.map((c) => (
                <button
                  key={c}
                  title={COLOR_LABEL[c] ?? c}
                  onClick={() => setSelectedColor(c)}
                  className={cn(
                    "w-8 h-8 rounded-full transition-all hover:scale-110",
                    COLOR_MAP[c] ?? "bg-slate-200",
                    selectedColor === c &&
                      "ring-2 ring-offset-2 ring-blue-500 scale-110"
                  )}
                />
              ))}
            </div>
          </div>

          {/* Material selector */}
          <div className="mb-5">
            <p className="text-sm font-semibold text-slate-700 mb-3">
              Материал
            </p>
            <div className="flex flex-wrap gap-2">
              {product.materials.map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedMaterial(m)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors",
                    selectedMaterial === m
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                  )}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Size selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-5">
              <p className="text-sm font-semibold text-slate-700 mb-3">
                Размер
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors",
                      selectedSize === s
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Qty + Add */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1">
              <button
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white transition-colors font-bold text-slate-700"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <span className="w-8 text-center font-semibold text-slate-900">
                {qty}
              </span>
              <button
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white transition-colors font-bold text-slate-700"
                onClick={() => setQty((q) => q + 1)}
              >
                +
              </button>
            </div>

            <Button
              size="lg"
              className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-base h-12"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart className="mr-2 w-5 h-5" />
              {product.inStock ? "В корзину" : "Нет в наличии"}
            </Button>
          </div>

          {/* Delivery badges */}
          <div className="grid grid-cols-2 gap-3 text-sm text-slate-600 bg-slate-50 rounded-2xl p-4">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-blue-500" />
              <span>Доставка по России</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span>Официальная гарантия</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-blue-500" />
              <span>Оригинальный товар</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Возврат 14 дней</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Description + Specs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-4">Описание</h2>
          <p className="text-slate-600 leading-relaxed">{product.description}</p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Характеристики
          </h2>
          <div className="space-y-3">
            {Object.entries(product.specs).map(([k, v]) => (
              <div key={k} className="flex items-start justify-between gap-4 py-2 border-b border-slate-100 last:border-0">
                <span className="text-sm text-slate-500">{k}</span>
                <span className="text-sm font-medium text-slate-900 text-right">
                  {v}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Похожие товары
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
