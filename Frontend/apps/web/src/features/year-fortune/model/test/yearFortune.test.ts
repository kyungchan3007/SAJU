import {
  resolveYearFortuneStatus,
  toYearFortuneDisplay,
} from "@/features/year-fortune/model/yearFortune";
import { describe, expect, it } from "vitest";

describe("resolveYearFortuneStatus", () => {
  it("falls back to data status when backend status is not the generation status", () => {
    expect(resolveYearFortuneStatus(200, "PENDING")).toBe("PENDING");
    expect(resolveYearFortuneStatus(200, "COMPLETE")).toBe("COMPLETE");
  });
});

describe("toYearFortuneDisplay", () => {
  it("uses data status when backend status is not the generation status", () => {
    const display = toYearFortuneDisplay(
      {
        status: "PENDING",
        targetYear: 2026,
        yearLabel: "2026년",
        userInfo: {},
        monthlyFortunes: [],
      },
      200,
    );

    expect(display.status).toBe("PENDING");
  });
});
