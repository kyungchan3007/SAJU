export const SAJU_SECTION_HELP = {
  jeongtongsajuSummary: {
    title: "나의 사주 명식",
    description:
      "태어난 날짜와 시간을 바탕으로 요약한 사주의 기본 정보입니다. 띠, 강약, 격국, 기둥 요약을 한눈에 보여줍니다.",
  },
  pillars: {
    title: "사주 4기둥",
    description:
      "년주, 월주, 일주, 시주로 나뉘는 사주의 기본 구조입니다. 각 기둥은 위의 천간과 아래의 지지가 만나 만들어지며, 일주는 본인의 핵심 기운을 보는 기준입니다.",
  },
  fiveElements: {
    title: "오행 밸런스",
    description:
      "목, 화, 토, 금, 수 다섯 기운이 내 사주에서 어떤 비율로 나타나는지 보여줍니다. 부족하거나 과한 기운과 보완이 필요한 용신을 함께 확인합니다.",
  },
  twelveGrowth: {
    title: "12운성 — 기둥별 에너지",
    description:
      "각 기둥의 기운이 어떤 성장 단계에 있는지 보는 지표입니다. 에너지의 강약과 흐름을 해석할 때 참고합니다.",
  },
  bigLuck: {
    title: "대운 흐름",
    description:
      "10년 단위로 바뀌는 큰 운의 흐름입니다. 무인, 정축 같은 표기는 천간과 지지를 합친 간지로, 해당 시기의 기운을 나타냅니다.",
  },
} as const;

export type SajuSectionHelpKey = keyof typeof SAJU_SECTION_HELP;
