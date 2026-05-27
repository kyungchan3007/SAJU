type Props = {
  step: number;
  totalSteps: number;
  stepNote: string;
  onNext: () => void;
  onPrev: () => void;
};

export function CommunityBottomBar({ step, totalSteps, stepNote, onNext, onPrev }: Props) {
  const isLast = step === totalSteps;

  return (
    <div className="border-t border-gray-100 px-6">
      <div className="mx-auto flex max-w-[860px] items-center justify-center gap-3">
        {step > 1 && (
          <button
            type="button"
            onClick={onPrev}
            className="flex h-[52px] shrink-0 items-center gap-1 rounded-2xl bg-[#FAFAFA] px-5 text-[13px] font-bold text-gray-500 transition-opacity hover:opacity-80"
          >
            ← 이전
          </button>
        )}
        <button
          type="button"
          onClick={onNext}
          className="h-[52px] min-w-[300px] max-w-[400px] flex-1 rounded-2xl bg-gradient-to-r from-[#5956E9] to-violet-700 text-[15px] font-extrabold text-white shadow-[0_4px_20px_rgba(89,86,233,0.30)] transition-opacity hover:opacity-90"
        >
          {isLast ? "관심 남기고 알림 받기 🔔" : "다음으로 →"}
        </button>
      </div>
      <p className="mt-1.5 text-center text-[11px] text-gray-400">{stepNote}</p>
    </div>
  );
}
