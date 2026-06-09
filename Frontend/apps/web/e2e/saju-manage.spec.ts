import { expect, test, type Locator, type Page } from "@playwright/test";
import { addAuthCookies, mockCurrentProjectApis } from "./support";

async function openSajuManage(page: Page) {
  await page.goto("/mypage/saju-manage");
  await expect(
    page.getByRole("heading", { name: /사주 정보 관리/ }),
  ).toBeVisible();
  await expect(page.getByText("등록된 사주")).toBeVisible();
}

async function selectLastCity(page: Page, city: string) {
  await page.locator("select").last().selectOption(city);
}

function getSuccessToast(page: Page): Locator {
  return page.getByTestId("toast-notification").first();
}

test.describe("saju manage current flow", () => {
  test.beforeEach(async ({ context, page, baseURL }) => {
    await addAuthCookies(context, baseURL);
    await mockCurrentProjectApis(page);
  });

  test("shows loading state while saju profile is pending", async ({
    page,
  }) => {
    await page.unroute("**/api/saju/me");
    await page.route("**/api/saju/me", async (route) => {
      const method = route.request().method();

      if (method !== "GET") {
        await route.fallback();
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 1500));
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          data: {
            email: "e2e@example.com",
            nickname: "테토",
            birthDate: "1992-03-14",
            birthTime: "09:30",
            gender: "MALE",
            calendarType: "SOLAR",
            city: "서울특별시",
            sajuAnalysis: {
              ilju: "갑인",
              strength: "신약(身弱)",
              geokguk: "정관격",
              yongshin: "metal",
              assistYongshin: "water",
            },
          },
          error: null,
        }),
      });
    });

    await page.goto("/mypage/saju-manage");
    await expect(page.getByText(/사주 정보를 불러오는 중/)).toBeVisible();
  });

  test("renders my profile, summary, partner card, and edit form", async ({
    page,
  }) => {
    await openSajuManage(page);

    await expect(
      page.getByRole("heading", { name: /나의 명식 요약/ }),
    ).toBeVisible();
    await expect(page.getByText(/사주 정보 수정/)).toBeVisible();
    await expect(page.getByRole("button", { name: /저장하기/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /사주 추가/ }).first()).toBeVisible();
  });

  test("updates my saju profile", async ({ context, page, baseURL }) => {
    let updatedPayload: unknown = null;
    await addAuthCookies(context, baseURL);
    await mockCurrentProjectApis(page, {
      onMySajuUpdate: (payload) => {
        updatedPayload = payload;
      },
    });

    await openSajuManage(page);
    await selectLastCity(page, "부산광역시");
    await page.getByRole("button", { name: /저장하기/ }).click();

    const toast = getSuccessToast(page);
    await expect(toast).toBeVisible();
    expect(updatedPayload).toMatchObject({ city: "부산광역시" });
  });

  test("creates, updates, and deletes a partner saju", async ({
    context,
    page,
    baseURL,
  }) => {
    let createdPayload: unknown = null;
    let updatedPartnerId: number | null = null;
    let deletedPartnerId: number | null = null;

    await addAuthCookies(context, baseURL);
    await mockCurrentProjectApis(page, {
      onPartnerCreate: (payload) => {
        createdPayload = payload;
      },
      onPartnerUpdate: (partnerId) => {
        updatedPartnerId = partnerId;
      },
      onPartnerDelete: (partnerId) => {
        deletedPartnerId = partnerId;
      },
    });

    await openSajuManage(page);

    await page.getByRole("button", { name: /사주 추가/ }).first().click();
    await expect(page.getByRole("dialog", { name: /사주 추가/ })).toBeVisible();
    await page.getByPlaceholder("예) 회사, 친구, 동생").fill("친구");
    await page
      .getByRole("button", { name: /사주 정보 입력하기/ })
      .click();
    await expect(page.getByText(/사주 정보를 입력해 주세요/)).toBeVisible();
    await page.getByRole("button", { name: "여성", exact: true }).click();
    await selectLastCity(page, "서울특별시");
    await page.getByRole("button", { name: /저장하기/ }).click();

    await expect(getSuccessToast(page)).toBeVisible();
    expect(createdPayload).toMatchObject({
      name: "친구",
      gender: "FEMALE",
      city: "서울특별시",
    });

    await page.getByRole("button", { name: /1993년생/ }).click();
    await selectLastCity(page, "대구광역시");
    await page.getByRole("button", { name: /저장하기/ }).click();

    await expect(getSuccessToast(page)).toBeVisible();
    expect(updatedPartnerId).toBe(101);

    await page.getByRole("button", { name: /편집|완료/ }).click();
    await page.locator("button.bg-red-500").first().click();
    await expect(page.getByRole("button", { name: /삭제하기/ })).toBeVisible();
    await page.getByRole("button", { name: /삭제하기/ }).click();

    expect(deletedPartnerId).toBe(101);
  });
});

test.describe("toast notification behavior", () => {
  test.beforeEach(async ({ context, page, baseURL }) => {
    await addAuthCookies(context, baseURL);
    await mockCurrentProjectApis(page);
  });

  test("success toast renders as fixed overlay, not inline", async ({ page }) => {
    await openSajuManage(page);
    await selectLastCity(page, "부산광역시");
    await page.getByRole("button", { name: /저장하기/ }).click();

    const toast = getSuccessToast(page);
    await expect(toast).toBeVisible();

    const container = page.getByTestId("toast-container");
    const position = await container.evaluate((el) =>
      window.getComputedStyle(el).position,
    );
    expect(position).toBe("fixed");
  });

  test("success toast has success variant", async ({ page }) => {
    await openSajuManage(page);
    await selectLastCity(page, "부산광역시");
    await page.getByRole("button", { name: /저장하기/ }).click();

    const toast = getSuccessToast(page);
    await expect(toast).toBeVisible();
    await expect(toast).toHaveAttribute("data-variant", "success");
  });

  test("success toast auto-dismisses after timeout", async ({ page }) => {
    await openSajuManage(page);
    await selectLastCity(page, "부산광역시");
    await page.getByRole("button", { name: /저장하기/ }).click();

    const toast = getSuccessToast(page);
    await expect(toast).toBeVisible();
    await expect(toast).toBeHidden({ timeout: 5000 });
  });

  test("save error stays inline, no error toast", async ({ page }) => {
    await page.route("**/api/saju/me", async (route) => {
      if (route.request().method() === "PUT") {
        await route.fulfill({
          status: 500,
          contentType: "application/json",
          body: JSON.stringify({
            success: false,
            data: null,
            error: { code: "SERVER_ERROR", message: "수정에 실패했습니다." },
          }),
        });
        return;
      }
      await route.fallback();
    });

    await openSajuManage(page);
    await selectLastCity(page, "부산광역시");
    await page.getByRole("button", { name: /저장하기/ }).click();

    await expect(page.getByTestId("toast-notification")).toHaveCount(0);
  });
});



