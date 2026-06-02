import type { MonthDisplay } from "@/features/year-fortune/model/yearFortune";

type Props = {
  months: MonthDisplay[];
  activeMonth: number;
  onSelectMonth: (month: number) => void;
};

export function YearFortuneMonthlyGrid({
  months,
  activeMonth,
  onSelectMonth,
}: Props) {
  return (
    <div className="grid grid-cols-6 gap-[6px]">
      {months.map((m) => {
        const isActive = m.month === activeMonth;
        return (
          <button
            key={m.month}
            type="button"
            onClick={() => onSelectMonth(m.month)}
            className="cursor-pointer rounded-sm border-2 border-[#0d0d0d] px-1 py-2 text-center transition-all"
            style={
              isActive
                ? {
                    background: "#0d0d0d",
                    color: "white",
                    transform: "translate(-1px,-1px)",
                    boxShadow: "3px 3px 0 #0d0d0d",
                  }
                : { background: "#FFFEF9", boxShadow: "2px 2px 0 #0d0d0d" }
            }
          >
            <div
              className="text-[10px] font-semibold"
              style={{
                color: isActive ? "rgba(255,255,255,.6)" : "rgba(13,13,13,.45)",
              }}
            >
              {m.month}월
            </div>
            <div className="my-0.5 text-[15px]">{m.emoji}</div>
            <div
              className="text-[7px] tracking-[1px]"
              style={{ color: isActive ? "#FDE047" : "#F59E0B" }}
            >
              운세
            </div>
          </button>
        );
      })}
    </div>
  );
}
