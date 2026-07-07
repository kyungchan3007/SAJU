import { POST } from "@/app/api/auth/restore/decline/route";
import { SAJU_AUTH_RESTORE_DECLINE_PATH } from "@/shared/config/endPoint";
import { describe, expect, it } from "vitest";

const SAME_ORIGIN_BASE_URL = "https://www.saju-me.com";

function createSameOriginRequest() {
  return new Request(
    new URL(SAJU_AUTH_RESTORE_DECLINE_PATH, SAME_ORIGIN_BASE_URL),
    {
      method: "POST",
      headers: {
        Origin: SAME_ORIGIN_BASE_URL,
      },
    },
  );
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
      new Request(
        new URL(SAJU_AUTH_RESTORE_DECLINE_PATH, SAME_ORIGIN_BASE_URL),
        {
          method: "POST",
        },
      ),
    );
    const body = await response.json();

    expect(response.status).toBe(403);
    expect(body).toEqual({
      success: false,
      data: null,
      error: {
        code: "CSRF_ORIGIN_REQUIRED",
        message: "요청을 확인할 수 없습니다. 다시 시도해주세요.",
      },
    });
  });
});
