"use client";

import Image from "next/image";

import { ZODIAC_LIST } from "@/shared/model/zodiac/model";

type ZodiacListProps = {
  highlightedIndex?: number | null;
};

export default function ZodiacList({
  highlightedIndex = null,
}: ZodiacListProps) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-6">
      {ZODIAC_LIST.map((z, index) => {
        const isActive = highlightedIndex === index;
        return (
          <div
            key={z.name}
            className="flex flex-col items-center gap-1.5 rounded-[12px] border px-2 py-3 transition-all duration-150 sm:py-2.5"
            style={
              isActive
                ? { background: "#F0EEFF", borderColor: "#5956E9" }
                : { background: "#fff", borderColor: "#F3F4F6" }
            }
          >
            <Image
              src={`/image/animals/${z.img}`}
              alt={z.name}
              width={40}
              height={40}
              className="object-contain sm:h-8 sm:w-8"
            />
            <span
              className="text-[11px] font-bold sm:text-[10px]"
              style={{ color: isActive ? "#5956E9" : "#9CA3AF" }}
            >
              {z.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
