import {
  resolveCompatibilityStatus,
  toCompatibilityResultDisplay,
} from "@/features/compatibility/model/compatibility";
import { describe, expect, it } from "vitest";

describe("resolveCompatibilityStatus", () => {
  it("prefers backend status over response data status", () => {
    expect(resolveCompatibilityStatus("PENDING", "COMPLETE")).toBe("PENDING");
    expect(resolveCompatibilityStatus("COMPLETE", "PENDING")).toBe("COMPLETE");
  });

  it("falls back to response data status when backend status is missing", () => {
    expect(resolveCompatibilityStatus(undefined, "PENDING")).toBe("PENDING");
    expect(resolveCompatibilityStatus(undefined, "COMPLETE")).toBe("COMPLETE");
  });
});

describe("toCompatibilityResultDisplay", () => {
  it("uses backend status when building the display model", () => {
    const display = toCompatibilityResultDisplay(
      {
        status: "COMPLETE",
        summary: {
          overallScore: 84,
          keyword: "잘 맞음",
          description: "설명",
        },
        sections: [],
      },
      "PENDING",
    );

    expect(display.status).toBe("PENDING");
  });
});
