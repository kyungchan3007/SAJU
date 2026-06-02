export type AdProgressNoteState = "pending" | "active" | "done";

type UseAdProgressGateParams = {
  progress: number;
  isComplete: boolean;
};

const PROGRESS_STEPS = [
  { at: 90, label: "마지막으로 검토하고 있어요..." },
  { at: 70, label: "오늘의 운세를 정리하고 있어요..." },
  { at: 45, label: "대운·세운을 계산하고 있어요..." },
  { at: 20, label: "오행 기운을 분석하고 있어요..." },
  { at: 0, label: "운세 데이터 수집 중..." },
] as const;

function getProgressLabel(pct: number, canRevealResult: boolean) {
  if (canRevealResult && pct >= 100) return "분석 완료!";

  for (const step of PROGRESS_STEPS) {
    if (pct >= step.at) return step.label;
  }

  return "운세 데이터 수집 중...";
}

function getNoteStates(
  pct: number,
): [AdProgressNoteState, AdProgressNoteState, AdProgressNoteState] {
  const n1: AdProgressNoteState = pct < 40 ? "active" : "done";
  const n2: AdProgressNoteState =
    pct < 40 ? "pending" : pct < 75 ? "active" : "done";
  const n3: AdProgressNoteState =
    pct < 75 ? "pending" : pct < 100 ? "active" : "done";

  return [n1, n2, n3];
}

export function useAdProgressGate({
  progress,
  isComplete,
}: UseAdProgressGateParams) {
  const bounded = Math.min(100, Math.max(0, Math.round(progress)));
  const roundedProgress = isComplete ? 100 : Math.min(bounded, 95);
  const canRevealResult = isComplete;
  const label = getProgressLabel(roundedProgress, canRevealResult);
  const noteStates = getNoteStates(roundedProgress);

  return {
    canRevealResult,
    label,
    noteStates,
    roundedProgress,
  };
}
