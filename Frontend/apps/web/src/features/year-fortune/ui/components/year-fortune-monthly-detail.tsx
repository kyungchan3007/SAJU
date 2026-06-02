import type { MonthDisplay } from "@/features/year-fortune/model/yearFortune";

type Props = {
  active: MonthDisplay;
};

export function YearFortuneMonthlyDetail({ active }: Props) {
  return (
    <div
      className="rounded-sm border-2 border-[#0d0d0d] p-[14px_16px]"
      style={{ background: "rgb(253,251,245)" }}
    >
      <div className="mb-2 flex items-center gap-2 font-display text-[15px]">
        <span>{active.month}월</span>
        <span
          className="inline-block rounded-full border-2 border-[#0d0d0d] px-2 py-0.5 text-[10px] font-bold"
          style={{ background: "#FDE047", boxShadow: "1px 1px 0 #0d0d0d" }}
        >
          {active.tagText}
        </span>
      </div>
      <p className="text-[13px] leading-[1.8] text-[rgba(13,13,13,.68)]">
        {active.fortune}
      </p>
    </div>
  );
}
