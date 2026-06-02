"use client";

import { useRestoreAccount } from "@/features/auth/hooks/useRestoreAccount";
import { Button, FormMessage } from "@/shared/ui";

export function RestoreAccountPanel() {
  const { isPending, error, handleRestore, handleSkip } = useRestoreAccount();

  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-[0_8px_32px_rgba(89,86,233,0.10)]">
      <div className="border-b border-slate-100 bg-[#F9F8FF] px-6 py-4">
        <span className="text-sm font-extrabold text-[#5956E9]">계정 복구</span>
      </div>

      <div className="flex flex-col items-center px-7 pb-7 pt-9 text-center">
        <div className="mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-[24px] bg-[#F0EEFF] text-[#5956E9]">
          <span className="text-[34px] leading-none">🔓</span>
        </div>

        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#F0EEFF] px-3.5 py-1.5 text-xs font-bold text-[#5956E9]">
          ⏳ 탈퇴 후 30일 이내
        </div>

        <h1 className="mb-2 text-[22px] font-black text-gray-900">
          계정을 복구하시겠어요?
        </h1>
        <p className="mb-5 text-[13px] leading-relaxed text-gray-500">
          탈퇴 후 <strong className="font-bold text-gray-900">30일 이전</strong>에
          다시 로그인하면 기존 데이터를 복구할 수 있어요.
        </p>

        {error && (
          <FormMessage variant="error" className="mb-4 w-full text-left">
            {error}
          </FormMessage>
        )}

        <div className="flex w-full flex-col gap-2.5">
          <Button
            type="button"
            className="h-12 w-full rounded-2xl text-base font-extrabold disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleRestore}
            disabled={isPending}
          >
            {isPending ? "복구 중..." : "계정 복구"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="h-11 w-full rounded-2xl text-sm font-bold disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleSkip}
            disabled={isPending}
          >
            복구하지 않기
          </Button>
        </div>
      </div>
    </div>
  );
}
