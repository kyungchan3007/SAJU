import Link from "next/link";
import type { ReactNode } from "react";

const EXPLORE_CARDS: {
  pathname: string;
  iconBg: string;
  title: string;
  desc: string;
  icon: ReactNode;
}[] = [
  {
    pathname: "/compatibility",
    iconBg: "bg-red-50",
    title: "궁합 보기",
    desc: "나와 잘 맞는 사람은 누구일까요?",
    icon: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="#EF4444"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    pathname: "/mypage/year-fortune",
    iconBg: "bg-amber-50",
    title: "올해 운세",
    desc: "한 해의 흐름을 미리 확인하세요.",
    icon: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="#F59E0B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    pathname: "/mypage/traditional-fortune",
    iconBg: "bg-blue-50",
    title: "정통사주",
    desc: "나의 성격과 잠재력을 깊이 분석해드려요.",
    icon: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="#3B82F6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    pathname: "/location",
    iconBg: "bg-saju-light",
    title: "추천 장소",
    desc: "오늘 나에게 맞는 장소를 찾아보세요.",
    icon: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="#5956E9"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

export function SajuExploreSection() {
  return (
    <div>
      <h3 className="mb-3 text-[14px] font-bold text-gray-900">탐색하기</h3>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        {EXPLORE_CARDS.map((card) => (
          <Link
            key={card.title}
            href={{ pathname: card.pathname }}
            className="flex flex-col gap-2.5 rounded-[14px] border border-gray-100 bg-white p-4 transition-all duration-150 hover:-translate-y-0.5 hover:border-saju-border hover:shadow-md"
            style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${card.iconBg}`}
            >
              {card.icon}
            </div>
            <div>
              <p className="text-[12.5px] font-bold text-gray-900">
                {card.title}
              </p>
              <p className="mt-0.5 text-[11px] leading-[1.5] text-gray-400">
                {card.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
