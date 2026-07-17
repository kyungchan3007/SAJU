"use client";

import type { PropsWithChildren } from "react";
import { useState } from "react";
import { AdProgressGate } from "@/shared/ui/ad-progress-gate.client";
import { FortuneGateLayout } from "@/shared/ui/fortune-page-layout";

export function RewardedResultGate({ children }: PropsWithChildren) {
  const [isResultRevealed, setIsResultRevealed] = useState(false);

  if (!isResultRevealed) {
    return (
      <FortuneGateLayout>
        <AdProgressGate
          progress={100}
          isComplete
          onRevealResult={() => {
            setIsResultRevealed(true);
          }}
        />
      </FortuneGateLayout>
    );
  }

  return <>{children}</>;
}
