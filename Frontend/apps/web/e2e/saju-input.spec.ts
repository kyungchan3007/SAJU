import { expect, test, type Page } from "@playwright/test";
import { addAuthCookies } from "./support";

async function fillRequiredSajuFields(page: Page) {
  await page.locator('select[name="birthYear"]').selectOption("1992");
  await page.locator('input[name="birthDate"]').fill("03 / 14");
  await page.locator('select[name="calendarType"]').selectOption("SOLAR");
  await page.locator('select[name="gender"]').selectOption("MALE");
  await page.locator('select[name="city"]').selectOption("서울특별시");
}

async function fillBirthTime(page: Page, hour: string, minute: string) {
  await page.locator('select[name="birthHour"]').selectOption(hour);
  await page.locator('select[name="birthMinute"]').selectOption(minute);
}

async function agreeToRequiredConsents(page: Page) {
  await page
    .getByLabel("서비스 이용약관에 동의합니다.", { exact: false })
    .check();
  await page
    .getByLabel("개인정보 수집 및 이용에 동의합니다.", { exact: false })
    .check();
}

function submitButton(page: Page) {
  return page.getByRole("button", { name: /사주 분석 시작하기/ });
}

test.describe("saju input flow", () => {
  test("validates required fields before submitting", async ({ page }) => {
    let saveRequestCount = 0;
    await page.route("**/api/saju", async (route) => {
      saveRequestCount += 1;
      await route.fulfill({ status: 500, body: "" });
    });

    await page.goto("/saju");
    await expect(submitButton(page)).toBeVisible();
    await submitButton(page).click();

    await expect(
      page.getByText("출생 월/일을 입력해 주세요", { exact: true }),
    ).toBeVisible();
    expect(saveRequestCount).toBe(0);
  });

  test("requires terms consent before completed submit", async ({ page }) => {
    let saveRequestCount = 0;
    await page.route("**/api/saju", async (route) => {
      saveRequestCount += 1;
      await route.fulfill({ status: 500, body: "" });
    });

    await page.goto("/saju");
    await fillRequiredSajuFields(page);
    await page
      .getByLabel("개인정보 수집 및 이용에 동의합니다.", { exact: false })
      .check();
    await submitButton(page).click();

    await expect(page.getByRole("status")).toContainText(
      "서비스 이용 동의를 확인해주세요",
    );
    expect(saveRequestCount).toBe(0);
  });

  test("requires privacy consent before completed submit", async ({ page }) => {
    let saveRequestCount = 0;
    await page.route("**/api/saju", async (route) => {
      saveRequestCount += 1;
      await route.fulfill({ status: 500, body: "" });
    });

    await page.goto("/saju");
    await fillRequiredSajuFields(page);
    await page
      .getByLabel("서비스 이용약관에 동의합니다.", { exact: false })
      .check();
    await submitButton(page).click();

    await expect(page.getByRole("status")).toContainText(
      "개인정보 수집·이용 동의를 확인해주세요",
    );
    expect(saveRequestCount).toBe(0);
  });

  test("shows legal links in the input form", async ({ page }) => {
    await page.goto("/saju");

    await expect(
      page.getByRole("link", { name: "서비스 이용약관 전문 보기" }),
    ).toHaveAttribute("href", "/terms-of-service");
    await expect(
      page.getByRole("link", { name: "개인정보처리방침 전문 보기" }),
    ).toHaveAttribute("href", "/privacy-policy");
  });

  test("shows consent section when consent is not available", async ({
    page,
  }) => {
    await page.goto("/saju?forceInput=1");

    await expect(
      page.getByText("필수 동의 항목", { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByLabel("서비스 이용약관에 동의합니다.", { exact: false }),
    ).toBeVisible();
    await expect(
      page.getByLabel("개인정보 수집 및 이용에 동의합니다.", { exact: false }),
    ).toBeVisible();
  });

  test("hides consent section for authenticated users when consent is already given", async ({
    context,
    page,
    baseURL,
  }) => {
    await addAuthCookies(context, baseURL);
    await page.route("**/api/saju/me", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          data: {
            birthDate: "1992-03-14",
            consentGiven: true,
          },
          error: null,
        }),
      });
    });

    await page.goto("/saju?forceInput=1");

    await expect(page.getByText("필수 동의 항목", { exact: true })).toHaveCount(
      0,
    );
    await expect(
      page.getByLabel("서비스 이용약관에 동의합니다.", { exact: false }),
    ).toHaveCount(0);
    await expect(
      page.getByLabel("개인정보 수집 및 이용에 동의합니다.", { exact: false }),
    ).toHaveCount(0);
  });

  test("stores guest draft and moves to login after completed submit", async ({
    page,
  }) => {
    let draftPayload: Record<string, unknown> | null = null;

    await page.route("**/api/saju", async (route) => {
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
      draftPayload = route.request().postDataJSON() as Record<string, unknown>;
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true, data: null, error: null }),
      });
    });

    await page.goto("/saju");
    await fillRequiredSajuFields(page);
    await agreeToRequiredConsents(page);
    await submitButton(page).click();

    await expect(page).toHaveURL(/\/login\?next=%2Fsaju%3Fstep%3Dhub$/);
    expect(draftPayload).toMatchObject({
      birthYear: "1992",
      birthDate: "03 / 14",
      city: "서울특별시",
      calendarType: "SOLAR",
      gender: "MALE",
      agreedToTerms: true,
      agreedToPrivacy: true,
    });
  });

  test("combines hour and minute selects into HH:MM", async ({ page }) => {
    let draftPayload: Record<string, unknown> | null = null;

    await page.route("**/api/saju", async (route) => {
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
      draftPayload = route.request().postDataJSON() as Record<string, unknown>;
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true, data: null, error: null }),
      });
    });

    await page.goto("/saju");
    await fillRequiredSajuFields(page);
    await fillBirthTime(page, "9", "5");
    await agreeToRequiredConsents(page);
    await submitButton(page).click();

    await expect(page).toHaveURL(/\/login\?next=%2Fsaju%3Fstep%3Dhub$/);
    expect(draftPayload).toMatchObject({
      birthTime: "09:05",
      agreedToTerms: true,
      agreedToPrivacy: true,
    });
  });

  test("supports unknown birth time without blocking submission", async ({
    page,
  }) => {
    let draftPayload: Record<string, unknown> | null = null;

    await page.route("**/api/saju", async (route) => {
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
      draftPayload = route.request().postDataJSON() as Record<string, unknown>;
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true, data: null, error: null }),
      });
    });

    await page.goto("/saju");
    await fillRequiredSajuFields(page);
    await page.getByRole("switch").click();
    await agreeToRequiredConsents(page);
    await submitButton(page).click();

    await expect(page).toHaveURL(/\/login\?next=%2Fsaju%3Fstep%3Dhub$/);
    expect(draftPayload).toMatchObject({
      timeUnknown: "yes",
      birthTime: "",
      agreedToTerms: true,
      agreedToPrivacy: true,
    });
  });

  test("blocks partial birth time selections until minute is chosen", async ({
    page,
  }) => {
    let saveRequestCount = 0;
    await page.route("**/api/saju", async (route) => {
      saveRequestCount += 1;
      await route.fulfill({ status: 500, body: "" });
    });

    await page.goto("/saju");
    await fillRequiredSajuFields(page);
    await page.locator('select[name="birthHour"]').selectOption("9");
    await agreeToRequiredConsents(page);
    await submitButton(page).click();

    await expect(
      page.getByText("출생 시간을 끝까지 선택해 주세요", { exact: true }),
    ).toBeVisible();
    expect(saveRequestCount).toBe(0);
  });

  test("preserves next path for guests when redirecting to login", async ({
    page,
  }) => {
    await page.route("**/api/saju", async (route) => {
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
    await agreeToRequiredConsents(page);
    await submitButton(page).click();

    await expect(page).toHaveURL(
      /\/login\?next=%2Fsaju%3Fstep%3Dhub%26next%3D%252Fcompatibility$/,
    );
  });

  test("redirects guests who directly open the hub to login", async ({
    page,
  }) => {
    await page.goto("/saju?step=hub&next=%2Fcompatibility");

    await expect(page).toHaveURL(
      /\/login\?next=%2Fsaju%3Fstep%3Dhub%26next%3D%252Fcompatibility$/,
    );
  });

  test("moves logged-in users without saved analysis from hub to saju input", async ({
    context,
    page,
    baseURL,
  }) => {
    await addAuthCookies(context, baseURL);

    await page.route("**/api/saju/me", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          data: {
            birthDate: "1992-03-14",
            consentGiven: true,
            sajuAnalysis: null,
          },
          error: null,
        }),
      });
    });
    await page.route("**/api/saju", async (route) => {
      await route.fulfill({
        status: 404,
        contentType: "application/json",
        body: JSON.stringify({
          success: false,
          data: null,
          error: {
            code: "PENDING_FORM_NOT_FOUND",
            message: "사주 정보를 입력해주세요.",
          },
        }),
      });
    });
    await page.route("**/api/users/me", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          data: {
            email: "e2e@example.com",
            nickname: "이투이",
            strongestElement: "water",
          },
          error: null,
        }),
      });
    });

    await page.goto("/saju?step=hub&next=%2Fcompatibility");

    await expect(page).toHaveURL(
      /\/saju\?next=%2Fcompatibility&forceInput=1$/,
    );
  });

  test("moves users to the hub after a successful submit and preserves next path", async ({
    context,
    page,
    baseURL,
  }) => {
    await addAuthCookies(context, baseURL);

    let savePayload: Record<string, unknown> | null = null;

    await page.route("**/api/saju", async (route) => {
      savePayload = route.request().postDataJSON() as Record<string, unknown>;
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          data: { weakElement: "water" },
          error: null,
        }),
      });
    });
    await page.route("**/api/saju/me", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          data: {
            consentGiven: false,
            sajuAnalysis: {
              ilju: "병술",
              strength: "신강(身强)",
              geokguk: "겁재격",
              yongshin: "water",
              assistYongshin: "wood",
            },
          },
          error: null,
        }),
      });
    });
    await page.route("**/api/users/me", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          data: {
            email: "e2e@example.com",
            nickname: "이투이",
            strongestElement: "water",
          },
          error: null,
        }),
      });
    });

    await page.goto("/saju?next=%2Fcompatibility&forceInput=1");
    await fillRequiredSajuFields(page);
    await agreeToRequiredConsents(page);
    await submitButton(page).click();

    await expect(page).toHaveURL(/\/saju\?step=hub&next=%2Fcompatibility$/);
    await expect(
      page.getByRole("heading", { name: "나의 가장 강한 오행은 수(水)예요" }),
    ).toBeVisible();
    expect(savePayload).toMatchObject({
      agreedToTerms: true,
      agreedToPrivacy: true,
    });
  });
});
