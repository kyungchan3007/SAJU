import { expect, test, type Page } from "@playwright/test";

async function fillRequiredSajuFields(page: Page) {
  await page.getByLabel("출생 연도").selectOption("1992");
  await page.getByLabel("출생 월 / 일").fill("03 / 14");
  await page.getByLabel("양력 / 음력").selectOption("SOLAR");
  await page.getByLabel("출생 도시").selectOption("서울특별시");
  await page.getByLabel("성별").selectOption("MALE");
}

test.describe("saju input page", () => {
  // 사주 입력 화면의 필수값 검증 테스트입니다.
  // 기대 결과: 필수값 없이 제출하면 API를 호출하지 않고 첫 누락 항목 안내 토스트가 보여야 합니다.
  test("shows validation message when required fields are missing", async ({
    page,
  }) => {
    let resultRequestCount = 0;
    await page.route("**/api/saju/result", async (route) => {
      resultRequestCount += 1;
      await route.fulfill({ status: 500, body: "" });
    });

    await page.goto("/saju");
    await page.getByRole("button", { name: "오늘의 기운 보기" }).click();

    await expect(
      page.getByText("출생 월/일을 입력해 주세요", { exact: true }),
    ).toBeVisible();
    expect(resultRequestCount).toBe(0);
  });

  // 미로그인 사주 입력 제출 흐름 테스트입니다.
  // 기대 결과: 입력 완료 후 제출하면 draft 저장 API가 호출되고 로그인 화면으로 이동해야 합니다.
  test("stores draft and navigates to login when guest submits completed form", async ({
    page,
  }) => {
    let draftPayload: unknown = null;

    await page.route("**/api/saju/result", async (route) => {
      await route.fulfill({
        status: 401,
        contentType: "application/json",
        body: JSON.stringify({
          success: false,
          data: null,
          error: { code: "LOGIN_REQUIRED", message: "Login is required." },
        }),
      });
    });

    await page.route("**/api/saju/draft", async (route) => {
      draftPayload = route.request().postDataJSON();
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true, data: null, error: null }),
      });
    });

    await page.goto("/saju");
    await fillRequiredSajuFields(page);
    await page.getByRole("button", { name: "오늘의 기운 보기" }).click();

    await expect(page).toHaveURL(/\/login\?intent=saju_submit$/);
    expect(draftPayload).toMatchObject({
      birthYear: "1992",
      birthDate: "03 / 14",
      city: "서울특별시",
      calendarType: "SOLAR",
      gender: "MALE",
    });
  });
});
