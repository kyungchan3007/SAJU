import { expect, test } from "@playwright/test";
import {
  addAuthCookies,
  expectNoHorizontalOverflow,
  mockCurrentProjectApis,
} from "./support";

test.describe("compatibility current flow", () => {
  test.beforeEach(async ({ context, page, baseURL }) => {
    await addAuthCookies(context, baseURL);
    await mockCurrentProjectApis(page);
  });

  test("selects a partner and reveals compatibility result", async ({
    page,
  }) => {
    await page.goto("/compatibility");

    await expect(page.getByText("나의 정보")).toBeVisible();
    await expect(page.getByText("상대방 정보")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "상대를 선택해주세요", exact: true }),
    ).toBeDisabled();

    await page.getByRole("button", { name: /상대를 선택해주세요/ }).first().click();
    await expect(page.getByRole("heading", { name: "상대 선택하기" })).toBeVisible();
    await page.getByRole("button", { name: /영희/ }).click();
    await page.getByRole("button", { name: "선택 완료" }).click();

    await expect(
      page.getByRole("button", { name: /영희와 궁합 보기/ }),
    ).toBeEnabled();
    await page.getByRole("button", { name: /영희와 궁합 보기/ }).click();
    await expect(page.getByRole("progressbar")).toBeVisible();
    await page.getByRole("button", { name: "사주결과 보기" }).click();

    await expect(page.getByText("궁합 대상")).toBeVisible();
    await expect(page.getByText("따뜻한 균형")).toBeVisible();
    await expect(page.getByText("연인궁합").first()).toBeVisible();
    await expect(page.getByText("소통궁합").first()).toBeVisible();
    await expect(page.getByRole("button", { name: "다른 상대와 궁합 보기" })).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });
});
