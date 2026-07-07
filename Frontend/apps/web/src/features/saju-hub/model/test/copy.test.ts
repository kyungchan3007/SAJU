import { describe, expect, it } from "vitest";

import { getSajuHubCopy } from "@/features/saju-hub/model/copy";

describe("getSajuHubCopy", () => {
  it("uses strongest element for personalized hub copy", () => {
    const copy = getSajuHubCopy("water");

    expect(copy.element).toBe("수");
    expect(copy.title).toBe("나의 가장 강한 오행은 수(水)예요");
    expect(copy.strongestElementDescription).toBe(
      "가장 강한 오행은 내 사주에서 중심이 되는 기운을 뜻해요.",
    );
    expect(copy.description).toContain("재능이 많고 참을성이 좋으며");
    expect(copy.compatibilityDescription).toBe(
      "수(水) 기운은 금(金), 토(土) 기운과 잘 어울려요.",
    );
  });

  it("normalizes korean strongest element keys", () => {
    const copy = getSajuHubCopy("화");

    expect(copy.element).toBe("화");
    expect(copy.title).toBe("나의 가장 강한 오행은 화(火)예요");
  });

  it("falls back to water copy without strongest element", () => {
    const copy = getSajuHubCopy(null);

    expect(copy.element).toBe("수");
  });
});
