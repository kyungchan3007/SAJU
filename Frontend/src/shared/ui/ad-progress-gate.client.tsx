"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { AdSlot } from "@/shared/ui/ad-slot.client";

type AdProgressGateProps = {
  progress: number;
  isComplete?: boolean;
  onRevealResult?: () => void;
  minGateDurationMs?: number;
};

export function AdProgressGate({
  progress,
  isComplete = false,
  onRevealResult,
  minGateDurationMs = 10_000,
}: AdProgressGateProps) {
  const startedAtRef = useRef<number | null>(null);
  const [elapsedMs, setElapsedMs] = useState(0);

  useEffect(() => {
    startedAtRef.current = Date.now();

    const timer = window.setInterval(() => {
      if (startedAtRef.current === null) {
        return;
      }

      setElapsedMs(Date.now() - startedAtRef.current);
    }, 120);

    return () => window.clearInterval(timer);
  }, []);

  const minDurationReached = elapsedMs >= minGateDurationMs;

  const roundedProgress = useMemo(() => {
    const timeRatio = Math.min(elapsedMs / minGateDurationMs, 1);
    const timedProgress = Math.round(timeRatio * 95);

    if (!minDurationReached) {
      return timedProgress;
    }

    if (isComplete) {
      return 100;
    }

    const bounded = Math.min(100, Math.max(0, Math.round(progress)));
    return Math.min(Math.max(bounded, 95), 99);
  }, [elapsedMs, isComplete, minDurationReached, minGateDurationMs, progress]);

  const canRevealResult = isComplete && minDurationReached;

  return (
    <section className="mx-auto flex min-h-[calc(100dvh-5rem)] w-full max-w-[560px] flex-col px-0 pb-28 pt-4 sm:pt-6 md:min-h-0 md:pb-0">
      <div className="space-y-5">
        <header className="space-y-3 text-center">
          <p className="font-display text-2xl leading-tight text-black sm:text-3xl">
            사주 운세를 분석하고 있어.
          </p>
          <div className="hidden md:block">
            <AnalysisProgressBar progress={roundedProgress} variant="inline" />
          </div>
        </header>

        <div className="space-y-2">
          <p className="text-center text-xs font-medium text-black/45">
            Advertisements
          </p>
          <AdSlot />
        </div>

        <div className="space-y-3">
          <StatusNote>오늘 많은 분들이 사주 운세를 확인하고 있어.</StatusNote>
          <StatusNote>
            <span className="mr-1 rounded-full border border-black bg-black px-2 py-0.5 text-[10px] font-bold text-white">
              Tip
            </span>
            광고가 끝나면 결과를 확인할 수 있어.
          </StatusNote>
          <StatusNote>
            {canRevealResult
              ? "분석이 완료됐어. 사주 운세를 확인해."
              : "잠시 후 분석 결과로 이동해."}
          </StatusNote>
        </div>

        {canRevealResult && onRevealResult ? (
          <button
            type="button"
            className="btn-saju btn-saju-primary min-h-11 w-full"
            onClick={onRevealResult}
          >
            사주결과 보기
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
          {progress >= 100 ? "사주 분석이 완료됐어." : "운세를 준비하고 있어."}
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
