import { expect, test } from "@playwright/test";
import {
  addAuthCookies,
  expectNoHorizontalOverflow,
  mockCurrentProjectApis,
} from "./support";

test.describe("year fortune flow", () => {
  test.beforeEach(async ({ context, baseURL }) => {
    await addAuthCookies(context, baseURL);
  });

  test("polls while pending and reveals the result after completion", async ({
    page,
    context,
  }) => {
    let requestCount = 0;

    await mockCurrentProjectApis(page);
    await context.route("**/api/saju/me/year**", async (route) => {
      requestCount += 1;

      if (requestCount === 1) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            success: true,
            data: {
              status: "PENDING",
              targetYear: 2026,
              yearLabel: "2026년",
              userInfo: {
                manse: "양력",
                gender: "MALE",
                birthYear: 1992,
                daeun: "갑자대운",
              },
              monthlyFortunes: [],
            },
            error: null,
            meta: {
              backendStatus: 200,
              backendMessage: "success",
              backendErrorCode: null,
            },
          }),
        });
        return;
      }

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          data: {
            status: "COMPLETE",
            targetYear: 2026,
            yearLabel: "2026년",
            userInfo: {
              manse: "양력",
              gender: "MALE",
              birthYear: 1992,
              daeun: "갑자대운",
            },
            general: {
              title: "총운",
              content: "흐름을 정리하면 하반기에 성과가 드러납니다.",
            },
            wealth: {
              title: "재물운",
              content: "지출을 통제하면 안정적으로 쌓입니다.",
            },
            relationship: {
              title: "애정운",
              content: "대화를 먼저 여는 편이 좋습니다.",
            },
            careerBusiness: {
              title: "직업운",
              content: "정리된 실행이 성과로 이어집니다.",
            },
            familyHealth: {
              title: "건강운",
              content: "무리하지 않는 루틴이 중요합니다.",
            },
            monthlyFortunes: [
              {
                month: 1,
                label: "길",
                fortune: "연초에는 정리한 계획을 실행하기 좋습니다.",
              },
            ],
          },
          error: null,
          meta: {
            backendStatus: 200,
            backendMessage: "success",
            backendErrorCode: null,
          },
        }),
      });
    });

    await page.goto("/mypage/year-fortune");

    await expect(page.getByRole("progressbar")).toBeVisible();
    await expect.poll(() => requestCount, { timeout: 12_000 }).toBeGreaterThan(1);

    const revealButton = page.getByRole("button").filter({ hasText: "보기" });
    await expect(revealButton).toBeVisible();
    await revealButton.click();

    await expect(page.getByText("2026년")).toBeVisible();
    await expect(page.getByText("갑자대운")).toBeVisible();
    await expect(page.getByText("흐름을 정리하면 하반기에 성과가 드러납니다.")).toBeVisible();
    await expect(page.getByText("연초에는 정리한 계획을 실행하기 좋습니다.")).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });
});
