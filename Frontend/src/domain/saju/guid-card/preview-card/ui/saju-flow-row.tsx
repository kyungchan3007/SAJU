import type { ReactNode } from "react";

type FlowType = "good" | "bad" | "caution" | "place";

type FlowRowProps = {
  type: FlowType;
  title: string;
  items: string[];
  isLast?: boolean;
};

const FLOW_ROW_CONFIG: Record<
  FlowType,
  { bg: string; color: string; icon: ReactNode }
> = {
  good: {
    bg: "#F0FDF4",
    color: "#16A34A",
    icon: (
      <svg width="16" height="16" fill="#16A34A" viewBox="0 0 24 24">
        <path d="M7 10l5-6 5 6H7z" />
        <rect x="6" y="11" width="12" height="7" rx="1" />
      </svg>
    ),
  },
  bad: {
    bg: "#FEF2F2",
    color: "#DC2626",
    icon: (
      <svg width="16" height="16" fill="#DC2626" viewBox="0 0 24 24">
        <path d="M17 14l-5 6-5-6h10z" />
        <rect x="6" y="6" width="12" height="7" rx="1" />
      </svg>
    ),
  },
  caution: {
    bg: "#FFFBEB",
    color: "#D97706",
    icon: (
      <svg
        width="16"
        height="16"
        fill="none"
        stroke="#D97706"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  place: {
    bg: "#EFF6FF",
    color: "#2563EB",
    icon: (
      <svg width="16" height="16" fill="#2563EB" viewBox="0 0 24 24">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </svg>
    ),
  },
};

export function SajuFlowRow({
  type,
  title,
  items,
  isLast = false,
}: FlowRowProps) {
  const { bg, color, icon } = FLOW_ROW_CONFIG[type];

  return (
    <div
      className={`flex flex-col gap-1.5 py-[11px] ${!isLast ? "border-b border-gray-100" : ""}`}
    >
      {/* 아이콘 + 타이틀 */}
      <div className="flex items-center gap-2">
        <div
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
          style={{ background: bg, color }}
        >
          {icon}
        </div>
        <p className="text-[12px] font-semibold text-gray-900">{title}</p>
      </div>

      {/* 항목 리스트 */}
      <ul className="list-inside list-disc pl-9">
        {items.length > 0 ? (
          items.map((item, index) => (
            <li
              key={index}
              className="text-[11.5px] leading-[1.55] text-gray-400"
              style={{ wordBreak: "keep-all" }}
            >
              {item}
            </li>
          ))
        ) : (
          <li className="text-[11.5px] text-gray-300">-</li>
        )}
      </ul>
    </div>
  );
}
