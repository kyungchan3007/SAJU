import { expect, test, type BrowserContext, type Page } from "@playwright/test";

type Partner = {
  id: number;
  name: string;
  birthDate: string;
  birthTime: string | null;
  gender: "MALE" | "FEMALE";
  calendarType: "SOLAR" | "LUNAR";
  city: string | null;
};

const profile = {
  email: "e2e@example.com",
  nickname: "이투이",
  birthDate: "1992-03-14",
  birthTime: "09:30",
  gender: "MALE",
  calendarType: "SOLAR",
  city: "서울특별시",
};

const traditional = {
  success: true,
  data: {
    sajuId: 1,
    traits: {
      summaryZodiac: "뱀띠",
      summaryStrength: "신약",
      geokguk: "정관격",
      yongshinPrimary: "수",
      yongshinSecondary: "목",
    },
  },
  error: null,
};

async function addAuthCookies(context: BrowserContext, baseURL?: string) {
  await context.addCookies([
    {
      name: "saju_access_token",
      value: "e2e-access-token",
      url: baseURL ?? "http://127.0.0.1:3100",
    },
    {
      name: "saju_user_email",
      value: "e2e@example.com",
      url: baseURL ?? "http://127.0.0.1:3100",
    },
  ]);
}

async function setupSajuManageApiMocks(
  page: Page,
  options?: {
    initialPartners?: Partner[];
    onMySajuUpdate?: (payload: unknown) => void;
    onPartnerCreate?: (payload: unknown) => void;
    onPartnerUpdate?: (partnerId: number, payload: unknown) => void;
    onPartnerDelete?: (partnerId: number) => void;
  },
) {
  let partners = options?.initialPartners ?? [
    {
      id: 101,
      name: "영희",
      birthDate: "1993-04-15",
      birthTime: "13:00",
      gender: "FEMALE",
      calendarType: "SOLAR",
      city: "부산광역시",
    },
  ];

  await page.route("**/api/saju/me", async (route) => {
    const method = route.request().method();

    if (method === "GET") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true, data: profile, error: null }),
      });
      return;
    }

    if (method === "PUT") {
      const payload = route.request().postDataJSON();
      options?.onMySajuUpdate?.(payload);
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          data: { sajuId: 1, traits: traditional.data.traits },
          error: null,
        }),
      });
      return;
    }

    await route.fallback();
  });

  await page.route("**/api/saju/traditional", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(traditional),
    });
  });

  await page.route("**/api/partners**", async (route) => {
    const request = route.request();
    const url = new URL(request.url());
    const method = request.method();
    const idMatch = url.pathname.match(/\/api\/partners\/(\d+)$/);

    if (method === "GET" && url.pathname === "/api/partners") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          data: { partners },
          error: null,
        }),
      });
      return;
    }

    if (method === "POST" && url.pathname === "/api/partners") {
      const payload = request.postDataJSON() as Partner;
      options?.onPartnerCreate?.(payload);
      const created = { ...payload, id: 202 };
      partners = [...partners, created];
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true, data: created, error: null }),
      });
      return;
    }

    if (method === "PATCH" && idMatch) {
      const partnerId = Number(idMatch[1]);
      const payload = request.postDataJSON() as Partner;
      options?.onPartnerUpdate?.(partnerId, payload);
      partners = partners.map((partner) =>
        partner.id === partnerId ? { ...partner, ...payload } : partner,
      );
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          data: partners.find((partner) => partner.id === partnerId),
          error: null,
        }),
      });
      return;
    }

    if (method === "DELETE" && idMatch) {
      const partnerId = Number(idMatch[1]);
      options?.onPartnerDelete?.(partnerId);
      partners = partners.filter((partner) => partner.id !== partnerId);
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          data: { deleted: true },
          error: null,
        }),
      });
      return;
    }

    await route.fallback();
  });
}

async function openSajuManage(page: Page) {
  await page.goto("/mypage/saju-manage");
  await expect(page.getByRole("heading", { name: "사주 관리" })).toBeVisible();
  await expect(page.getByText("등록된 사주")).toBeVisible();
}

async function selectCity(page: Page, city: string) {
  await page.locator("select").last().selectOption(city);
}

async function selectPartnerByName(page: Page, name: string) {
  await expect(page.getByText(name)).toBeVisible();
  await page.locator("button").filter({ hasText: "👩" }).first().click();
}

