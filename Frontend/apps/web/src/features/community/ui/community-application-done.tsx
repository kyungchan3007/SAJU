import Link from "next/link";

type CompletionView = {
  depositorName: string;
  feeLabel: string;
  bankLabel: string;
  holderLabel: string;
};

type Props = {
  completion: CompletionView;
};

export function CommunityApplicationDone({ completion }: Props) {
  const depositorLabel = completion.depositorName.trim() || "신청자 이름";

  return (
    <div className="mx-auto max-w-[520px] py-10 text-center">
      <div className="mx-auto mb-5 flex h-[74px] w-[74px] items-center justify-center rounded-full border border-[#EED9AD] bg-[#FDF4E5] text-[34px]">
        ⏳
      </div>
      <h2 className="mb-2 text-[22px] font-black text-gray-900">
        신청이 접수됐어요
      </h2>
      <p className="mb-5 text-[14px] leading-relaxed text-gray-500">
        아직 <b className="font-bold text-gray-700">확정 전</b>이에요.
        <br />
        아래 계좌로 입금하면 운영자 확인 후 확정됩니다.
      </p>
      <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#EED9AD] bg-[#FDF4E5] px-4 py-1.5 text-[12.5px] font-bold text-[#B7791F]">
        ● 입금 대기
      </span>

      <div className="rounded-2xl border border-dashed border-[#EED9AD] bg-[#FDF4E5] p-4 text-left">
        <p className="mb-2 text-[13px] font-bold text-[#B7791F]">💸 입금 계좌</p>
        <p className="text-[16px] font-black text-gray-900">
          {completion.bankLabel}
        </p>
        <p className="mt-0.5 text-[12px] text-gray-500">
          {completion.holderLabel} · 금액 {completion.feeLabel}
        </p>
        <ul className="mt-3 space-y-1 text-[12.5px] leading-relaxed text-gray-600">
          <li>
            · <b className="font-bold text-gray-800">{depositorLabel}</b>(으)로
            입금해 주세요.
          </li>
          <li>· 운영자가 통장 확인 후 확정 문자를 보내드려요.</li>
          <li>· 자동 알림이 없어 확정까지 시간이 걸릴 수 있어요.</li>
        </ul>
      </div>

      <p className="mt-3.5 text-left text-[11px] leading-relaxed text-gray-400">
        · 입금을 안 하시면 신청은 자동 소멸돼요. (입금 전 취소 = 별도 절차 없음)
        <br />· 확정 여부는 마이페이지에서 확인할 수 있어요.
      </p>

      <Link
        href="/mypage"
        className="mt-6 flex h-[52px] items-center justify-center rounded-2xl bg-[#5956E9] text-[15px] font-extrabold text-white shadow-[0_4px_20px_rgba(89,86,233,0.30)] hover:opacity-90"
      >
        마이페이지에서 상태 보기
      </Link>
    </div>
  );
}
