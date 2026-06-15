import { expect, test } from "@playwright/test";

import {
  addAuthCookies,
  clickVisibleLink,
  expectVisibleLink,
  mockCurrentProjectApis,
} from "./support";

test.describe("personality report flow", () => {
  test.beforeEach(async ({ context, page, baseURL }) => {
    await addAuthCookies(context, baseURL);
    await mockCurrentProjectApis(page);
  });

  test("exposes personality report entry from jeongtongsaju next steps", async ({
    page,
  }) => {
    await page.goto("/mypage/traditional-fortune");

    await expectVisibleLink(page, "/mypage/personality");
    await expect(page.getByTestId("personality-report-link")).toHaveAttribute(
      "href",
      "/mypage/personality",
    );
    await clickVisibleLink(page, "/mypage/personality");
    await expect(page).toHaveURL(/\/mypage\/personality$/);
  });

  test("reveals personality report from BFF response", async ({ page }) => {
    await page.goto("/mypage/personality");

    await expect(page.getByRole("progressbar")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "상세 성향 리포트 보기" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "상세 성향 리포트 보기" }).click();

    await expect(page.getByTestId("personality-page")).toBeVisible();
    await expect(page.getByText("상세 성향 리포트").first()).toBeVisible();
    await expect(page.getByText("임수(壬水) 감성형")).toBeVisible();
    await expect(page.getByText("연애 성향")).toBeVisible();
    await expect(page.getByText("직업 성향")).toBeVisible();
    await expect(page.getByText("강점 · 약점")).toBeVisible();
    await expect(page.getByText("추천 직무")).toBeVisible();
    await expect(page.getByRole("button", { name: /더보기|접기/ })).toHaveCount(
      3,
    );
  });

  test("shows error page when personality BFF fails", async ({
    page,
    context,
    baseURL,
  }) => {
    await addAuthCookies(context, baseURL);
    await mockCurrentProjectApis(page, {
      personalityProfileResponse: {
        status: 500,
        body: {
          success: false,
          data: null,
          error: {
            code: "PERSONALITY_PROFILE_GET_FAILED",
            message: "상세 성향 리포트를 불러오지 못했습니다.",
          },
        },
      },
    });

    await page.goto("/mypage/personality");

    await expect(page).toHaveURL(
      /\/error\?code=PERSONALITY_REPORT_LOAD_FAILED$/,
    );
    await expect(
      page.getByRole("heading", {
        name: "상세 성향 리포트를 불러오지 못했습니다",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "홈으로 이동하기" }),
    ).toBeVisible();
  });

  test("keeps progress gate when personality data is missing", async ({
    page,
    context,
    baseURL,
  }) => {
    await addAuthCookies(context, baseURL);
    await mockCurrentProjectApis(page, {
      personalityProfileResponse: {
        body: {
          success: true,
          data: null,
          error: null,
          meta: {
            backendStatus: 200,
            backendMessage: "success",
          },
        },
      },
    });

    await page.goto("/mypage/personality");

    await expect(page.getByRole("progressbar")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "상세 성향 리포트 보기" }),
    ).toHaveCount(0);
  });
});
