import { describe, expect, it } from "vitest";

import { resolveCommunityEntryHref } from "@/features/home/model/community-entry";

describe("resolveCommunityEntryHref", () => {
  it("returns kakao auth entry for guests", () => {
    expect(resolveCommunityEntryHref(false)).toBe("/api/auth/kakao");
  });

  it("returns community path for authenticated users", () => {
    expect(resolveCommunityEntryHref(true)).toBe("/community");
  });
});
