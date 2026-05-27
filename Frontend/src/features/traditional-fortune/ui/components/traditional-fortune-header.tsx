type Props = {
  targetYear?: number;
  yearDescription?: string;
};

export function TraditionalFortuneHeader({ targetYear, yearDescription }: Props) {
  return (
    <div
      className="rounded-3xl p-5 shadow-[0_4px_20px_rgba(89,86,233,0.25)]"
      style={{ background: "linear-gradient(to right, #5956E9, #7C3AED)" }}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold text-white">
              정통사주 풀이
            </span>
            {targetYear && (
              <span className="text-[11px] text-white/70">{targetYear}년</span>
            )}
          </div>
          <div className="text-[17px] font-black text-white">
            {targetYear ? `${targetYear}년 연간 운세 풀이` : "연간 운세 풀이"}
          </div>
          {yearDescription && (
            <div className="mt-0.5 text-[13px] text-white/70">{yearDescription}</div>
          )}
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-[22px]">
          📜
        </div>
      </div>
    </div>
  );
}
