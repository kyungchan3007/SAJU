"use client";

import Link from "next/link";
import type { Route } from "next";

import { useHomeTodaySajuCard } from "@/features/home/hooks/useHomeTodaySajuCard";
import { formatWeakElementLabel } from "@/shared/utils/weakElement";

export function HomeTodaySajuCard() {
  const { daily, error, fiveElementRows, isLoading } = useHomeTodaySajuCard();

  if (isLoading) {
    return (
      <div className="hero-panel flex flex-col gap-3">
        <p className="text-xs font-bold text-gray-900">나의 오행 분석</p>
        <p className="text-sm text-gray-400">
          오행 데이터를 불러오는 중이에요.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="hero-panel flex flex-col gap-4">
        <p className="text-xs font-bold text-gray-900">나의 오행 분석</p>
        <p className="text-sm text-gray-400">
          {error instanceof Error
            ? error.message
            : "데이터를 불러오지 못했어요."}
        </p>
        <Link
          href={"/saju/result" as Route}
          className="btn-saju btn-saju-primary text-center text-sm"
        >
          결과 다시 확인하기
        </Link>
      </div>
    );
  }

  return (
    <div className="hero-panel flex flex-col gap-3">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-gray-900">나의 오행 분석</span>
        <Link
          href={"/saju/result" as Route}
          className="text-[11px] font-medium"
          style={{ color: "#5956E9" }}
        >
          자세히 보기 &gt;
        </Link>
      </div>

      {/* 오늘의 점수 */}
      {daily?.todayScore != null && (
        <div className="flex items-center gap-2 rounded-xl bg-[#F5F4FF] px-3 py-2">
          <span className="text-xs text-gray-500">오늘의 점수</span>
          <span
            className="ml-auto text-sm font-black"
            style={{ color: "#5956E9" }}
          >
            {daily.todayScore}점
          </span>
        </div>
      )}

      {/* 오행 균형 바 */}
      <div>
        <div className="mb-2 text-[10px] text-gray-400">오행 균형</div>
        <div className="flex flex-col gap-1.5">
          {fiveElementRows.map((element) => (
            <div key={element.key} className="flex items-center gap-2">
              <span className="w-3 text-[10px] text-gray-500">
                {element.label}
              </span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${element.percentage}%`,
                    background: element.color,
                  }}
                />
              </div>
              <span className="w-8 text-right text-[10px] text-gray-400">
                {element.percentageLabel}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 나의 주 오행 뱃지 */}
      {daily?.weakElement && (
        <div className="border-t border-dashed border-gray-100 pt-2">
          <div className="mb-1 text-[10px] text-gray-400">나의 주 오행</div>
          <span
            className="rounded px-2 py-0.5 text-[10px] font-semibold"
            style={{ background: "#EEF", color: "#5956E9" }}
          >
            {formatWeakElementLabel(daily.weakElement)}
          </span>
        </div>
      )}
    </div>
  );
}
