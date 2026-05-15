import type { DomainDisplay } from "@/features/year-fortune/model/yearFortune";

type Props = {
  domains: DomainDisplay[];
  activeIdx: number;
  onSelect: (index: number) => void;
};

export function YearFortuneDomainPills({ domains, activeIdx, onSelect }: Props) {
  return (
    <div className="flex gap-[5px] overflow-x-auto border-b-2 border-[#0d0d0d] px-[14px] py-[10px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {domains.map((d, i) => {
        const isActive = i === activeIdx;
        return (
          <button
            key={d.key}
            type="button"
            onClick={() => onSelect(i)}
            className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-full border-2 border-[#0d0d0d] px-3 py-[5px] text-[11px] font-bold whitespace-nowrap transition-all"
            style={
              isActive
                ? {
                    background: "#0d0d0d",
                    color: "white",
                    transform: "translate(-1px,-1px)",
                    boxShadow: "2px 2px 0 #0d0d0d",
                  }
                : { background: "#FFFEF9", boxShadow: "2px 2px 0 #0d0d0d" }
            }
          >
            {d.icon} {d.label}
          </button>
        );
      })}
    </div>
  );
}
