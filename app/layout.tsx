import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { StoreHydration } from "@/components/StoreHydration";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "BathHub — Премиальная сантехника",
    template: "%s | BathHub",
  },
  description:
    "Интернет-магазин фирменной сантехники и товаров для ванной комнаты. Grohe, Hansgrohe, Roca, Villeroy & Boch, Duravit и другие бренды.",
  keywords: ["сантехника", "смесители", "ванны", "душевые системы", "раковины", "унитазы"],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "BathHub",
    title: "BathHub — Премиальная сантехника",
    description: "Интернет-магазин фирменной сантехники и товаров для ванной комнаты.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased font-sans bg-white text-slate-900">
        <StoreHydration />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
