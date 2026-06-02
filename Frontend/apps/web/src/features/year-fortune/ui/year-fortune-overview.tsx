type Props = {
  title: string | undefined;
  content: string | undefined;
  targetYear: number;
};

export function YearFortuneOverview({ title, content, targetYear }: Props) {
  if (!content) return null;

  return (
    <div
      className="overflow-hidden rounded-md border-2 border-[#0d0d0d] bg-[#FFFEF9]"
      style={{ boxShadow: "3px 3px 0 #0d0d0d" }}
    >
      <div className="flex items-center justify-between border-b-2 border-[#0d0d0d] bg-[rgb(240,238,232)] px-[18px] py-[13px]">
        <h3 className="font-display text-[14px]">🌟 {targetYear}년 나에게는</h3>
        <span className="text-[10px] text-[rgba(13,13,13,.45)]">연간 총평 풀이</span>
      </div>
      <div className="p-[18px]">
        <div
          className="rounded-sm border-2 border-[#0d0d0d] p-[14px_16px]"
          style={{ background: "rgb(253,251,240)", boxShadow: "2px 2px 0 #0d0d0d" }}
        >
          {title && (
            <div className="mb-1.5 text-[10px] font-bold tracking-[.1em] text-[rgba(13,13,13,.45)]">
              {title}
            </div>
          )}
          <p className="whitespace-pre-line text-[13px] leading-[1.85] text-[rgba(13,13,13,.72)]">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}
