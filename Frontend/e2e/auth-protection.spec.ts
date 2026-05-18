import { expect, test, type BrowserContext } from "@playwright/test";

async function addAuthCookies(context: BrowserContext, baseURL?: string) {
  await context.addCookies([
    {
      name: "saju_access_token",
      value: "e2e-access-token",
      url: baseURL ?? "http://127.0.0.1:3100",
    },
  ]);
}

test.describe("auth protected routing", () => {
  // 마이페이지 보호 라우팅 테스트입니다.
  // 기대 결과: 토큰 없이 /mypage에 접근하면 로그인 화면으로 이동하고 next=/mypage가 유지되어야 합니다.
  test("redirects guests from mypage to login with next parameter", async ({
    page,
  }) => {
    await page.goto("/mypage");

    await expect(page).toHaveURL(/\/login\?next=\/mypage$/);
  });

  // 정통사주 보호 라우팅 테스트입니다.
  // 기대 결과: 토큰 없이 정통사주 상세로 접근하면 마이페이지 보호 정책에 따라 로그인 화면으로 이동해야 합니다.
  test("redirects guests from jeongtongsaju to login", async ({ page }) => {
    await page.goto("/mypage/jeongtongsaju");

    await expect(page).toHaveURL(/\/login\?next=\/mypage$/);
  });

  // 사주 결과 보호 라우팅 테스트입니다.
  // 기대 결과: 토큰 없이 /saju/result에 접근하면 로그인 화면으로 이동해야 합니다.
  test("redirects guests from saju result to login", async ({ page }) => {
    await page.goto("/saju/result");

    await expect(page).toHaveURL(/\/login$/);
  });

  // 로그인 사용자의 사주 입력 재진입 방지 테스트입니다.
  // 기대 결과: 토큰이 있는 사용자가 /saju에 접근하면 결과 화면으로 바로 이동해야 합니다.
  test("redirects authenticated users from saju input to result", async ({
    context,
    page,
    baseURL,
  }) => {
    await addAuthCookies(context, baseURL);

    await page.goto("/saju");

    await expect(page).toHaveURL(/\/saju\/result$/);
  });
});
