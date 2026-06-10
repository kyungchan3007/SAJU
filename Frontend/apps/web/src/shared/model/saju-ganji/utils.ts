import {
  BRANCH_HANJA_TO_KOR,
  EARTHLY_BRANCH_INFO,
  HEAVENLY_STEM_INFO,
  STEM_HANJA_TO_KOR,
  type BigLuckGanji,
  type GanjiPillar,
} from "@/shared/model/saju-ganji/model";
import { SAJU_PILLAR_LABEL_MAP } from "@/shared/model/saju-pillar/model";

export function describeGanjiPillar(pillar: GanjiPillar): string {
  const stem = pillar.stem?.trim();
  const branch = pillar.branch?.trim();
  const label =
    SAJU_PILLAR_LABEL_MAP[pillar.type as keyof typeof SAJU_PILLAR_LABEL_MAP] ??
    "이 기둥";

  if (!stem || !branch) {
    return `${label}는 천간과 지지가 결합된 사주 기둥입니다.`;
  }

  const stemInfo = HEAVENLY_STEM_INFO[stem as keyof typeof HEAVENLY_STEM_INFO];
  const branchInfo =
    EARTHLY_BRANCH_INFO[branch as keyof typeof EARTHLY_BRANCH_INFO];
  const ganji = `${stem}${branch}`;

  if (!stemInfo || !branchInfo) {
    return `${label} ${ganji}는 천간 ${stem}와 지지 ${branch}가 만난 기둥입니다.`;
  }

  const dayNote =
    pillar.type === "day"
      ? " 일주는 본인의 핵심 기운을 보는 기준이 됩니다."
      : "";

  return `${label} ${ganji}는 천간 ${stem}(${stemInfo.element})와 지지 ${branch}(${branchInfo.element})가 만난 기둥입니다. ${stem}는 ${stemInfo.symbol}처럼 ${stemInfo.description}을 뜻하고, ${branch}는 ${branchInfo.symbol}처럼 ${branchInfo.description}을 뜻합니다.${dayNote}`;
}

function getGanjiParts(ganji: string | null | undefined) {
  const trimmed = ganji?.trim();

  if (!trimmed || trimmed.length < 2) {
    return null;
  }

  const stem = trimmed.slice(0, 1);
  const branch = trimmed.slice(1, 2);

  // 한자 입력(丙寅)도 처리: 한글 키로 변환 후 룩업
  const stemKey = STEM_HANJA_TO_KOR[stem] ?? stem;
  const branchKey = BRANCH_HANJA_TO_KOR[branch] ?? branch;

  const stemInfo = HEAVENLY_STEM_INFO[stemKey as keyof typeof HEAVENLY_STEM_INFO];
  const branchInfo =
    EARTHLY_BRANCH_INFO[branchKey as keyof typeof EARTHLY_BRANCH_INFO];

  return { ganji: trimmed, stem, branch, stemInfo, branchInfo };
}

export function formatBigLuckGanjiSummary(ganji: string | null | undefined) {
  const parts = getGanjiParts(ganji);

  if (!parts || !parts.stemInfo || !parts.branchInfo) {
    return null;
  }

  return `${parts.stemInfo.symbol} · ${parts.branchInfo.symbol}`;
}

export function describeBigLuckGanji(bigLuck: BigLuckGanji): string {
  const parts = getGanjiParts(bigLuck.pillar);

  if (!parts) {
    return "이 대운은 10년 단위로 바뀌는 큰 운의 흐름입니다.";
  }

  if (!parts.stemInfo || !parts.branchInfo) {
    return `${parts.ganji} 대운은 천간 ${parts.stem}와 지지 ${parts.branch}가 만난 10년 흐름입니다.`;
  }

  const currentNote = bigLuck.isCurrentDaeun
    ? " 현재 지나고 있는 대운입니다."
    : "";

  return `${parts.ganji} 대운은 ${parts.stemInfo.symbol}처럼 ${parts.stemInfo.description}과 ${parts.branchInfo.symbol}처럼 ${parts.branchInfo.description}이 함께 작동하는 10년 흐름입니다.${currentNote}`;
}
