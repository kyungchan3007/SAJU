import { describe, expect, it } from "vitest";

import { getSajuHubCopy } from "@/features/saju-hub/model/copy";

describe("getSajuHubCopy", () => {
  it("uses yongshin for personalized hub copy", () => {
    const copy = getSajuHubCopy("water");

    expect(copy.element).toBe("수");
    expect(copy.title).toBe("나의 용신 오행은 수(水)예요");
    expect(copy.yongshinDescription).toBe(
      "용신은 내 사주의 균형을 잡아주고, 나에게 도움이 되는 핵심 기운을 뜻해요.",
    );
    expect(copy.description).toContain("재능이 많고 참을성이 좋으며");
    expect(copy.compatibilityDescription).toBe(
      "수(水) 기운은 금(金), 토(土) 기운과 잘 어울려요.",
    );
  });

  it("normalizes korean yongshin keys", () => {
    const copy = getSajuHubCopy("화");

    expect(copy.element).toBe("화");
    expect(copy.title).toBe("나의 용신 오행은 화(火)예요");
  });

  it("falls back to water copy without yongshin", () => {
    const copy = getSajuHubCopy(null);

    expect(copy.element).toBe("수");
  });
});
