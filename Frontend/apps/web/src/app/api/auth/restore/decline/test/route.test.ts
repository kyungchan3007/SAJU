import { POST } from "@/app/api/auth/restore/decline/route";
import { describe, expect, it } from "vitest";

describe("/api/auth/restore/decline POST", () => {
  it("clears auth cookies and returns success response", async () => {
    const response = await POST();
    const body = await response.json();
    const setCookie = response.headers.get("set-cookie") ?? "";

    expect(response.status).toBe(200);
    expect(body).toEqual({
      success: true,
      data: { declined: true, clearedAuth: true },
      error: null,
    });
    expect(setCookie).toContain("saju_access_token");
    expect(setCookie).toContain("saju_refresh_token");
  });
});
