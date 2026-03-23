"use client";

import { useWishlist } from "@/lib/store/useWishlist";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function WishlistPage() {
  const { items, clear } = useWishlist();

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">
            Избранное
          </h1>
          <p className="text-slate-500">{items.length} товара</p>
        </div>
        {items.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-400 hover:text-red-500"
            onClick={clear}
          >
            Очистить
          </Button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="py-24 flex flex-col items-center text-center">
          <Heart className="w-20 h-20 text-slate-200 mb-6" />
          <h2 className="text-xl font-semibold text-slate-700 mb-2">
            Список избранного пуст
          </h2>
          <p className="text-slate-500 mb-8">
            Нажмите на сердечко на карточке товара, чтобы добавить его сюда
          </p>
          <Button asChild size="lg" className="rounded-xl">
            <Link href="/products">Перейти в каталог</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
