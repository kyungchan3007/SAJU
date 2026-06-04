import { POST } from "@/app/api/auth/restore/decline/route";
import { describe, expect, it } from "vitest";

function createSameOriginRequest() {
  return new Request("https://www.saju-me.com/api/auth/restore/decline", {
    method: "POST",
    headers: {
      Origin: "https://www.saju-me.com",
    },
  });
}

describe("/api/auth/restore/decline POST", () => {
  it("clears auth cookies and returns success response", async () => {
    const response = await POST(createSameOriginRequest());
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

  it("rejects requests without an origin header", async () => {
    const response = await POST(
      new Request("https://www.saju-me.com/api/auth/restore/decline", {
        method: "POST",
      }),
    );
    const body = await response.json();

    expect(response.status).toBe(403);
    expect(body).toEqual({
      success: false,
      data: null,
      error: {
        code: "CSRF_ORIGIN_REQUIRED",
        message: "Origin header is required for state-changing requests.",
      },
    });
  });
});
