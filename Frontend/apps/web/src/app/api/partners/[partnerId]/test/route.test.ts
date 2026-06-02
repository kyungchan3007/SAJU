import {
  DELETE,
  GET,
  PATCH,
} from "@/app/api/partners/[partnerId]/route";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

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
      new Request("http://localhost/api/partners/abc"),
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
      new Request("http://localhost/api/partners/1"),
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
      new Request("http://localhost/api/partners/1", {
        method: "PATCH",
        body: JSON.stringify({
          name: "Updated",
          birthDate: "1999-01-01",
          gender: "FEMALE",
          calendarType: "SOLAR",
        }),
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
      new Request("http://localhost/api/partners/1", { method: "DELETE" }),
      createContext("1"),
    );
    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body).toEqual({
      success: false,
      data: null,
      error: {
        code: "PARTNER_DELETE_FAILED",
        message: "PARTNER_NOT_FOUND",
      },
    });
  });
});
