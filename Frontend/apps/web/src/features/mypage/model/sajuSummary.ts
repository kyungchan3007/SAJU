import type { SajuAnalysisInfo } from "@/generated/api";
import { formatYongshinDisplayLabel } from "@/shared/model/five-elements/utils";
import type { SajuSummaryItem } from "../type/types";

export function toMypageSajuSummaryItems(
  sajuAnalysis?: SajuAnalysisInfo,
): SajuSummaryItem[] {
  return [
    { label: "일주", value: sajuAnalysis?.ilju },
    { label: "신강/신약", value: sajuAnalysis?.strength },
    { label: "격국", value: asCleanString(sajuAnalysis?.geokguk) },
    {
      label: "용신",
      value: formatYongshinDisplayLabel(sajuAnalysis?.yongshin, {
        spaced: true,
      }),
    },
    {
      label: "보조 용신",
      value: formatYongshinDisplayLabel(sajuAnalysis?.assistYongshin, {
        spaced: true,
      }),
    },
  ].filter((item): item is SajuSummaryItem => item.value !== null);
}

function asCleanString(value?: string | null) {
  if (typeof value !== "string") return null;

  const cleaned = value.trim();
  return cleaned.length > 0 ? cleaned : null;
}
