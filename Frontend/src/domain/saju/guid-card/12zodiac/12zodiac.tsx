"use client";

import { OpenmojiImg } from "@/shared/ui/openmoji-img";
import { ZODIAC_LIST } from "@/shared/model/zodiac/model";

type ZodiacListProps = {
  highlightedIndex?: number | null;
};

export default function ZodiacList({
  highlightedIndex = null,
}: ZodiacListProps) {
  return (
    <div className="mt-6">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-sketch-muted">
        12 간지 동물
      </p>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {ZODIAC_LIST.map((z, index) => {
          const isActive = highlightedIndex === index;

          return (
            <div
              key={z.name}
              className={`relative overflow-hidden border-2 p-3 text-center transition-all duration-200 ${
                isActive
                  ? "border-black bg-sketch-paper"
                  : "border-black/20 bg-white"
              }`}
              style={
                isActive
                  ? { boxShadow: "4px 4px 0 #000" }
                  : { boxShadow: "2px 2px 0 rgba(0,0,0,0.08)" }
              }
            >
              <div className="relative z-10 flex flex-col items-center gap-1.5">
                <div className="grid h-[48px] w-[48px] place-items-center">
                  <OpenmojiImg emoji={z.emoji} size={40} alt={z.name} />
                </div>
                <strong
                  className={`text-xs font-semibold ${isActive ? "text-sketch-ink" : "text-sketch-ink"}`}
                >
                  {z.name}
                </strong>
                <span className="text-[11px] text-sketch-subtle">
                  {z.hanja}
                </span>
              </div>

              {isActive && (
                <span className="absolute right-1.5 top-1.5 border-2 border-black bg-black px-1.5 py-0.5 text-[10px] font-bold text-white">
                  선택됨
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
