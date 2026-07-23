import { BIG_LUCK_STEPS } from "@/features/home/model/model";
import type { HomeBigLuckStep } from "@/features/home/type/type";

export function BigLuckTimeline() {
  return (
    <div className="flex flex-col gap-0">
      {/* 모바일: 2열 그리드 */}
      <div className="grid grid-cols-2 gap-2 sm:hidden">
        {BIG_LUCK_STEPS.map((step) => (
          <BigLuckCard key={step.age} step={step} />
        ))}
        <BigLuckMoreCard />
      </div>

      {/* sm+: 가로 스크롤 */}
      <div className="hidden gap-2 overflow-x-auto pb-1 sm:flex">
        {BIG_LUCK_STEPS.map((step) => (
          <BigLuckCard key={step.age} step={step} />
        ))}
        <BigLuckMoreCard />
      </div>
    </div>
  );
}

function BigLuckCard({ step }: { step: HomeBigLuckStep }) {
  const isActive = !!step.active;

  return (
    <div className="flex flex-1 flex-col sm:min-w-[80px]">
      {/* Progress segment */}
      <div
        className="mb-2 w-full rounded-full"
        style={{
          height: 8,
          background: isActive
            ? "linear-gradient(90deg, #6C63FF 0%, #5B5CF0 100%)"
            : "#ECECF3",
        }}
      />

      {/* Card */}
      <div
        className="flex flex-1 flex-col items-center rounded-2xl px-2 py-4 text-center"
        style={{
          background: isActive
            ? "linear-gradient(135deg, #6C63FF 0%, #5B5CF0 100%)"
            : "#fff",
          boxShadow: isActive
            ? "0 10px 30px rgba(91,92,240,0.25)"
            : "0 10px 30px rgba(0,0,0,0.06)",
        }}
      >
        <div
          className="mb-2 text-[10px]"
          style={{ color: isActive ? "rgba(255,255,255,0.78)" : "#6B7280" }}
        >
          {step.age}
        </div>
        <div
          className="mb-1 font-serif text-xl font-black"
          style={{ color: isActive ? "#fff" : "#4B5563" }}
        >
          {step.hanja}
        </div>
        <div
          className="text-[10px]"
          style={{ color: isActive ? "rgba(255,255,255,0.85)" : "#6B7280" }}
        >
          {step.kor}
        </div>
        <div
          className="mt-1 text-[10px]"
          style={{ color: isActive ? "rgba(255,255,255,0.72)" : "#6B7280" }}
        >
          {step.year}
        </div>
      </div>
    </div>
  );
}

function BigLuckMoreCard() {
  return (
    <div className="flex flex-1 flex-col sm:min-w-[60px]">
      {/* 비활성 segment */}
      <div
        className="mb-2 w-full rounded-full"
        style={{ height: 8, background: "#ECECF3" }}
      />
      <div
        className="flex flex-1 items-center justify-center rounded-2xl"
        style={{
          background: "#fff",
          boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
          minHeight: 80,
        }}
      >
        <span className="text-lg font-bold text-gray-500">···</span>
      </div>
    </div>
  );
}
