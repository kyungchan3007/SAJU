"use client";

import { useState } from "react";

type UseAdGateParams = {
  enabled: boolean;
  isContentReady: boolean;
  resetKey?: unknown;
};

type UnlockState = {
  isUnlocked: boolean;
  resetKey: unknown;
};

export function useAdGate({
  enabled,
  isContentReady,
  resetKey,
}: UseAdGateParams) {
  const [unlockState, setUnlockState] = useState<UnlockState>({
    isUnlocked: false,
    resetKey,
  });

  const isUnlocked =
    enabled &&
    unlockState.isUnlocked &&
    Object.is(unlockState.resetKey, resetKey);

  return {
    isUnlocked,
    shouldShowGate: enabled && (!isUnlocked || !isContentReady),
    unlock: () => setUnlockState({ isUnlocked: true, resetKey }),
  };
}
