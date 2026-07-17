import { TRADITIONAL_SAJU_PREVIEW_DATA } from "@/features/preview/model/traditional-saju-preview-data";
import { getPreviewConfig } from "@/features/preview/model/preview-registry";
import { PreviewPageCta } from "@/features/preview/ui/preview-page-cta";
import { PreviewPageLayout } from "@/features/preview/ui/preview-page-layout";
import { PreviewRelatedLinks } from "@/features/preview/ui/preview-related-links";
import { JeongtongsajuDaewoon } from "@/features/mypage/ui/jeongtongsaju/jeongtongsaju-daewoon";
import { JeongtongsajuFiveElements } from "@/features/mypage/ui/jeongtongsaju/jeongtongsaju-fiveelements";
import { JeongtongsajuHero } from "@/features/mypage/ui/jeongtongsaju/jeongtongsaju-hero";
import { JeongtongsajuPillars } from "@/features/mypage/ui/jeongtongsaju/jeongtongsaju-pillars";
import { JeongtongsajuTwelveGrowth } from "@/features/mypage/ui/jeongtongsaju/jeongtongsaju-twelve-growth";
import { ArticleTrustNote } from "@/shared/ui/article-trust-note";

const preview = getPreviewConfig("traditional-saju");
const exampleReadingCase = [
  "예를 들어 어떤 사람이 첫 화면의 오행 분포에서 화와 토가 강하고 수가 약하게 나온다고 가정해보면, 여기서 바로 성격을 단정하기보다 에너지의 방향을 먼저 읽습니다.",
  "실제 해석에서는 표현과 실행은 강하지만 식히고 정리하는 힘이 약할 수 있다는 쪽으로 시작해, 감정 속도와 회복 루틴을 함께 봅니다.",
  "그다음 4기둥과 대운을 붙여보면 이 강한 추진력이 지금 시기에는 기회로 작동하는지, 아니면 과열로 이어지는지까지 더 구체적으로 판단할 수 있습니다.",
];
const interpretationBoundaries = [
  "오행 비율이 비슷하게 보여도 태어난 계절이 다르면 같은 화(火) 강세를 전혀 다르게 읽을 수 있습니다.",
  "대운 흐름이 바뀌는 구간에서는 평소 장점으로 읽히던 기질이 부담이나 피로로 체감될 수도 있습니다.",
  "그래서 공개 예시에서는 화면 구조와 읽는 순서를 먼저 이해하고, 실제 판단은 자신의 생년월일시 전체 구조와 함께 보는 편이 안전합니다.",
];
const trustHighlights = [
  "공개 예시 데이터와 실제 결과 화면의 항목 순서 대조",
  "오행 균형, 4기둥, 대운 흐름을 함께 보는 읽기 순서",
  "개별 사건 예언보다 해석 맥락과 읽는 기준 중심",
];

export function TraditionalSajuPreviewPage() {
  return (
    <PreviewPageLayout
      badge={preview.badge}
      title={preview.title}
      description={preview.description}
    >
      <div className="flex flex-col gap-8">
        <section className="rounded-3xl border border-[#EDE9FF] bg-[#FAFAFF] px-5 py-5 text-sm leading-7 text-gray-600 md:px-7">
          <p>
            이 페이지는 정통사주 결과 화면의 구성과 각 항목을 읽는 순서를 함께
            정리한 예시입니다. 실제 결과를 보기 전에 화면에 어떤 정보가 나오고,
            어디부터 살펴보면 되는지 확인할 수 있도록 만든 예시입니다.
          </p>
        </section>
        <JeongtongsajuHero
          traits={TRADITIONAL_SAJU_PREVIEW_DATA.traits}
          fiveElements={TRADITIONAL_SAJU_PREVIEW_DATA.fiveElements}
          gender="FEMALE"
          nickname="미리보기"
        />
        <JeongtongsajuPillars pillars={TRADITIONAL_SAJU_PREVIEW_DATA.pillars} />
        <JeongtongsajuFiveElements
          fiveElements={TRADITIONAL_SAJU_PREVIEW_DATA.fiveElements}
        />
        <JeongtongsajuTwelveGrowth
          twelveGrowthInfo={TRADITIONAL_SAJU_PREVIEW_DATA.twelveGrowthInfo}
          description={
            TRADITIONAL_SAJU_PREVIEW_DATA.sectionDescriptions.twelveGrowth
          }
        />
        <JeongtongsajuDaewoon
          bigLuck={TRADITIONAL_SAJU_PREVIEW_DATA.bigLuck}
          description={
            TRADITIONAL_SAJU_PREVIEW_DATA.sectionDescriptions.bigLuck
          }
        />
        <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
          <h2 className="text-base font-black text-gray-900">이 예시에서 먼저 봐야 할 포인트</h2>
          <div className="mt-3 flex flex-col gap-3 text-sm leading-7 text-gray-600">
            <p>첫 화면에서는 오행 비율과 핵심 성향이 어떻게 요약되는지 확인합니다.</p>
            <p>중간 영역에서는 사주 4기둥과 12운성을 통해 기질의 뼈대를 읽습니다.</p>
            <p>마지막 대운 흐름은 타고난 구조 위에 어떤 시기 변화가 겹치는지 보는 용도입니다.</p>
          </div>
        </section>
        <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
          <h2 className="text-base font-black text-gray-900">이 화면을 실제로 해석할 때의 예시</h2>
          <div className="mt-3 flex flex-col gap-3 text-sm leading-7 text-gray-600">
            {exampleReadingCase.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </section>
        <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
          <h2 className="text-base font-black text-gray-900">같은 화면도 다르게 읽히는 경우</h2>
          <div className="mt-3 flex flex-col gap-3 text-sm leading-7 text-gray-600">
            {interpretationBoundaries.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </section>
        <ArticleTrustNote
          kind="공개 예시"
          updatedAt="2026-07-17"
          scope="이 페이지는 정통사주 결과 구조를 설명하기 위한 공개 예시 화면입니다. 실제 결과는 개인의 생년월일시와 현재 운의 흐름에 따라 달라집니다."
          highlights={trustHighlights}
        />
        <PreviewRelatedLinks
          heading={preview.relatedLinks.heading}
          links={preview.relatedLinks.links}
        />
        <PreviewPageCta
          title={preview.cta.title}
          description={preview.cta.description}
          href={preview.cta.href}
          label={preview.cta.label}
        />
      </div>
    </PreviewPageLayout>
  );
}
