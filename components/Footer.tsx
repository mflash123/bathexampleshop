import Link from "next/link";
import { Droplets, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-24">
      <div className="container mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Droplets className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-white">BathHub</span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Премиальная сантехника и аксессуары для ванной комнаты. Официальные
            дилеры Grohe, Hansgrohe, Roca, Villeroy&amp;Boch.
          </p>
        </div>

        {/* Catalog */}
        <div>
          <h4 className="font-semibold text-white mb-4">Каталог</h4>
          <ul className="space-y-2 text-sm">
            {[
              "Смесители",
              "Душевые системы",
              "Раковины",
              "Унитазы",
              "Ванны",
              "Полотенцесушители",
              "Аксессуары",
            ].map((c) => (
              <li key={c}>
                <Link
                  href={`/products?category=${encodeURIComponent(c)}`}
                  className="hover:text-white transition-colors"
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Info */}
        <div>
          <h4 className="font-semibold text-white mb-4">Информация</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                О нас
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                Доставка и оплата
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                Гарантия и возврат
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                Монтаж и установка
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                Контакты
              </Link>
            </li>
          </ul>
        </div>

        {/* Contacts */}
        <div>
          <h4 className="font-semibold text-white mb-4">Контакты</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-400 shrink-0" />
              <span>+7 (800) 555-35-35</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-400 shrink-0" />
              <span>info@bathhub.ru</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>Москва, ул. Санта-Техникус, 42</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 py-6 text-xs text-slate-500">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} BathHub. Все права защищены. Демо-проект.</span>
          <span>
            Сделано:{" "}
            <a
              href="https://markovpavel.ru"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors underline underline-offset-2"
            >
              markovpavel.ru
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
