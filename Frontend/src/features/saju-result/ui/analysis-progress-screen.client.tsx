"use client";

import type { ReactNode } from "react";

import { SajuLoadingAdSlot } from "@/features/saju-result/ui/saju-loading-ad-slot.client";

type AnalysisProgressScreenProps = {
  progress: number;
  isComplete?: boolean;
  onRevealResult?: () => void;
};

export function AnalysisProgressScreen({
  progress,
  isComplete = false,
  onRevealResult,
}: AnalysisProgressScreenProps) {
  const roundedProgress = Math.min(100, Math.max(0, Math.round(progress)));

  return (
    <section className="mx-auto flex min-h-[calc(100dvh-5rem)] w-full max-w-[560px] flex-col px-0 pb-28 pt-4 sm:pt-6 md:min-h-0 md:pb-0">
      <div className="space-y-5">
        <header className="space-y-3 text-center">
          <p className="font-display text-2xl leading-tight text-black sm:text-3xl">
            사주 운세를 분석하고 있어요!
          </p>
          <div className="hidden md:block">
            <AnalysisProgressBar progress={roundedProgress} variant="inline" />
          </div>
        </header>

        <div className="space-y-2">
          <p className="text-center text-xs font-medium text-black/45">
            Advertisements
          </p>
          <SajuLoadingAdSlot />
        </div>

        <div className="space-y-3">
          <StatusNote>
            오늘도 많은 분들이 사주 운세를 확인하고 있어요.
          </StatusNote>
          <StatusNote>
            <span className="mr-1 rounded-full border border-black bg-black px-2 py-0.5 text-[10px] font-bold text-white">
              Tip
            </span>
            풀이가 완성되면 결과를 저장하고 다시 확인할 수 있어요.
          </StatusNote>
          <StatusNote>
            {isComplete
              ? "분석이 완료되었습니다. 사주풀이를 확인하세요."
              : "잠시 후 분석 결과로 이동합니다."}
          </StatusNote>
        </div>

        {isComplete && onRevealResult ? (
          <button
            type="button"
            className="btn-saju btn-saju-primary min-h-11 w-full"
            onClick={onRevealResult}
          >
            사주풀이 보기
          </button>
        ) : null}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t-2 border-black bg-[rgb(250,248,242)] px-4 py-4 shadow-[0_-3px_0_rgba(0,0,0,0.12)] md:hidden">
        <AnalysisProgressBar progress={roundedProgress} variant="bottom" />
      </div>
    </section>
  );
}

function StatusNote({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-sm border-2 border-black bg-white px-4 py-3 text-sm font-medium leading-relaxed text-black shadow-sketch-sm">
      {children}
    </div>
  );
}

function AnalysisProgressBar({
  progress,
  variant,
}: {
  progress: number;
  variant: "bottom" | "inline";
}) {
  return (
    <div
      className={
        variant === "bottom"
          ? "mx-auto w-full max-w-[560px]"
          : "rounded-sm border-2 border-black bg-white p-4 text-left shadow-sketch-sm"
      }
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
    >
      <div className="mb-2 flex items-center justify-between gap-3 text-sm font-bold text-black">
        <span>
          {progress >= 100 ? "사주 분석이 완료되었습니다" : "운세를 풀이하고 있어요"}
        </span>
        <span>{progress}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-sm border-2 border-black bg-white">
        <div
          className="h-full bg-[#f8ea4d] transition-[width] duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
