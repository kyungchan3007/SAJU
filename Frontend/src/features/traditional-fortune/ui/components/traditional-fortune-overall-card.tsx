import type { TraditionalFortuneResponse } from "@/generated/api";
import { splitParagraphs } from "@/features/traditional-fortune/ui/utils/split-paragraphs";

type Props = {
  data: TraditionalFortuneResponse;
};

export function TraditionalFortuneOverallCard({ data }: Props) {
  const paragraphs = splitParagraphs(data.overallFortune);

  return (
    <div
      className="overflow-hidden rounded-md border-2 border-black bg-[#FFFEF9]"
      style={{ boxShadow: "3px 3px 0 #0d0d0d" }}
    >
      <div className="flex items-center justify-between border-b-2 border-black bg-[rgb(240,238,232)] px-4 py-3">
        <h3 className="font-display text-[14px]">올해 총운</h3>
        <span className="text-[10px] text-[rgba(13,13,13,0.45)]">
          정통사주 연간 해설
        </span>
      </div>
      <div className="flex flex-col gap-3 p-4">
        {paragraphs.length > 0 && (
          <div
            className="rounded-sm border-2 border-black bg-[rgb(253,251,240)] p-4"
            style={{ boxShadow: "2px 2px 0 #0d0d0d" }}
          >
            <div className="mb-1.5 text-[10px] font-bold tracking-widest text-[rgba(13,13,13,0.45)]">
              총운 해설
            </div>
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-[13px] leading-[1.85] text-[rgba(13,13,13,0.72)]"
                style={i > 0 ? { marginTop: 10 } : {}}
              >
                {p}
              </p>
            ))}
          </div>
        )}

        {(data.favorablePeriods || data.cautiousPeriods) && (
          <div className="grid grid-cols-2 gap-2">
            {data.favorablePeriods && (
              <div
                className="rounded-sm border-2 border-black bg-[#f0fdf4] p-2.5"
                style={{ boxShadow: "2px 2px 0 #0d0d0d" }}
              >
                <div className="mb-1 text-[10px] font-bold text-[#16a34a]">
                  유리한 시기
                </div>
                <p className="text-[11px] leading-relaxed">
                  {data.favorablePeriods}
                </p>
              </div>
            )}
            {data.cautiousPeriods && (
              <div
                className="rounded-sm border-2 border-black bg-[#fef2f2] p-2.5"
                style={{ boxShadow: "2px 2px 0 #0d0d0d" }}
              >
                <div className="mb-1 text-[10px] font-bold text-[#dc2626]">
                  주의 시기
                </div>
                <p className="text-[11px] leading-relaxed">
                  {data.cautiousPeriods}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
