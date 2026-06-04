import { toMypageSajuSummaryItems } from "@/features/mypage/model/sajuSummary";
import { describe, expect, it } from "vitest";

describe("toMypageSajuSummaryItems", () => {
  it("maps sajuAnalysis fields to mypage summary rows", () => {
    expect(
      toMypageSajuSummaryItems({
        ilju: "임인",
        strength: "신약(身弱)",
        geokguk: "정관격",
        yongshin: "metal",
        assistYongshin: "water",
      }),
    ).toEqual([
      { label: "일주", value: "임인" },
      { label: "신강/신약", value: "신약(身弱)" },
      { label: "격국", value: "정관격" },
      { label: "용신", value: "금 (金)" },
      { label: "보조 용신", value: "수 (水)" },
    ]);
  });

  it("drops empty rows and preserves already formatted values", () => {
    expect(
      toMypageSajuSummaryItems({
        ilju: "임인",
        strength: null,
        geokguk: " ",
        yongshin: "금 (金)",
        assistYongshin: "수",
      }),
    ).toEqual([
      { label: "일주", value: "임인" },
      { label: "용신", value: "금 (金)" },
      { label: "보조 용신", value: "수 (水)" },
    ]);
  });
});
