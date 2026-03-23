"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/store/useCart";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice, totalItems } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 flex flex-col items-center text-center">
        <ShoppingBag className="w-20 h-20 text-slate-200 mb-6" />
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Ваша корзина пуста
        </h1>
        <p className="text-slate-500 mb-8">
          Добавьте товары из каталога
        </p>
        <Button asChild size="lg" className="rounded-xl">
          <Link href="/products">Перейти в каталог</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Корзина{" "}
          <span className="text-slate-400 font-normal text-xl">
            ({totalItems()} товара)
          </span>
        </h1>
        <Button
          variant="ghost"
          size="sm"
          className="text-slate-400 hover:text-red-500"
          onClick={clearCart}
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Очистить
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={`${item.product.id}-${item.selectedColor}-${item.selectedMaterial}`}
              className="flex gap-5 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm"
            >
              <Link href={`/product/${item.product.id}`}>
                <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-slate-50 shrink-0">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </Link>

              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-400 mb-0.5">
                  {item.product.brand}
                </p>
                <Link href={`/product/${item.product.id}`}>
                  <h3 className="font-semibold text-slate-900 mb-1 hover:text-blue-600 transition-colors line-clamp-2">
                    {item.product.name}
                  </h3>
                </Link>
                <p className="text-xs text-slate-500 mb-3">
                  {item.selectedColor} · {item.selectedMaterial}
                </p>

                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1">
                    <button
                      className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white transition-colors"
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.selectedColor,
                          item.selectedMaterial,
                          item.quantity - 1
                        )
                      }
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-7 text-center font-semibold text-sm">
                      {item.quantity}
                    </span>
                    <button
                      className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white transition-colors"
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.selectedColor,
                          item.selectedMaterial,
                          item.quantity + 1
                        )
                      }
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-900">
                      {(item.product.price * item.quantity).toLocaleString(
                        "ru-RU"
                      )}{" "}
                      ₽
                    </span>
                    <button
                      className="text-slate-300 hover:text-red-500 transition-colors"
                      onClick={() =>
                        removeItem(
                          item.product.id,
                          item.selectedColor,
                          item.selectedMaterial
                        )
                      }
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sticky top-20">
            <h2 className="text-lg font-bold text-slate-900 mb-5">
              Сумма заказа
            </h2>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm text-slate-600">
                <span>Товары ({totalItems()})</span>
                <span>{totalPrice().toLocaleString("ru-RU")} ₽</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600">
                <span>Доставка</span>
                <span className="text-green-600 font-medium">Бесплатно</span>
              </div>
            </div>

            <Separator className="mb-4" />

            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-slate-900">Итого</span>
              <span className="text-2xl font-bold text-slate-900">
                {totalPrice().toLocaleString("ru-RU")} ₽
              </span>
            </div>

            <Button
              asChild
              className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-base"
            >
              <Link href="/checkout">
                Оформить заказ
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
