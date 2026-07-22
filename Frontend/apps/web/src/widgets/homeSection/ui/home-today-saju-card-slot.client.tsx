"use client";

import dynamic from "next/dynamic";

const HomeTodaySajuCard = dynamic(
  () =>
    import("@/features/home/ui/home-today-saju-card.client").then(
      (module) => module.HomeTodaySajuCard,
    ),
  {
    ssr: false,
    loading: () => <HomeTodaySajuCardFallback />,
  },
);

export function HomeTodaySajuCardSlot() {
  return <HomeTodaySajuCard />;
}

function HomeTodaySajuCardFallback() {
  return (
    <div
      className="flex flex-col gap-3 rounded-2xl p-5 backdrop-blur-xl"
      style={{
        background: "rgba(15,10,40,0.50)",
        border: "1px solid rgba(255,255,255,0.15)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
      }}
    >
      <p className="text-xs font-bold text-white">나의 오행 분석</p>
      <p className="text-sm text-white/50">
        오행 데이터를 불러오는 중이에요.
      </p>
    </div>
  );
}
