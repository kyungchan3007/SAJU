import { describe, expect, it } from "vitest";

import { resolveCommunityEntryHref } from "@/features/home/model/community-entry";
import { KAKAO_LOGIN_URL } from "@/shared/config/endPoint";

describe("resolveCommunityEntryHref", () => {
  it("returns kakao auth entry for guests", () => {
    expect(resolveCommunityEntryHref(false)).toBe(KAKAO_LOGIN_URL);
  });

  it("returns community path for authenticated users", () => {
    expect(resolveCommunityEntryHref(true)).toBe("/community");
  });
});
