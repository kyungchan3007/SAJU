import { GET, POST } from "@/app/api/partners/route";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

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
        message: "LOGIN_REQUIRED",
      },
    });
  });

  it("POST returns mapped error on invalid body", async () => {
    const request = new Request("http://localhost/api/partners", {
      method: "POST",
      body: "{invalid",
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body).toEqual({
      success: false,
      data: null,
      error: {
        code: "INVALID_REQUEST_BODY",
        message: "Invalid request body.",
      },
    });
  });

  it("POST returns register response", async () => {
    mockedRegisterPartnerOnServer.mockResolvedValue({
      success: true,
      data: { id: 2, name: "B" },
    });

    const request = new Request("http://localhost/api/partners", {
      method: "POST",
      body: JSON.stringify({
        name: "B",
        birthDate: "1999-01-01",
        gender: "MALE",
        calendarType: "SOLAR",
      }),
      headers: { "Content-Type": "application/json" },
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
