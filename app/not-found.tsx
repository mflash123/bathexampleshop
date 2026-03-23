import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Страница не найдена",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <p className="text-8xl mb-6">🛁</p>
      <h1 className="text-4xl font-bold text-slate-900 mb-3">404</h1>
      <p className="text-xl text-slate-600 mb-2">Страница не найдена</p>
      <p className="text-slate-400 mb-10 max-w-sm">
        Запрошенная страница не существует или была перемещена.
      </p>
      <div className="flex gap-3">
        <Link
          href="/"
          className="bg-slate-900 text-white rounded-xl px-6 py-3 font-medium hover:bg-slate-800 transition-colors"
        >
          На главную
        </Link>
        <Link
          href="/products"
          className="border border-slate-200 text-slate-700 rounded-xl px-6 py-3 font-medium hover:bg-slate-50 transition-colors"
        >
          Каталог
        </Link>
      </div>
    </div>
  );
}
