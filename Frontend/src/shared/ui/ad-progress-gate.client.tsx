"use client";

import type { ReactNode } from "react";
import { CheckCircle, Circle, Loader2, Sparkles } from "lucide-react";
import {
  useAdProgressGate,
  type AdProgressNoteState,
} from "@/shared/hooks/use-ad-progress-gate";
import { AdSlot } from "@/shared/ui/ad-slot.client";

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
  rewardedRevealButtonLabel = "짧은 광고를 보고 사주결과 열기",
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
        <p className="mb-1 text-xl font-black text-white">
          사주 운세를 분석하고 있어요
        </p>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
          잠시만 기다려 주세요
        </p>

        {/* 프로그레스 바 */}
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

      <AdSlot />

      <div className="flex flex-col gap-2.5">
        <StatusNote state="done">사주 정보를 확인했어요</StatusNote>
        <StatusNote state={n1State}>오행 기운을 분석하고 있어요</StatusNote>
        <StatusNote state={n2State}>오늘의 운세를 계산하고 있어요</StatusNote>
        <StatusNote state={n3State}>결과를 정리하고 있어요</StatusNote>
      </div>

      {canRevealResult && handleRevealResult ? (
        <button
          type="button"
          onClick={handleRevealResult}
          className="flex h-[54px] w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#5956E9] to-[#7C3AED] text-base font-black text-white shadow-[0_4px_20px_rgba(89,86,233,0.32)] transition-all duration-300"
        >
          <Sparkles size={18} />
          {buttonLabel}
        </button>
      ) : null}
    </section>
  );
}

function StatusNote({
  state,
  children,
}: {
  state: AdProgressNoteState;
  children: ReactNode;
}) {
  const styles: Record<
    AdProgressNoteState,
    { bg: string; border: string; color: string }
  > = {
    pending: { bg: "#fff", border: "#F3F4F6", color: "#374151" },
    active: { bg: "#F0EEFF", border: "#C7C4F8", color: "#5956E9" },
    done: { bg: "#F0FDF4", border: "#BBF7D0", color: "#166534" },
  };
  const s = styles[state];

  return (
    <div
      className="flex items-start gap-2.5 rounded-[14px] border px-4 py-3 text-[13px] font-semibold transition-all duration-300"
      style={{ background: s.bg, borderColor: s.border, color: s.color }}
    >
      {state === "done" ? (
        <CheckCircle
          size={16}
          className="mt-px shrink-0"
          style={{ color: "#16A34A" }}
        />
      ) : null}
      {state === "active" ? (
        <Loader2
          size={16}
          className="mt-px shrink-0 animate-spin"
          style={{ color: "#5956E9" }}
        />
      ) : null}
      {state === "pending" ? (
        <Circle
          size={16}
          className="mt-px shrink-0"
          style={{ color: "#D1D5DB" }}
        />
      ) : null}
      <span>{children}</span>
    </div>
  );
}
