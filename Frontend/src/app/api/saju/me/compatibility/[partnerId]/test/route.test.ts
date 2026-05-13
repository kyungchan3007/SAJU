import { GET } from "@/app/api/saju/me/compatibility/[partnerId]/route";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mockedGetCompatibilityOnServer = vi.hoisted(() => vi.fn());

vi.mock("@/entities/compatibility/server/getCompatibilityOnServer", () => ({
  getCompatibilityOnServer: mockedGetCompatibilityOnServer,
}));

function createContext(partnerId: string) {
  return { params: Promise.resolve({ partnerId }) } as const;
}

describe("/api/saju/me/compatibility/[partnerId] GET", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns 400 when partnerId is invalid", async () => {
    const response = await GET(
      new Request("http://localhost/api/saju/me/compatibility/nope"),
      createContext("nope"),
    );
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error.code).toBe("INVALID_PARTNER_ID");
  });

  it("returns compatibility payload", async () => {
    mockedGetCompatibilityOnServer.mockResolvedValue({
      success: true,
      data: { status: "COMPLETE", summary: { overallScore: 81 } },
      meta: { backendStatus: "COMPLETE", backendMessage: "ok" },
    });

    const response = await GET(
      new Request("http://localhost/api/saju/me/compatibility/1"),
      createContext("1"),
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({
      success: true,
      data: { status: "COMPLETE", summary: { overallScore: 81 } },
      error: null,
      meta: { backendStatus: "COMPLETE", backendMessage: "ok" },
    });
  });
});
