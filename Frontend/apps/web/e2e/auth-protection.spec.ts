import { expect, test } from "@playwright/test";
import { addAuthCookies, mockCurrentProjectApis, mySajuProfile } from "./support";

async function addSajuPendingDraftCookie(
  context: Parameters<typeof addAuthCookies>[0],
  baseURL?: string,
) {
  const url = baseURL ?? "http://127.0.0.1:3100";
  const encoded = Buffer.from(
    JSON.stringify({
      formValues: {
        birthYear: "1992",
        birthDate: "03 / 14",
        city: "서울특별시",
        calendarType: "SOLAR",
        birthTime: "",
        gender: "MALE",
        timeUnknown: "",
      },
      exp: Date.now() + 10 * 60 * 1000,
    }),
    "utf8",
  ).toString("base64url");

  await context.addCookies([
    { name: "saju_pending_form", value: encoded, url },
  ]);
}

test.describe("auth protected routing", () => {
  test("keeps refresh-only sessions on the public root page", async ({
    context,
    page,
    baseURL,
  }) => {
    await context.addCookies([
      {
        name: "saju_refresh_token",
        value: "e2e-refresh-token",
        url: baseURL ?? "http://127.0.0.1:3100",
      },
    ]);

    await page.goto("/");

    await expect(page).toHaveURL(/\/$/);
  });

  test("redirects guests away from protected mypage routes", async ({
    page,
  }) => {
    await page.goto("/mypage");
    await expect(page).toHaveURL(/\/login\?next=\/mypage$/);

    await page.goto("/mypage/jeongtongsaju");
    await expect(page).toHaveURL(/\/login\?next=\/mypage$/);

    await page.goto("/mypage/saju-manage");
    await expect(page).toHaveURL(/\/login\?next=\/mypage$/);
  });

  test("redirects guests away from protected saju result", async ({ page }) => {
    await page.goto("/saju/result");

    await expect(page).toHaveURL(/\/login$/);
  });

  test("redirects guests away from contact inquiry form", async ({ page }) => {
    await page.goto("/contact/form");

    await expect(page).toHaveURL(/\/login\?next=%2Fcontact%2Fform$/);
  });

  test("keeps guests on saju input", async ({ page }) => {
    await page.goto("/saju");

    await expect(page).toHaveURL(/\/saju$/);
    await expect(
      page.getByRole("button", { name: /사주 분석 시작하기/ }),
    ).toBeVisible();
  });

  test("redirects refresh-token recovery sessions from saju input to result", async ({
    context,
    page,
    baseURL,
  }) => {
    await context.addCookies([
      {
        name: "saju_refresh_token",
        value: "e2e-refresh-token",
        url: baseURL ?? "http://127.0.0.1:3100",
      },
    ]);

    await page.goto("/saju");

    await expect(page).toHaveURL(/\/saju\/result$/);
  });

  test("redirects authenticated users with pending saju draft from input to result", async ({
    context,
    page,
    baseURL,
  }) => {
    await addAuthCookies(context, baseURL);
    await addSajuPendingDraftCookie(context, baseURL);

    await page.goto("/saju");

    await expect(page).toHaveURL(/\/saju\/result$/);
  });

  test("redirects logged-in users without saved saju profile to saju input from protected services", async ({
    context,
    page,
    baseURL,
  }) => {
    await addAuthCookies(context, baseURL);
    await mockCurrentProjectApis(page, {
      sajuProfile: {
        ...mySajuProfile,
        birthDate: "",
        sajuAnalysis: null,
      },
    });

    await page.goto("/compatibility");
    await expect(page).toHaveURL(
      /\/saju\?next=%2Fcompatibility&forceInput=1$/,
    );

    await page.goto("/community");
    await expect(page).toHaveURL(/\/saju\?next=%2Fcommunity&forceInput=1$/);

    await page.goto("/food");
    await expect(page).toHaveURL(/\/saju\?next=%2Ffood&forceInput=1$/);

    await page.goto("/mypage/traditional-fortune");
    await expect(page).toHaveURL(
      /\/saju\?next=%2Fmypage%2Ftraditional-fortune&forceInput=1$/,
    );
  });
});
