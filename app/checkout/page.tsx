"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/store/useCart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  CreditCard,
  Truck,
  Lock,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const schema = z.object({
  firstName: z.string().min(2, "Минимум 2 символа"),
  lastName: z.string().min(2, "Минимум 2 символа"),
  phone: z.string().regex(/^\+?[0-9]{10,14}$/, "Некорректный номер телефона"),
  email: z.string().email("Некорректный email"),
  city: z.string().min(2, "Укажите город"),
  address: z.string().min(5, "Укажите улицу и дом"),
  cardNumber: z
    .string()
    .regex(/^\d{4} \d{4} \d{4} \d{4}$/, "Формат: 4444 4444 4444 4444"),
  cardExpiry: z
    .string()
    .regex(/^\d{2}\/\d{2}$/, "Формат: ММ/ГГ"),
  cardCvc: z.string().regex(/^\d{3}$/, "3 цифры"),
});

type FormData = z.infer<typeof schema>;

function formatCard(v: string) {
  return v
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatExpiry(v: string) {
  return v
    .replace(/\D/g, "")
    .slice(0, 4)
    .replace(/(\d{2})(\d)/, "$1/$2");
}

export default function CheckoutPage() {
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const [step, setStep] = useState<"form" | "processing" | "success">("form");
  const [cardNum, setCardNum] = useState("");
  const [cardExp, setCardExp] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = () => {
    setStep("processing");
    setTimeout(() => {
      setStep("success");
      clearCart();
    }, 2500);
  };

  if (items.length === 0 && step === "form") {
    return (
      <div className="container mx-auto px-4 py-24 flex flex-col items-center text-center">
        <ShoppingBag className="w-20 h-20 text-slate-200 mb-6" />
        <h1 className="text-2xl font-bold text-slate-900 mb-4">
          Корзина пуста
        </h1>
        <Button asChild size="lg" className="rounded-xl">
          <Link href="/products">Перейти в каталог</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <AnimatePresence mode="wait">
        {step === "processing" && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-[60vh] flex flex-col items-center justify-center gap-6"
          >
            <div className="w-16 h-16 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
            <p className="text-lg font-medium text-slate-700">
              Обрабатываем платёж...
            </p>
          </motion.div>
        )}

        {step === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="min-h-[60vh] flex flex-col items-center justify-center gap-6 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 250 }}
            >
              <CheckCircle2 className="w-20 h-20 text-green-500" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Заказ оформлен!
              </h1>
              <p className="text-slate-500 max-w-md">
                Спасибо за покупку! Мы свяжемся с вами в течение часа для
                подтверждения заказа и уточнения деталей доставки.
              </p>
            </div>
            <div className="flex gap-4">
              <Button asChild className="rounded-xl">
                <Link href="/">На главную</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-xl">
                <Link href="/products">Продолжить покупки</Link>
              </Button>
            </div>
          </motion.div>
        )}

        {step === "form" && (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h1 className="text-3xl font-bold text-slate-900 mb-8">
              Оформление заказа
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:col-span-2 space-y-8"
              >
                {/* Personal */}
                <section>
                  <h2 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-blue-500" />
                    Контактные данные
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(
                      [
                        ["firstName", "Имя", "Иван"],
                        ["lastName", "Фамилия", "Иванов"],
                        ["phone", "Телефон", "+7 999 000 00 00"],
                        ["email", "Email", "ivan@example.com"],
                      ] as const
                    ).map(([name, label, placeholder]) => (
                      <div key={name}>
                        <Label htmlFor={name} className="mb-1.5 block text-sm">
                          {label}
                        </Label>
                        <Input
                          id={name}
                          placeholder={placeholder}
                          {...register(name)}
                          className={errors[name] ? "border-red-400" : ""}
                        />
                        {errors[name] && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors[name]?.message}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>

                {/* Delivery */}
                <section>
                  <h2 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-blue-500" />
                    Адрес доставки
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city" className="mb-1.5 block text-sm">
                        Город
                      </Label>
                      <Input
                        id="city"
                        placeholder="Москва"
                        {...register("city")}
                        className={errors.city ? "border-red-400" : ""}
                      />
                      {errors.city && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.city.message}
                        </p>
                      )}
                    </div>
                    <div className="sm:col-span-1">
                      <Label htmlFor="address" className="mb-1.5 block text-sm">
                        Улица, дом, квартира
                      </Label>
                      <Input
                        id="address"
                        placeholder="ул. Ленина, д. 1, кв. 5"
                        {...register("address")}
                        className={errors.address ? "border-red-400" : ""}
                      />
                      {errors.address && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.address.message}
                        </p>
                      )}
                    </div>
                  </div>
                </section>

                {/* Payment */}
                <section>
                  <h2 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-blue-500" />
                    Оплата картой
                  </h2>
                  <div className="bg-slate-50 rounded-2xl p-5 space-y-4">
                    <div>
                      <Label className="mb-1.5 block text-sm">
                        Номер карты
                      </Label>
                      <Input
                        placeholder="4444 4444 4444 4444"
                        value={cardNum}
                        maxLength={19}
                        {...register("cardNumber", {
                          onChange: (e) => setCardNum(formatCard(e.target.value)),
                        })}
                        className={
                          errors.cardNumber
                            ? "border-red-400"
                            : "bg-white font-mono"
                        }
                      />
                      {errors.cardNumber && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.cardNumber.message}
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="mb-1.5 block text-sm">Срок</Label>
                        <Input
                          placeholder="ММ/ГГ"
                          value={cardExp}
                          maxLength={5}
                          {...register("cardExpiry", {
                            onChange: (e) => setCardExp(formatExpiry(e.target.value)),
                          })}
                          className={
                            errors.cardExpiry ? "border-red-400" : "bg-white font-mono"
                          }
                        />
                        {errors.cardExpiry && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.cardExpiry.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label className="mb-1.5 block text-sm">CVC</Label>
                        <Input
                          placeholder="123"
                          maxLength={3}
                          {...register("cardCvc")}
                          className={
                            errors.cardCvc ? "border-red-400" : "bg-white font-mono"
                          }
                        />
                        {errors.cardCvc && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.cardCvc.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Lock className="w-3.5 h-3.5" />
                      Ваши данные защищены SSL-шифрованием. Это демо — реальная
                      оплата не производится.
                    </div>
                  </div>
                </section>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-13 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-base"
                >
                  <Lock className="mr-2 w-4 h-4" />
                  Оплатить {totalPrice().toLocaleString("ru-RU")} ₽
                </Button>
              </form>

              {/* Order summary */}
              <div>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sticky top-20">
                  <h2 className="font-bold text-slate-900 mb-4">
                    Ваш заказ ({totalItems()} товара)
                  </h2>
                  <div className="space-y-3 mb-4 max-h-72 overflow-y-auto pr-1">
                    {items.map((item) => (
                      <div
                        key={`${item.product.id}-${item.selectedColor}`}
                        className="flex gap-3"
                      >
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-50 shrink-0">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-slate-800 line-clamp-1">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-slate-400">
                            x{item.quantity}
                          </p>
                        </div>
                        <span className="text-xs font-semibold text-slate-700 shrink-0">
                          {(item.product.price * item.quantity).toLocaleString(
                            "ru-RU"
                          )}{" "}
                          ₽
                        </span>
                      </div>
                    ))}
                  </div>
                  <Separator className="mb-4" />
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>Итого</span>
                    <span>{totalPrice().toLocaleString("ru-RU")} ₽</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
