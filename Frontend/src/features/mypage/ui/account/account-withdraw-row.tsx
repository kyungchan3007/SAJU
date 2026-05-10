type Props = {
  onWithdraw: () => void;
};

export function AccountWithdrawRow({ onWithdraw }: Props) {
  return (
    <div className="card-saju-primary overflow-hidden">
      <div className="border-b-2 border-black bg-[rgb(240_238_232)] px-5 py-3.5">
        <span className="font-bold text-[#0d0d0d]">⚠️ 회원탈퇴</span>
      </div>
      <div className="flex flex-col items-start gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-bold text-red-500">회원탈퇴</span>
          <span className="text-xs text-[#0d0d0d]/50">
            탈퇴 시 모든 운세 데이터와 코인이 영구 삭제됩니다.
            <br />이 작업은 되돌릴 수 없습니다.
          </span>
        </div>
        <button
          onClick={onWithdraw}
          className="btn-saju w-full shrink-0 rounded-sm border-2 border-black bg-red-500 px-5 py-2 text-sm font-bold text-white sm:w-auto"
          style={{ boxShadow: "3px 3px 0 #0d0d0d" }}
        >
          회원탈퇴
        </button>
      </div>
    </div>
  );
}
