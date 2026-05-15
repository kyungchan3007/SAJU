"use client";

import { useEffect, useState } from "react";

type UseAdGateParams = {
  enabled: boolean;
  isContentReady: boolean;
};

export function useAdGate({ enabled, isContentReady }: UseAdGateParams) {
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setIsUnlocked(false);
    }
  }, [enabled]);

  return {
    isUnlocked,
    shouldShowGate: enabled && (!isUnlocked || !isContentReady),
    unlock: () => setIsUnlocked(true),
  };
}
