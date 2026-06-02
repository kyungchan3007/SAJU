export const HEAVENLY_STEM_INFO = {
  갑: {
    element: "목",
    symbol: "큰 나무",
    description: "곧게 뻗는 추진력과 시작하는 힘",
  },
  을: {
    element: "목",
    symbol: "풀과 덩굴",
    description: "유연하고 섬세하게 뻗어가는 목의 기운",
  },
  병: {
    element: "화",
    symbol: "태양",
    description: "밝게 드러내고 확산시키는 불의 기운",
  },
  정: {
    element: "화",
    symbol: "촛불",
    description: "섬세하고 집중된 불의 기운",
  },
  무: {
    element: "토",
    symbol: "큰 산이나 넓은 대지",
    description: "묵직하고 안정적인 토의 기운",
  },
  기: {
    element: "토",
    symbol: "밭과 흙",
    description: "품고 길러내는 현실적인 토의 기운",
  },
  경: {
    element: "금",
    symbol: "단단한 쇠",
    description: "분명하게 자르고 결정하는 금의 기운",
  },
  신: {
    element: "금",
    symbol: "보석과 세공된 금속",
    description: "정교하고 세련되게 다듬는 금의 기운",
  },
  임: {
    element: "수",
    symbol: "큰 강과 바다",
    description: "넓게 흐르고 받아들이는 물의 기운",
  },
  계: {
    element: "수",
    symbol: "비와 이슬",
    description: "섬세하게 스며들고 조율하는 물의 기운",
  },
} as const;

export const EARTHLY_BRANCH_INFO = {
  자: {
    element: "수",
    symbol: "깊은 물",
    description: "시작을 준비하고 생각을 모으는 기운",
  },
  축: {
    element: "토",
    symbol: "겨울의 흙",
    description: "천천히 축적하고 버티는 기운",
  },
  인: {
    element: "목",
    symbol: "봄의 시작",
    description: "움직임을 열고 성장으로 나아가는 기운",
  },
  묘: {
    element: "목",
    symbol: "봄의 풀과 나무",
    description: "관계, 성장, 부드러운 확장을 상징하는 기운",
  },
  진: {
    element: "토",
    symbol: "습한 대지",
    description: "여러 기운을 품고 변화시키는 기운",
  },
  사: {
    element: "화",
    symbol: "초여름의 불",
    description: "활동성과 표현력이 살아나는 기운",
  },
  오: {
    element: "화",
    symbol: "한낮의 불",
    description: "강하게 드러나고 뜨겁게 확산되는 기운",
  },
  미: {
    element: "토",
    symbol: "여름 끝의 흙",
    description: "열기를 정리하고 다음 흐름을 준비하는 기운",
  },
  신: {
    element: "금",
    symbol: "가을의 금",
    description: "판단력, 정리, 결단을 상징하는 기운",
  },
  유: {
    element: "금",
    symbol: "가을의 결실",
    description: "기준, 절제, 완성도를 상징하는 기운",
  },
  술: {
    element: "토",
    symbol: "마른 흙",
    description: "마무리하고 지켜내는 기운",
  },
  해: {
    element: "수",
    symbol: "겨울의 물",
    description: "깊이 저장하고 다음 시작을 준비하는 기운",
  },
} as const;

export type GanjiPillar = {
  type: string;
  stem?: string | null;
  branch?: string | null;
};

export type BigLuckGanji = {
  pillar?: string | null;
  isCurrentDaeun?: boolean;
};
