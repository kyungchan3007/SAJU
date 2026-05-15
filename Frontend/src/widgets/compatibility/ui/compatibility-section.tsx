"use client";

import { useCompatibility } from "@/features/compatibility/hooks/useCompatibility";
import { CompatibilityResultView } from "@/features/compatibility/ui/compatibility-result-view";
import { PartnerSelectView } from "@/features/compatibility/ui/partner-select-view";
import { useAdGate } from "@/shared/hooks/use-ad-gate";
import { AdProgressGate } from "@/shared/ui/ad-progress-gate.client";

export function CompatibilitySection() {
  const compat = useCompatibility();
  const isResultReady =
    compat.result?.status === "COMPLETE" && Boolean(compat.selectedPartner);
  const gateEnabled = compat.isInResultView && !compat.resultError;
  const adGate = useAdGate({ enabled: gateEnabled, isContentReady: isResultReady });

  return (
    <div className="flex flex-col gap-4">
      <h2 className="flex items-center gap-2.5 font-display text-[22px]">
        궁합<span className="h-0.5 flex-1 bg-black" />
      </h2>

      {compat.resultError && compat.isInResultView && (
        <div className="flex flex-col gap-3">
          <div className="rounded-sm border-2 border-red-400 bg-red-50 px-4 py-3 text-[13px] font-semibold text-red-600">
            {compat.resultError}
          </div>
          <button
            type="button"
            onClick={compat.handleReset}
            className="w-full rounded-sm border-2 border-black bg-[#F0EDE6] py-3.5 font-display text-[15px] [box-shadow:2px_2px_0_#0d0d0d]"
          >
            다시 시도
          </button>
        </div>
      )}

      {adGate.shouldShowGate && (
        <AdProgressGate
          progress={isResultReady ? 100 : 80}
          isComplete={isResultReady}
          onRevealResult={adGate.unlock}
        />
      )}

      {compat.isInResultView &&
        !compat.resultError &&
        adGate.isUnlocked &&
        isResultReady &&
        compat.result &&
        compat.selectedPartner && (
          <CompatibilityResultView
            partner={compat.selectedPartner}
            result={compat.result}
            onReset={compat.handleReset}
          />
        )}

      {!compat.isInResultView && (
        <PartnerSelectView
          myProfile={compat.myProfile}
          partners={compat.partners}
          selectedPartnerId={compat.selectedPartnerId}
          onSelectPartner={compat.handleSelectPartner}
          onShowResult={compat.handleShowResult}
          isLoadingResult={false}
        />
      )}
    </div>
  );
}
