"use client";

import { useSajuManage } from "@/features/mypage/hooks/useSajuManage";
import { useSajuManagePartnersController } from "@/features/mypage/hooks/useSajuManagePartnersController";
import { SajuManageLoadingState } from "@/features/mypage/ui/manage/saju-manage-loading-state";
import { SajuManageEmptyState } from "@/features/mypage/ui/manage/saju-manage-empty-state";
import { SajuManageSummary } from "@/features/mypage/ui/manage/saju-manage-summary";
import { SajuManageForm } from "@/features/mypage/ui/manage/saju-manage-form";
import { SajuCardList } from "@/features/mypage/ui/manage/saju-card-list";
import { PartnerAddModal } from "@/features/mypage/ui/manage/partner-add-modal";
import { PartnerDeleteModal } from "@/features/mypage/ui/manage/partner-delete-modal";
import { SajuManageStatusMessage } from "@/features/mypage/ui/manage/saju-manage-status-message";
import { SajuManagePartnerPanel } from "@/features/mypage/ui/manage/saju-manage-partner-panel";

export function SajuManageSection() {
  const sajuManage = useSajuManage();
  const partners = useSajuManagePartnersController();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="flex items-center gap-2.5 font-display text-[22px]">
        사주 관리 <span className="h-0.5 flex-1 bg-black" />
      </h2>

      {sajuManage.isLoading && <SajuManageLoadingState />}

      {!sajuManage.isLoading && !sajuManage.isRegistered && (
        <SajuManageEmptyState />
      )}

      {!sajuManage.isLoading && sajuManage.isRegistered && (
        <>
          {/* 등록된 사주 카드 목록 */}
          <SajuCardList
            partners={partners.partners}
            selectedTarget={partners.selectedTarget}
            onSelect={partners.selectTarget}
            onAdd={partners.openAddModal}
            onDelete={partners.openDeleteModal}
            disabled={partners.isPending}
          />

          {/* 성공/에러 메시지 */}
          <SajuManageStatusMessage
            message={
              partners.selectedTarget === "me"
                ? sajuManage.successMessage
                : partners.successMessage
            }
          />

          {/* 나의 사주 요약 (나 선택 시) */}
          {partners.selectedTarget === "me" && sajuManage.initialValues && (
            <>
              <SajuManageSummary {...sajuManage.summary} />
              <SajuManageForm
                initialValues={sajuManage.initialValues}
                isPending={sajuManage.isPending}
                errorMessage={sajuManage.errorMessage}
                onSave={sajuManage.handleSave}
              />
            </>
          )}

          {/* 파트너 사주 폼 */}
          {partners.selectedTarget !== "me" && (
            <SajuManagePartnerPanel
              formKey={String(partners.selectedTarget)}
              name={partners.displayName}
              isNew={partners.isNewPartnerMode}
              initialValues={partners.formInitialValues}
              isPending={partners.isPending}
              errorMessage={partners.errorMessage}
              onSave={partners.savePartner}
            />
          )}
        </>
      )}

      <PartnerAddModal
        isOpen={partners.isAddModalOpen}
        isPending={false}
        onClose={partners.closeAddModal}
        onConfirm={partners.confirmAdd}
      />

      <PartnerDeleteModal
        partnerName={partners.deleteTarget?.name ?? null}
        isPending={partners.isPendingDelete}
        onClose={partners.closeDeleteModal}
        onConfirm={partners.confirmDelete}
      />
    </div>
  );
}
