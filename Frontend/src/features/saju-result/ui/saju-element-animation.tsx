interface Props {
  element: string;
}

export function SajuElementAnimation({ element }: Props) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-full">
      {element === "wood" && <WoodAnimation />}
      {element === "fire" && <FireAnimation />}
      {element === "earth" && <EarthAnimation />}
      {element === "metal" && <MetalAnimation />}
      {element === "water" && <WaterAnimation />}
    </div>
  );
}

/* ── 목(木) — 초록 나무 + 잎 떨어짐 ── */
function WoodAnimation() {
  return (
    <div className="relative h-full w-full" style={{ background: "#e8f5e0" }}>
      {/* 나무 기둥 */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        style={{
          width: 10,
          height: 32,
          background: "#7a5230",
          borderRadius: 3,
        }}
      />
      {/* 나뭇잎 덩어리 */}
      <div
        className="absolute"
        style={{
          width: 58,
          height: 52,
          background: "#4caf50",
          borderRadius: "50% 50% 45% 45%",
          bottom: 34,
          left: "50%",
          transform: "translateX(-50%)",
          border: "2px solid #388e3c",
          animation: "leaf-sway 3s ease-in-out infinite",
          transformOrigin: "bottom center",
        }}
      />
      {/* 작은 잎 덩어리 */}
      <div
        className="absolute"
        style={{
          width: 36,
          height: 32,
          background: "#66bb6a",
          borderRadius: "50%",
          bottom: 54,
          left: "50%",
          transform: "translateX(-70%)",
          border: "2px solid #388e3c",
          animation: "leaf-sway 3.5s ease-in-out infinite reverse",
          transformOrigin: "bottom center",
        }}
      />
      {/* 떨어지는 잎 1 */}
      <div
        style={{
          position: "absolute",
          width: 8,
          height: 12,
          background: "#81c784",
          borderRadius: "50% 0 50% 0",
          top: 20,
          left: "40%",
          animation: "leaf-fall 3s ease-in infinite",
          border: "1px solid #388e3c",
        }}
      />
      {/* 떨어지는 잎 2 */}
      <div
        style={{
          position: "absolute",
          width: 7,
          height: 10,
          background: "#a5d6a7",
          borderRadius: "0 50% 0 50%",
          top: 10,
          left: "60%",
          animation: "leaf-fall 4s ease-in 1.2s infinite",
          border: "1px solid #388e3c",
        }}
      />
      {/* 떨어지는 잎 3 */}
      <div
        style={{
          position: "absolute",
          width: 6,
          height: 9,
          background: "#c8e6c9",
          borderRadius: "50% 0 50% 0",
          top: 30,
          left: "55%",
          animation: "leaf-fall 3.5s ease-in 2.4s infinite",
          border: "1px solid #388e3c",
        }}
      />
    </div>
  );
}

/* ── 화(火) — 빨강/주황 불꽃 ── */
function FireAnimation() {
  return (
    <div className="relative h-full w-full" style={{ background: "#fff3e0" }}>
      {/* 불꽃 — 메인 */}
      <div
        style={{
          position: "absolute",
          bottom: 16,
          left: "50%",
          transform: "translateX(-50%)",
          width: 36,
          height: 56,
          background: "linear-gradient(to top, #e53935, #ff7043, #ffcc02)",
          borderRadius: "50% 50% 30% 30% / 60% 60% 40% 40%",
          animation: "flicker 1.2s ease-in-out infinite",
          transformOrigin: "bottom center",
        }}
      />
      {/* 불꽃 — 왼쪽 작은 것 */}
      <div
        style={{
          position: "absolute",
          bottom: 16,
          left: "calc(50% - 20px)",
          width: 22,
          height: 38,
          background: "linear-gradient(to top, #e53935, #ff7043)",
          borderRadius: "50% 50% 30% 30% / 60% 60% 40% 40%",
          animation: "flicker 1.5s ease-in-out 0.3s infinite",
          transformOrigin: "bottom center",
          opacity: 0.8,
        }}
      />
      {/* 불꽃 — 오른쪽 작은 것 */}
      <div
        style={{
          position: "absolute",
          bottom: 16,
          left: "calc(50% + 8px)",
          width: 20,
          height: 34,
          background: "linear-gradient(to top, #e53935, #ffb300)",
          borderRadius: "50% 50% 30% 30% / 60% 60% 40% 40%",
          animation: "flicker 1.3s ease-in-out 0.6s infinite",
          transformOrigin: "bottom center",
          opacity: 0.75,
        }}
      />
      {/* 불씨 바닥 */}
      <div
        style={{
          position: "absolute",
          bottom: 12,
          left: "50%",
          transform: "translateX(-50%)",
          width: 50,
          height: 10,
          background: "#bf360c",
          borderRadius: "50%",
          opacity: 0.5,
        }}
      />
    </div>
  );
}

/* ── 토(土) — 꽃 피어남 ── */
function EarthAnimation() {
  return (
    <div className="relative h-full w-full" style={{ background: "#fdf6ec" }}>
      {/* 땅 */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 28,
          background: "#8d6e63",
          borderTop: "2px solid #5d4037",
        }}
      />
      {/* 줄기 */}
      <div
        style={{
          position: "absolute",
          bottom: 26,
          left: "50%",
          transform: "translateX(-50%)",
          width: 4,
          background: "#558b2f",
          borderRadius: 2,
          animation: "grow-stem 1.2s ease-out forwards",
          height: 0,
        }}
      />
      {/* 꽃 중심 */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: "50%",
          transform: "translateX(-50%)",
          width: 16,
          height: 16,
          background: "#ffca28",
          borderRadius: "50%",
          border: "2px solid #f57f17",
          animation: "bloom 1.4s ease-out 0.8s both",
          zIndex: 2,
        }}
      />
      {/* 꽃잎들 */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <div
          key={deg}
          style={{
            position: "absolute",
            bottom: 62,
            left: "50%",
            width: 14,
            height: 22,
            background: i % 2 === 0 ? "#ef9a9a" : "#f48fb1",
            borderRadius: "50%",
            transformOrigin: "bottom center",
            transform: `translateX(-50%) rotate(${deg}deg) translateY(-10px)`,
            border: "1px solid #c62828",
            animation: `bloom 1.2s ease-out ${0.6 + i * 0.1}s both`,
          }}
        />
      ))}
    </div>
  );
}

