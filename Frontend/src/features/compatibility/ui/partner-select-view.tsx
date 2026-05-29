"use client";

import type { SajuProfileResponse, PartnerResponse } from "@/generated/api";
import { usePartnerSelect } from "@/features/compatibility/hooks/usePartnerSelect";
import { CompatibilityPartnerModal } from "./compatibility-partner-modal";
import { CompatibilityAnalysisInfo } from "./components/compatibility-analysis-info";
import { PartnerMatchCards } from "./components/partner-match-cards";

type Props = {
  myProfile: SajuProfileResponse | null | undefined;
  partners: PartnerResponse[];
  selectedPartnerId: number | null;
  onSelectPartner: (id: number) => void;
  onShowResult: () => void;
  isLoadingResult: boolean;
};

export function PartnerSelectView({
  myProfile,
  partners,
  selectedPartnerId,
  onSelectPartner,
  onShowResult,
  isLoadingResult,
}: Props) {
  const partnerSelect = usePartnerSelect({
    myProfile,
    partners,
    selectedPartnerId,
    onSelectPartner,
  });

  return (
    <>
      <div className="flex flex-col gap-5">
        <PartnerMatchCards
          myGender={myProfile?.gender}
          myDescription={partnerSelect.myDescription}
          selectedPartner={partnerSelect.selectedPartner}
          selectedPartnerId={selectedPartnerId}
          partnerDescription={partnerSelect.partnerDescription}
          onOpenPartnerModal={partnerSelect.openModal}
        />

        <button
          type="button"
          onClick={onShowResult}
          disabled={!selectedPartnerId || isLoadingResult}
          className="w-full rounded-2xl py-4 text-[15px] font-black text-white transition disabled:opacity-40"
          style={{
            background: "linear-gradient(to right, #5956E9, #7C3AED)",
            boxShadow: "0 6px 24px rgba(89,86,233,0.26)",
          }}
        >
          {partnerSelect.ctaLabel}
        </button>

        <CompatibilityAnalysisInfo />
      </div>

      <CompatibilityPartnerModal
        isOpen={partnerSelect.isModalOpen}
        partners={partners}
        selectedId={partnerSelect.modalSelectedId}
        onSelect={partnerSelect.setModalSelectedId}
        onConfirm={partnerSelect.confirmModal}
        onCancel={partnerSelect.closeModal}
      />
    </>
  );
}
