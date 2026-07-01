import { describe, expect, it } from "vitest";

import {
  GUEST_NAV_ITEMS,
  isGlobalNavHiddenPath,
  resolveNavItemHref,
} from "@/domain/navigation/model/nav-items";

describe("resolveNavItemHref", () => {
  it("keeps public nav paths for guests", () => {
    expect(resolveNavItemHref("/blog", false)).toBe("/blog");
    expect(resolveNavItemHref("/saju", false)).toBe("/saju");
    expect(resolveNavItemHref("/faq", false)).toBe("/faq");
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

  it("identifies paths where the global nav should be hidden", () => {
    expect(isGlobalNavHiddenPath("/login")).toBe(true);
    expect(isGlobalNavHiddenPath("/auth/restore")).toBe(true);
    expect(isGlobalNavHiddenPath("/mypage")).toBe(false);
  });

  it("defines a guest nav set made of public pages", () => {
    expect(GUEST_NAV_ITEMS.map((item) => item.href)).toEqual([
      "/saju",
      "/blog",
      "/faq",
      "/contact",
      "/mypage",
    ]);
  });
});
