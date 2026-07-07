import {
  buildLoginPath,
  normalizePostLoginRedirect,
} from "@/shared/api/auth/postLoginRedirect";
import {
  buildSajuHubPath,
  buildSajuInputPath,
  buildSajuResultPath,
} from "@/shared/lib/internalRedirect";
import { SAJU_USERS_ME_PATH } from "@/shared/config/endPoint";
import { describe, expect, it } from "vitest";

describe("post login redirect", () => {
  it("keeps valid internal paths with query and hash", () => {
    expect(normalizePostLoginRedirect("/community?tab=friend#apply")).toBe(
      "/community?tab=friend#apply",
    );
    expect(buildLoginPath("/community?tab=friend")).toBe(
      "/login?next=%2Fcommunity%3Ftab%3Dfriend",
    );
    expect(buildSajuInputPath("/community?tab=friend")).toBe(
      "/saju?next=%2Fcommunity%3Ftab%3Dfriend",
    );
    expect(buildSajuResultPath("/community?tab=friend")).toBe(
      "/saju/result?next=%2Fcommunity%3Ftab%3Dfriend",
    );
    expect(buildSajuHubPath("/community?tab=friend")).toBe(
      "/saju?step=hub&next=%2Fcommunity%3Ftab%3Dfriend",
    );
    expect(buildLoginPath(buildSajuResultPath("/community?tab=friend"))).toBe(
      "/login?next=%2Fsaju%2Fresult%3Fnext%3D%252Fcommunity%253Ftab%253Dfriend",
    );
  });

  it("rejects external and protocol-relative redirects", () => {
    expect(normalizePostLoginRedirect("https://evil.example")).toBeNull();
    expect(normalizePostLoginRedirect("//evil.example")).toBeNull();
    expect(normalizePostLoginRedirect("/\\evil.example")).toBeNull();
    expect(normalizePostLoginRedirect("/\u0000evil.example")).toBeNull();
  });

  it("rejects auth and API paths", () => {
    expect(normalizePostLoginRedirect("/login")).toBeNull();
    expect(normalizePostLoginRedirect("/login/callback")).toBeNull();
    expect(normalizePostLoginRedirect("/api")).toBeNull();
    expect(normalizePostLoginRedirect(SAJU_USERS_ME_PATH)).toBeNull();
  });
});
