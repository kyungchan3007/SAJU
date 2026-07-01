import type { PartnerResponse, SajuProfileResponse } from "@/generated/api";
import type { CompatibilityResultDisplay } from "@/features/compatibility/model/compatibility";

export const COMPATIBILITY_PREVIEW_MY_PROFILE: SajuProfileResponse = {
  nickname: "미리보기",
  birthDate: "1994-03-16",
  gender: "FEMALE",
};

export const COMPATIBILITY_PREVIEW_PARTNER: PartnerResponse = {
  id: 1,
  name: "도윤",
  birthDate: "1992-09-04",
  gender: "MALE",
};

export const COMPATIBILITY_PREVIEW_RESULT: CompatibilityResultDisplay = {
  status: "COMPLETE",
  overallScore: 86,
  keyword: "서로를 성장시키는 궁합",
  description:
    "기본 성향은 다르지만 서로의 장점을 끌어올려 주는 조합입니다. 감정 표현 방식만 잘 맞추면 관계의 안정감과 추진력이 함께 살아나는 궁합으로 읽을 수 있습니다.",
  tags: ["대화 리듬 좋음", "감정 표현 보완", "현실 감각 안정적"],
  sections: [
    {
      icon: "💘",
      label: "연인궁합",
      score: 5,
      scoreLabel: "서로에게 강하게 끌리는 단계",
      funLabel: {
        emoji: "💞",
        text: "감정 온도가 잘 맞아요",
        badge: "BEST",
      },
      color: "#EC4899",
      keyword: "서로를 편안하게 만드는 매력",
      content:
        "감정 표현 방식이 완전히 같지는 않지만, 한쪽이 분위기를 풀면 다른 한쪽이 안정적으로 받아주는 흐름이 강합니다. 연애 초반보다 시간이 지날수록 정서적 신뢰가 깊어지는 타입입니다.",
    },
    {
      icon: "🗣️",
      label: "소통궁합",
      score: 4,
      scoreLabel: "좋은 흐름의 단계",
      funLabel: {
        emoji: "🫶",
        text: "대화가 길게 이어질 수 있어요",
        badge: "GOOD",
      },
      color: "#06B6D4",
      keyword: "말보다 의도를 읽는 편",
      content:
        "둘 다 핵심을 빠르게 파악하는 편이라 대화가 효율적으로 흘러갑니다. 다만 서운함을 바로 말하지 않고 넘기면 작은 오해가 쌓일 수 있으니, 중요한 감정은 짧게라도 표현하는 편이 좋습니다.",
    },
    {
      icon: "🤝",
      label: "신뢰궁합",
      score: 4,
      scoreLabel: "안정적으로 맞춰가는 단계",
      funLabel: {
        emoji: "🛡️",
        text: "관계를 지키는 힘이 있어요",
        badge: "STABLE",
      },
      color: "#3B82F6",
      keyword: "약속과 일상에서 신뢰가 쌓임",
      content:
        "화려한 표현보다 반복되는 행동과 책임감으로 신뢰를 쌓는 궁합입니다. 서로의 생활 리듬을 존중해주면 관계가 빠르게 안정권에 들어갈 가능성이 높습니다.",
    },
    {
      icon: "⚡",
      label: "갈등요인",
      score: 3,
      scoreLabel: "이해를 넓혀가는 단계",
      funLabel: {
        emoji: "🌿",
        text: "속도 차이만 조율하면 돼요",
        badge: "CHECK",
      },
      color: "#EF4444",
      keyword: "결정 속도 차이 주의",
      content:
        "한 사람은 결정을 빠르게 내리고, 다른 사람은 충분히 생각한 뒤 움직이려는 경향이 있습니다. 갈등의 핵심은 의견 차이보다 속도 차이인 경우가 많으므로, 중요한 선택일수록 템포를 맞추는 장치가 필요합니다.",
    },
  ],
};
