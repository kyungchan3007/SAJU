"use client";

import { CheckCircle, Loader2, Sparkles } from "lucide-react";

import { useAdProgressGate } from "@/shared/hooks/use-ad-progress-gate";
import { AdProgressNote } from "@/shared/ui/ad-progress-note";
import { SajuQuizGame } from "@/shared/ui/saju-quiz-game.client";

type AdProgressGateProps = {
  progress: number;
  isComplete?: boolean;
  onRevealResult?: () => void;
  onRewardedRevealResult?: () => void;
  revealButtonLabel?: string;
  rewardedRevealButtonLabel?: string;
  isRewardedReady?: boolean;
};

export function AdProgressGate({
  progress,
  isComplete = false,
  onRevealResult,
  onRewardedRevealResult,
  revealButtonLabel = "사주결과 보기",
  rewardedRevealButtonLabel = "사주결과 열기",
  isRewardedReady = false,
}: AdProgressGateProps) {
  const { canRevealResult, label, noteStates, roundedProgress } =
    useAdProgressGate({
      progress,
      isComplete,
    });
  const [n1State, n2State, n3State] = noteStates;
  const handleRevealResult =
    isRewardedReady && onRewardedRevealResult
      ? onRewardedRevealResult
      : onRevealResult;
  const buttonLabel = isRewardedReady
    ? rewardedRevealButtonLabel
    : revealButtonLabel;

  return (
    <section className="mx-auto flex w-full max-w-lg flex-col gap-5 px-4 py-6">
      <div
        className="rounded-3xl p-6 text-center"
        style={{
          background: "linear-gradient(135deg, #5956E9 0%, #7C3AED 100%)",
          boxShadow: "0 8px 32px rgba(89,86,233,0.28)",
        }}
      >
        <div className="mb-3 flex items-center justify-center gap-2">
          {canRevealResult ? (
            <CheckCircle size={20} style={{ color: "rgba(255,255,255,0.9)" }} />
          ) : (
            <Loader2
              size={20}
              className="animate-spin"
              style={{ color: "rgba(255,255,255,0.8)" }}
            />
          )}
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            분석 중
          </span>
        </div>
        <p className="mb-1 text-sm font-black text-white sm:text-xl">
          사주 운세를 분석하고 있어요
        </p>
        <p
          className="text-xs sm:text-sm"
          style={{ color: "rgba(255,255,255,0.7)" }}
        >
          잠시만 기다려 주세요
        </p>

        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between">
            <span
              className="text-xs font-bold"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              {label}
            </span>
            <span className="text-sm font-black text-white">
              {roundedProgress}%
            </span>
          </div>
          <div
            className="h-[10px] w-full overflow-hidden rounded-full"
            style={{ background: "rgba(255,255,255,0.25)" }}
            role="progressbar"
            aria-label="사주 결과 생성 진행률"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={roundedProgress}
          >
            <div
              className="h-full rounded-full bg-white transition-[width] duration-500 ease-out"
              style={{ width: `${roundedProgress}%` }}
            />
          </div>
        </div>
      </div>

      <SajuQuizGame />

      <div className="flex flex-col gap-2.5">
        <AdProgressNote state="done">사주 정보를 확인했어요</AdProgressNote>
        <AdProgressNote state={n1State}>
          오행 기운을 분석하고 있어요
        </AdProgressNote>
        <AdProgressNote state={n2State}>
          오늘의 운세를 계산하고 있어요
        </AdProgressNote>
        <AdProgressNote state={n3State}>결과를 정리하고 있어요</AdProgressNote>
      </div>

      {canRevealResult && handleRevealResult ? (
        <button
          type="button"
          onClick={handleRevealResult}
          className="flex h-[54px] w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#5956E9] to-[#7C3AED] text-base font-black text-white shadow-[0_4px_20px_rgba(89,86,233,0.32)] transition-opacity duration-300"
        >
          <Sparkles size={18} />
          {buttonLabel}
        </button>
      ) : null}
    </section>
  );
}
