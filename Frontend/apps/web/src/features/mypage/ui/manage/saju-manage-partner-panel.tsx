import { SajuManageForm } from "@/features/mypage/ui/manage/saju-manage-form";
import type { SajuManageFormValues } from "@/features/mypage/model/sajuManage";
import type { SajuRequest } from "@/generated/api";

type Props = {
  formKey: string;
  name: string;
  isNew: boolean;
  initialValues: SajuManageFormValues | null;
  isPending: boolean;
  errorMessage: string | null;
  onSave: (payload: SajuRequest) => void;
};

export function SajuManagePartnerPanel({
  formKey,
  name,
  isNew,
  initialValues,
  isPending,
  errorMessage,
  onSave,
}: Props) {
  if (!initialValues) return null;

  return (
    <>
      <PartnerSummaryHeader name={name} isNew={isNew} />
      <SajuManageForm
        key={formKey}
        initialValues={initialValues}
        isPending={isPending}
        errorMessage={errorMessage}
        onSave={onSave}
      />
    </>
  );
}

function PartnerSummaryHeader({
  name,
  isNew,
}: {
  name: string;
  isNew: boolean;
}) {
  if (isNew) {
    return (
      <div className="overflow-hidden rounded-2xl border border-[#C4BAFF] bg-white shadow-sm">
        <div className="flex items-center gap-2 border-b border-[#EDE9FF] bg-[#F0EEFF] px-5 py-3">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#5956E9] text-[10px] font-black text-white">
            2
          </span>
          <span className="text-[13px] font-bold text-[#5956E9]">
            사주 정보 입력
          </span>
        </div>
        <div className="px-5 py-4">
          <p className="text-[14px] font-semibold text-gray-800">
            {name}님의 사주 정보를 입력해 주세요.
          </p>
          <p className="mt-1 text-[12px] leading-relaxed text-slate-400">
            이름 등록이 완료됐어요. 아래에서 사주 정보를 입력하고 저장하면
            파트너 목록에 추가됩니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-3" style={{ background: "#F9F8FF" }}>
        <span className="text-[13px] font-bold text-[#5956E9]">
          {name}의 사주
        </span>
      </div>
      <div className="px-5 py-4">
        <p className="text-[13px] leading-relaxed text-slate-400">
          사주 정보를 수정하고 저장하면 파트너 데이터가 업데이트됩니다.
        </p>
      </div>
    </div>
  );
}
