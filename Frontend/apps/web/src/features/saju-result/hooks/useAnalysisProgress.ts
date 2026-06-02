"use client";

import { useEffect, useState } from "react";

export function useAnalysisProgress(isLoading: boolean): number {
  const [progress, setProgress] = useState(isLoading ? 8 : 100);

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    const startTimer = window.setTimeout(() => {
      setProgress(8);
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
  }, [isLoading]);

  return isLoading ? progress : 100;
}
