import { expect, test } from "@playwright/test";

async function expectNoHorizontalOverflow(
  page: import("@playwright/test").Page,
) {
  const hasNoOverflow = await page.evaluate(() => {
    const root = document.documentElement;
    return root.scrollWidth <= root.clientWidth;
  });

  expect(hasNoOverflow).toBe(true);
}

const traditionalSajuResponse = {
  success: true,
  data: {
    sajuId: 1,
    traits: {
      summaryZodiac: "뱀띠",
      summaryStrength: "신약",
      geokguk: "정관격",
      summaryPillars: "일주를 중심으로 차분하게 균형을 잡는 명식입니다.",
    },
    pillars: [
      { type: "year", stem: "갑", branch: "자", twelveGrowth: "장생" },
      { type: "month", stem: "병", branch: "인", twelveGrowth: "건록" },
      { type: "day", stem: "무", branch: "진", twelveGrowth: "관대" },
      { type: "hour", stem: "경", branch: "신", twelveGrowth: "제왕" },
    ],
    fiveElements: {
      elements: { 목: 20, 화: 25, 토: 30, 금: 15, 수: 10 },
      yongshinPrimary: "수",
      yongshinSecondary: "목",
    },
    twelveGrowthInfo: {
      year: {
        hanja: "長生",
        meaning: "장생",
        description: "시작과 성장의 기운",
      },
      month: {
        hanja: "建祿",
        meaning: "건록",
        description: "기반을 세우는 기운",
      },
      day: {
        hanja: "冠帶",
        meaning: "관대",
        description: "책임과 성숙의 기운",
      },
      hour: { hanja: "帝旺", meaning: "제왕", description: "강한 추진의 기운" },
    },
    bigLuck: [
      {
        pillar: "갑자",
        pillar_kor: "갑자",
        year_range: "2024-2033",
        age_range: "33-42세",
        isCurrentDaeun: true,
      },
    ],
  },
  error: null,
};

test.describe("jeongtongsaju page", () => {
  test.beforeEach(async ({ context, page, baseURL }) => {
    await context.addCookies([
      {
        name: "saju_access_token",
        value: "e2e-access-token",
        url: baseURL,
      },
      {
        name: "saju_user_email",
        value: "e2e@example.com",
        url: baseURL,
      },
    ]);

    await page.route("**/api/saju/traditional", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(traditionalSajuResponse),
      });
    });
  });

  // 정통사주 데이터 확인 화면의 핵심 렌더링 테스트입니다.
  // 기대 결과: 인증 쿠키와 API 목 응답이 있으면 정통사주 주요 섹션이 보여야 합니다.
  test("shows traditional saju data sections", async ({ page }) => {
    await page.goto("/mypage/jeongtongsaju");

    await expect(page.getByRole("heading", { name: "정통사주" })).toBeVisible();
    await expect(page.getByText("나의 사주 명식")).toBeVisible();
    await expect(page.getByText("사주 4기둥")).toBeVisible();
    await expect(page.getByText("오행 밸런스")).toBeVisible();
    await expect(page.getByText("12운성 — 기둥별 에너지")).toBeVisible();
    await expect(page.getByText("대운 흐름")).toBeVisible();
  });

  // 정통사주 용어 정책 회귀 테스트입니다.
  // 기대 결과: 사용자에게 노출되는 화면에는 금지 용어인 "만세력"이 없어야 합니다.
  test("does not expose the banned manselyeok term", async ({ page }) => {
    await page.goto("/mypage/jeongtongsaju");

    await expect(page.getByText("만세력")).toHaveCount(0);
  });

  // 정통사주 화면의 기본 반응형 안정성 테스트입니다.
  // 기대 결과: desktop/mobile 프로젝트 모두에서 문서 가로 스크롤이 생기지 않아야 합니다.
  test("does not create horizontal overflow", async ({ page }) => {
    await page.goto("/mypage/jeongtongsaju");

    await expectNoHorizontalOverflow(page);
  });
});
