"use client";

import type { PropsWithChildren } from "react";
import { useEffect, useRef, useState } from "react";
import { AdProgressGate } from "@/shared/ui/ad-progress-gate.client";

export function RewardedResultGate({ children }: PropsWithChildren) {
  const [isResultRevealed, setIsResultRevealed] = useState(false);
  const mountCountRef = useRef(0);

  useEffect(() => {
    mountCountRef.current += 1;
    console.log("[RewardedResultGate] mount", {
      mountCount: mountCountRef.current,
      isResultRevealed,
    });

    return () => {
      console.log("[RewardedResultGate] unmount", {
        mountCount: mountCountRef.current,
        isResultRevealed,
      });
    };
  }, []);

  useEffect(() => {
    console.log("[RewardedResultGate] reveal state changed", {
      isResultRevealed,
    });
  }, [isResultRevealed]);

  if (!isResultRevealed) {
    return (
      <AdProgressGate
        progress={100}
        isComplete
        onRevealResult={() => {
          console.log("[RewardedResultGate] reveal button clicked");
          setIsResultRevealed(true);
        }}
      />
    );
  }

  return <>{children}</>;
}
