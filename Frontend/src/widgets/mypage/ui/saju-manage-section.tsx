"use client";

import { useSajuManage } from "@/features/mypage/hooks/useSajuManage";
import { SajuManageLoadingState } from "@/features/mypage/ui/manage/saju-manage-loading-state";
import { SajuManageEmptyState } from "@/features/mypage/ui/manage/saju-manage-empty-state";
import { SajuManageSummary } from "@/features/mypage/ui/manage/saju-manage-summary";
import { SajuManageForm } from "@/features/mypage/ui/manage/saju-manage-form";

export function SajuManageSection() {
  const sajuManage = useSajuManage();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="flex items-center gap-2.5 font-['Jua',sans-serif] text-[22px]">
        사주 관리 <span className="h-0.5 flex-1 bg-black" />
      </h2>

      {sajuManage.isLoading && <SajuManageLoadingState />}

      {!sajuManage.isLoading && !sajuManage.isRegistered && (
        <SajuManageEmptyState />
      )}

      {!sajuManage.isLoading &&
        sajuManage.isRegistered &&
        sajuManage.initialValues && (
          <>
            {sajuManage.successMessage && (
              <div className="rounded-sm border-2 border-green-500 bg-green-50 px-4 py-3 text-[13px] font-semibold text-green-700">
                {sajuManage.successMessage}
              </div>
            )}

            <SajuManageSummary {...sajuManage.summary} />

            <SajuManageForm
              initialValues={sajuManage.initialValues}
              isPending={sajuManage.isPending}
              errorMessage={sajuManage.errorMessage}
              onSave={sajuManage.handleSave}
            />
          </>
        )}
    </div>
  );
}
