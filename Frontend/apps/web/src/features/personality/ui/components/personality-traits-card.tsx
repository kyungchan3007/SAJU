import { AlertCircle, Sparkles } from "lucide-react";

type Props = {
  strengths?: Array<string>;
  weaknesses?: Array<string>;
};

export function PersonalityTraitsCard({ strengths, weaknesses }: Props) {
  const validStrengths = (strengths ?? []).filter(
    (s): s is string => typeof s === "string" && s.length > 0,
  );
  const validWeaknesses = (weaknesses ?? []).filter(
    (w): w is string => typeof w === "string" && w.length > 0,
  );

  if (validStrengths.length === 0 && validWeaknesses.length === 0) return null;

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F0FDF4]">
          <Sparkles size={13} color="#22C55E" />
        </div>
        <span className="text-[13px] font-black">강점 · 약점</span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {validStrengths.length > 0 && (
          <div className="rounded-2xl border border-green-100 bg-[#F0FDF4] p-4">
            <div className="mb-3 flex items-center gap-1.5">
              <Sparkles size={11} className="shrink-0 text-green-600" />
              <span className="text-[11px] font-black text-green-700">강점</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {validStrengths.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center rounded-full border border-green-200 bg-white px-2.5 py-1 text-[12px] font-bold text-green-700"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {validWeaknesses.length > 0 && (
          <div className="rounded-2xl border border-orange-100 bg-[#FFF5F0] p-4">
            <div className="mb-3 flex items-center gap-1.5">
              <AlertCircle size={11} className="shrink-0 text-orange-500" />
              <span className="text-[11px] font-black text-orange-600">
                주의할 점
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {validWeaknesses.map((w) => (
                <span
                  key={w}
                  className="inline-flex items-center rounded-full border border-orange-200 bg-white px-2.5 py-1 text-[12px] font-bold text-orange-600"
                >
                  {w}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
