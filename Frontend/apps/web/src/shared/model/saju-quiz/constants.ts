import type { CSSProperties } from "react";

import type { QuizCategory } from "@/shared/model/saju-quiz/questions";

export const SAJU_QUIZ_QUESTIONS_PER_ROUND = 3;
export const SAJU_QUIZ_SEEN_KEY = "saju-quiz-seen";

export const SAJU_QUIZ_CATEGORY_STYLE: Record<
  QuizCategory,
  { bg: string; color: string }
> = {
  오행: { bg: "#ECFDF5", color: "#059669" },
  궁합: { bg: "#FDF4FF", color: "#9333EA" },
  "사주 상식": { bg: "#EFF6FF", color: "#2563EB" },
};

export const SAJU_QUIZ_SCORE_MESSAGE: Record<number, string> = {
  3: "완벽해요! 사주 고수시네요 🎉",
  2: "잘 하셨어요! 사주에 관심이 많으시군요 ✨",
  1: "아직 배울 게 많네요, 한 번 더 도전! 🌱",
  0: "사주가 어렵죠? 다시 도전해봐요 😊",
};

export const SAJU_QUIZ_OPTIONS = ["A", "B"] as const;

export type SajuQuizOption = (typeof SAJU_QUIZ_OPTIONS)[number];
export type SajuQuizPhase = "answering" | "revealed" | "complete";

export type SajuQuizOptionStyle = Pick<
  CSSProperties,
  "background" | "borderColor" | "color" | "opacity"
>;
