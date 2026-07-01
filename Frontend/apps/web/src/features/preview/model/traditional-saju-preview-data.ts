import type { JeongtongsajuViewModel } from "@/features/mypage/model/jeongtongsaju";

export const TRADITIONAL_SAJU_PREVIEW_DATA: JeongtongsajuViewModel = {
  traits: {
    summaryZodiac: "용띠",
    summaryStrength: "신강",
    geokguk: "식신격",
    summaryPillars: "수 기운의 유연함과 화 기운의 표현력이 함께 드러나는 구조",
  },
  pillars: [
    { type: "year", stem: "辛", branch: "未", twelveGrowth: "양" },
    { type: "month", stem: "乙", branch: "亥", twelveGrowth: "제왕" },
    { type: "day", stem: "癸", branch: "酉", twelveGrowth: "관대" },
    { type: "hour", stem: "丁", branch: "巳", twelveGrowth: "건록" },
  ],
  fiveElements: {
    elements: { 목: 18, 화: 29, 토: 11, 금: 24, 수: 18 },
    yongshinPrimary: "수",
    yongshinSecondary: "금",
  },
  twelveGrowthInfo: {
    year: {
      hanja: "養",
      meaning: "양",
      description: "외부 환경에서 기운을 차근차근 길러가는 흐름을 뜻합니다.",
    },
    month: {
      hanja: "帝",
      meaning: "제왕",
      description: "사회성과 활동성이 강하게 드러나는 시기의 에너지를 보여줍니다.",
    },
    day: {
      hanja: "冠",
      meaning: "관대",
      description: "나 자신의 태도와 표현이 성숙하게 드러나는 구조를 의미합니다.",
    },
    hour: {
      hanja: "建",
      meaning: "건록",
      description: "미래 방향과 잠재력이 스스로 자리를 잡아가는 흐름을 뜻합니다.",
    },
  },
  bigLuck: [
    {
      pillar: "丙子",
      pillar_kor: "병자",
      year_range: "2014 - 2023",
      age_range: "24~33세",
      isCurrentDaeun: false,
    },
    {
      pillar: "丁丑",
      pillar_kor: "정축",
      year_range: "2024 - 2033",
      age_range: "34~43세",
      isCurrentDaeun: true,
    },
    {
      pillar: "戊寅",
      pillar_kor: "무인",
      year_range: "2034 - 2043",
      age_range: "44~53세",
      isCurrentDaeun: false,
    },
    {
      pillar: "己卯",
      pillar_kor: "기묘",
      year_range: "2044 - 2053",
      age_range: "54~63세",
      isCurrentDaeun: false,
    },
  ],
  sectionDescriptions: {
    twelveGrowth: "각 기둥이 어떤 단계의 에너지로 작동하는지 예시로 보여줍니다.",
    bigLuck: "10년 단위로 바뀌는 운의 흐름을 예시 데이터로 먼저 확인해볼 수 있습니다.",
  },
};
