import Link from "next/link";
import { CATEGORIES } from "@/lib/products";
import {
  Droplets,
  ShowerHead,
  Waves,
  Circle,
  Bath,
  Flame,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

const ICONS: Record<string, React.ReactNode> = {
  Смесители: <Droplets className="w-6 h-6" />,
  "Душевые системы": <ShowerHead className="w-6 h-6" />,
  Раковины: <Waves className="w-6 h-6" />,
  Унитазы: <Circle className="w-6 h-6" />,
  Ванны: <Bath className="w-6 h-6" />,
  Полотенцесушители: <Flame className="w-6 h-6" />,
  Аксессуары: <Sparkles className="w-6 h-6" />,
};

const COLORS: string[] = [
  "bg-blue-50 text-blue-600 hover:bg-blue-100",
  "bg-cyan-50 text-cyan-600 hover:bg-cyan-100",
  "bg-indigo-50 text-indigo-600 hover:bg-indigo-100",
  "bg-violet-50 text-violet-600 hover:bg-violet-100",
  "bg-sky-50 text-sky-600 hover:bg-sky-100",
  "bg-teal-50 text-teal-600 hover:bg-teal-100",
  "bg-slate-100 text-slate-600 hover:bg-slate-200",
];

export function CategoryGrid() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-20">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Категории
          </h2>
          <p className="text-slate-500 mt-1.5 text-sm md:text-base">
            Найдите именно то, что вам нужно
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {CATEGORIES.map((cat, i) => (
          <Link
            key={cat}
            href={`/products?category=${encodeURIComponent(cat)}`}
            className={`group relative flex flex-col items-center gap-3 p-5 rounded-2xl transition-all duration-200 ${COLORS[i % COLORS.length]}`}
          >
            <div className="transition-transform duration-200 group-hover:scale-110">
              {ICONS[cat]}
            </div>
            <span className="text-xs font-semibold text-center leading-tight">
              {cat}
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 absolute top-3 right-3 opacity-0 group-hover:opacity-60 transition-opacity" />
          </Link>
        ))}
      </div>
    </section>
  );
}
