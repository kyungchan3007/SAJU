import { describe, expect, it } from "vitest";

import { resolveNavItemHref } from "@/domain/navigation/model/nav-items";

describe("resolveNavItemHref", () => {
  it("keeps public nav paths for guests", () => {
    expect(resolveNavItemHref("/taro", false)).toBe("/taro");
  });

  it("routes guests through login for protected nav paths", () => {
    expect(resolveNavItemHref("/community", false)).toBe(
      "/login?next=%2Fcommunity",
    );
    expect(resolveNavItemHref("/food", false)).toBe("/login?next=%2Ffood");
    expect(resolveNavItemHref("/compatibility", false)).toBe(
      "/login?next=%2Fcompatibility",
    );
  });

  it("keeps protected nav paths unchanged for authenticated users", () => {
    expect(resolveNavItemHref("/community", true)).toBe("/community");
  });
});
