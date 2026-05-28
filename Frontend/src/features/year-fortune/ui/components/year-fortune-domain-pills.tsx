import type { DomainDisplay } from "@/features/year-fortune/model/yearFortune";

type Props = {
  domains: DomainDisplay[];
  activeIdx: number;
  onSelect: (index: number) => void;
};

export function YearFortuneDomainPills({ domains, activeIdx, onSelect }: Props) {
  return (
    <div className="mb-6 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {domains.map((d, i) => {
        const isActive = i === activeIdx;
        return (
          <button
            key={d.key}
            type="button"
            onClick={() => onSelect(i)}
            className={`inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-5 py-[9px] text-[13px] font-bold whitespace-nowrap transition-all ${
              isActive
                ? "bg-[#5956E9] text-white shadow-[0_4px_12px_rgba(89,86,233,0.25)]"
                : "border-[1.5px] border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#5956E9] hover:text-[#5956E9]"
            }`}
          >
            {d.icon} {d.label}
          </button>
        );
      })}
    </div>
  );
}
