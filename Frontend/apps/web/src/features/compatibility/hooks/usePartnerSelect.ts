"use client";

import { useState } from "react";
import type { PartnerResponse, SajuProfileResponse } from "@/generated/api";
import {
  formatPartnerSummary,
  formatProfileSummary,
  getPartnerSelectCtaLabel,
} from "@/features/compatibility/model/compatibility";

type Params = {
  myProfile: SajuProfileResponse | null | undefined;
  partners: PartnerResponse[];
  selectedPartnerId: number | null;
  onSelectPartner: (id: number) => void;
};

export function usePartnerSelect({
  myProfile,
  partners,
  selectedPartnerId,
  onSelectPartner,
}: Params) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSelectedId, setModalSelectedId] = useState<number | null>(
    selectedPartnerId,
  );

  const selectedPartner =
    partners.find((partner) => partner.id === selectedPartnerId) ?? null;

  function openModal() {
    setModalSelectedId(selectedPartnerId);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function confirmModal() {
    if (modalSelectedId !== null) {
      onSelectPartner(modalSelectedId);
    }
    setIsModalOpen(false);
  }

  return {
    isModalOpen,
    modalSelectedId,
    selectedPartner,
    myDescription: formatProfileSummary(myProfile),
    partnerDescription: formatPartnerSummary(selectedPartner),
    ctaLabel: getPartnerSelectCtaLabel(selectedPartner),
    openModal,
    closeModal,
    confirmModal,
    setModalSelectedId,
  };
}
