import {
  getNoteStates,
  getProgressLabel,
} from "@/shared/model/ad-progress/model";

export type AdProgressNoteState = "pending" | "active" | "done";

type UseAdProgressGateParams = {
  progress: number;
  isComplete: boolean;
};

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
