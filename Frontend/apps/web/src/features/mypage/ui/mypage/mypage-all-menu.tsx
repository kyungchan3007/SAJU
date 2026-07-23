import Link from "next/link";
import type { Route } from "next";

import {
  MYPAGE_ALL_MENU_ITEMS,
  type MypageAllMenuIconKey,
} from "@/shared/model/mypage-menu/model";

function renderMenuIcon(iconKey: MypageAllMenuIconKey) {
  switch (iconKey) {
    case "today-fortune":
      return (
        <svg
          fill="none"
          height="32"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          width="32"
        >
          <path d="M2 22h20" />
          <path d="M12 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
          <path d="M12 10a4 4 0 0 1 4 4" />
        </svg>
      );
    case "saju-analysis":
      return (
        <svg
          fill="none"
          height="32"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          width="32"
        >
          <path d="M8 3H2v15h7c1.7 0 3 1.3 3 3V7c0-2.2-1.8-4-4-4Z" />
          <path d="M16 3h6v15h-7c-1.7 0-3 1.3-3 3V7c0-2.2 1.8-4 4-4Z" />
          <path d="m9 9 2 2 4-4" />
        </svg>
      );
    case "compatibility":
      return (
        <svg
          fill="none"
          height="32"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          width="32"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
        </svg>
      );
    case "zodiac-compatibility":
      return (
        <svg
          fill="none"
          height="32"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          width="32"
        >
          <path d="M21 10V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h7" />
          <path d="M16 2v4" />
          <path d="M8 2v4" />
          <path d="M3 10h18" />
          <path d="M15 14a2.5 2.5 0 1 0 3 3.5" />
          <path d="M18 17.5a2.5 2.5 0 1 0 3-3.5" />
          <path d="M18 21c-1.5 0-3-1.5-3-3.5 0-2 1.5-3.5 3-3.5s3 1.5 3 3.5c0 2-1.5 3.5-3 3.5Z" />
        </svg>
      );
    case "year-fortune":
      return (
        <svg
          fill="none"
          height="32"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          width="32"
        >
          <path d="M8 2v4" />
          <path d="M16 2v4" />
          <rect height="18" rx="2" width="18" x="3" y="4" />
          <path d="M3 10h18" />
          <path d="M8 14h.01" />
          <path d="M12 14h.01" />
          <path d="M16 14h.01" />
          <path d="M8 18h.01" />
          <path d="M12 18h.01" />
          <path d="M16 18h.01" />
        </svg>
      );
    default:
      return null;
  }
}

export function MypageAllMenu() {
  return (
    <section
      className="border border-slate-100 bg-white p-8 shadow-sm"
      style={{ borderRadius: 24 }}
    >
      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-800">전체 메뉴</h3>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {MYPAGE_ALL_MENU_ITEMS.map((item) => (
          <Link
            key={item.label}
            href={item.href as Route}
            className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-colors transition-shadow hover:border-[#5956E9]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5956E9]/70 focus-visible:ring-offset-2"
          >
            <div
              className="mb-4 transition-transform group-hover:scale-110"
              style={{ color: "#5956E9" }}
            >
              {renderMenuIcon(item.iconKey)}
            </div>
            <span className="mb-1 text-xs font-bold text-slate-800">
              {item.label}
            </span>
            <span className="text-[10px] text-slate-500">{item.sub}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
