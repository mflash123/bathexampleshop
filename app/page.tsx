import { HeroSection } from "@/components/HeroSection";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ProductCard } from "@/components/ProductCard";
import { getFeaturedProducts, getNewProducts } from "@/lib/products";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wrench, Headphones, Truck } from "lucide-react";

const BRANDS = [
  "Grohe",
  "Hansgrohe",
  "Roca",
  "Villeroy & Boch",
  "Duravit",
  "AM.PM",
  "Jacob Delafon",
  "Laufen",
];

const FEATURES = [
  {
    icon: Wrench,
    title: "Монтаж под ключ",
    desc: "Профессиональная установка с гарантией на работы",
  },
  {
    icon: Truck,
    title: "Бесплатная доставка",
    desc: "При заказе от 15 000 ₽ по Москве и области",
  },
  {
    icon: Headphones,
    title: "Поддержка 24/7",
    desc: "Консультация специалистов в любое время",
  },
];

export default function HomePage() {
  const featured = getFeaturedProducts();
  const newProducts = getNewProducts();

  return (
    <>
      <HeroSection />

      <CategoryGrid />

      {/* Brands marquee */}
      <section className="border-y border-slate-100 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-3">
            {BRANDS.map((b) => (
              <span
                key={b}
                className="text-sm font-semibold text-slate-300 hover:text-slate-500 transition-colors cursor-default select-none tracking-wide"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              Популярное
            </h2>
            <p className="text-slate-500 mt-1.5 text-sm md:text-base">
              Самые востребованные позиции сезона
            </p>
          </div>
          <Button asChild variant="ghost" className="hidden sm:inline-flex text-slate-500 hover:text-slate-900">
            <Link href="/products">
              Весь каталог <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="mt-8 flex sm:hidden">
          <Button asChild variant="outline" className="w-full rounded-xl h-11">
            <Link href="/products">Весь каталог</Link>
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4 py-14 md:py-16">
          <div className="grid sm:grid-cols-3 gap-8 md:gap-12">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm mb-1">{title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white">
          {/* Texture */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:48px_48px]" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]" />

          <div className="relative z-10 p-10 md:p-16 max-w-2xl">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 tracking-tight">
              Профессиональная установка под ключ
            </h2>
            <p className="text-slate-400 mb-8 text-base md:text-lg leading-relaxed">
              Наши мастера выполнят монтаж любой сложности. Гарантия на работы до 5 лет.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-slate-900 hover:bg-slate-100 rounded-xl font-semibold h-12 px-7"
            >
              <Link href="/products">
                Выбрать сантехнику
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* New products */}
      <section className="container mx-auto px-4 pb-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              Новинки
            </h2>
            <p className="text-slate-500 mt-1.5 text-sm md:text-base">
              Только что появились в каталоге
            </p>
          </div>
          <Button asChild variant="ghost" className="hidden sm:inline-flex text-slate-500 hover:text-slate-900">
            <Link href="/products">
              Все новинки <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {newProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
