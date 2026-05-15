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
  return (
    <div
      className="rounded-sm border-2 border-black bg-[#FDFCF8]"
      style={{ boxShadow: "4px 4px 0 #0d0d0d" }}
    >
      <div className="border-b-2 border-black bg-[#F0EDE6] px-5 py-3 font-display text-[15px]">
        {isNew ? `${name} 사주 입력` : `${name}의 사주 요약`}
      </div>
      <div className="px-5 py-4">
        <p className="text-[13px] leading-relaxed text-[#7a7570]">
          {isNew
            ? "사주 정보를 입력하고 저장하면 파트너 목록에 추가됩니다."
            : "사주 정보를 수정하고 저장하면 파트너 데이터가 업데이트됩니다."}
        </p>
      </div>
    </div>
  );
}
