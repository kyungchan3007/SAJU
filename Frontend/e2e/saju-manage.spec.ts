import { expect, test, type Page } from "@playwright/test";
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

test.describe("saju manage current flow", () => {
  test.beforeEach(async ({ context, page, baseURL }) => {
    await addAuthCookies(context, baseURL);
    await mockCurrentProjectApis(page);
  });

  test("renders my profile, summary, partner card, and edit form", async ({
    page,
  }) => {
    await openSajuManage(page);

    await expect(page.getByRole("heading", { name: "나의 명식 요약" })).toBeVisible();
    await expect(page.getByText("사주 정보 수정")).toBeVisible();
    await expect(page.getByText("영희")).toBeVisible();
    await expect(page.getByRole("button", { name: "저장하기" })).toBeVisible();
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
    await page.getByRole("button", { name: "저장하기" }).click();

    await expect(page.getByText("사주 정보가 수정됐습니다.")).toBeVisible();
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

    await page.getByRole("button", { name: "+ 사주 추가" }).click();
    await page.getByPlaceholder("예: 아빠, 친구, 홍길동").fill("친구");
    await page.getByRole("button", { name: /다음/ }).click();
    await expect(page.getByText("친구 사주 입력")).toBeVisible();
    await page.getByRole("button", { name: "여성", exact: true }).click();
    await selectLastCity(page, "서울특별시");
    await page.getByRole("button", { name: "저장하기" }).click();

    await expect(page.getByText("친구 사주가 추가됐습니다.")).toBeVisible();
    expect(createdPayload).toMatchObject({
      name: "친구",
      gender: "FEMALE",
      city: "서울특별시",
    });

    await page.getByRole("button", { name: /영희/ }).click();
    await expect(page.getByText("영희의 사주")).toBeVisible();
    await selectLastCity(page, "대구광역시");
    await page.getByRole("button", { name: "저장하기" }).click();

    await expect(page.getByText("사주 정보가 수정됐습니다.")).toBeVisible();
    expect(updatedPartnerId).toBe(101);

    await page.getByRole("button", { name: "편집" }).click();
    await page.getByRole("button", { name: "✕" }).first().click();
    await expect(page.getByText("'영희' 사주를 삭제할까요?")).toBeVisible();
    await page.getByRole("button", { name: "삭제하기" }).click();

    await expect(page.getByText("영희")).toHaveCount(0);
    expect(deletedPartnerId).toBe(101);
  });
});
