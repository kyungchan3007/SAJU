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
    <div className="mt-4 grid grid-cols-6 gap-2">
      {ZODIAC_LIST.map((z, index) => {
        const isActive = highlightedIndex === index;
        return (
          <div
            key={z.name}
            className="flex flex-col items-center gap-1.5 rounded-[12px] border px-2 py-2.5 transition-all duration-150"
            style={
              isActive
                ? { background: "#F0EEFF", borderColor: "#5956E9" }
                : { background: "#fff", borderColor: "#F3F4F6" }
            }
          >
            <Image
              src={`/image/animals/${z.img}`}
              alt={z.name}
              width={32}
              height={32}
              className="object-contain"
            />
            <span
              className="text-[10px] font-bold"
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
