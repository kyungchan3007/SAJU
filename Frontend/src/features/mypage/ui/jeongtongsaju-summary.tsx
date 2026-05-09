import { SajuSectionHeading } from "@/shared/ui/saju-section-heading/saju-section-heading";

type Traits = {
  summaryZodiac?: string;
  summaryStrength?: string;
  geokguk?: string;
  summaryPillars?: string;
};

type Props = { traits: Traits };

export function JeongtongsajuSummary({ traits }: Props) {
  return (
    <div
      className="rounded-sm border-2 border-black bg-[#FDFCF8]"
      style={{ boxShadow: "4px 4px 0 #0d0d0d" }}
    >
      <SajuSectionHeading helpKey="jeongtongsajuSummary" />
      <div className="p-5">
        <div className="flex flex-wrap gap-2">
          {traits.summaryZodiac && (
            <span
              className="inline-flex items-center gap-1 rounded-full border-2 border-black bg-yellow-300 px-3.5 py-1 text-xs font-bold"
              style={{ boxShadow: "2px 2px 0 #0d0d0d" }}
            >
              {traits.summaryZodiac}
            </span>
          )}
          {traits.summaryStrength && (
            <span
              className="inline-flex items-center gap-1 rounded-full border-2 border-black bg-[#FDFCF8] px-3.5 py-1 text-xs font-bold"
              style={{ boxShadow: "2px 2px 0 #0d0d0d" }}
            >
              {traits.summaryStrength}
            </span>
          )}
          {traits.geokguk && (
            <span
              className="inline-flex items-center gap-1 rounded-full border-2 border-black bg-[#FDFCF8] px-3.5 py-1 text-xs font-bold"
              style={{ boxShadow: "2px 2px 0 #0d0d0d" }}
            >
              {traits.geokguk}
            </span>
          )}
        </div>
        {traits.summaryPillars && (
          <p className="mt-3 text-[13px] leading-relaxed text-[#0d0d0d]/60">
            {traits.summaryPillars}
          </p>
        )}
      </div>
    </div>
  );
}
