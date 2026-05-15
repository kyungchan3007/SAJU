import type { DomainDisplay } from "@/features/year-fortune/model/yearFortune";

type Props = {
  active: DomainDisplay;
};

export function YearFortuneDomainContent({ active }: Props) {
  return (
    <div className="p-[18px]">
      {active.content ? (
        <div
          className="rounded-sm border-2 border-[#0d0d0d] p-[14px_16px]"
          style={{ background: "rgb(253,251,240)", boxShadow: "2px 2px 0 #0d0d0d" }}
        >
          {active.title && (
            <div className="mb-1.5 text-[10px] font-bold tracking-[.1em] text-[rgba(13,13,13,.45)]">
              {active.title}
            </div>
          )}
          <p className="whitespace-pre-line text-[13px] leading-[1.85] text-[rgba(13,13,13,.72)]">
            {active.content}
          </p>
        </div>
      ) : (
        <p className="text-[13px] text-[rgba(13,13,13,.45)]">내용이 없습니다.</p>
      )}
    </div>
  );
}
