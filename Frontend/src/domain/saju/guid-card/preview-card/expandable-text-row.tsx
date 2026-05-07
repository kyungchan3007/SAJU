"use client";

import { useState } from "react";

type Props = {
  label: string;
  value: string;
};

const CLAMP_THRESHOLD = 45;

export function ExpandableTextRow({ label, value }: Props) {
  const [expanded, setExpanded] = useState(false);
  const isTruncatable = value.length > CLAMP_THRESHOLD;

  return (
    <div className="border-b border-black/15 px-1 py-2.5 last:border-b-0">
      <span className="text-xs font-bold text-black">{label}</span>
      <p
        className={[
          "mt-1 text-xs leading-relaxed text-black/50",
          isTruncatable && !expanded ? "line-clamp-2" : "",
        ].join(" ")}
      >
        {value}
      </p>
      {isTruncatable && (
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-0.5 text-[10px] font-semibold text-black/35 underline transition hover:text-black/60"
        >
          {expanded ? "접기" : "더보기"}
        </button>
      )}
    </div>
  );
}
