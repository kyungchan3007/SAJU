import {
  DELETE,
  GET,
  PATCH,
} from "@/app/api/partners/[partnerId]/route";
import { getPartnerPath } from "@/shared/config/endPoint";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const LOCAL_BASE_URL = "http://localhost";

const mockedGetPartnerOnServer = vi.hoisted(() => vi.fn());
const mockedUpdatePartnerOnServer = vi.hoisted(() => vi.fn());
const mockedDeletePartnerOnServer = vi.hoisted(() => vi.fn());

vi.mock("@/entities/partner/server/getPartnerOnServer", () => ({
  getPartnerOnServer: mockedGetPartnerOnServer,
}));

vi.mock("@/entities/partner/server/updatePartnerOnServer", () => ({
  updatePartnerOnServer: mockedUpdatePartnerOnServer,
}));

vi.mock("@/entities/partner/server/deletePartnerOnServer", () => ({
  deletePartnerOnServer: mockedDeletePartnerOnServer,
}));

function createContext(partnerId: string) {
  return { params: Promise.resolve({ partnerId }) } as const;
}

describe("/api/partners/[partnerId] route handlers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns 400 when partnerId is invalid", async () => {
    const response = await GET(
      new Request(new URL(getPartnerPath("abc"), LOCAL_BASE_URL)),
      createContext("abc"),
    );
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error.code).toBe("INVALID_PARTNER_ID");
  });

  it("GET returns partner detail", async () => {
    mockedGetPartnerOnServer.mockResolvedValue({
      success: true,
      data: { id: 1, name: "A" },
    });

    const response = await GET(
      new Request(new URL(getPartnerPath(1), LOCAL_BASE_URL)),
      createContext("1"),
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({
      success: true,
      data: { id: 1, name: "A" },
      error: null,
    });
  });

  it("PATCH updates partner", async () => {
    mockedUpdatePartnerOnServer.mockResolvedValue({
      success: true,
      data: { id: 1, name: "Updated" },
    });

    const response = await PATCH(
      new Request(new URL(getPartnerPath(1), LOCAL_BASE_URL), {
        method: "PATCH",
        body: JSON.stringify({
          name: "Updated",
          birthDate: "1999-01-01",
          gender: "FEMALE",
          calendarType: "SOLAR",
        }),
        headers: { Origin: "http://localhost" },
      }),
      createContext("1"),
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({
      success: true,
      data: { id: 1, name: "Updated" },
      error: null,
    });
  });

  it("DELETE returns mapped failure", async () => {
    mockedDeletePartnerOnServer.mockResolvedValue({
      success: false,
      status: 404,
      message: "PARTNER_NOT_FOUND",
    });

    const response = await DELETE(
      new Request(new URL(getPartnerPath(1), LOCAL_BASE_URL), {
        method: "DELETE",
        headers: { Origin: "http://localhost" },
      }),
      createContext("1"),
    );
    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body).toEqual({
      success: false,
      data: null,
      error: {
        code: "PARTNER_DELETE_FAILED",
        message: "관심 상대를 삭제하지 못했습니다. 잠시 후 다시 시도해주세요.",
      },
    });
  });
});
