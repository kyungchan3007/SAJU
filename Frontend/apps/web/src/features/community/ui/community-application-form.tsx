import { Button, Input } from "@/shared/ui";

import type { CommunityApplicationForm } from "@/features/community/model/community-application";

type DepositAccount = {
  bankLabel: string;
  holderLabel: string;
  amountLabel: string;
};

type Props = {
  form: CommunityApplicationForm;
  depositAccount: DepositAccount;
  disabled?: boolean;
  isSubmitting?: boolean;
  errorMessage?: string | null;
  onChange: (
    field: keyof CommunityApplicationForm,
    value: string | boolean,
  ) => void;
  onSubmit: () => void;
  onPrev: () => void;
};

export function CommunityApplicationForm({
  form,
  depositAccount,
  disabled = false,
  isSubmitting = false,
  errorMessage,
  onChange,
  onSubmit,
  onPrev,
}: Props) {
  const isBusy = disabled || isSubmitting;

  return (
    <section>
      <p className="mb-4 text-[15px] font-black text-gray-900">신청 정보</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="community-depositor-name"
            className="text-[12px] font-bold text-gray-700"
          >
            이름 <span className="text-[#5956E9]">*입금자명과 동일하게</span>
          </label>
          <Input
            id="community-depositor-name"
            type="text"
            value={form.depositorName}
            onChange={(e) => onChange("depositorName", e.target.value)}
            disabled={isBusy}
            placeholder="예) 홍길동"
            className="h-12 rounded-2xl border-[1.5px] border-gray-200 px-4 text-gray-900 placeholder:text-gray-300 disabled:cursor-not-allowed disabled:opacity-60"
          />
          <p className="text-[11px] text-gray-400">
            통장에 찍히는 입금자명과 대조해요.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="community-refund-bank"
            className="text-[12px] font-bold text-gray-700"
          >
            환불받을 은행 <span className="text-[#5956E9]">*환불 시에만 사용</span>
          </label>
          <Input
            id="community-refund-bank"
            type="text"
            value={form.refundBankName}
            onChange={(e) => onChange("refundBankName", e.target.value)}
            disabled={isBusy}
            placeholder="예) ○○은행"
            className="h-12 rounded-2xl border-[1.5px] border-gray-200 px-4 text-gray-900 placeholder:text-gray-300 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="community-refund-account"
            className="text-[12px] font-bold text-gray-700"
          >
            환불받을 계좌번호
          </label>
          <Input
            id="community-refund-account"
            type="text"
            inputMode="numeric"
            value={form.refundAccountNumber}
            onChange={(e) => onChange("refundAccountNumber", e.target.value)}
            disabled={isBusy}
            placeholder="예) 000-000-000000"
            className="h-12 rounded-2xl border-[1.5px] border-gray-200 px-4 text-gray-900 placeholder:text-gray-300 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="community-refund-holder"
            className="text-[12px] font-bold text-gray-700"
          >
            환불 계좌 예금주
          </label>
          <Input
            id="community-refund-holder"
            type="text"
            value={form.refundAccountHolder}
            onChange={(e) => onChange("refundAccountHolder", e.target.value)}
            disabled={isBusy}
            placeholder="예) 홍길동"
            className="h-12 rounded-2xl border-[1.5px] border-gray-200 px-4 text-gray-900 placeholder:text-gray-300 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>
      </div>

      <p className="mt-2.5 text-[11px] text-gray-400">
        · 닉네임은 앞에서 이미 받았어요. 여기선 입금 확인·환불용 정보만 받아요.
        환불이 필요할 때만 쓰고, 일정이 끝나면 폐기해요.
      </p>

      <div className="mt-5 rounded-2xl border border-dashed border-[#EED9AD] bg-[#FDF4E5] p-4">
        <p className="mb-2 text-[13px] font-bold text-[#B7791F]">
          💸 아래 계좌로 참가비를 입금해 주세요
        </p>
        <p className="text-[16px] font-black text-gray-900">
          {depositAccount.bankLabel}
        </p>
        <p className="mt-0.5 text-[12px] text-gray-500">
          {depositAccount.holderLabel} · {depositAccount.amountLabel}
        </p>
        <ul className="mt-3 space-y-1 text-[12.5px] leading-relaxed text-gray-600">
          <li>· 반드시 신청자 이름으로 입금해 주세요. (이름으로 입금 확인)</li>
          <li>· 자동 확인·알림이 없어 운영자가 통장 확인 후 문자로 안내해요.</li>
          <li>· 입금 순서대로 선착순 확정돼요.</li>
        </ul>
      </div>

      <label
        htmlFor="community-agree"
        className="mt-4 flex cursor-pointer items-start gap-3 rounded-2xl border-[1.5px] border-[#E0DAFF] bg-[#F9F8FF] px-4 py-3"
      >
        <input
          id="community-agree"
          type="checkbox"
          checked={form.agreed}
          onChange={(e) => onChange("agreed", e.target.checked)}
          disabled={isBusy}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[#5956E9]"
        />
        <span className="text-[12px] font-semibold leading-relaxed text-gray-600">
          안전 규칙과 환불 정책을 확인했으며, 입금 안내에 동의합니다.
          <span className="mt-1 block text-[11px] font-medium text-gray-400">
            입금 후 취소는 마이페이지에서 요청 → 운영자 확인 후 수기 환불됩니다.
          </span>
        </span>
      </label>

      <label
        htmlFor="community-privacy-consent"
        className="mt-3 flex cursor-pointer items-start gap-3 rounded-2xl border-[1.5px] border-[#E0DAFF] bg-[#F9F8FF] px-4 py-3"
      >
        <input
          id="community-privacy-consent"
          type="checkbox"
          checked={form.privacyConsent}
          onChange={(e) => onChange("privacyConsent", e.target.checked)}
          disabled={isBusy}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[#5956E9]"
        />
        <span className="text-[12px] font-semibold leading-relaxed text-gray-600">
          개인정보 수집·이용에 동의합니다. (필수)
          <span className="mt-1 block text-[11px] font-medium text-gray-400">
            신청 확인·입금 확인·환불 처리를 위해 닉네임, 이름(입금자명), 환불
            계좌 정보를 수집·이용하며, 일정이 끝나면 폐기합니다.
          </span>
        </span>
      </label>

      <div className="mt-6 flex items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          onClick={onPrev}
          disabled={isSubmitting}
          className="h-[52px] w-[110px] shrink-0 rounded-2xl bg-[#F5F5F8] text-[13px] font-bold text-gray-500 hover:text-gray-500 hover:opacity-80"
        >
          이전
        </Button>
        <Button
          type="button"
          onClick={onSubmit}
          disabled={isBusy}
          className="h-[52px] flex-1 rounded-2xl text-[15px] font-extrabold shadow-[0_4px_20px_rgba(89,86,233,0.30)] hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {disabled
            ? "이미 신청 완료"
            : isSubmitting
              ? "접수 중.."
              : "신청 접수하기"}
        </Button>
      </div>
      <p
        className={`mt-3 text-center text-[11px] ${
          errorMessage ? "font-bold text-red-500" : "text-gray-400"
        }`}
      >
        {errorMessage ?? "‘신청 접수’ 후 입금이 확인되면 확정돼요."}
      </p>
    </section>
  );
}
