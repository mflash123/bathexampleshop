"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Truck, Star, ChevronRight } from "lucide-react";

const stats = [
  { value: "500+", label: "Позиций" },
  { value: "12", label: "Брендов" },
  { value: "10 лет", label: "Гарантия" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      {/* Grid texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      {/* Soft glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-20 md:py-28 lg:py-32">
          {/* Left column — text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/10 text-blue-300 text-xs font-medium px-3.5 py-1.5 rounded-full mb-8 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400" />
                </span>
                Премиальная сантехника
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
                Ванная вашей{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
                  мечты
                </span>
              </h1>

              <p className="text-base md:text-lg text-slate-400 mb-10 max-w-lg leading-relaxed">
                Более 500 позиций фирменной сантехники от ведущих европейских брендов. Официальная гарантия, доставка по всей России.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-col sm:flex-row gap-3 mb-12"
            >
              <Button
                asChild
                size="lg"
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-7 rounded-xl shadow-lg shadow-blue-600/25 h-12"
              >
                <Link href="/products">
                  Смотреть каталог
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/15 bg-white/[0.04] text-white hover:bg-white/10 rounded-xl backdrop-blur-sm h-12"
              >
                <Link href="/products?category=Смесители">
                  Смесители от 8 490 ₽
                  <ChevronRight className="ml-1 w-4 h-4 opacity-50" />
                </Link>
              </Button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-5 text-[13px] text-slate-500"
            >
              {[
                { icon: Shield, text: "Гарантия до 10 лет" },
                { icon: Truck, text: "Доставка по РФ" },
                { icon: Star, text: "Официальный дилер" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-blue-400/80" />
                  {text}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right column — floating stats card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-sm">
              {/* Glass card */}
              <div className="bg-white/[0.05] border border-white/10 backdrop-blur-md rounded-3xl p-8">
                <div className="space-y-6">
                  {stats.map(({ value, label }) => (
                    <div key={label} className="flex items-baseline justify-between border-b border-white/[0.06] pb-5 last:border-0 last:pb-0">
                      <span className="text-3xl font-bold text-white">{value}</span>
                      <span className="text-sm text-slate-500">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Decorative ring */}
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-blue-500/20 via-transparent to-cyan-500/20 -z-10 blur-sm" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
