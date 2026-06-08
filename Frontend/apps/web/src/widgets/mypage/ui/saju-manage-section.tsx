"use client";

import Link from "next/link";

import { useSajuManage } from "@/features/mypage/hooks/useSajuManage";
import { useSajuManagePartnersController } from "@/features/mypage/hooks/useSajuManagePartnersController";
import { SajuManageSummary } from "@/features/mypage/ui/manage/saju-manage-summary";
import { SajuManageForm } from "@/features/mypage/ui/manage/saju-manage-form";
import { SajuCardList } from "@/features/mypage/ui/manage/saju-card-list";
import { PartnerAddModal } from "@/features/mypage/ui/manage/partner-add-modal";
import { SajuManagePartnerPanel } from "@/features/mypage/ui/manage/saju-manage-partner-panel";
import {
  Button,
  ConfirmModal,
  EmptyStateCard,
  LoadingStateCard,
} from "@/shared/ui";

export function SajuManageSection() {
  const sajuManage = useSajuManage();
  const partners = useSajuManagePartnersController();

  const myProfile = sajuManage.initialValues
    ? {
        birthYear: sajuManage.initialValues.birthYear,
        gender: sajuManage.initialValues.gender,
        summaryZodiac: sajuManage.summary.summaryZodiac,
        yongshinPrimary: sajuManage.summary.yongshinPrimary,
      }
    : undefined;

  return (
    <div className="flex flex-col gap-5">
      {sajuManage.isLoading && (
        <LoadingStateCard message="사주 정보를 불러오는 중..." />
      )}

      {!sajuManage.isLoading && !sajuManage.isRegistered && (
        <EmptyStateCard
          title="아직 사주 정보가 없어요"
          description="생년월일·시간·성별을 입력하면 나만의 사주 분석을 시작할 수 있어요."
          action={
            <Button asChild size="sm" className="rounded-full">
              <Link href="/saju">사주 입력하기</Link>
            </Button>
          }
        />
      )}

      {!sajuManage.isLoading && sajuManage.isRegistered && (
        <>
          {/* 카드 목록 */}
          <SajuCardList
            myProfile={myProfile}
            partners={partners.partners}
            selectedTarget={partners.selectedTarget}
            onSelect={partners.selectTarget}
            onAdd={partners.openAddModal}
            onDelete={partners.openDeleteModal}
            disabled={partners.isPending}
          />

          {/* 나의 사주 요약 + 수정 폼 (나 선택 시) */}
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

      <ConfirmModal
        isOpen={Boolean(partners.deleteTarget)}
        title={`'${partners.deleteTarget?.name ?? ""}' 사주를 삭제할까요?`}
        description={
          <>
            해당 사주 정보가 영구 삭제됩니다.
            <br />
            이 작업은 되돌릴 수 없습니다.
          </>
        }
        variant="destructive"
        confirmLabel="삭제하기"
        pendingLabel="삭제 중..."
        isPending={partners.isPendingDelete}
        onClose={partners.closeDeleteModal}
        onConfirm={partners.confirmDelete}
      />
    </div>
  );
}
