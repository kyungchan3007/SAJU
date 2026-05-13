"use client";

import { useState } from "react";
import { useSajuManage } from "@/features/mypage/hooks/useSajuManage";
import { usePartners } from "@/features/mypage/hooks/usePartners";
import { SajuManageLoadingState } from "@/features/mypage/ui/manage/saju-manage-loading-state";
import { SajuManageEmptyState } from "@/features/mypage/ui/manage/saju-manage-empty-state";
import { SajuManageSummary } from "@/features/mypage/ui/manage/saju-manage-summary";
import { SajuManageForm } from "@/features/mypage/ui/manage/saju-manage-form";
import { SajuCardList } from "@/features/mypage/ui/manage/saju-card-list";
import { PartnerAddModal } from "@/features/mypage/ui/manage/partner-add-modal";
import { PartnerDeleteModal } from "@/features/mypage/ui/manage/partner-delete-modal";
import {
  toPartnerFormValues,
  toPartnerRequest,
  EMPTY_PARTNER_FORM_VALUES,
} from "@/features/mypage/model/partner";
import type { SajuRequest } from "@/generated/api";

type SelectedTarget = "me" | number;
type PendingNewPartner = { name: string };

export function SajuManageSection() {
  const sajuManage = useSajuManage();
  const partnersHook = usePartners();

  const [selectedTarget, setSelectedTarget] = useState<SelectedTarget>("me");
  const [pendingNewPartner, setPendingNewPartner] =
    useState<PendingNewPartner | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const [partnerSuccessMessage, setPartnerSuccessMessage] = useState<
    string | null
  >(null);
  const [partnerErrorMessage, setPartnerErrorMessage] = useState<string | null>(
    null,
  );

  const selectedPartner =
    selectedTarget !== "me"
      ? (partnersHook.partners.find((p) => p.id === selectedTarget) ?? null)
      : null;

  const isNewPartnerMode =
    selectedTarget !== "me" && !selectedPartner && !!pendingNewPartner;

  function handleAddOpen() {
    setIsAddModalOpen(true);
  }

  function handleAddConfirm(name: string) {
    setIsAddModalOpen(false);
    // Use a temporary negative ID as placeholder key while the user fills in details
    const tempId = -Date.now();
    setPendingNewPartner({ name });
    setSelectedTarget(tempId);
    setPartnerSuccessMessage(null);
    setPartnerErrorMessage(null);
  }

  function handleDeleteOpen(partnerId: number, partnerName: string) {
    setDeleteTarget({ id: partnerId, name: partnerName });
  }

  async function handleDeleteConfirm() {
    if (!deleteTarget) return;
    const success = await partnersHook.handleDelete(deleteTarget.id);
    if (success) {
      if (selectedTarget === deleteTarget.id) setSelectedTarget("me");
      setDeleteTarget(null);
    }
  }

  async function handlePartnerSave(payload: SajuRequest) {
    setPartnerSuccessMessage(null);
    setPartnerErrorMessage(null);

    if (isNewPartnerMode && pendingNewPartner) {
      const partnerPayload = toPartnerRequest(pendingNewPartner.name, payload);
      const newId = await partnersHook.handleCreate(partnerPayload);
      if (newId !== null) {
        setPendingNewPartner(null);
        setSelectedTarget(newId);
        setPartnerSuccessMessage(
          `${pendingNewPartner.name} 사주가 추가됐습니다.`,
        );
      } else {
        setPartnerErrorMessage(
          partnersHook.errorMessage ?? "추가에 실패했습니다.",
        );
      }
      return;
    }

    if (selectedPartner?.id) {
      const partnerName = selectedPartner.name ?? "";
      const partnerPayload = toPartnerRequest(partnerName, payload);
      const success = await partnersHook.handleUpdate(
        selectedPartner.id,
        partnerPayload,
      );
      if (success) {
        setPartnerSuccessMessage("사주 정보가 수정됐습니다.");
      } else {
        setPartnerErrorMessage(
          partnersHook.errorMessage ?? "수정에 실패했습니다.",
        );
      }
    }
  }

  const partnerFormInitialValues = isNewPartnerMode
    ? EMPTY_PARTNER_FORM_VALUES
    : selectedPartner
      ? toPartnerFormValues(selectedPartner)
      : null;

  const partnerIsPending =
    partnersHook.isPendingCreate || partnersHook.isPendingUpdate;

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
            partners={partnersHook.partners}
            selectedTarget={selectedTarget}
            onSelect={(target) => {
              setSelectedTarget(target);
              setPendingNewPartner(null);
              setPartnerSuccessMessage(null);
              setPartnerErrorMessage(null);
            }}
            onAdd={handleAddOpen}
            onDelete={handleDeleteOpen}
            disabled={partnerIsPending}
          />

          {/* 성공/에러 메시지 */}
          {selectedTarget === "me" && sajuManage.successMessage && (
            <div className="rounded-sm border-2 border-green-500 bg-green-50 px-4 py-3 text-[13px] font-semibold text-green-700">
              {sajuManage.successMessage}
            </div>
          )}
          {selectedTarget !== "me" && partnerSuccessMessage && (
            <div className="rounded-sm border-2 border-green-500 bg-green-50 px-4 py-3 text-[13px] font-semibold text-green-700">
              {partnerSuccessMessage}
            </div>
          )}

          {/* 나의 사주 요약 (나 선택 시) */}
          {selectedTarget === "me" && sajuManage.initialValues && (
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
          {selectedTarget !== "me" && partnerFormInitialValues && (
            <>
              <PartnerSummaryHeader
                name={
                  isNewPartnerMode
                    ? (pendingNewPartner?.name ?? "")
                    : (selectedPartner?.name ?? "")
                }
                isNew={isNewPartnerMode}
              />
              <SajuManageForm
                key={String(selectedTarget)}
                initialValues={partnerFormInitialValues}
                isPending={partnerIsPending}
                errorMessage={partnerErrorMessage}
                onSave={handlePartnerSave}
              />
            </>
          )}
        </>
      )}

      <PartnerAddModal
        isOpen={isAddModalOpen}
        isPending={false}
        onClose={() => setIsAddModalOpen(false)}
        onConfirm={handleAddConfirm}
      />

      <PartnerDeleteModal
        partnerName={deleteTarget?.name ?? null}
        isPending={partnersHook.isPendingDelete}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
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
