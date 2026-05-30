"use client";

import { motion } from "framer-motion";

const SPARKS = [
  { angle: 0,   color: "#5956E9", size: 10 },
  { angle: 40,  color: "#FBBF24", size: 8  },
  { angle: 80,  color: "#F472B6", size: 11 },
  { angle: 120, color: "#34D399", size: 9  },
  { angle: 160, color: "#7C3AED", size: 10 },
  { angle: 200, color: "#F87171", size: 8  },
  { angle: 240, color: "#60A5FA", size: 11 },
  { angle: 280, color: "#FBBF24", size: 9  },
  { angle: 320, color: "#A78BFA", size: 10 },
  { angle: 360, color: "#34D399", size: 8  },
];

const TRAILS = [
  { angle: 20,  color: "#5956E9", len: 70 },
  { angle: 70,  color: "#FBBF24", len: 85 },
  { angle: 110, color: "#F472B6", len: 65 },
  { angle: 150, color: "#7C3AED", len: 80 },
  { angle: 190, color: "#34D399", len: 72 },
  { angle: 230, color: "#F87171", len: 90 },
  { angle: 270, color: "#60A5FA", len: 68 },
  { angle: 310, color: "#A78BFA", len: 78 },
];

function toXY(angle: number, distance: number) {
  const rad = (angle * Math.PI) / 180;
  return {
    x: Math.cos(rad) * distance,
    y: Math.sin(rad) * distance,
  };
}

type Props = {
  emoji?: string;
  size?: number;
};

/**
 * 이모지 자체에서 폭죽이 터지는 애니메이션 컴포넌트.
 * 사용처: 관심 신청 완료, 결과 공개 등 축하 화면.
 */
export function FireworkEmoji({ emoji = "🎉", size = 72 }: Props) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size * 3, height: size * 3 }}>

      {/* 불꽃 선 (trail) */}
      {TRAILS.map((trail, i) => {
        const { x, y } = toXY(trail.angle, trail.len);
        return (
          <motion.div
            key={`trail-${i}`}
            className="absolute rounded-full"
            style={{
              width: 3,
              height: 3,
              background: trail.color,
              top: "50%",
              left: "50%",
              marginTop: -1.5,
              marginLeft: -1.5,
              transformOrigin: "center",
            }}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
            animate={{
              x: [0, x * 0.4, x],
              y: [0, y * 0.4, y],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 0.7,
              delay: 0.1 + i * 0.02,
              ease: [0.2, 0, 0.8, 1],
            }}
          />
        );
      })}

      {/* 불꽃 파편 (dot) */}
      {SPARKS.map((spark, i) => {
        const dist = 55 + (i % 3) * 18;
        const { x, y } = toXY(spark.angle, dist);
        return (
          <motion.div
            key={`spark-${i}`}
            className="absolute rounded-full"
            style={{
              width: spark.size,
              height: spark.size,
              background: spark.color,
              top: "50%",
              left: "50%",
              marginTop: -spark.size / 2,
              marginLeft: -spark.size / 2,
            }}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
            animate={{
              x: [0, x * 0.6, x],
              y: [0, y * 0.6, y],
              opacity: [0, 1, 1, 0],
              scale: [0, 1.2, 1, 0],
            }}
            transition={{
              duration: 0.85,
              delay: 0.05 + i * 0.03,
              ease: "easeOut",
            }}
          />
        );
      })}

      {/* 중앙 폭발 링 */}
      <motion.div
        className="absolute rounded-full border-4"
        style={{
          borderColor: "#5956E9",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        initial={{ width: 0, height: 0, opacity: 0.8, marginTop: 0, marginLeft: 0 }}
        animate={{ width: size * 2, height: size * 2, opacity: 0, marginTop: -size, marginLeft: -size }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      {/* 이모지 */}
      <motion.span
        className="relative z-10 select-none"
        style={{ fontSize: size }}
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: [0, 1.3, 1], rotate: [- 20, 10, 0] }}
        transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
      >
        {emoji}
      </motion.span>
    </div>
  );
}
