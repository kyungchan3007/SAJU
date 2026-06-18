"use client";

import type { PropsWithChildren } from "react";
import { useState } from "react";
import { AdProgressGate } from "@/shared/ui/ad-progress-gate.client";

export function RewardedResultGate({ children }: PropsWithChildren) {
  const [isResultRevealed, setIsResultRevealed] = useState(false);

  if (!isResultRevealed) {
    return (
      <AdProgressGate
        progress={100}
        isComplete
        onRevealResult={() => {
          setIsResultRevealed(true);
        }}
      />
    );
  }

  return <>{children}</>;
}
