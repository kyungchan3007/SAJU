import type { YearFortuneDisplay } from "@/features/year-fortune/model/yearFortune";

export const YEAR_FORTUNE_PREVIEW_DATA: YearFortuneDisplay = {
  status: "COMPLETE",
  targetYear: 2026,
  yearLabel: "2026년 병오년",
  userInfo: {
    manse: "음력 1991년 10월 12일",
    gender: "여성",
    birthYear: 1991,
    daeun: "정축 대운",
  },
  domains: [
    {
      key: "general",
      icon: "🌟",
      label: "총론",
      color: "#6366F1",
      bg: "#EEF2FF",
      title: "전체 흐름",
      content:
        "2026년은 추진력과 표현력이 크게 살아나는 해입니다. 다만 결정이 빨라지는 만큼 속도를 조절하고, 중요한 선택은 한 번 더 점검하는 태도가 필요합니다.",
    },
    {
      key: "wealth",
      icon: "💰",
      label: "재물운",
      color: "#F59E0B",
      bg: "#FEF9C3",
      title: "재물운",
      content:
        "상반기에는 기존 자산을 안정적으로 관리하는 흐름이 좋고, 하반기에는 새로운 수입 기회를 검토해볼 수 있습니다. 충동 소비는 줄이는 편이 유리합니다.",
    },
    {
      key: "relationship",
      icon: "💕",
      label: "이성·대인관계",
      color: "#EC4899",
      bg: "#FCE7F3",
      title: "대인관계",
      content:
        "사람을 만나는 폭이 넓어지는 해입니다. 관계를 넓히는 것보다 오래 갈 수 있는 연결을 선별하는 태도가 더 큰 도움이 됩니다.",
    },
    {
      key: "careerBusiness",
      icon: "💼",
      label: "직장·사업운",
      color: "#3B82F6",
      bg: "#DBEAFE",
      title: "직장·사업운",
      content:
        "업무에서 주도권을 잡을 기회가 생길 수 있습니다. 실행력은 강하지만 준비 없는 확장은 부담이 될 수 있어 계획을 먼저 세우는 편이 좋습니다.",
    },
    {
      key: "familyHealth",
      icon: "🏠",
      label: "가정·건강운",
      color: "#22C55E",
      bg: "#DCFCE7",
      title: "가정·건강운",
      content:
        "생활 리듬을 일정하게 유지하는 것이 핵심입니다. 과로와 수면 부족을 관리하면 전반적인 컨디션이 안정적으로 유지됩니다.",
    },
  ],
  months: [
    {
      month: 1,
      type: "normal",
      tagText: "🟡 평",
      emoji: "🌱",
      fortune:
        "시작을 서두르기보다 목표를 정리하는 달입니다. 관계와 일정의 우선순위를 정리하면 이후 흐름이 훨씬 가벼워집니다.",
    },
    {
      month: 3,
      type: "good",
      tagText: "🔵 길",
      emoji: "🌸",
      fortune:
        "새로운 제안이나 이동의 기회가 들어올 수 있습니다. 준비해 온 것이 있다면 적극적으로 보여주기 좋은 달입니다.",
    },
    {
      month: 6,
      type: "good",
      tagText: "🟢 대길",
      emoji: "☀️",
      fortune:
        "일과 재물의 흐름이 동시에 살아나는 시기입니다. 다만 무리하게 일정과 목표를 늘리면 피로가 누적될 수 있으니 균형이 중요합니다.",
    },
    {
      month: 9,
      type: "caution",
      tagText: "🔴 주의",
      emoji: "🍁",
      fortune:
        "대인관계에서 오해가 생기기 쉬운 달입니다. 중요한 대화는 감정보다 사실 중심으로 정리하는 편이 좋습니다.",
    },
    {
      month: 11,
      type: "good",
      tagText: "🔵 길",
      emoji: "🏆",
      fortune:
        "한 해 동안 쌓은 결과가 드러나는 시기입니다. 마무리와 정리, 평가에 강점이 생기므로 중요한 결론을 내리기 좋습니다.",
    },
  ],
};
