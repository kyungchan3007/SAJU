"use client";

import Link from "next/link";
import type { Route } from "next";

import { formatWeakElementLabel } from "@/shared/utils/weakElement";
import { SajuElementAnimation } from "@/features/saju-result/ui/saju-element-animation";
import { useHomeTodaySaju } from "@/features/home/hooks/useHomeTodaySaju";

export function HomeTodaySajuCard() {
  const { data, isLoading, error } = useHomeTodaySaju();

  if (isLoading) {
    return (
      <div className="hero-panel flex flex-col gap-3">
        <p className="text-xs font-semibold text-black/40">오늘의 운세</p>
        <p className="text-sm text-black/55">
          오늘의 기운을 불러오는 중이에요.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="hero-panel flex flex-col gap-4">
        <p className="text-xs font-semibold text-black/40">오늘의 운세</p>
        <div>
          <p className="font-display text-lg font-black text-black">
            오늘의 기운
          </p>
          <p className="mt-1 text-sm text-black/55">
            {error instanceof Error
              ? error.message
              : "운세 정보를 불러오지 못했어요."}
          </p>
        </div>
        <Link
          href={"/saju/result" as Route}
          className="btn-saju btn-saju-primary text-center"
        >
          결과 다시 확인하기
        </Link>
      </div>
    );
  }

  const daily = data?.data;

  return (
    <div className="hero-panel flex flex-col gap-4">
      <p className="text-xs font-semibold text-black/40">오늘의 운세</p>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-display text-lg font-black text-black">
            오늘의 기운
          </p>
          <p className="text-sm text-black/55">
            {daily?.todayScore != null ? `${daily.todayScore}점` : "-"} ·{" "}
            {daily?.mood ?? "분석 준비 중"}
          </p>
        </div>
        <div className="rounded-sm border-2 border-black px-2 py-1 text-xs font-semibold text-black/70">
          {daily?.goodTime ?? "-"}
        </div>
      </div>

      <div className="h-[170px] overflow-hidden rounded-sm bg-white">
        {daily?.weakElement ? (
          <SajuElementAnimation element={daily.weakElement} />
        ) : (
          <div className="grid h-full place-items-center text-sm text-black/40">
            분석 데이터가 아직 없어요.
          </div>
        )}
      </div>

      <div className="border-t-2 border-dashed border-black/10 pt-3 text-sm text-black/60">
        보완 오행:{" "}
        <strong className="font-semibold text-black">
          {formatWeakElementLabel(daily?.weakElement)}
        </strong>
      </div>
    </div>
  );
}
