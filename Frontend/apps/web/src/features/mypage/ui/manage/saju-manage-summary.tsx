const HANJA: Record<string, string> = {
  수: "水",
  목: "木",
  화: "火",
  토: "土",
  금: "金",
};

type Props = {
  summaryZodiac?: string | null;
  summaryStrength?: string | null;
  geokguk?: string | null;
  yongshinPrimary?: string | null;
  yongshinSecondary?: string | null;
};

export function SajuManageSummary({
  summaryZodiac,
  summaryStrength,
  geokguk,
  yongshinPrimary,
  yongshinSecondary,
}: Props) {
  const hasSummary = summaryZodiac ?? summaryStrength ?? geokguk ?? yongshinPrimary;
  if (!hasSummary) return null;

  const rows = [
    { label: "일주", value: summaryZodiac },
    { label: "신강/신약", value: summaryStrength },
    { label: "격국", value: geokguk },
    {
      label: "용신",
      value: yongshinPrimary
        ? `${yongshinPrimary} (${HANJA[yongshinPrimary] ?? ""})`
        : null,
    },
    {
      label: "보조 용신",
      value: yongshinSecondary
        ? `${yongshinSecondary} (${HANJA[yongshinSecondary] ?? ""})`
        : null,
    },
  ].filter((row): row is { label: string; value: string } => !!row.value);

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-2">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-full"
          style={{ background: "#F0EEFF" }}
        >
          <span className="text-[15px]">✨</span>
        </div>
        <span className="text-base font-black">나의 명식 요약</span>
      </div>

      <div className="divide-y divide-slate-50">
        {rows.map((row, idx) => (
          <div
            key={row.label}
            className={`flex items-center justify-between py-3 text-sm ${
              idx === 0 ? "pt-0" : ""
            }`}
          >
            <span className="text-slate-400">{row.label}</span>
            <span className="font-bold text-gray-900">{row.value}</span>
          </div>
        ))}
      </div>

      <p className="mt-3 text-[11px] text-slate-400">
        ※ 정보를 수정하면 사주 요약이 새로 계산됩니다.
      </p>
    </div>
  );
}
