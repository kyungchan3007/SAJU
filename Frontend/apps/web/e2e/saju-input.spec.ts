import { expect, test, type Page } from "@playwright/test";
import { addAuthCookies } from "./support";

async function fillRequiredSajuFields(page: Page) {
  await page.getByLabel("출생 연도").selectOption("1992");
  await page.getByLabel("출생 월 / 일").fill("03 / 14");
  await page.getByLabel("양력 / 음력").selectOption("SOLAR");
  await page.getByLabel("성별").selectOption("MALE");
  await page.getByLabel("출생 도시").selectOption("서울특별시");
}

async function fillBirthTime(page: Page, hour: string, minute: string) {
  await page.getByRole("combobox", { name: "출생 시간" }).selectOption(hour);
  await page.getByRole("combobox", { name: "출생 분" }).selectOption(minute);
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

    await expect(page).toHaveURL(/\/login\?next=%2Fsaju$/);
    expect(draftPayload).toMatchObject({
      birthYear: "1992",
      birthDate: "03 / 14",
      city: "서울특별시",
      calendarType: "SOLAR",
      gender: "MALE",
    });
  });

  test("combines hour and minute selects into HH:MM", async ({ page }) => {
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
    await fillBirthTime(page, "9", "5");
    await submitButton(page).click();

    await expect(page).toHaveURL(/\/login\?next=%2Fsaju$/);
    expect(draftPayload).toMatchObject({
      birthTime: "09:05",
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

    await expect(page).toHaveURL(/\/login\?next=%2Fsaju$/);
    expect(draftPayload).toMatchObject({
      timeUnknown: "yes",
      birthTime: "",
    });
  });

  test("blocks partial birth time selections until minute is chosen", async ({
    page,
  }) => {
    let resultRequestCount = 0;
    await page.route("**/api/saju/result", async (route) => {
      resultRequestCount += 1;
      await route.fulfill({ status: 500, body: "" });
    });

    await page.goto("/saju");
    await fillRequiredSajuFields(page);
    await page.getByRole("combobox", { name: "출생 시간" }).selectOption("9");
    await submitButton(page).click();

    await expect(
      page.getByText("출생 시간을 끝까지 선택해 주세요", { exact: true }),
    ).toBeVisible();
    expect(resultRequestCount).toBe(0);
  });

  test("preserves next path for guests when redirecting to login", async ({
    page,
  }) => {
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
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true, data: null, error: null }),
      });
    });

    await page.goto("/saju?next=%2Fcompatibility");
    await fillRequiredSajuFields(page);
    await submitButton(page).click();

    await expect(page).toHaveURL(
      /\/login\?next=%2Fsaju%3Fnext%3D%252Fcompatibility$/,
    );
  });

  test("returns users to the requested service after a successful submit", async ({
    context,
    page,
    baseURL,
  }) => {
    await page.route("**/api/saju/result", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          data: {
            todayScore: 82,
            weakElement: "water",
          },
          error: null,
        }),
      });
    });

    await addAuthCookies(context, baseURL);
    await page.goto("/saju?next=%2Fcompatibility&forceInput=1");
    await fillRequiredSajuFields(page);
    await submitButton(page).click();

    await expect(page).toHaveURL(/\/compatibility$/);
  });
});
