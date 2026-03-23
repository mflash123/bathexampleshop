"use client";

import Link from "next/link";
import { ShoppingCart, Heart, Search, Menu, X, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/store/useCart";
import { useWishlist } from "@/lib/store/useWishlist";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Header() {
  const totalItems = useCart((s) => s.totalItems);
  const wishlistCount = useWishlist((s) => s.items.length);
  const openCart = useCart((s) => s.openCart);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/products", label: "Каталог" },
    { href: "/products?category=Смесители", label: "Смесители" },
    { href: "/products?category=Душевые+системы", label: "Душ" },
    { href: "/products?category=Ванны", label: "Ванны" },
    { href: "/products?category=Аксессуары", label: "Аксессуары" },
  ];

  return (
    <>
      {/* Top bar */}
      <div className="bg-slate-900 text-slate-400 text-[11px] py-1.5 hidden sm:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <span>Бесплатная доставка от 15 000 ₽</span>
          <span>
            Сделано:{" "}
            <a
              href="https://markovpavel.ru"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-white transition-colors underline underline-offset-2"
            >
              markovpavel.ru
            </a>
          </span>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-slate-100"
            : "bg-white border-b border-transparent"
        )}
      >
        <div className="container mx-auto px-4 flex h-16 items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <Droplets className="w-5 h-5 text-blue-400" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">
              Bath<span className="text-blue-600">Hub</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-slate-500 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-50 transition-all"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-0.5">
            <Link href="/products">
              <Button variant="ghost" size="icon" aria-label="Поиск" className="text-slate-500 hover:text-slate-900">
                <Search className="w-[18px] h-[18px]" />
              </Button>
            </Link>

            <Link href="/wishlist" className="relative">
              <Button variant="ghost" size="icon" aria-label="Избранное" className="text-slate-500 hover:text-slate-900">
                <Heart className="w-[18px] h-[18px]" />
                {mounted && wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold ring-2 ring-white">
                    {wishlistCount}
                  </span>
                )}
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              aria-label="Корзина"
              className="relative text-slate-500 hover:text-slate-900"
              onClick={openCart}
            >
              <ShoppingCart className="w-[18px] h-[18px]" />
              {mounted && totalItems() > 0 && (
                <span className="absolute top-1 right-1 bg-blue-600 text-white text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold ring-2 ring-white">
                  {totalItems()}
                </span>
              )}
            </Button>

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-slate-500"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Меню"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile nav */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 bg-white",
            mobileOpen ? "max-h-80 border-t border-slate-100" : "max-h-0"
          )}
        >
          <nav className="flex flex-col p-4 gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-slate-700 hover:text-blue-600 py-2.5 px-3 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-3 mt-2 border-t border-slate-100 text-[11px] text-slate-400">
              Сделано:{" "}
              <a href="https://markovpavel.ru" target="_blank" rel="noopener noreferrer" className="text-slate-500 underline">
                markovpavel.ru
              </a>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
