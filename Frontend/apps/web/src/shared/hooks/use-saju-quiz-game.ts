"use client";

import { useEffect, useState } from "react";

import {
  SAJU_QUIZ_CATEGORY_STYLE,
  type SajuQuizOption,
  type SajuQuizPhase,
} from "@/shared/model/saju-quiz/constants";
import {
  markSajuQuizQuestionsAsSeen,
  pickSajuQuizQuestions,
} from "@/shared/model/saju-quiz/storage";
import type { QuizQuestion } from "@/shared/model/saju-quiz/questions";

export function useSajuQuizGame() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<SajuQuizOption | null>(null);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<SajuQuizPhase>("answering");

  const currentQuestion = questions[index] ?? null;
  const isCorrect = selected !== null && selected === currentQuestion?.answer;
  const categoryStyle = currentQuestion
    ? SAJU_QUIZ_CATEGORY_STYLE[currentQuestion.category]
    : null;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setQuestions(pickSajuQuizQuestions());
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  function selectOption(option: SajuQuizOption) {
    if (selected !== null || phase !== "answering" || !currentQuestion) return;

    setSelected(option);

    if (option === currentQuestion.answer) {
      setScore((currentScore) => currentScore + 1);
    }

    setPhase("revealed");
  }

  function goNext() {
    if (index < questions.length - 1) {
      setIndex((currentIndex) => currentIndex + 1);
      setSelected(null);
      setPhase("answering");
      return;
    }

    markSajuQuizQuestionsAsSeen(questions.map((question) => question.id));
    setPhase("complete");
  }

  function restart() {
    setQuestions(pickSajuQuizQuestions());
    setIndex(0);
    setSelected(null);
    setScore(0);
    setPhase("answering");
  }

  return {
    categoryStyle,
    currentQuestion,
    index,
    isCorrect,
    phase,
    questions,
    restart,
    score,
    selected,
    selectOption,
    goNext,
  };
}
