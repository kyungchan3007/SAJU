"use client";

import { useState } from "react";
import type { NavMenuItem, NavTab } from "../../type/types";

const TABS: NavTab[] = ["운세"];

const MENU_BY_TAB: Record<NavTab, NavMenuItem[]> = {
  운세: [
    { icon: "🔮", label: "오늘의 운세", sub: "매일 업데이트", href: "/saju" },
    { icon: "⭐", label: "사주분석", sub: "사주 기반 풀이", href: "/saju" },
    {
      icon: "💑",
      label: "궁합",
      sub: "두 사람의 인연",
      href: "/compatibility",
    },
    {
      icon: "🐯",
      label: "띠별궁합",
      sub: "띠로 보는 인연",
      href: "/mypage/zodiac-compatibility",
    },
    { icon: "📅", label: "신년운세", sub: "2025년 흐름", href: "/saju" },
  ],
};

// 추후 메뉴 확장 시 NavTab 타입에 항목을 다시 추가하고 MENU_BY_TAB에 복구한다.
// 타로: [
//   { icon: "🃏", label: "오늘의 타로", sub: "한 장 뽑기", href: "#" },
//   { icon: "🌙", label: "연애 타로", sub: "관계 에너지", href: "#" },
//   { icon: "💼", label: "직업 타로", sub: "커리어 방향", href: "#" },
//   { icon: "✨", label: "종합 타로", sub: "전반적 흐름", href: "#" },
// ],
// 상담: [
//   { icon: "💬", label: "1:1 실시간 상담", sub: "전문 상담사", href: "#" },
//   { icon: "📝", label: "전화 상담", sub: "예약 상담", href: "#" },
//   { icon: "🤝", label: "채팅 상담", sub: "텍스트 상담", href: "#" },
//   { icon: "📺", label: "영상 상담", sub: "화상 연결", href: "#" },
// ],
// 점신몰: [
//   { icon: "🛍", label: "부적", sub: "행운 아이템", href: "#" },
//   { icon: "💍", label: "액세서리", sub: "에너지 소품", href: "#" },
//   { icon: "📖", label: "사주책", sub: "운세 도서", href: "#" },
//   { icon: "🎁", label: "기프트", sub: "선물 패키지", href: "#" },
// ],

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
