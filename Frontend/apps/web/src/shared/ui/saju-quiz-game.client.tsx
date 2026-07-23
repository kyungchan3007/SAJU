"use client";

import { useSajuQuizGame } from "@/shared/hooks/use-saju-quiz-game";
import {
  SAJU_QUIZ_OPTIONS,
  SAJU_QUIZ_QUESTIONS_PER_ROUND,
  SAJU_QUIZ_SCORE_MESSAGE,
} from "@/shared/model/saju-quiz/constants";
import {
  getSajuQuizOptionBadgeStyle,
  getSajuQuizOptionStyle,
} from "@/shared/model/saju-quiz/style";

export function SajuQuizGame() {
  const quiz = useSajuQuizGame();

  if (quiz.phase === "complete") {
    return (
      <div
        className="rounded-3xl p-6 text-center"
        style={{ background: "#F8F7FF", border: "1.5px solid #E4E2FF" }}
      >
        <p className="mb-1 text-2xl font-black" style={{ color: "#5956E9" }}>
          {quiz.score} / {SAJU_QUIZ_QUESTIONS_PER_ROUND}
        </p>
        <p className="mb-4 text-sm font-semibold" style={{ color: "#374151" }}>
          {SAJU_QUIZ_SCORE_MESSAGE[quiz.score]}
        </p>
        <button
          type="button"
          onClick={quiz.restart}
          className="rounded-xl px-6 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-80"
          style={{ background: "#5956E9" }}
        >
          한 판 더
        </button>
      </div>
    );
  }

  if (!quiz.currentQuestion) return null;

  return (
    <div
      className="rounded-3xl p-5"
      style={{ background: "#F8F7FF", border: "1.5px solid #E4E2FF" }}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-black" style={{ color: "#5956E9" }}>
            사주 퀴즈
          </span>
          {quiz.categoryStyle && (
            <span
              className="rounded-full px-2.5 py-0.5 text-[11px] font-bold"
              style={{
                background: quiz.categoryStyle.bg,
                color: quiz.categoryStyle.color,
              }}
            >
              {quiz.currentQuestion.category}
            </span>
          )}
        </div>
        <span className="text-xs font-semibold" style={{ color: "#6B7280" }}>
          {quiz.index + 1} / {SAJU_QUIZ_QUESTIONS_PER_ROUND}
        </span>
      </div>

      <div className="mb-4 flex gap-1.5">
        {quiz.questions.map((question, questionIndex) => (
          <div
            key={question.id}
            className="h-1 flex-1 rounded-full transition-colors duration-300"
            style={{
              background:
                questionIndex < quiz.index
                  ? "#5956E9"
                  : questionIndex === quiz.index
                    ? "#A5A3F5"
                    : "#E4E2FF",
            }}
          />
        ))}
      </div>

      <p
        className="mb-4 text-[15px] font-bold leading-snug"
        style={{ color: "#111827" }}
      >
        {quiz.currentQuestion.question}
      </p>

      <div className="flex flex-col gap-2.5">
        {SAJU_QUIZ_OPTIONS.map((option) => {
          const optionStyle = getSajuQuizOptionStyle({
            answer: quiz.currentQuestion.answer,
            option,
            selected: quiz.selected,
          });
          const badgeStyle = getSajuQuizOptionBadgeStyle({
            answer: quiz.currentQuestion.answer,
            option,
            selected: quiz.selected,
          });
          const label =
            option === "A"
              ? quiz.currentQuestion.optionA
              : quiz.currentQuestion.optionB;

          return (
            <button
              key={option}
              type="button"
              onClick={() => quiz.selectOption(option)}
              disabled={quiz.selected !== null}
              aria-pressed={quiz.selected === option}
              className="flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left text-sm font-semibold transition-colors duration-200"
              style={optionStyle}
            >
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-black"
                style={badgeStyle}
              >
                {option}
              </span>
              {label}
            </button>
          );
        })}
      </div>

      {quiz.phase === "revealed" && (
        <div className="mt-4">
          <div
            className="mb-3 rounded-2xl px-4 py-3 text-[13px] font-semibold leading-relaxed"
            style={{
              background: quiz.isCorrect ? "#F0EEFF" : "#FFF1F2",
              color: quiz.isCorrect ? "#5956E9" : "#E11D48",
            }}
          >
            {quiz.isCorrect ? "정답이에요! " : "아쉽네요. "}
            {quiz.currentQuestion.explanation}
          </div>
          <button
            type="button"
            onClick={quiz.goNext}
            className="w-full rounded-2xl py-3 text-sm font-bold text-white transition-opacity hover:opacity-80"
            style={{ background: "#5956E9" }}
          >
            {quiz.index < quiz.questions.length - 1
              ? "다음 문제 →"
              : "결과 보기 →"}
          </button>
        </div>
      )}
    </div>
  );
}
