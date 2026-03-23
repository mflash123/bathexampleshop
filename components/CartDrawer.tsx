"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCart } from "@/lib/store/useCart";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    totalPrice,
    totalItems,
  } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={(o) => !o && closeCart()}>
      <SheetContent className="flex flex-col w-full sm:max-w-md p-0">
        <SheetHeader className="p-6 pb-4">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Корзина
            {totalItems() > 0 && (
              <span className="ml-1 bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems()}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        <Separator />

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-slate-400 p-6">
            <ShoppingBag className="w-16 h-16 opacity-20" />
            <p className="font-medium text-slate-600">Корзина пуста</p>
            <Button asChild variant="outline" onClick={closeCart}>
              <Link href="/products">Перейти в каталог</Link>
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-6">
              <div className="py-4 space-y-4">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor}-${item.selectedMaterial}`}
                    className="flex gap-3"
                  >
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-50 shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-400 mb-0.5">
                        {item.product.brand}
                      </p>
                      <p className="text-sm font-medium text-slate-900 leading-snug line-clamp-2 mb-1">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-slate-400 mb-2">
                        {item.selectedColor} · {item.selectedMaterial}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-0.5">
                          <button
                            className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white transition-colors"
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.selectedColor,
                                item.selectedMaterial,
                                item.quantity - 1
                              )
                            }
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-semibold w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white transition-colors"
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.selectedColor,
                                item.selectedMaterial,
                                item.quantity + 1
                              )
                            }
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">
                            {(
                              item.product.price * item.quantity
                            ).toLocaleString("ru-RU")}{" "}
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
            </ScrollArea>

            <div className="border-t p-6 space-y-4 bg-white">
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-700">Итого</span>
                <span className="text-xl font-bold text-slate-900">
                  {totalPrice().toLocaleString("ru-RU")} ₽
                </span>
              </div>
              <Button
                asChild
                className="w-full bg-blue-600 hover:bg-blue-500 rounded-xl h-12 text-base font-semibold"
                onClick={closeCart}
              >
                <Link href="/checkout">Оформить заказ</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full rounded-xl"
                onClick={closeCart}
              >
                <Link href="/cart">Открыть корзину</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
