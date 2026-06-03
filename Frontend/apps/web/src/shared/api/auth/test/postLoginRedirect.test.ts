import {
  buildLoginPath,
  normalizePostLoginRedirect,
} from "@/shared/api/auth/postLoginRedirect";
import { describe, expect, it } from "vitest";

describe("post login redirect", () => {
  it("keeps valid internal paths with query and hash", () => {
    expect(normalizePostLoginRedirect("/community?tab=friend#apply")).toBe(
      "/community?tab=friend#apply",
    );
    expect(buildLoginPath("/community?tab=friend")).toBe(
      "/login?next=%2Fcommunity%3Ftab%3Dfriend",
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
    expect(normalizePostLoginRedirect("/api/users/me")).toBeNull();
  });
});
