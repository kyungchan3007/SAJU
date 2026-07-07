import { GET, POST } from "@/app/api/partners/route";
import { SAJU_PARTNERS_PATH } from "@/shared/config/endPoint";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const LOCAL_BASE_URL = "http://localhost";

const mockedGetPartnersOnServer = vi.hoisted(() => vi.fn());
const mockedRegisterPartnerOnServer = vi.hoisted(() => vi.fn());

vi.mock("@/entities/partner/server/getPartnersOnServer", () => ({
  getPartnersOnServer: mockedGetPartnersOnServer,
}));

vi.mock("@/entities/partner/server/registerPartnerOnServer", () => ({
  registerPartnerOnServer: mockedRegisterPartnerOnServer,
}));

describe("/api/partners route handlers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("GET returns partners payload", async () => {
    mockedGetPartnersOnServer.mockResolvedValue({
      success: true,
      data: { partners: [{ id: 1, name: "A" }] },
    });

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({
      success: true,
      data: { partners: [{ id: 1, name: "A" }] },
      error: null,
    });
  });

  it("GET returns mapped error when fetch fails", async () => {
    mockedGetPartnersOnServer.mockResolvedValue({
      success: false,
      status: 401,
      message: "LOGIN_REQUIRED",
    });

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body).toEqual({
      success: false,
      data: null,
      error: {
        code: "PARTNERS_GET_FAILED",
        message: "관심 상대 목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
      },
    });
  });

  it("POST returns mapped error on invalid body", async () => {
    const request = new Request(new URL(SAJU_PARTNERS_PATH, LOCAL_BASE_URL), {
      method: "POST",
      body: "{invalid",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost",
      },
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body).toEqual({
      success: false,
      data: null,
      error: {
        code: "INVALID_REQUEST_BODY",
        message: "요청 정보를 다시 확인해주세요.",
      },
    });
  });

  it("POST returns register response", async () => {
    mockedRegisterPartnerOnServer.mockResolvedValue({
      success: true,
      data: { id: 2, name: "B" },
    });

    const request = new Request(new URL(SAJU_PARTNERS_PATH, LOCAL_BASE_URL), {
      method: "POST",
      body: JSON.stringify({
        name: "B",
        birthDate: "1999-01-01",
        gender: "MALE",
        calendarType: "SOLAR",
      }),
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost",
      },
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({
      success: true,
      data: { id: 2, name: "B" },
      error: null,
    });
    expect(mockedRegisterPartnerOnServer).toHaveBeenCalled();
  });
});
