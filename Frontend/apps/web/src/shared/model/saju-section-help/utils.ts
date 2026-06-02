import {
  SAJU_SECTION_HELP,
  type SajuSectionHelpKey,
} from "@/shared/model/saju-section-help/model";

export function getSajuSectionHelp(key: SajuSectionHelpKey) {
  return SAJU_SECTION_HELP[key];
}
