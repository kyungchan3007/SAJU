import { CompatibilityResultHeader } from "@/features/compatibility/ui/components/compatibility-result-header";
import { CompatibilityResultScore } from "@/features/compatibility/ui/components/compatibility-result-score";
import { CompatibilityResultSections } from "@/features/compatibility/ui/components/compatibility-result-sections";
import { CompatibilityResultSummary } from "@/features/compatibility/ui/components/compatibility-result-summary";
import { CompatibilityPreviewDetailTabs } from "@/features/preview/client/compatibility-preview-detail-tabs";
import {
  COMPATIBILITY_PREVIEW_MY_PROFILE,
  COMPATIBILITY_PREVIEW_PARTNER,
  COMPATIBILITY_PREVIEW_RESULT,
} from "@/features/preview/model/compatibility-preview-data";
import { getPreviewConfig } from "@/features/preview/model/preview-registry";
import { PreviewPageCta } from "@/features/preview/ui/preview-page-cta";
import { PreviewPageLayout } from "@/features/preview/ui/preview-page-layout";
import { PreviewRelatedLinks } from "@/features/preview/ui/preview-related-links";
import { ArticleTrustNote } from "@/shared/ui/article-trust-note";

const preview = getPreviewConfig("compatibility");
const compatibilityCase = [
  "예를 들어 대화는 잘 통하지만 중요한 결정을 내리는 속도가 다른 두 사람을 떠올려볼 수 있습니다. 겉으로는 큰 싸움이 없어 보여도 실제 관계 피로는 여기서 쌓이는 경우가 많습니다.",
  "이럴 때 종합 점수만 보면 무난한 궁합처럼 읽힐 수 있지만, 세부 탭에서는 한쪽은 빠르게 결론을 원하고 다른 쪽은 시간을 두고 정리하려는 흐름이 드러날 수 있습니다.",
  "그래서 궁합 화면은 '잘 맞는다/안 맞는다'를 찍는 용도보다, 어떤 장면에서 조율이 필요한지 미리 확인하는 도구로 읽는 편이 더 현실적입니다.",
];
const compatibilityBoundaries = [
  "종합 점수가 높아도 생활 리듬이나 감정 표현 방식이 다르면 실제 갈등 포인트는 충분히 생길 수 있습니다.",
  "반대로 특정 카드 점수가 낮아 보여도 관계 맥락과 조율 경험이 있으면 실제 체감은 안정적으로 나타날 수 있습니다.",
  "공개 예시에서는 화면 구조와 읽는 기준을 설명하고, 실제 판단은 두 사람의 정보와 현재 관계 맥락을 함께 봐야 합니다.",
];
const trustHighlights = [
  "종합 점수, 세부 탭, 총평의 화면별 역할",
  "좋은 궁합 여부보다 조율이 필요한 장면 읽기",
  "관계 맥락과 생활 리듬 변수를 함께 보는 기준",
];

export function CompatibilityPreviewPage() {
  return (
    <PreviewPageLayout
      badge={preview.badge}
      title={preview.title}
      description={preview.description}
    >
      <div className="mx-auto flex w-full max-w-[720px] flex-col gap-5 pt-7">
        <section className="rounded-3xl border border-[#EDE9FF] bg-[#FAFAFF] px-5 py-5 text-sm leading-7 text-gray-600">
          <p>
            이 공개 예시는 궁합 결과가 점수만 보여주는 화면이 아니라는 점을
            설명하기 위한 페이지입니다. 두 사람의 조합을 종합 점수, 세부 영역,
            요약 코멘트로 나눠 읽도록 구성돼 있어 관계에서 잘 맞는 부분과 서로
            조율이 필요한 부분을 살펴보는 참고 자료로 활용할 수 있습니다.
          </p>
        </section>
        <CompatibilityResultHeader
          myProfile={COMPATIBILITY_PREVIEW_MY_PROFILE}
          partner={COMPATIBILITY_PREVIEW_PARTNER}
        />
        <CompatibilityResultScore
          overallScore={COMPATIBILITY_PREVIEW_RESULT.overallScore}
          keyword={COMPATIBILITY_PREVIEW_RESULT.keyword}
          description={COMPATIBILITY_PREVIEW_RESULT.description}
          circumference={0}
        />
        <CompatibilityResultSections
          sections={COMPATIBILITY_PREVIEW_RESULT.sections}
        />
        <CompatibilityPreviewDetailTabs
          sections={COMPATIBILITY_PREVIEW_RESULT.sections}
        />
        <CompatibilityResultSummary
          description={COMPATIBILITY_PREVIEW_RESULT.description}
          tags={COMPATIBILITY_PREVIEW_RESULT.tags}
        />
        <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900">
            궁합 화면을 읽는 순서
          </h2>
          <div className="mt-3 flex flex-col gap-3 text-sm leading-7 text-gray-600">
            <p>
              먼저 두 사람의 기본 정보와 종합 점수로 전체 온도를 확인합니다.
            </p>
            <p>
              그다음 영역별 카드에서 대화, 감정, 생활 방식처럼 충돌이 생길 수
              있는 지점을 세부적으로 읽습니다.
            </p>
            <p>
              마지막 총평은 개별 카드의 내용을 한 문장으로 정리한 결론으로 보면
              이해가 쉽습니다.
            </p>
          </div>
        </section>
        <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900">
            세부 탭이 필요한 이유를 보여주는 예시
          </h2>
          <div className="mt-3 flex flex-col gap-3 text-sm leading-7 text-gray-600">
            {compatibilityCase.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </section>
        <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900">
            점수만으로 판단하면 놓치기 쉬운 부분
          </h2>
          <div className="mt-3 flex flex-col gap-3 text-sm leading-7 text-gray-600">
            {compatibilityBoundaries.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </section>
        <ArticleTrustNote
          kind="공개 예시"
          updatedAt="2026-07-17"
          scope="이 페이지는 궁합 결과 구성과 읽는 순서를 보여주기 위한 공개 예시입니다. 실제 궁합 해석은 두 사람의 생년월일 정보와 관계 맥락에 따라 달라집니다."
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
