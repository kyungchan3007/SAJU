"use client";

import Link from "next/link";
import type { Route } from "next";

import { SajuResultClientError } from "@/entities/saju";
import { useHomeTodaySajuCard } from "@/features/home/hooks/useHomeTodaySajuCard";
import { Button } from "@/shared/ui";
import { formatWeakElementLabel } from "@/shared/utils/weakElement";

const HERO_PANEL_CLASS_NAME =
  "rounded-2xl p-8 backdrop-blur-xl";
const HERO_PANEL_STYLE = {
  background: "rgba(15, 10, 40, 0.50)",
  border: "1px solid rgba(255, 255, 255, 0.15)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.35)",
} as const;

export function HomeTodaySajuCard() {
  const { daily, error, fiveElementRows, isLoading } = useHomeTodaySajuCard();
  const shouldShowSajuInputCta =
    error instanceof SajuResultClientError &&
    error.code === "PENDING_FORM_NOT_FOUND";

  if (isLoading) {
    return (
      <div
        className={`${HERO_PANEL_CLASS_NAME} flex flex-col gap-3`}
        style={HERO_PANEL_STYLE}
      >
        <p className="text-xs font-bold text-white">나의 오행 분석</p>
        <p className="text-sm text-white/50">
          오행 데이터를 불러오는 중이에요.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`${HERO_PANEL_CLASS_NAME} flex flex-col gap-4`}
        style={HERO_PANEL_STYLE}
      >
        <p className="text-xs font-bold text-white">나의 오행 분석</p>
        <p className="text-sm text-white/50">
          {error instanceof Error
            ? error.message
            : "데이터를 불러오지 못했어요."}
        </p>
        <Button asChild size="sm" className="w-full rounded-xl text-sm">
          <Link href={shouldShowSajuInputCta ? ("/saju" as Route) : ("/saju/result" as Route)}>
            {shouldShowSajuInputCta ? "사주 입력하기" : "결과 다시 확인하기"}
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div
      className={`${HERO_PANEL_CLASS_NAME} flex flex-col gap-3`}
      style={HERO_PANEL_STYLE}
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-white">나의 오행 분석</span>
        <Link
          href={"/saju/result" as Route}
          className="text-[11px] font-medium text-white/70 hover:text-white"
        >
          자세히 보기 &gt;
        </Link>
      </div>

      {/* 오늘의 점수 */}
      {daily?.todayScore != null && (
        <div
          className="flex items-center gap-2 rounded-xl px-3 py-2"
          style={{ background: "rgba(255,255,255,0.12)" }}
        >
          <span className="text-xs text-white/70">오늘의 점수</span>
          <span className="ml-auto text-sm font-black text-white">
            {daily.todayScore}점
          </span>
        </div>
      )}

      {/* 오행 균형 바 */}
      <div>
        <div className="mb-2 text-[10px] text-white/50">오행 균형</div>
        <div className="flex flex-col gap-1.5">
          {fiveElementRows.map((element) => (
            <div key={element.key} className="flex items-center gap-2">
              <span className="w-3 text-[10px] text-white/80">
                {element.label}
              </span>
              <div
                className="h-1.5 flex-1 overflow-hidden rounded-full"
                style={{ background: "rgba(255,255,255,0.15)" }}
              >
                <div
                  className="h-full rounded-full transition-[width] duration-500"
                  style={{
                    width: `${element.percentage}%`,
                    background: element.color,
                  }}
                />
              </div>
              <span className="w-8 text-right text-[10px] text-white/60">
                {element.percentageLabel}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 나의 주 오행 뱃지 */}
      {daily?.weakElement && (
        <div
          className="border-t pt-2"
          style={{ borderColor: "rgba(255,255,255,0.12)" }}
        >
          <div className="mb-1 text-[10px] text-white/50">나의 주 오행</div>
          <span
            className="rounded-full px-3 py-1 text-[10px] font-semibold text-white"
            style={{ background: "rgba(255,255,255,0.18)" }}
          >
            {formatWeakElementLabel(daily.weakElement)}
          </span>
        </div>
      )}
    </div>
  );
}
