"use client";

import { useCompatibility } from "@/features/compatibility/hooks/useCompatibility";
import { PartnerSelectView } from "@/features/compatibility/ui/partner-select-view";
import { CompatibilityResultView } from "@/features/compatibility/ui/compatibility-result-view";

export function CompatibilitySection() {
  const compat = useCompatibility();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="flex items-center gap-2.5 font-display text-[22px]">
        짝궁합 <span className="h-0.5 flex-1 bg-black" />
      </h2>

      {/* 로딩 오버레이 */}
      {compat.resultLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-[rgba(248,246,241,0.85)] backdrop-blur-sm">
          <div className="h-12 w-12 animate-spin rounded-full border-[3px] border-[#d4d0c8] border-t-[#0d0d0d]" />
          <span className="font-display text-[15px]">궁합 분석 중...</span>
        </div>
      )}

      {/* 결과 에러 */}
      {compat.resultError && compat.isInResultView && !compat.resultLoading && (
        <div className="flex flex-col gap-3">
          <div className="rounded-sm border-2 border-red-400 bg-red-50 px-4 py-3 text-[13px] font-semibold text-red-600">
            {compat.resultError}
          </div>
          <button
            type="button"
            onClick={compat.handleReset}
            className="w-full rounded-sm border-2 border-black bg-[#F0EDE6] py-3.5 font-display text-[15px] [box-shadow:2px_2px_0_#0d0d0d]"
          >
            ← 다시 시도
          </button>
        </div>
      )}

      {/* PENDING 상태 */}
      {compat.isInResultView &&
        !compat.resultLoading &&
        !compat.resultError &&
        compat.result?.status === "PENDING" && (
          <div className="flex flex-col gap-3">
            <div
              className="flex flex-col items-center gap-3 rounded-sm border-2 border-black bg-[#FDFCF8] py-10 text-center"
              style={{ boxShadow: "4px 4px 0 #0d0d0d" }}
            >
              <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-[#d4d0c8] border-t-[#0d0d0d]" />
              <span className="font-display text-[17px]">분석 중이에요</span>
              <p className="text-[13px] leading-relaxed text-[#7a7570]">
                사주 데이터를 분석하고 있어요.
                <br />
                잠시 후 다시 시도해주세요.
              </p>
            </div>
            <button
              type="button"
              onClick={compat.handleReset}
              className="w-full rounded-sm border-2 border-black bg-[#F0EDE6] py-3.5 font-display text-[15px] [box-shadow:2px_2px_0_#0d0d0d]"
            >
              ← 돌아가기
            </button>
          </div>
        )}

      {/* 결과 화면 */}
      {compat.isInResultView &&
        !compat.resultLoading &&
        !compat.resultError &&
        compat.result?.status === "COMPLETE" &&
        compat.selectedPartner && (
          <CompatibilityResultView
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
          isLoadingResult={compat.resultLoading}
        />
      )}
    </div>
  );
}
