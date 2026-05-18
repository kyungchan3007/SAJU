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

async function expectVisibleMypageLink(page: import("@playwright/test").Page) {
  const visibleMypageLinks = await page
    .locator('a[href="/mypage"]')
    .evaluateAll(
      (links) =>
        links.filter((link) => {
          const style = window.getComputedStyle(link);
          const rect = link.getBoundingClientRect();
          return (
            style.display !== "none" &&
            style.visibility !== "hidden" &&
            rect.width > 0 &&
            rect.height > 0
          );
        }).length,
    );

  expect(visibleMypageLinks).toBeGreaterThan(0);
}

async function clickVisibleLink(
  page: import("@playwright/test").Page,
  href: string,
) {
  const clicked = await page
    .locator(`a[href="${href}"]`)
    .evaluateAll((links) => {
      const link = links.find((candidate) => {
        const style = window.getComputedStyle(candidate);
        const rect = candidate.getBoundingClientRect();
        return (
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          rect.width > 0 &&
          rect.height > 0
        );
      });

      if (!(link instanceof HTMLElement)) {
        return false;
      }

      link.click();
      return true;
    });

  expect(clicked).toBe(true);
}

test.describe("home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.route("**/api/saju/result", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          data: {
            todayScore: 82,
            mood: "차분한 집중",
            goodTime: "오전",
            weakElement: "water",
          },
          error: null,
        }),
      });
    });
  });

  // 홈 화면의 핵심 사용자 진입 테스트입니다.
  // 기대 결과: /home에 접속하면 대표 문구와 무료 사주 CTA가 보여야 합니다.
  test("shows the main home CTA", async ({ page }) => {
    await page.goto("/home");

    await expect(
      page.getByRole("heading", { name: /오늘의 운명/ }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /무료 사주 풀이/ }).first(),
    ).toBeVisible();
  });

  // 홈의 무료 사주 CTA 라우팅 테스트입니다.
  // 기대 결과: "무료 사주 풀이" CTA를 클릭하면 사주 입력 화면(/saju)으로 이동해야 합니다.
  test("navigates to saju input from the free saju CTA", async ({ page }) => {
    await page.goto("/home");

    await page
      .getByRole("link", { name: /무료 사주 풀이/ })
      .first()
      .click();

    await expect(page).toHaveURL(/\/saju$/);
  });

  // 홈의 궁합 CTA 라우팅 테스트입니다.
  // 기대 결과: "궁합 보기" CTA를 클릭하면 궁합 화면(/compatibility)으로 이동해야 합니다.
  test("navigates to compatibility from the compatibility CTA", async ({
    page,
  }) => {
    await page.goto("/home");

    await page.getByRole("link", { name: "궁합 보기" }).click();

    await expect(page).toHaveURL(/\/compatibility$/);
  });

  // 비로그인 홈 내비게이션 라우팅 테스트입니다.
  // 기대 결과: 토큰이 없을 때 마이페이지 진입 링크를 누르면 로그인 화면(/login)으로 이동해야 합니다.
  test("navigates guest users to login from the mypage navigation", async ({
    page,
  }) => {
    await page.goto("/home");

    await clickVisibleLink(page, "/login");

    await expect(page).toHaveURL(/\/login$/);
  });

  // 로그인 이후 홈 진입 상태를 확인하는 테스트입니다.
  // 기대 결과: 토큰 쿠키가 있으면 전역 내비게이션에서 로그인 링크 대신 마이페이지 진입 링크가 보여야 합니다.
  test("shows the authenticated home navigation when access token exists", async ({
    context,
    page,
    baseURL,
  }) => {
    await context.addCookies([
      {
        name: "saju_access_token",
        value: "e2e-access-token",
        url: baseURL ?? "http://127.0.0.1:3100",
      },
    ]);

    await page.goto("/home");

    await expect(page.getByRole("link", { name: "로그인" })).toHaveCount(0);
    await expectVisibleMypageLink(page);
  });

  // 로그인 홈 내비게이션 라우팅 테스트입니다.
  // 기대 결과: 토큰 쿠키가 있으면 마이페이지 진입 링크를 눌렀을 때 /mypage로 이동해야 합니다.
  test("navigates authenticated users to mypage from the navigation", async ({
    context,
    page,
    baseURL,
  }) => {
    await context.addCookies([
      {
        name: "saju_access_token",
        value: "e2e-access-token",
        url: baseURL ?? "http://127.0.0.1:3100",
      },
    ]);

    await page.goto("/home");
    await clickVisibleLink(page, "/mypage");

    await expect(page).toHaveURL(/\/mypage$/);
  });

  // 홈 화면의 기본 반응형 안정성 테스트입니다.
  // 기대 결과: desktop/mobile 프로젝트 모두에서 문서 가로 스크롤이 생기지 않아야 합니다.
  test("does not create horizontal overflow", async ({ page }) => {
    await page.goto("/home");

    await expectNoHorizontalOverflow(page);
  });
});
