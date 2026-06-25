import { expect, test } from "@playwright/test";

import { expectNoHorizontalOverflow } from "./support";

test.describe("static content pages smoke", () => {
  test("shows faq page content and privacy policy link", async ({ page }) => {
    await page.goto("/faq");

    await expect(page).toHaveURL(/\/faq$/);
    await expect(page.getByRole("main").first()).toBeVisible();
    await expect(
      page.getByRole("main").locator('a[href="/privacy-policy"]').first(),
    ).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });

  test("shows contact page support details and inquiry form CTA", async ({
    page,
  }) => {
    await page.goto("/contact");

    await expect(page).toHaveURL(/\/contact$/);
    await expect(page.getByRole("main").first()).toBeVisible();
    await expect(page.locator('a[href="/contact/form"]').first()).toHaveAttribute(
      "href",
      "/contact/form",
    );
    await expectNoHorizontalOverflow(page);
  });

  test("shows privacy policy sections", async ({ page }) => {
    await page.goto("/privacy-policy");

    await expect(page).toHaveURL(/\/privacy-policy$/);
    await expect(page.getByRole("main").first()).toBeVisible();
    await expect(page.getByText("sajuflow.official@gmail.com")).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });

  test("shows terms of service sections", async ({ page }) => {
    await page.goto("/terms-of-service");

    await expect(page).toHaveURL(/\/terms-of-service$/);
    await expect(page.getByRole("main").first()).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });
});
