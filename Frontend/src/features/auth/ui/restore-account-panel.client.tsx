"use client";

import { useRestoreAccount } from "@/features/auth/hooks/useRestoreAccount";

export function RestoreAccountPanel() {
  const { isPending, error, handleRestore, handleSkip } = useRestoreAccount();

  return (
    <div className="card-saju-primary overflow-hidden">
      <div className="border-b-2 border-black bg-[#F0EDE6] px-6 py-3.5">
        <span className="font-display text-base">🔮 사주</span>
      </div>

      <div className="flex flex-col items-center px-7 pb-7 pt-9 text-center">
        <div className="mb-6 flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 border-black bg-[#FFE500] text-[34px] [box-shadow:2px_2px_0_#0d0d0d]">
          🔓
        </div>

        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border-2 border-black bg-[#FFE500] px-3.5 py-1 text-xs font-bold [box-shadow:2px_2px_0_#0d0d0d]">
          ⏳ 탈퇴 후 30일 이내
        </div>

        <div className="mb-5 w-full rounded-sm border-[1.5px] border-[#d4d0c8] bg-[#F0EDE6] px-4 py-3 text-left text-[13px] leading-[1.8] text-[#7a7570]">
          탈퇴 후{" "}
          <strong className="font-bold text-[#0d0d0d]">30일 이전</strong>에
          다시 로그인하면
          <br />
          기존 데이터를 복구할 수 있어요.
        </div>

        <p className="mb-7 font-display text-xl">계정을 복구하시겠어요?</p>

        {error && (
          <p className="mb-4 w-full rounded-sm border-2 border-red-400 bg-red-50 px-4 py-2.5 text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="flex w-full flex-col gap-2.5">
          <button
            className="btn-saju btn-saju-primary w-full py-3.5 font-display text-base disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleRestore}
            disabled={isPending}
          >
            {isPending ? "복구 중..." : "🔓 계정 복구"}
          </button>
          <button
            className="btn-saju btn-saju-secondary w-full py-3 text-sm font-semibold text-[#7a7570] disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleSkip}
            disabled={isPending}
          >
            복구하지 않기
          </button>
        </div>
      </div>
    </div>
  );
}
