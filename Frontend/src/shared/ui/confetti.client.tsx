"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

const COLORS = ["#5956E9", "#7C3AED", "#A78BFA", "#FBBF24", "#F472B6", "#34D399", "#F87171"];

function burst(x: number, y: number, count = 80) {
  confetti({
    particleCount: count,
    startVelocity: 28,
    spread: 360,
    ticks: 60,
    origin: { x, y },
    colors: COLORS,
    shapes: ["circle", "square"],
    scalar: 0.9,
    gravity: 1.2,
    decay: 0.92,
  });
}

/**
 * 마운트 시 화면 중앙에서 폭죽이 터지는 애니메이션 컴포넌트.
 * 사용처: 관심 신청 완료, 결과 공개 등 축하가 필요한 화면.
 */
export function Confetti() {
  useEffect(() => {
    // 1차 — 중앙 큰 폭발
    burst(0.5, 0.4, 100);

    // 2차 — 약간 다른 위치에서 연속 폭발
    const t1 = setTimeout(() => burst(0.35, 0.45, 70), 300);
    const t2 = setTimeout(() => burst(0.65, 0.42, 70), 500);
    const t3 = setTimeout(() => burst(0.5,  0.35, 80), 750);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return null;
}
