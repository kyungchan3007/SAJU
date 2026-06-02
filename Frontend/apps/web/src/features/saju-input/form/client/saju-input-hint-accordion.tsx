"use client";

import { useState } from "react";

const HINTS = [
  "양력과 음력 중 어떤 기준인지 먼저 확인한 뒤 입력해 주세요.",
  "출생 시간을 모르셔도 시간 미상 여부를 선택해 진행하실 수 있습니다.",
  "출생 시간까지 입력하시면 사주 해석 결과를 더 풍부하게 받아보실 수 있습니다.",
];

export function SajuInputHintAccordion() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="mb-7 overflow-hidden rounded-2xl"
      style={{ background: "#F0EEFF" }}
    >
      {/* 헤더 토글 */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between px-4 py-3.5"
      >
        <div className="flex items-center gap-2">
          <span className="text-base">💡</span>
          <span
            className="text-xs font-bold"
            style={{ color: "#5956E9" }}
          >
            입력 전 확인하세요
          </span>
        </div>
        <span
          className="text-xs font-bold transition-transform duration-200"
          style={{
            color: "#5956E9",
            display: "inline-block",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          ▼
        </span>
      </button>

      {/* 콘텐츠 */}
      <div
        className="transition-all duration-200"
        style={{
          maxHeight: isOpen ? "200px" : "0px",
          overflow: "hidden",
        }}
      >
        <ul
          className="flex flex-col gap-1.5 px-4 pb-4"
          style={{ wordBreak: "keep-all" }}
        >
          {HINTS.map((hint, i) => (
            <li
              key={i}
              className="flex items-start gap-1.5 text-[11px] font-semibold leading-relaxed"
              style={{ color: "#5956E9" }}
            >
              <span className="mt-0.5 shrink-0">·</span>
              <span>{hint}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
