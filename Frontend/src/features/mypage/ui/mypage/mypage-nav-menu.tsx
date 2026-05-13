"use client";

import { useState } from "react";
import type { NavTab } from "../../type/types";
import { MENU_BY_TAB, TABS } from "@/features/mypage/model/model";

export function MypageNavMenu() {
  const [activeTab, setActiveTab] = useState<NavTab>("운세");
  const items = MENU_BY_TAB[activeTab];

  return (
    <div className="card-saju-primary overflow-hidden">
      {/* 헤더 */}
      <div className="flex items-center justify-between border-b-2 border-black bg-[rgb(240_238_232)] px-5 py-3.5">
        <span className="font-bold text-[#0d0d0d]">전체 메뉴</span>
        <button className="flex items-center gap-1 text-xs text-[#0d0d0d]/50 transition hover:text-[#0d0d0d]">
          🔍 검색
        </button>
      </div>

      {/* 탭 — 모바일: pill, 웹: underline tab */}
      <div className="flex gap-2 overflow-x-auto border-b border-black/10 p-4 lg:gap-0 lg:overflow-visible lg:p-0">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={[
              "shrink-0 text-sm font-semibold transition",
              "rounded-full border-2 border-black px-4 py-1.5",
              "lg:rounded-none lg:border-0 lg:border-b-2 lg:px-6 lg:py-3.5",
              activeTab === tab
                ? "bg-[#0d0d0d] text-white lg:border-[#0d0d0d] lg:bg-white lg:text-[#0d0d0d]"
                : "bg-white text-[#0d0d0d] lg:border-transparent lg:bg-[rgb(240_238_232)] lg:text-[#0d0d0d]/55 lg:hover:bg-white/60",
            ].join(" ")}
            style={activeTab === tab ? { boxShadow: "2px 2px 0 #0d0d0d" } : {}}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 메뉴 그리드 */}
      <div className="grid grid-cols-5 divide-x divide-black/10">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="group flex flex-col items-center gap-2 p-4 transition hover:bg-[rgb(240_238_232)] lg:p-5"
          >
            <div
              className="flex h-12 w-12 items-center justify-center rounded-sm border-2 border-black bg-[rgb(250_248_242)] text-2xl transition group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
              style={{ boxShadow: "3px 3px 0 #0d0d0d" }}
            >
              {item.icon}
            </div>
            <div className="text-center">
              <p className="text-[11px] font-semibold leading-tight text-[#0d0d0d] lg:text-[12px]">
                {item.label}
              </p>
              <p className="mt-0.5 text-[10px] text-[#0d0d0d]/45">{item.sub}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
