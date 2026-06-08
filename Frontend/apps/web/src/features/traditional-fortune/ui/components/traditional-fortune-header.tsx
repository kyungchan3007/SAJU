import { Sparkles } from "lucide-react";

type Props = {
  yearDescription?: string;
};

export function TraditionalFortuneHeader({ yearDescription }: Props) {
  return (
    <div
      className="rounded-3xl p-5 shadow-[0_4px_20px_rgba(89,86,233,0.25)]"
      style={{ background: "linear-gradient(to right, #5956E9, #7C3AED)" }}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold text-white">
              정통사주 분석
            </span>
          </div>
          <div className="text-saju-section font-black text-white">
            정통사주 풀이
          </div>
          {yearDescription && (
            <div className="text-saju-body mt-0.5 text-white/70">
              {yearDescription}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
