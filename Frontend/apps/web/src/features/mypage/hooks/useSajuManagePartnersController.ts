"use client";

import { useState } from "react";
import { usePartners } from "@/features/mypage/hooks/usePartners";
import {
  EMPTY_PARTNER_FORM_VALUES,
  toPartnerFormValues,
  toPartnerRequest,
} from "@/features/mypage/model/partner";
import {
  createTemporaryPartnerTarget,
  type PartnerDeleteTarget,
  type PendingNewPartner,
  type SajuManageSelectedTarget,
} from "@/features/mypage/model/sajuManageTarget";
import type { SajuRequest } from "@/generated/api";

export function useSajuManagePartnersController() {
  const partnersHook = usePartners();
  const [selectedTarget, setSelectedTarget] =
    useState<SajuManageSelectedTarget>("me");
  const [pendingNewPartner, setPendingNewPartner] =
    useState<PendingNewPartner | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<PartnerDeleteTarget | null>(
    null,
  );
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const selectedPartner =
    selectedTarget !== "me"
      ? (partnersHook.partners.find(
          (partner) => partner.id === selectedTarget,
        ) ?? null)
      : null;

  const isNewPartnerMode =
    selectedTarget !== "me" && !selectedPartner && !!pendingNewPartner;
  const formInitialValues = isNewPartnerMode
    ? EMPTY_PARTNER_FORM_VALUES
    : selectedPartner
      ? toPartnerFormValues(selectedPartner)
      : null;
  const isPending =
    partnersHook.isPendingCreate || partnersHook.isPendingUpdate;
  const displayName = isNewPartnerMode
    ? (pendingNewPartner?.name ?? "")
    : (selectedPartner?.name ?? "");

  function clearMessages() {
    setSuccessMessage(null);
    setErrorMessage(null);
  }

  function selectTarget(target: SajuManageSelectedTarget) {
    setSelectedTarget(target);
    setPendingNewPartner(null);
    clearMessages();
  }

  function openAddModal() {
    setIsAddModalOpen(true);
  }

  function closeAddModal() {
    setIsAddModalOpen(false);
  }

  function confirmAdd(name: string) {
    setIsAddModalOpen(false);
    setPendingNewPartner({ name });
    setSelectedTarget(createTemporaryPartnerTarget());
    clearMessages();
  }

  function openDeleteModal(partnerId: number, partnerName: string) {
    setDeleteTarget({ id: partnerId, name: partnerName });
  }

  function closeDeleteModal() {
    setDeleteTarget(null);
  }

  async function confirmDelete() {
    if (!deleteTarget) return;

    const result = await partnersHook.handleDelete(deleteTarget.id);

    if (result.success) {
      if (selectedTarget === deleteTarget.id) {
        setSelectedTarget("me");
        setPendingNewPartner(null);
      }
      setDeleteTarget(null);
      return;
    }

    setErrorMessage(result.errorMessage ?? "삭제에 실패했습니다.");
  }

  async function savePartner(payload: SajuRequest) {
    clearMessages();

    if (isNewPartnerMode && pendingNewPartner) {
      const partnerPayload = toPartnerRequest(pendingNewPartner.name, payload);
      const result = await partnersHook.handleCreate(partnerPayload);

      if (result.id !== null) {
        setPendingNewPartner(null);
        setSelectedTarget(result.id);
        setSuccessMessage(`${pendingNewPartner.name} 사주가 추가됐습니다.`);
        return;
      }

      setErrorMessage(result.errorMessage ?? "추가에 실패했습니다.");
      return;
    }

    if (!selectedPartner?.id) return;

    const partnerPayload = toPartnerRequest(
      selectedPartner.name ?? "",
      payload,
    );
    const result = await partnersHook.handleUpdate(
      selectedPartner.id,
      partnerPayload,
    );

    if (result.success) {
      setSuccessMessage("사주 정보가 수정됐습니다.");
      return;
    }

    setErrorMessage(result.errorMessage ?? "수정에 실패했습니다.");
  }

  return {
    partners: partnersHook.partners,
    selectedTarget,
    selectedPartner,
    isNewPartnerMode,
    formInitialValues,
    displayName,
    isPending,
    isPendingDelete: partnersHook.isPendingDelete,
    isAddModalOpen,
    deleteTarget,
    successMessage,
    errorMessage,
    selectTarget,
    openAddModal,
    closeAddModal,
    confirmAdd,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
    savePartner,
  };
}
