"use client";

import type { PartnerResponse, SajuProfileResponse } from "@/generated/api";
import { useCompatibilityResultSections } from "@/features/compatibility/hooks/useCompatibilityResultSections";
import type { CompatibilityResultDisplay } from "@/features/compatibility/model/compatibility";
import { CompatibilityResultDetailTabs } from "@/features/compatibility/ui/components/compatibility-result-detail-tabs";
import { CompatibilityResultHeader } from "@/features/compatibility/ui/components/compatibility-result-header";
import { CompatibilityResultScore } from "@/features/compatibility/ui/components/compatibility-result-score";
import { CompatibilityResultSections } from "@/features/compatibility/ui/components/compatibility-result-sections";
import { CompatibilityResultSummary } from "@/features/compatibility/ui/components/compatibility-result-summary";

const CIRCUMFERENCE = 2 * Math.PI * 44;

type Props = {
  myProfile?: SajuProfileResponse | null;
  partner: PartnerResponse;
  result: CompatibilityResultDisplay;
  onReset: () => void;
};

export function CompatibilityResultView({ myProfile, partner, result, onReset }: Props) {
  const { activeSectionIndex, activeSection, setActiveSectionIndex } =
    useCompatibilityResultSections(result.sections);

  return (
    <div className="flex flex-col gap-5">
      {/* 나 vs 파트너 헤더 */}
      <CompatibilityResultHeader myProfile={myProfile} partner={partner} />

      {/* 종합 점수 */}
      <CompatibilityResultScore
        overallScore={result.overallScore}
        keyword={result.keyword}
        description={result.description}
        circumference={CIRCUMFERENCE}
      />

      {/* 분야별 점수 */}
      {result.sections.length > 0 && (
        <CompatibilityResultSections sections={result.sections} />
      )}

      {/* 분야별 상세 풀이 */}
      {result.sections.length > 0 && (
        <CompatibilityResultDetailTabs
          sections={result.sections}
          activeSectionIndex={activeSectionIndex}
          activeSection={activeSection}
          onSelectSection={setActiveSectionIndex}
        />
      )}

      {/* 궁합 총평 */}
      <CompatibilityResultSummary
        description={result.description}
        tags={result.tags}
      />

      {/* 다시하기 버튼 */}
      <button
        type="button"
        onClick={onReset}
        className="w-full rounded-2xl border border-slate-200 bg-white py-4 text-[15px] font-bold text-slate-600 transition hover:bg-slate-50"
      >
        다른 상대와 궁합 보기
      </button>
    </div>
  );
}
