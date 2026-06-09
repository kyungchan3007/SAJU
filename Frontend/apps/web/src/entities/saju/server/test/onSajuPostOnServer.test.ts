import { onSajuPostOnServer } from "@/entities/saju/server/onSajuPostOnServer";
import { SAJU_ENDPOINT_PATH } from "@/shared/config/endPoint";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockedAuthenticatedBackendFetch = vi.hoisted(() => vi.fn());
const mockedParseBackendApiResponse = vi.hoisted(() => vi.fn());

vi.mock("@/shared/api/auth/authenticatedBackendFetch", () => ({
  authenticatedBackendFetch: mockedAuthenticatedBackendFetch,
}));

vi.mock("@/shared/api/backend/parseBackendApiResponse", () => ({
  parseBackendApiResponse: mockedParseBackendApiResponse,
}));

describe("onSajuPostOnServer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 400 for invalid birth date before backend request", async () => {
    await expect(
      onSajuPostOnServer({
        birthYear: "1992",
        birthDate: "13/99",
        city: "서울",
        calendarType: "SOLAR",
        birthTime: "",
        gender: "MALE",
        timeUnknown: "",
        agreedToTerms: true,
        agreedToPrivacy: true,
      }),
    ).resolves.toEqual({
      success: false,
      status: 400,
      message: "Birth date format is invalid.",
    });

    expect(mockedAuthenticatedBackendFetch).not.toHaveBeenCalled();
  });

  it("returns 400 for invalid enum values before backend request", async () => {
    await expect(
      onSajuPostOnServer({
        birthYear: "1992",
        birthDate: "03/14",
        city: "서울",
        calendarType: "solar",
        birthTime: "",
        gender: "male",
        timeUnknown: "",
        agreedToTerms: true,
        agreedToPrivacy: true,
      }),
    ).resolves.toEqual({
      success: false,
      status: 400,
      message: "Saju request values are invalid.",
    });

    expect(mockedAuthenticatedBackendFetch).not.toHaveBeenCalled();
  });

  it("posts normalized payload and returns parsed success data", async () => {
    mockedAuthenticatedBackendFetch.mockResolvedValue({
      success: true,
      response: new Response(),
      accessToken: "token",
    });
    mockedParseBackendApiResponse.mockResolvedValue({
      success: true,
      data: { weakElement: "water" },
    });

    await expect(
      onSajuPostOnServer({
        birthYear: "1992",
        birthDate: "3/4",
        city: "서울",
        calendarType: "SOLAR",
        birthTime: "",
        gender: "MALE",
        timeUnknown: "",
        agreedToTerms: true,
        agreedToPrivacy: true,
      }),
    ).resolves.toEqual({
      success: true,
      data: { weakElement: "water" },
    });

    expect(mockedAuthenticatedBackendFetch).toHaveBeenCalledWith(
      SAJU_ENDPOINT_PATH,
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }),
      undefined,
    );
    const [, requestInit] = mockedAuthenticatedBackendFetch.mock.calls[0];
    expect(JSON.parse(requestInit.body as string)).toEqual({
      birthDate: "1992-03-04",
      birthTime: null,
      gender: "MALE",
      calendarType: "SOLAR",
      city: "서울",
      termsConsent: true,
      privacyConsent: true,
    });
  });
});
