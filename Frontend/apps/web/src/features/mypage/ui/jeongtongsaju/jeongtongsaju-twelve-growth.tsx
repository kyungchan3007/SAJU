import { SAJU_PILLAR_TWELVE_GROWTH_COLUMNS } from "@/shared/model/saju-pillar/model";

export type TwelveGrowthInfo = {
  year?: { hanja: string; meaning: string; description: string };
  month?: { hanja: string; meaning: string; description: string };
  day?: { hanja: string; meaning: string; description: string };
  hour?: { hanja: string; meaning: string; description: string };
};

type Props = {
  twelveGrowthInfo: TwelveGrowthInfo;
  description?: string;
};

const COLUMN_COLORS: Record<
  string,
  { ring: string; bg: string; text: string }
> = {
  year: {
    ring: "border-[#C4BAFF]",
    bg: "bg-[#F0EEFF]",
    text: "text-[#5956E9]",
  },
  month: {
    ring: "border-green-200",
    bg: "bg-green-50",
    text: "text-green-700",
  },
  day: { ring: "border-red-200", bg: "bg-red-50", text: "text-red-600" },
  hour: {
    ring: "border-yellow-200",
    bg: "bg-yellow-50",
    text: "text-yellow-700",
  },
};

export function JeongtongsajuTwelveGrowth({
  twelveGrowthInfo,
  description,
}: Props) {
  return (
    <div className="rounded-3xl bg-white p-6 sm:border sm:border-gray-100 sm:shadow-[0_2px_16px_rgba(0,0,0,0.08)]">
      <div className="mb-5">
        <div className="flex items-baseline gap-2">
          <h2 className="text-[18px] font-bold text-gray-900">12운성 분석</h2>
          <span className="text-[13px] text-gray-400">
            각 기둥의 12운성 의미
          </span>
        </div>
        {description && (
          <p className="mt-2 text-[13px] leading-relaxed text-gray-500">
            {description}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
        {SAJU_PILLAR_TWELVE_GROWTH_COLUMNS.map(({ type, label, isMain }) => {
          const info = twelveGrowthInfo[type];
          const colors = COLUMN_COLORS[type] ?? COLUMN_COLORS.year;

          return (
            <div
              key={type}
              className={`flex flex-col items-center rounded-2xl border p-4 text-center ${
                isMain
                  ? "relative overflow-hidden border-red-100 bg-red-50/30"
                  : "border-gray-100 bg-gray-50/50"
              }`}
            >
              <span
                className={`mb-2.5 rounded-md border px-2 py-0.5 text-[11px] font-medium shadow-sm ${
                  isMain
                    ? "border-red-100 bg-white text-red-600"
                    : "border-gray-100 bg-white text-gray-500"
                }`}
              >
                {label}
              </span>
              <div
                className={`mb-3 flex h-14 w-14 items-center justify-center rounded-full border text-[22px] font-bold ${colors.ring} ${colors.bg}`}
                style={{ fontFamily: "'Noto Serif KR', serif" }}
              >
                <span className={colors.text}>{info?.hanja ?? "—"}</span>
              </div>
              <h3 className="mb-1.5 text-[13px] font-bold text-gray-900">
                {info?.meaning ?? "—"}
              </h3>
              {info?.description && (
                <p className="text-[11px] leading-relaxed text-gray-600">
                  {info.description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
