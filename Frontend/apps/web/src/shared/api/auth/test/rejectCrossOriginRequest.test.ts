import { rejectCrossOriginRequest } from "@/shared/api/auth/rejectCrossOriginRequest";
import { describe, expect, it } from "vitest";

describe("rejectCrossOriginRequest", () => {
  it("allows same-origin browser requests", () => {
    const request = new Request("https://saju.example/api/auth/logout", {
      method: "POST",
      headers: { Origin: "https://saju.example" },
    });

    expect(rejectCrossOriginRequest(request)).toBeNull();
  });

  it("rejects requests without an origin header", async () => {
    const request = new Request("https://saju.example/api/auth/logout", {
      method: "POST",
    });

    const response = rejectCrossOriginRequest(request);

    expect(response?.status).toBe(403);
    await expect(response?.json()).resolves.toEqual({
      success: false,
      data: null,
      error: {
        code: "CSRF_ORIGIN_REQUIRED",
        message: "요청을 확인할 수 없습니다. 다시 시도해주세요.",
      },
    });
  });

  it("rejects cross-origin browser requests", async () => {
    const request = new Request("https://saju.example/api/auth/logout", {
      method: "POST",
      headers: { Origin: "https://attacker.example" },
    });

    const response = rejectCrossOriginRequest(request);

    expect(response?.status).toBe(403);
    await expect(response?.json()).resolves.toEqual({
      success: false,
      data: null,
      error: {
        code: "CSRF_ORIGIN_MISMATCH",
        message: "허용되지 않은 요청입니다.",
      },
    });
  });
});