/* ── 금(金) — 금빛 반짝임 ── */
function MetalAnimation() {
  const sparkles = [
    { top: 18, left: 30, size: 14, delay: "0s" },
    { top: 40, left: 72, size: 18, delay: "0.4s" },
    { top: 65, left: 20, size: 12, delay: "0.8s" },
    { top: 72, left: 65, size: 16, delay: "1.2s" },
    { top: 25, left: 55, size: 10, delay: "1.6s" },
    { top: 50, left: 45, size: 20, delay: "2s" },
  ];

  return (
    <div
      className="relative h-full w-full"
      style={{ background: "linear-gradient(135deg, #fff8e1, #fffde7)" }}
    >
      {sparkles.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animation: `sparkle 2.4s ease-in-out ${s.delay} infinite`,
          }}
        >
          {/* 십자 별 */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "#fdd835",
              clipPath:
                "polygon(50% 0%, 55% 40%, 100% 50%, 55% 60%, 50% 100%, 45% 60%, 0% 50%, 45% 40%)",
              filter: "drop-shadow(0 0 3px #f9a825)",
            }}
          />
        </div>
      ))}
      {/* 중앙 큰 금괴 느낌 */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 40,
          height: 28,
          background: "linear-gradient(135deg, #fdd835, #f9a825, #fdd835)",
          borderRadius: 6,
          border: "2px solid #f57f17",
          boxShadow: "2px 2px 0 #e65100",
          animation: "sparkle 3s ease-in-out 0.2s infinite",
        }}
      />
    </div>
  );
}

/* ── 수(水) — 찰랑찰랑 물 ── */
function WaterAnimation() {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #b3d9f7, #dceefb)" }}
    >
      {/* 물 본체 */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "-10%",
          width: "120%",
          height: "60%",
          background: "#1976d2",
          animation: "water-slosh 2.2s ease-in-out infinite",
          transformOrigin: "bottom center",
        }}
      >
        {/* 수면 웨이브 — 물 위에 얹혀서 좌우로 흐름 */}
        <div
          style={{
            position: "absolute",
            top: -18,
            left: 0,
            width: "200%",
            height: 22,
            animation: "wave-flow 1.8s linear infinite",
          }}
        >
          <svg
            viewBox="0 0 240 22"
            width="100%"
            height={22}
            preserveAspectRatio="none"
          >
            <path
              d="M0 12 Q20 2 40 12 Q60 22 80 12 Q100 2 120 12 Q140 22 160 12 Q180 2 200 12 Q220 22 240 12 L240 22 L0 22 Z"
              fill="#1976d2"
            />
          </svg>
        </div>
      </div>

      {/* 배 */}
      <div
        style={{
          position: "absolute",
          top: "38%",
          left: "50%",
          transform: "translateX(-50%)",
          animation: "boat-rock 3s ease-in-out infinite",
          transformOrigin: "bottom center",
        }}
      >
        <svg width="76" height="52" viewBox="0 0 76 52">
          {/* 돛대 */}
          <line
            x1="38"
            y1="2"
            x2="38"
            y2="28"
            stroke="#4e342e"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* 돛 — 오른쪽 */}
          <path d="M38 4 L58 20 L38 26Z" fill="#ef5350" />
          {/* 돛 — 왼쪽 */}
          <path d="M38 4 L18 20 L38 26Z" fill="#ffcdd2" opacity="0.85" />
          {/* 깃발 */}
          <path d="M38 2 L48 6 L38 10Z" fill="#ffee58" />
          {/* 갑판 */}
          <rect x="6" y="28" width="64" height="5" rx="2" fill="#8d6e63" />
          {/* 선체 */}
          <path d="M6 32 L70 32 L60 50 L16 50Z" fill="#5d4037" />
          {/* 선체 측면 줄 */}
          <line
            x1="18"
            y1="38"
            x2="58"
            y2="38"
            stroke="#795548"
            strokeWidth="1"
            opacity="0.6"
          />
          {/* 선체 테두리 */}
          <path
            d="M6 32 L70 32 L60 50 L16 50Z"
            fill="none"
            stroke="#3e2723"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* 양쪽 물보라 */}
      <div
        style={{
          position: "absolute",
          top: "57%",
          left: "14%",
          animation: "bubble-rise 2.4s ease-in infinite",
        }}
      >
        <svg width="14" height="8" viewBox="0 0 14 8">
          <path
            d="M0 7 Q3 2 7 5 Q11 2 14 7"
            fill="none"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div
        style={{
          position: "absolute",
          top: "57%",
          left: "68%",
          animation: "bubble-rise 2.4s ease-in 0.8s infinite",
        }}
      >
        <svg width="14" height="8" viewBox="0 0 14 8">
          <path
            d="M0 7 Q3 2 7 5 Q11 2 14 7"
            fill="none"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
