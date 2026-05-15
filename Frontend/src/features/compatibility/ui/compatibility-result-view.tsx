"use client";

import type { PartnerResponse } from "@/generated/api";
import { useCompatibilityResultSections } from "@/features/compatibility/hooks/useCompatibilityResultSections";
import type { CompatibilityResultDisplay } from "@/features/compatibility/model/compatibility";
import { CompatibilityResultDetailTabs } from "@/features/compatibility/ui/components/compatibility-result-detail-tabs";
import { CompatibilityResultHeader } from "@/features/compatibility/ui/components/compatibility-result-header";
import { CompatibilityResultScore } from "@/features/compatibility/ui/components/compatibility-result-score";
import { CompatibilityResultSections } from "@/features/compatibility/ui/components/compatibility-result-sections";
import { CompatibilityResultSummary } from "@/features/compatibility/ui/components/compatibility-result-summary";

type Props = {
  partner: PartnerResponse;
  result: CompatibilityResultDisplay;
  onReset: () => void;
};

const CIRCUMFERENCE = 2 * Math.PI * 44;

export function CompatibilityResultView({ partner, result, onReset }: Props) {
  const { activeSectionIndex, activeSection, setActiveSectionIndex } =
    useCompatibilityResultSections(result.sections);

  return (
    <div className="flex flex-col gap-4">
      <div
        className="overflow-hidden rounded-sm border-2 border-black bg-[#FDFCF8]"
        style={{ boxShadow: "4px 4px 0 #0d0d0d" }}
      >
        {/* 사용자/상대 프로필 헤더 */}
        <CompatibilityResultHeader partner={partner} />

        {/* 종합 궁합 점수 */}
        <CompatibilityResultScore
          overallScore={result.overallScore}
          keyword={result.keyword}
          description={result.description}
          circumference={CIRCUMFERENCE}
        />

        {/* 분야별 점수 요약 */}
        {result.sections.length > 0 && (
          <div className="border-b-2 border-black p-5">
            <div className="mb-3.5 font-display text-[14px]">분야별 궁합</div>
            <CompatibilityResultSections sections={result.sections} />

            {/* 분야별 상세 풀이 탭 */}
            <CompatibilityResultDetailTabs
              sections={result.sections}
              activeSectionIndex={activeSectionIndex}
              activeSection={activeSection}
              onSelectSection={setActiveSectionIndex}
            />
          </div>
        )}

        {/* 궁합 총평 */}
        <CompatibilityResultSummary
          description={result.description}
          tags={result.tags}
        />
      </div>

      <button
        type="button"
        onClick={onReset}
        className="w-full rounded-sm border-2 border-black bg-[#F0EDE6] py-3.5 font-display text-[15px] transition-all [box-shadow:2px_2px_0_#0d0d0d] hover:-translate-x-px hover:-translate-y-px hover:[box-shadow:4px_4px_0_#0d0d0d]"
      >
        다른 상대와 궁합 보기
      </button>
    </div>
  );
}
