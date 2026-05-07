"use client";

import { useState } from "react";
import type { BannerItem } from "../type/types";

type Props = { items: BannerItem[] };

export function MypageBanner({ items }: Props) {
  const [current, setCurrent] = useState(0);
  const item = items[current];

  return (
    <div
      className="relative flex min-h-[100px] items-center justify-between overflow-hidden rounded-sm border-2 border-black px-6 py-5"
      style={{
        background: "linear-gradient(135deg, #DDD6FE 0%, #BAE6FD 100%)",
        boxShadow: "4px 4px 0 #0d0d0d",
      }}
    >
      <div className="flex flex-col gap-2">
        <span className="inline-block w-fit rounded-full border border-black/30 bg-white/60 px-3 py-0.5 text-[10px] font-bold text-[#0d0d0d]">
          {item.tag}
        </span>
        <span className="whitespace-pre-line font-bold leading-tight text-[#0d0d0d] lg:text-xl">
          {item.title}
        </span>
      </div>

      <span className="text-5xl lg:text-6xl">{item.emoji}</span>

      {items.length > 1 && (
        <div className="absolute bottom-3 right-4 flex items-center gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`배너 ${i + 1}`}
              className={`h-1.5 rounded-full border border-black/20 transition-all ${
                i === current ? "w-4 bg-[#0d0d0d]" : "w-1.5 bg-black/25"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
