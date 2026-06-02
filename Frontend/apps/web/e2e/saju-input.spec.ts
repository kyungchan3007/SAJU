import { expect, test, type Page } from "@playwright/test";

async function fillRequiredSajuFields(page: Page) {
  await page.getByLabel("출생 연도").selectOption("1992");
  await page.getByLabel("출생 월 / 일").fill("03 / 14");
  await page.getByLabel("양력 / 음력").selectOption("SOLAR");
  await page.getByLabel("성별").selectOption("MALE");
  await page.getByLabel("출생 도시").selectOption("서울특별시");
}

function submitButton(page: Page) {
  return page.getByRole("button", { name: /사주 분석 시작하기/ });
}

test.describe("saju input flow", () => {
  test("validates required fields before submitting", async ({ page }) => {
    let resultRequestCount = 0;
    await page.route("**/api/saju/result", async (route) => {
      resultRequestCount += 1;
      await route.fulfill({ status: 500, body: "" });
    });

    await page.goto("/saju");
    await expect(submitButton(page)).toBeVisible();
    await submitButton(page).click();

    await expect(
      page.getByText("출생 월/일을 입력해 주세요", { exact: true }),
    ).toBeVisible();
    expect(resultRequestCount).toBe(0);
  });

  test("stores guest draft and moves to login after completed submit", async ({
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
    await submitButton(page).click();

    await expect(page).toHaveURL(/\/login\?intent=saju_submit$/);
    expect(draftPayload).toMatchObject({
      birthYear: "1992",
      birthDate: "03 / 14",
      city: "서울특별시",
      calendarType: "SOLAR",
      gender: "MALE",
    });
  });

  test("supports unknown birth time without blocking submission", async ({
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
    await page.getByRole("switch", { name: "출생 시간 미상 여부" }).click();
    await submitButton(page).click();

    await expect(page).toHaveURL(/\/login\?intent=saju_submit$/);
    expect(draftPayload).toMatchObject({
      timeUnknown: "yes",
      birthTime: "",
    });
  });
});
