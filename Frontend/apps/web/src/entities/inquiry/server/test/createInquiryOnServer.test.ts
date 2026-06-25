import { createInquiryOnServer } from "@/entities/inquiry/server/createInquiryOnServer";
import { parseBackendApiResponse } from "@/shared/api/backend/parseBackendApiResponse";
import { INQUIRIES_ENDPOINT_PATH } from "@/shared/config/endPoint";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockedAuthenticatedBackendFetch = vi.hoisted(() => vi.fn());
const mockedParseBackendApiResponse = vi.hoisted(() => vi.fn());

vi.mock("@/shared/api/auth/authenticatedBackendFetch", () => ({
  authenticatedBackendFetch: mockedAuthenticatedBackendFetch,
}));

vi.mock("@/shared/api/backend/parseBackendApiResponse", () => ({
  parseBackendApiResponse: mockedParseBackendApiResponse,
}));

describe("createInquiryOnServer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("posts inquiry payload and returns parsed success data", async () => {
    mockedAuthenticatedBackendFetch.mockResolvedValue({
      success: true,
      response: new Response(),
      accessToken: "token",
    });
    mockedParseBackendApiResponse.mockResolvedValue({
      success: true,
      data: { id: 1, title: "Inquiry title", createdAt: "2026-06-25T00:00:00Z" },
    });

    const payload = {
      title: "Inquiry title",
      content: "Inquiry content",
      contactEmail: "user@example.com",
    };

    await expect(createInquiryOnServer(payload)).resolves.toEqual({
      success: true,
      data: { id: 1, title: "Inquiry title", createdAt: "2026-06-25T00:00:00Z" },
    });

    expect(mockedAuthenticatedBackendFetch).toHaveBeenCalledWith(
      INQUIRIES_ENDPOINT_PATH,
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }),
    );
    const [, requestInit] = mockedAuthenticatedBackendFetch.mock.calls[0];
    expect(JSON.parse(requestInit.body as string)).toEqual(payload);
    expect(parseBackendApiResponse).toHaveBeenCalledWith(
      expect.any(Response),
      "Create inquiry request failed.",
    );
  });

  it("returns parsed failure as-is", async () => {
    mockedAuthenticatedBackendFetch.mockResolvedValue({
      success: false,
      response: new Response(),
    });
    mockedParseBackendApiResponse.mockResolvedValue({
      success: false,
      status: 401,
      message: "LOGIN_REQUIRED",
    });

    await expect(
      createInquiryOnServer({
        title: "Inquiry title",
        content: "Inquiry content",
        contactEmail: "user@example.com",
      }),
    ).resolves.toEqual({
      success: false,
      status: 401,
      message: "LOGIN_REQUIRED",
    });
  });
});
