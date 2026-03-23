"use client";

import { useFilters, SortOption } from "@/lib/store/useFilters";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { ProductFilters } from "@/components/ProductFilters";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal, Search, X } from "lucide-react";
import { useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ProductsPageInner() {
  const searchParams = useSearchParams();
  const {
    search,
    categories,
    brands,
    colors,
    materials,
    priceRange,
    inStockOnly,
    sort,
    setSearch,
    toggleCategory,
    setSort,
  } = useFilters();

  // sync URL ?category= param into filter
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && !categories.includes(cat)) {
      toggleCategory(cat);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    let list = [...products];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (categories.length > 0)
      list = list.filter((p) => categories.includes(p.category));
    if (brands.length > 0)
      list = list.filter((p) => brands.includes(p.brand));
    if (colors.length > 0)
      list = list.filter((p) => p.colors.some((c) => colors.includes(c)));
    if (materials.length > 0)
      list = list.filter((p) =>
        p.materials.some((m) => materials.includes(m))
      );
    list = list.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );
    if (inStockOnly) list = list.filter((p) => p.inStock);

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      case "newest":
        list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    return list;
  }, [search, categories, brands, colors, materials, priceRange, inStockOnly, sort]);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Каталог</h1>
      <p className="text-slate-500 mb-8">{filtered.length} позиций</p>

      <div className="flex gap-8">
        {/* Sidebar (desktop) */}
        <ProductFilters className="hidden lg:block w-64 shrink-0" />

        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {/* Mobile filters */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden gap-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  Фильтры
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto">
                <ProductFilters className="pt-6" />
              </SheetContent>
            </Sheet>

            {/* Search */}
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Поиск по названию, бренду..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 rounded-xl"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-slate-400 hover:text-slate-700" />
                </button>
              )}
            </div>

            {/* Sort */}
            <Select
              value={sort}
              onValueChange={(v) => setSort(v as SortOption)}
            >
              <SelectTrigger className="w-44 rounded-xl">
                <SelectValue placeholder="Сортировка" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">По умолчанию</SelectItem>
                <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
                <SelectItem value="price-desc">
                  Цена: по убыванию
                </SelectItem>
                <SelectItem value="rating">По рейтингу</SelectItem>
                <SelectItem value="newest">Новинки</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="py-24 text-center text-slate-400">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">Ничего не найдено</p>
              <p className="text-sm mt-1">Попробуйте изменить фильтры</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsPageInner />
    </Suspense>
  );
}
