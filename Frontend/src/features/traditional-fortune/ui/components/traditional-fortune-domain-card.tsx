import type {
  DomainDisplay,
  DomainKey,
} from "@/features/traditional-fortune/model/traditionalFortune";

type Props = {
  domains: DomainDisplay[];
  activeDomain: DomainKey;
  activeDomainData: DomainDisplay | null;
  onSelectDomain: (key: DomainKey) => void;
};

export function TraditionalFortuneDomainCard({
  domains,
  activeDomain,
  activeDomainData,
  onSelectDomain,
}: Props) {
  return (
    <div
      className="overflow-hidden rounded-md border-2 border-black bg-[#FFFEF9]"
      style={{ boxShadow: "3px 3px 0 #0d0d0d" }}
    >
      <div className="flex items-center justify-between border-b-2 border-black bg-[rgb(240,238,232)] px-4 py-3">
        <h3 className="font-display text-[14px]">분야별 상세 해설</h3>
      </div>
      <div className="flex gap-1.5 overflow-x-auto border-b-2 border-black px-3.5 py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {domains.map((d) => {
          const isActive = activeDomain === d.key;
          return (
            <button
              key={d.key}
              type="button"
              onClick={() => onSelectDomain(d.key)}
              className={`inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-full border-2 border-black px-3 py-1.5 text-[11px] font-bold transition-all [box-shadow:2px_2px_0_#0d0d0d] ${
                isActive
                  ? "-translate-x-px -translate-y-px bg-[#0d0d0d] text-white [box-shadow:3px_3px_0_#0d0d0d]"
                  : "bg-[#FFFEF9] text-[#0d0d0d] hover:-translate-x-px hover:-translate-y-px hover:[box-shadow:3px_3px_0_#0d0d0d]"
              }`}
            >
              {d.icon} {d.label}
            </button>
          );
        })}
      </div>

      {activeDomainData && (
        <div className="flex flex-col gap-3 p-4">
          <div className="flex items-center gap-3">
            <span
              className="font-display text-[40px] leading-none"
              style={{ color: activeDomainData.color }}
            >
              {activeDomainData.score}
            </span>
            <div className="flex-1">
              <div className="h-2 overflow-hidden rounded-full border border-[rgba(13,13,13,.1)] bg-[rgba(13,13,13,.08)]">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${activeDomainData.score}%`,
                    background: activeDomainData.color,
                  }}
                />
              </div>
              <div className="mt-1 text-[11px] text-[rgba(13,13,13,0.45)]">
                100점 만점
              </div>
            </div>
          </div>

          {activeDomainData.sections.map((section, i) => (
            <div
              key={i}
              className="rounded-sm border-2 border-black bg-[rgb(253,251,240)] p-4"
              style={{ boxShadow: "2px 2px 0 #0d0d0d" }}
            >
              <div className="mb-1.5 text-[10px] font-bold tracking-widest text-[rgba(13,13,13,0.45)]">
                {section.title}
              </div>
              <p className="text-[13px] leading-[1.85] text-[rgba(13,13,13,0.72)]">
                {section.text}
              </p>
            </div>
          ))}

          {activeDomainData.keyPoint && (
            <div
              className="rounded-sm border-2 border-black p-3.5"
              style={{
                background: activeDomainData.bg,
                boxShadow: "2px 2px 0 #0d0d0d",
              }}
            >
              <div className="mb-1.5 text-[10px] font-bold">핵심 포인트</div>
              <p className="text-[13px] leading-[1.75]">
                {activeDomainData.keyPoint}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
