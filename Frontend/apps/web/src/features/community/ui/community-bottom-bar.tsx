import { Button } from "@/shared/ui";

type Props = {
  step: number;
  totalSteps: number;
  stepNote: string;
  errorMessage?: string | null;
  isSubmitting?: boolean;
  isCommunityJoined?: boolean;
  onNext: () => void;
  onPrev: () => void;
};

export function CommunityBottomBar({
  step,
  totalSteps,
  stepNote,
  errorMessage,
  isSubmitting = false,
  isCommunityJoined = false,
  onNext,
  onPrev,
}: Props) {
  const isLast = step === totalSteps;
  const isDisabled = isSubmitting || isCommunityJoined;

  return (
    <div className="px-6">
      <div className="mx-auto flex max-w-[860px] items-center justify-center gap-3">
        {step > 1 && (
          <Button
            type="button"
            variant="ghost"
            onClick={onPrev}
            className="h-[52px] shrink-0 rounded-2xl bg-[#FAFAFA] px-5 text-[13px] font-bold text-gray-500 hover:text-gray-500 hover:opacity-80"
          >
            이전
          </Button>
        )}
        <Button
          type="button"
          onClick={onNext}
          disabled={isDisabled}
          className="h-[52px] min-w-0 max-w-[400px] flex-1 rounded-2xl text-[15px] font-extrabold shadow-[0_4px_20px_rgba(89,86,233,0.30)] hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isCommunityJoined
            ? "이미 참가 완료"
            : isSubmitting
              ? "요청 중.."
              : isLast
                ? "커뮤니티 열리고 알림 받기"
                : "다음으로"}
        </Button>
      </div>
      <p
        className={`mt-1.5 text-center text-[11px] ${
          errorMessage ? "font-bold text-red-500" : "text-gray-400"
        }`}
      >
        {errorMessage ?? stepNote}
      </p>
    </div>
  );
}
