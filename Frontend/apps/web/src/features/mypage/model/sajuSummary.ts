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

export const SEGMENT_ACTIVE =
  "linear-gradient(90deg, #6C63FF 0%, #5B5CF0 100%)";
export const SEGMENT_INACTIVE = "#ECECF3";
export const CARD_BG_ACTIVE =
  "linear-gradient(135deg, #6C63FF 0%, #5B5CF0 100%)";
export const CARD_SHADOW_ACTIVE = "0 10px 30px rgba(91,92,240,0.25)";
export const CARD_SHADOW = "0 10px 30px rgba(0,0,0,0.06)";
