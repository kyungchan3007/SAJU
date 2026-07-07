import { POST } from "@/app/api/saju/draft/route";
import { SAJU_DRAFT_ENDPOINT_PATH } from "@/shared/config/endPoint";
import { describe, expect, it } from "vitest";

const LOCAL_BASE_URL = "http://localhost";

describe("/api/saju/draft POST", () => {
  it("returns 400 when request body is invalid json", async () => {
    const request = new Request(
      new URL(SAJU_DRAFT_ENDPOINT_PATH, LOCAL_BASE_URL),
      {
        method: "POST",
        body: "{invalid-json",
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost",
        },
      },
    );

    const response = await POST(request as never);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body).toEqual({
      success: false,
      data: null,
      error: {
        code: "INVALID_BODY",
        message: "요청 정보를 다시 확인해주세요.",
      },
    });
  });

  it("returns success and sets pending form cookie for valid body", async () => {
    const formValues = {
      birthYear: "1992",
      birthDate: "03/14",
      city: "서울",
      calendarType: "SOLAR",
      birthTime: "",
      gender: "MALE",
      timeUnknown: "",
    };
    const request = new Request(
      new URL(SAJU_DRAFT_ENDPOINT_PATH, LOCAL_BASE_URL),
      {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost",
        },
      },
    );

    const response = await POST(request as never);
    const body = await response.json();
    const setCookie = response.headers.get("set-cookie") ?? "";

    expect(response.status).toBe(200);
    expect(body).toEqual({
      success: true,
      data: { saved: true },
      error: null,
    });
    expect(setCookie).toContain("saju_pending_form=");
    expect(setCookie).toContain("HttpOnly");
  });
});
