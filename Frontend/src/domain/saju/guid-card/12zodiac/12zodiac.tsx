"use client";

import { zodiacList } from "@/domain/saju/guid-card/12zodiac/model/model";

type ZodiacListProps = {
  highlightedIndex?: number | null;
};

export default function ZodiacList({ highlightedIndex = null }: ZodiacListProps) {
  return (
    <div className="mt-6">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[rgba(167,181,227,0.7)]">
        12 간지 동물
      </p>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {zodiacList.map((z, index) => {
          const isActive = highlightedIndex === index;

          return (
            <div
              key={z.name}
              className={`relative overflow-hidden rounded-[22px] border p-3 text-center transition-all duration-300 ${
                isActive
                  ? "border-[rgba(255,214,130,0.8)] bg-[linear-gradient(165deg,rgba(255,219,156,0.24),rgba(253,168,102,0.16))] shadow-[0_14px_32px_rgba(255,176,94,0.3)] ring-1 ring-[rgba(255,214,130,0.35)]"
                  : "border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)]"
              }`}
            >
              <div className="relative z-10 flex flex-col items-center gap-1.5">
                <div
                  className={`grid h-[48px] w-[48px] place-items-center rounded-[18px] text-2xl ${
                    isActive ? "shadow-[0_8px_18px_rgba(255,176,94,0.45)]" : ""
                  }`}
                  style={{
                    background: isActive
                      ? "linear-gradient(145deg, rgba(255,236,176,0.95), rgba(255,174,96,0.82))"
                      : "linear-gradient(135deg, rgba(178,121,255,0.18), rgba(88,120,190,0.22))",
                  }}
                >
                  {z.emoji}
                </div>
                <strong
                  className={`text-xs font-semibold ${
                    isActive
                      ? "text-[rgba(255,248,230,0.98)]"
                      : "text-[rgba(252,247,255,0.9)]"
                  }`}
                >
                  {z.name}
                </strong>
                <span
                  className={`text-[11px] ${
                    isActive
                      ? "text-[rgba(255,236,198,0.92)]"
                      : "text-[rgba(167,181,227,0.7)]"
                  }`}
                >
                  {z.hanja}
                </span>
              </div>

              {isActive ? (
                <>
                  <span className="absolute right-2 top-2 rounded-full bg-[rgba(255,226,154,0.28)] px-2 py-0.5 text-[10px] font-semibold text-[rgba(255,244,214,0.95)]">
                    선택됨
                  </span>
                  <span className="pointer-events-none absolute -right-6 -top-8 h-20 w-20 rounded-full bg-[rgba(255,206,123,0.28)] blur-xl" />
                </>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
