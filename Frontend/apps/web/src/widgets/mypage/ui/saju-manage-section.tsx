"use client";

import Link from "next/link";

import { useSajuManage } from "@/features/mypage/hooks/useSajuManage";
import { useSajuManagePartnersController } from "@/features/mypage/hooks/useSajuManagePartnersController";
import { canAddPartner } from "@/features/mypage/model/partner";
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
import { MESSAGES } from "@/shared/constants/messages";

export function SajuManageSection() {
  const sajuManage = useSajuManage();
  const partners = useSajuManagePartnersController();
  const canAdd = canAddPartner(partners.partners.length);

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

          {/* 파트너 사주 폼 또는 잠금 안내 */}
          {partners.selectedTarget !== "me" ? (
            <SajuManagePartnerPanel
              formKey={String(partners.selectedTarget)}
              name={partners.displayName}
              isNew={partners.isNewPartnerMode}
              initialValues={partners.formInitialValues}
              isPending={partners.isPending}
              errorMessage={partners.errorMessage}
              onSave={partners.savePartner}
            />
          ) : canAdd ? (
            <LockedPartnerPanel
              onAdd={partners.openAddModal}
              disabled={partners.isPending}
            />
          ) : null}

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
        </>
      )}

      <PartnerAddModal
        isOpen={partners.isAddModalOpen}
        isPending={false}
        onCloseAction={partners.closeAddModal}
        onConfirmAction={partners.confirmAdd}
      />

      <ConfirmModal
        isOpen={Boolean(partners.deleteTarget)}
        title={`${partners.deleteTarget?.name ?? ""} 사주를 삭제할까요?`}
        description={
          <>
            해당 사주 정보가 영구 삭제됩니다.
            <br />
            {MESSAGES.IRREVERSIBLE_ACTION}
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

// ── 잠금 패널: 1단계(모달) 완료 전 표시되는 2단계 안내 ──
function LockedPartnerPanel({
  onAdd,
  disabled,
}: {
  onAdd: () => void;
  disabled: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      {/* 헤더 */}
      <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-5 py-3">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-[10px] font-black text-slate-400">
          2
        </span>
        <span className="text-[13px] font-bold text-slate-400">
          사주 정보 입력
        </span>
        <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-300">
          1단계 완료 후 활성화
        </span>
      </div>
      {/* 안내 문구 */}
      <div className="px-5 py-5">
        <p className="text-[13px] leading-relaxed text-slate-400">
          먼저 상단의{" "}
          <button
            type="button"
            onClick={onAdd}
            disabled={disabled}
            className="font-semibold text-[#5956E9] underline underline-offset-2 disabled:opacity-50"
          >
            사주 추가
          </button>
          {" "}버튼을 눌러 이름과 관계를 입력해 주세요.
        </p>
      </div>
    </div>
  );
}
