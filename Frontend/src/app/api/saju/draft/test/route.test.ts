import { POST } from "@/app/api/saju/draft/route";
import { describe, expect, it } from "vitest";

describe("/api/saju/draft POST", () => {
  it("returns 400 when request body is invalid json", async () => {
    const request = new Request("http://localhost/api/saju/draft", {
      method: "POST",
      body: "{invalid-json",
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request as never);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body).toEqual({
      success: false,
      data: null,
      error: {
        code: "INVALID_BODY",
        message: "Invalid saju form body.",
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
    const request = new Request("http://localhost/api/saju/draft", {
      method: "POST",
      body: JSON.stringify(formValues),
      headers: { "Content-Type": "application/json" },
    });

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
