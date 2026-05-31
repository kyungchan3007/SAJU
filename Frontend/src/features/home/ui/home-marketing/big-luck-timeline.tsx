import {
  BIG_LUCK_STEPS,
  BIG_LUCK_TIMELINE_DOTS,
} from "@/features/home/model/model";
import type { HomeBigLuckStep } from "@/features/home/type/type";

export function BigLuckTimeline() {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative hidden items-center px-6 sm:flex">
        <div
          className="absolute inset-x-0 h-px"
          style={{
            background:
              "linear-gradient(to right, #D8D4F8, #5956E9, #5956E9, #D8D4F8, #D8D4F8, #D8D4F8)",
          }}
        />
        <div className="relative flex w-full justify-between">
          {BIG_LUCK_TIMELINE_DOTS.map((dot, index) => (
            <BigLuckTimelineDot
              key={`${dot.active}-${index}`}
              active={dot.active}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* 모바일: 3열 그리드 */}
      <div className="grid grid-cols-2 gap-2 sm:hidden">
        {BIG_LUCK_STEPS.map((step) => (
          <BigLuckCard key={step.age} step={step} />
        ))}
        <div className="flex items-center justify-center rounded-xl border border-[#E8E4F8] bg-white py-4">
          <span className="text-lg font-bold text-gray-200">···</span>
        </div>
      </div>

      {/* sm+: 기존 가로 스크롤 */}
      <div className="hidden gap-2 overflow-x-auto pb-1 sm:flex">
        {BIG_LUCK_STEPS.map((step) => (
          <BigLuckCard key={step.age} step={step} />
        ))}
        <div className="flex min-w-[60px] flex-1 items-center justify-center rounded-xl border border-[#E8E4F8] bg-white">
          <span className="text-lg font-bold text-gray-200">···</span>
        </div>
      </div>
    </div>
  );
}

function BigLuckTimelineDot({
  active,
  index,
}: {
  active: boolean;
  index: number;
}) {
  if (active) {
    return (
      <div
        className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#5956E9] bg-white"
        style={{ marginTop: "-6px" }}
      >
        <div className="h-2 w-2 rounded-full bg-[#5956E9]" />
      </div>
    );
  }

  return (
    <div
      className="h-2 w-2 rounded-full"
      style={{
        marginTop: "-1px",
        background: index < 2 ? "#C4C0F0" : index === 2 ? "#5956E9" : "#D8D4F8",
      }}
    />
  );
}

function BigLuckCard({ step }: { step: HomeBigLuckStep }) {
  if (step.active) {
    return (
      <div
        className="relative flex-1 rounded-xl px-2 py-4 text-center shadow-lg sm:min-w-[80px]"
        style={{ background: "#5956E9" }}
      >
        <div className="mb-2 mt-1 text-[10px] text-white/70">{step.age}</div>
        <div className="mb-1 font-serif text-xl font-black text-white">
          {step.hanja}
        </div>
        <div className="text-[10px] text-white/80">{step.kor}</div>
        <div className="mt-1 text-[10px] text-white/50">{step.year}</div>
      </div>
    );
  }

  return (
    <div
      className="flex-1 rounded-xl border border-[#E8E4F8] bg-white px-2 py-4 text-center sm:min-w-[72px]"
      style={{ opacity: step.opacity ? step.opacity / 100 : 1 }}
    >
      <div className="mb-2 text-[10px] text-gray-400">{step.age}</div>
      <div
        className="mb-1 font-serif text-base font-black"
        style={{ color: "#5956E9" }}
      >
        {step.hanja}
      </div>
      <div className="text-[10px] text-gray-400">{step.kor}</div>
      <div className="mt-1 text-[10px] text-gray-300">{step.year}</div>
    </div>
  );
}
