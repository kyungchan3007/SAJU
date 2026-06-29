import { Button } from "@/shared/ui";
import { MESSAGES } from "@/shared/constants/messages";

type Props = {
  onWithdraw: () => void;
};

export function AccountWithdrawRow({ onWithdraw }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="border-b border-slate-100 bg-[#F9F8FF] px-5 py-3">
        <span className="text-sm font-bold text-gray-900">회원탈퇴</span>
      </div>
      <div className="flex flex-col items-start gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-bold text-red-500">회원탈퇴</span>
          <span className="text-xs text-slate-400">
            탈퇴 시 모든 운세 데이터와 코인이 영구 삭제됩니다.
            <br />
            {MESSAGES.IRREVERSIBLE_ACTION}
          </span>
        </div>
        <Button
          type="button"
          variant="ghost"
          onClick={onWithdraw}
          className="w-full shrink-0 rounded-xl bg-red-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-red-600 hover:text-white sm:w-auto"
        >
          회원탈퇴
        </Button>
      </div>
    </div>
  );
}
