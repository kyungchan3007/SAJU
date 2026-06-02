import { parseBackendApiResponse } from "@/shared/api/backend/parseBackendApiResponse";
import {
  createJsonResponse,
  createTextResponse,
} from "@/shared/api/test/response-helpers";
import { describe, expect, it } from "vitest";

describe("parseBackendApiResponse", () => {
  it("returns success with data for ok json response", async () => {
    const response = createJsonResponse(
      { data: { id: 1, name: "chan" } },
      { status: 200 },
    );

    await expect(
      parseBackendApiResponse<{ id: number; name: string }>(response, "failed"),
    ).resolves.toEqual({
      success: true,
      data: { id: 1, name: "chan" },
    });
  });

  it("returns fallback error for non-json error response", async () => {
    const response = createTextResponse("bad gateway", { status: 502 });

    await expect(parseBackendApiResponse(response, "Backend failed")).resolves.toEqual({
      success: false,
      status: 502,
      message: "Backend failed (502).",
    });
  });

  it("prefers backend message in error json", async () => {
    const response = createJsonResponse(
      { message: "Token expired" },
      { status: 401 },
    );

    await expect(parseBackendApiResponse(response, "Backend failed")).resolves.toEqual({
      success: false,
      status: 401,
      message: "Token expired",
    });
  });
});
