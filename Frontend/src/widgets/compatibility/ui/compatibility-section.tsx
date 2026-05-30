"use client";

import { useCompatibility } from "@/features/compatibility/hooks/useCompatibility";
import { CompatibilityHero } from "@/features/compatibility/ui/compatibility-hero";
import { CompatibilityResultView } from "@/features/compatibility/ui/compatibility-result-view";
import { PartnerSelectView } from "@/features/compatibility/ui/partner-select-view";
import { useAdGate } from "@/shared/hooks/use-ad-gate";
import { AdProgressGate } from "@/shared/ui/ad-progress-gate.client";
import { FortuneGateLayout } from "@/shared/ui/fortune-page-layout";
import { PageContentLayout } from "@/shared/ui/page-content-layout";

export function CompatibilitySection() {
  const compat = useCompatibility();
  const isResultReady =
    compat.result?.status === "COMPLETE" && Boolean(compat.selectedPartner);
  const gateEnabled = compat.isInResultView && !compat.resultError;
  const adGate = useAdGate({
    enabled: gateEnabled,
    isContentReady: isResultReady,
    resetKey: compat.resultRequestId,
  });
  const shouldShowResult =
    compat.isInResultView &&
    !compat.resultError &&
    adGate.isUnlocked &&
    isResultReady &&
    Boolean(compat.result) &&
    Boolean(compat.selectedPartner);
  const contentMaxWidthClass = compat.isInResultView
    ? "max-w-[720px]"
    : "max-w-[1152px]";

  return (
    <div>
      {/* Hero — 선택 화면에서만 표시 */}
      {!compat.isInResultView && (
        <PageContentLayout>
          <CompatibilityHero myProfile={compat.myProfile} />
        </PageContentLayout>
      )}

      {/* 본문 */}
      <div className="bg-white">
        <div className={`mx-auto ${contentMaxWidthClass} px-4 py-8 md:px-8`}>

          {/* 에러 */}
          {compat.resultError && compat.isInResultView && (
            <div className="flex flex-col gap-3">
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] font-semibold text-red-600">
                {compat.resultError}
              </div>
              <button
                type="button"
                onClick={compat.handleReset}
                className="w-full rounded-xl border border-slate-200 bg-white py-3.5 text-[15px] font-bold text-slate-700 transition hover:bg-slate-50"
              >
                다시 시도
              </button>
            </div>
          )}

          {/* 광고 게이트 */}
          {adGate.shouldShowGate && (
            <FortuneGateLayout>
              <AdProgressGate
                progress={isResultReady ? 100 : 80}
                isComplete={isResultReady}
                onRevealResult={adGate.unlock}
              />
            </FortuneGateLayout>
          )}

          {/* 결과 화면 */}
          {shouldShowResult && compat.result && compat.selectedPartner && (
            <CompatibilityResultView
              myProfile={compat.myProfile}
              partner={compat.selectedPartner}
              result={compat.result}
              onReset={compat.handleReset}
            />
          )}

          {/* 선택 화면 */}
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
      </div>
    </div>
  );
}
