"use client";

import { useFilters } from "@/lib/store/useFilters";
import { CATEGORIES, BRANDS, products } from "@/lib/products";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { FilterX } from "lucide-react";
import { useMemo } from "react";

const ALL_COLORS = [
  ...new Set(products.flatMap((p) => p.colors)),
].sort();

const ALL_MATERIALS = [
  ...new Set(products.flatMap((p) => p.materials)),
].sort();

const COLOR_MAP: Record<string, string> = {
  chrome: "bg-slate-300",
  black: "bg-slate-900",
  gold: "bg-amber-400",
  brushed: "bg-slate-400",
  white: "bg-white border border-slate-300",
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

export function ProductFilters({ className }: { className?: string }) {
  const {
    categories,
    brands,
    colors,
    materials,
    priceRange,
    inStockOnly,
    toggleCategory,
    toggleBrand,
    toggleColor,
    toggleMaterial,
    setPriceRange,
    setInStockOnly,
    reset,
  } = useFilters();

  const maxPrice = 215000;

  const hasFilters =
    categories.length > 0 ||
    brands.length > 0 ||
    colors.length > 0 ||
    materials.length > 0 ||
    inStockOnly ||
    priceRange[0] > 0 ||
    priceRange[1] < maxPrice;

  return (
    <aside className={cn("space-y-6", className)}>
      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={reset}
          className="text-slate-500 hover:text-red-500 -ml-2"
        >
          <FilterX className="w-4 h-4 mr-1" />
          Сбросить фильтры
        </Button>
      )}

      {/* Categories */}
      <div>
        <h3 className="font-semibold text-slate-800 mb-3 text-sm uppercase tracking-wide">
          Категория
        </h3>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <div key={cat} className="flex items-center gap-2">
              <Checkbox
                id={`cat-${cat}`}
                checked={categories.includes(cat)}
                onCheckedChange={() => toggleCategory(cat)}
              />
              <Label
                htmlFor={`cat-${cat}`}
                className="text-sm text-slate-700 cursor-pointer"
              >
                {cat}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price */}
      <div>
        <h3 className="font-semibold text-slate-800 mb-3 text-sm uppercase tracking-wide">
          Цена, ₽
        </h3>
        <Slider
          min={0}
          max={maxPrice}
          step={1000}
          value={priceRange}
          onValueChange={(v) => setPriceRange(v as [number, number])}
          className="mb-3"
        />
        <div className="flex justify-between text-xs text-slate-500">
          <span>{priceRange[0].toLocaleString("ru-RU")}</span>
          <span>{priceRange[1].toLocaleString("ru-RU")}</span>
        </div>
      </div>

      <Separator />

      {/* Brands */}
      <div>
        <h3 className="font-semibold text-slate-800 mb-3 text-sm uppercase tracking-wide">
          Бренд
        </h3>
        <div className="space-y-2">
          {BRANDS.map((brand) => (
            <div key={brand} className="flex items-center gap-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={brands.includes(brand)}
                onCheckedChange={() => toggleBrand(brand)}
              />
              <Label
                htmlFor={`brand-${brand}`}
                className="text-sm text-slate-700 cursor-pointer"
              >
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Colors */}
      <div>
        <h3 className="font-semibold text-slate-800 mb-3 text-sm uppercase tracking-wide">
          Цвет / Отделка
        </h3>
        <div className="flex flex-wrap gap-2">
          {ALL_COLORS.map((c) => (
            <button
              key={c}
              title={COLOR_LABEL[c] ?? c}
              onClick={() => toggleColor(c)}
              className={cn(
                "w-7 h-7 rounded-full transition-transform hover:scale-110",
                COLOR_MAP[c] ?? "bg-slate-200",
                colors.includes(c) && "ring-2 ring-offset-1 ring-blue-500"
              )}
            />
          ))}
        </div>
      </div>

      <Separator />

      {/* Materials */}
      <div>
        <h3 className="font-semibold text-slate-800 mb-3 text-sm uppercase tracking-wide">
          Материал
        </h3>
        <div className="space-y-2">
          {ALL_MATERIALS.map((m) => (
            <div key={m} className="flex items-center gap-2">
              <Checkbox
                id={`mat-${m}`}
                checked={materials.includes(m)}
                onCheckedChange={() => toggleMaterial(m)}
              />
              <Label
                htmlFor={`mat-${m}`}
                className="text-sm text-slate-700 cursor-pointer"
              >
                {m}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* In stock */}
      <div className="flex items-center gap-2">
        <Checkbox
          id="instock"
          checked={inStockOnly}
          onCheckedChange={(v) => setInStockOnly(Boolean(v))}
        />
        <Label htmlFor="instock" className="text-sm text-slate-700 cursor-pointer">
          Только в наличии
        </Label>
      </div>
    </aside>
  );
}
