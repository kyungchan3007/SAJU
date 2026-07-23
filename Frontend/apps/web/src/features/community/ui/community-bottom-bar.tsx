import { Button } from "@/shared/ui";
import styles from "@/features/community/ui/community.module.css";

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
      <div className={`mx-auto flex items-center justify-center gap-3 ${styles.bottomBarWrap}`}>
        {step > 1 && (
          <Button
            type="button"
            variant="ghost"
            onClick={onPrev}
            className={`h-[52px] shrink-0 rounded-2xl px-5 font-bold text-gray-500 hover:text-gray-500 hover:opacity-80 ${styles.secondaryButton}`}
          >
            이전
          </Button>
        )}
        <Button
          type="button"
          onClick={onNext}
          disabled={isDisabled}
          className={`h-[52px] min-w-0 flex-1 rounded-2xl font-extrabold hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 ${styles.primaryButton} ${styles.bottomBarPrimary}`}
        >
          {isCommunityJoined
            ? "이미 참가 완료"
            : isSubmitting
              ? "요청 중.."
              : isLast
                ? "커뮤니티 열리고 알림 받기"
                : "로테이션 신청하기"}
        </Button>
      </div>
      <p
        className={`mt-1.5 text-center ${styles.bottomBarHint} ${
          errorMessage ? "font-bold text-red-500" : "text-gray-400"
        }`}
      >
        {errorMessage ?? stepNote}
      </p>
    </div>
  );
}
