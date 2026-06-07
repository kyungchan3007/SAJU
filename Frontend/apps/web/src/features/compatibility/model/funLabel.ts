export type FunLabel = {
  emoji: string;
  text: string;
  badge: string;
};

const FUN_LABEL_MAP: Record<number, FunLabel> = {
  1: { emoji: "🚨", text: "둘 다 살아계신가요?", badge: "위험해요" },
  2: { emoji: "😮‍💨", text: "참을 인(忍) 무한 리필 중...", badge: "노력해요" },
  3: { emoji: "🫠", text: "애매한데... 끊기도 애매한 사이", badge: "평범해요" },
  4: { emoji: "🤭", text: "어? 우리 은근 잘 맞는 거 아니야?", badge: "좋아요" },
  5: { emoji: "🥹", text: "사주가 인정한 천생연분", badge: "최고예요" },
};

const FALLBACK_FUN_LABEL: FunLabel = {
  emoji: "🫠",
  text: "애매한데... 끊기도 애매한 사이",
  badge: "평범해요",
};

export function getFunLabel(score: number): FunLabel {
  const clamped = Math.min(5, Math.max(1, Math.round(score)));
  return FUN_LABEL_MAP[clamped] ?? FALLBACK_FUN_LABEL;
}
