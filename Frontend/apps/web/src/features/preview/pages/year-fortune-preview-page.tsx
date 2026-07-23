import { getPreviewConfig } from "@/features/preview/model/preview-registry";
import { YEAR_FORTUNE_PREVIEW_DATA } from "@/features/preview/model/year-fortune-preview-data";
import { PreviewPageCta } from "@/features/preview/ui/preview-page-cta";
import { PreviewPageLayout } from "@/features/preview/ui/preview-page-layout";
import { PreviewRelatedLinks } from "@/features/preview/ui/preview-related-links";
import { YearFortuneDomainTabs } from "@/features/year-fortune/ui/year-fortune-domain-tabs";
import { YearFortuneHero } from "@/features/year-fortune/ui/year-fortune-hero";
import { YearFortuneMonthly } from "@/features/year-fortune/ui/year-fortune-monthly";
import { ArticleTrustNote } from "@/shared/ui/article-trust-note";
import styles from "@/features/preview/ui/preview-page.module.css";

const preview = getPreviewConfig("year-fortune");
const yearFortuneCase = [
  "예를 들어 올해 전체 흐름이 확장 쪽으로 보이는 사람이라도, 실제 행동 계획은 월별 구간에 따라 달라질 수 있습니다.",
  "상반기에 재물운과 일의 속도가 같이 올라가는 모습이 보이면 기회처럼 느껴질 수 있지만, 같은 시기에 건강운 카드가 무너지면 성과보다 과부하를 먼저 관리해야 하는 해석도 가능합니다.",
  "이런 이유로 신년운세 화면은 한 줄 총평만 보는 페이지가 아니라, 전체 요약과 영역별 포인트, 월별 흐름을 함께 비교해 우선순위를 정하는 구조로 읽는 편이 맞습니다.",
];
const yearFortuneBoundaries = [
  "공통 운세에서 좋은 흐름으로 보이는 구간도 개인 대운이 정리 국면이면 실제 체감은 느리거나 보수적으로 나타날 수 있습니다.",
  "월별 카드가 강한 시기를 가리켜도 건강이나 관계 영역이 같이 흔들리면 행동 속도를 조절하는 해석이 더 중요할 수 있습니다.",
  "따라서 공개 예시는 전체 구조를 이해하는 데 쓰고, 실제 일정 판단은 개인 사주와 현재 생활 조건을 함께 붙여 보는 편이 맞습니다.",
];
const trustHighlights = [
  "연간 요약, 분야별 카드, 월별 흐름의 읽기 순서",
  "좋다/나쁘다 판단보다 우선순위와 생활 계획 연결",
  "공통 운세와 개인 체감 차이의 한계 표시",
];

export function YearFortunePreviewPage() {
  return (
    <PreviewPageLayout
      badge={preview.badge}
      title={preview.title}
      description={preview.description}
    >
      <div className={`mx-auto flex w-full flex-col gap-8 ${styles.narrowBody}`}>
        <section className={`rounded-3xl px-5 py-5 text-sm leading-7 text-gray-600 ${styles.introCard}`}>
          <p>
            이 페이지는 신년운세 결과가 어떤 정보 순서로 제공되는지 보여주는 공개 예시입니다.
            한 해의 전체 흐름, 분야별 포인트, 월별 변화가 어떻게 이어지는지 먼저 읽어두면
            실제 결과를 볼 때 생활 계획과 연결해 살펴보는 데 도움이 될 수 있습니다.
          </p>
        </section>
        <YearFortuneHero
          yearLabel={YEAR_FORTUNE_PREVIEW_DATA.yearLabel}
          targetYear={YEAR_FORTUNE_PREVIEW_DATA.targetYear}
          userInfo={YEAR_FORTUNE_PREVIEW_DATA.userInfo}
        />
        <YearFortuneDomainTabs domains={YEAR_FORTUNE_PREVIEW_DATA.domains} />
        <YearFortuneMonthly
          months={YEAR_FORTUNE_PREVIEW_DATA.months}
          targetYear={YEAR_FORTUNE_PREVIEW_DATA.targetYear}
        />
        <section className={`rounded-3xl border border-gray-100 bg-white px-5 py-6 ${styles.sectionCard}`}>
          <h2 className="text-base font-black text-gray-900">신년운세 예시를 보는 방법</h2>
          <div className="mt-3 flex flex-col gap-3 text-sm leading-7 text-gray-600">
            <p>첫 화면에서는 올해 전체 키워드와 가장 힘이 실리는 영역을 먼저 확인합니다.</p>
            <p>분야별 탭은 일, 관계, 건강처럼 생활 의사결정에 바로 연결되는 요점을 나눠서 읽는 구간입니다.</p>
            <p>월별 흐름은 중요한 시기와 쉬어가야 할 시기를 비교하는 용도로 보는 편이 실용적입니다.</p>
          </div>
        </section>
        <section className={`rounded-3xl border border-gray-100 bg-white px-5 py-6 ${styles.sectionCard}`}>
          <h2 className="text-base font-black text-gray-900">실제 선택 연결 예시</h2>
          <div className="mt-3 flex flex-col gap-3 text-sm leading-7 text-gray-600">
            {yearFortuneCase.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </section>
        <section className={`rounded-3xl border border-gray-100 bg-white px-5 py-6 ${styles.sectionCard}`}>
          <h2 className="text-base font-black text-gray-900">공통 운세와 개인 체감이 갈리는 이유</h2>
          <div className="mt-3 flex flex-col gap-3 text-sm leading-7 text-gray-600">
            {yearFortuneBoundaries.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </section>
        <ArticleTrustNote
          kind="공개 예시"
          updatedAt="2026-07-17"
          scope="이 페이지는 신년운세 결과 화면의 구성과 읽는 기준을 보여주는 공개 예시입니다. 실제 연간 흐름은 개인 사주와 현재 운세 흐름에 따라 달라질 수 있습니다."
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
