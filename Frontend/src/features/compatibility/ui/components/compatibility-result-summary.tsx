type Props = {
  description: string;
  tags: string[];
};

export function CompatibilityResultSummary({ description, tags }: Props) {
  return (
    <div className="p-5">
      <div
        className="rounded-sm border-2 border-black bg-[rgb(253,251,240)] p-4"
        style={{ boxShadow: "2px 2px 0 #0d0d0d" }}
      >
        <div className="mb-1.5 text-[10px] font-bold tracking-widest text-[#7a7570]">
          궁합 총평
        </div>
        <p className="text-[13px] leading-[1.85] text-[rgba(13,13,13,0.72)]">
          {description || "궁합 분석 결과를 확인해주세요."}
        </p>
        {tags.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="rounded-full border-[1.5px] border-[#d4d0c8] bg-[#F8F6F1] px-2.5 py-0.5 text-[11px] font-bold text-[#7a7570]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
