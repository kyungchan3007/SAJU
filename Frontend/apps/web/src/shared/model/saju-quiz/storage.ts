import {
  SAJU_QUIZ_QUESTIONS_PER_ROUND,
  SAJU_QUIZ_SEEN_KEY,
} from "@/shared/model/saju-quiz/constants";
import {
  QUIZ_QUESTIONS,
  type QuizQuestion,
} from "@/shared/model/saju-quiz/questions";

function getSeenIds(): number[] {
  try {
    const parsed = JSON.parse(
      sessionStorage.getItem(SAJU_QUIZ_SEEN_KEY) ?? "[]",
    );

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((id): id is number => typeof id === "number");
  } catch {
    return [];
  }
}

export function markSajuQuizQuestionsAsSeen(ids: number[]) {
  try {
    const seen = getSeenIds();
    const next = [...new Set([...seen, ...ids])];

    sessionStorage.setItem(
      SAJU_QUIZ_SEEN_KEY,
      next.length >= QUIZ_QUESTIONS.length ? "[]" : JSON.stringify(next),
    );
  } catch {
    return;
  }
}

export function pickSajuQuizQuestions(): QuizQuestion[] {
  const seen = getSeenIds();
  const unseen = QUIZ_QUESTIONS.filter(
    (question) => !seen.includes(question.id),
  );
  const pool =
    unseen.length >= SAJU_QUIZ_QUESTIONS_PER_ROUND ? unseen : QUIZ_QUESTIONS;

  return [...pool]
    .sort(() => Math.random() - 0.5)
    .slice(0, SAJU_QUIZ_QUESTIONS_PER_ROUND);
}
