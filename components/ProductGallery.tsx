"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  images: string[];
  name: string;
};

export function ProductGallery({ images, name }: Props) {
  const [active, setActive] = useState(0);
  const all = images.length > 0 ? images : ["/images/placeholder.jpg"];

  const prev = () => setActive((i) => (i === 0 ? all.length - 1 : i - 1));
  const next = () => setActive((i) => (i === all.length - 1 ? 0 : i + 1));

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-100">
        <Image
          src={all[active]}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          unoptimized
          priority
        />
        {all.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition"
            >
              <ChevronLeft className="w-5 h-5 text-slate-700" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition"
            >
              <ChevronRight className="w-5 h-5 text-slate-700" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {all.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {all.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                "relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all",
                i === active
                  ? "border-blue-500 ring-1 ring-blue-300"
                  : "border-transparent hover:border-slate-200"
              )}
            >
              <Image
                src={src}
                alt={`${name} ${i + 1}`}
                fill
                className="object-cover"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
