import { expect, test } from "@playwright/test";

import { expectNoHorizontalOverflow } from "./support";

test.describe("static content pages smoke", () => {
  test("shows faq page content and privacy policy link", async ({ page }) => {
    await page.goto("/faq");

    await expect(page).toHaveTitle(/FAQ 자주하는 질문 \| SAJU:ME/);
    await expect(
      page.getByRole("heading", { level: 1, name: "FAQ 자주하는 질문" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        level: 3,
        name: "사주 분석은 어떻게 이루어지나요?",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("main").getByRole("link", { name: "개인정보처리방침" }),
    ).toHaveAttribute("href", "/privacy-policy");
    await expectNoHorizontalOverflow(page);
  });

  test("shows contact page support details", async ({ page }) => {
    await page.goto("/contact");

    await expect(page).toHaveTitle(/문의하기/);
    await expect(
      page.getByRole("heading", { level: 1, name: "문의하기" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: "문의 이메일" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "sajume.team@gmail.com" }),
    ).toHaveAttribute("href", "mailto:sajume.team@gmail.com");
    await expectNoHorizontalOverflow(page);
  });

  test("shows privacy policy sections", async ({ page }) => {
    await page.goto("/privacy-policy");

    await expect(page).toHaveTitle(/개인정보처리방침/);
    await expect(
      page.getByRole("heading", { level: 1, name: "개인정보처리방침" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "1. 수집하는 개인정보 항목",
      }),
    ).toBeVisible();
    await expect(page.getByText("saju.official@gmail.com")).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });

  test("shows terms of service sections", async ({ page }) => {
    await page.goto("/terms-of-service");

    await expect(page).toHaveTitle(/서비스 이용약관/);
    await expect(
      page.getByRole("heading", { level: 1, name: "서비스 이용약관" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: "1. 목적" }),
    ).toBeVisible();
    await expect(
      page.getByText("대한민국 법령에 따라 해석되고 적용됩니다."),
    ).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });
});
