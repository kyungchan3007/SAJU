"use client";

import { useEffect, useState } from "react";

type AnalysisProgressState = {
  progress: number;
  shouldShowPending: boolean;
};

export function useAnalysisProgress(isLoading: boolean): AnalysisProgressState {
  const [progress, setProgress] = useState(isLoading ? 8 : 100);
  const [shouldShowPending, setShouldShowPending] = useState(isLoading);

  useEffect(() => {
    if (!isLoading) {
      if (!shouldShowPending) {
        return;
      }

      const completeTimer = window.setTimeout(() => {
        setProgress(100);
      }, 0);
      const doneTimer = window.setTimeout(() => {
        setShouldShowPending(false);
      }, 450);

      return () => {
        window.clearTimeout(completeTimer);
        window.clearTimeout(doneTimer);
      };
    }

    const startTimer = window.setTimeout(() => {
      setShouldShowPending(true);
      setProgress((current) => Math.max(current, 8));
    }, 0);

    const progressTimer = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 95) {
          return current;
        }

        if (current < 35) {
          return Math.min(current + 7, 35);
        }

        if (current < 75) {
          return Math.min(current + 4, 75);
        }

        if (current < 90) {
          return Math.min(current + 2, 90);
        }

        return Math.min(current + 1, 95);
      });
    }, 520);

    return () => {
      window.clearTimeout(startTimer);
      window.clearInterval(progressTimer);
    };
  }, [isLoading, shouldShowPending]);

  return {
    progress,
    shouldShowPending,
  };
}