test.describe("saju manage page", () => {
  // 사주관리 조회 화면의 기본 렌더링 테스트입니다.
  // 기대 결과: 인증된 사용자가 진입하면 내 사주와 파트너 카드, 사주 정보 폼이 보여야 합니다.
  test("shows my saju profile and partner list", async ({
    context,
    page,
    baseURL,
  }) => {
    await addAuthCookies(context, baseURL);
    await setupSajuManageApiMocks(page);

    await openSajuManage(page);

    await expect(page.getByText("나의 사주 요약")).toBeVisible();
    await expect(page.getByText("사주 정보", { exact: true })).toBeVisible();
    await expect(page.getByText("영희")).toBeVisible();
    await expect(page.getByRole("button", { name: "수정하기" })).toBeVisible();
  });

  // 내 사주 수정 흐름 테스트입니다.
  // 기대 결과: 도시를 변경하고 저장하면 PUT /api/saju/me가 호출되고 성공 메시지가 보여야 합니다.
  test("updates my saju profile", async ({ context, page, baseURL }) => {
    let updatedPayload: unknown = null;
    await addAuthCookies(context, baseURL);
    await setupSajuManageApiMocks(page, {
      onMySajuUpdate: (payload) => {
        updatedPayload = payload;
      },
    });

    await openSajuManage(page);
    await selectCity(page, "부산광역시");
    await page.getByRole("button", { name: "수정하기" }).click();

    await expect(page.getByText("사주 정보가 수정됐습니다.")).toBeVisible();
    expect(updatedPayload).toMatchObject({ city: "부산광역시" });
  });

  // 파트너 사주 추가 흐름 테스트입니다.
  // 기대 결과: 이름 입력 후 사주 정보를 저장하면 POST /api/partners가 호출되고 추가 성공 메시지가 보여야 합니다.
  test("creates a partner saju", async ({ context, page, baseURL }) => {
    let createdPayload: unknown = null;
    await addAuthCookies(context, baseURL);
    await setupSajuManageApiMocks(page, {
      onPartnerCreate: (payload) => {
        createdPayload = payload;
      },
    });

    await openSajuManage(page);
    await page.getByRole("button", { name: "추가" }).click();
    await page.getByPlaceholder("예: 아빠, 친구, 홍길동").fill("친구");
    await page.getByRole("button", { name: /다음/ }).click();
    await expect(page.getByText("친구 사주 입력")).toBeVisible();

    await page.getByRole("button", { name: "여성" }).click();
    await selectCity(page, "서울특별시");
    await page.getByRole("button", { name: "수정하기" }).click();

    await expect(page.getByText("친구 사주가 추가됐습니다.")).toBeVisible();
    expect(createdPayload).toMatchObject({
      name: "친구",
      gender: "FEMALE",
      city: "서울특별시",
    });
  });

  // 파트너 사주 수정 흐름 테스트입니다.
  // 기대 결과: 기존 파트너를 선택해 정보를 저장하면 PATCH /api/partners/:id가 호출되고 성공 메시지가 보여야 합니다.
  test("updates a partner saju", async ({ context, page, baseURL }) => {
    let updatedPartnerId: number | null = null;
    let updatedPayload: unknown = null;
    await addAuthCookies(context, baseURL);
    await setupSajuManageApiMocks(page, {
      onPartnerUpdate: (partnerId, payload) => {
        updatedPartnerId = partnerId;
        updatedPayload = payload;
      },
    });

    await openSajuManage(page);
    await selectPartnerByName(page, "영희");
    await expect(page.getByText("영희의 사주 요약")).toBeVisible();
    await selectCity(page, "대구광역시");
    await page.getByRole("button", { name: "수정하기" }).click();

    await expect(page.getByText("사주 정보가 수정됐습니다.")).toBeVisible();
    expect(updatedPartnerId).toBe(101);
    expect(updatedPayload).toMatchObject({ city: "대구광역시" });
  });

  // 파트너 사주 삭제 흐름 테스트입니다.
  // 기대 결과: 편집 모드에서 파트너 삭제를 확정하면 DELETE /api/partners/:id가 호출되고 목록에서 제거되어야 합니다.
  test("deletes a partner saju", async ({ context, page, baseURL }) => {
    let deletedPartnerId: number | null = null;
    await addAuthCookies(context, baseURL);
    await setupSajuManageApiMocks(page, {
      onPartnerDelete: (partnerId) => {
        deletedPartnerId = partnerId;
      },
    });

    await openSajuManage(page);
    await page.getByRole("button", { name: "편집" }).click();
    await page.getByRole("button", { name: "✕" }).click();
    await expect(page.getByText("'영희' 사주를 삭제할까요?")).toBeVisible();
    await page.getByRole("button", { name: "삭제하기" }).click();

    await expect(page.getByText("영희")).toHaveCount(0);
    expect(deletedPartnerId).toBe(101);
  });
});
