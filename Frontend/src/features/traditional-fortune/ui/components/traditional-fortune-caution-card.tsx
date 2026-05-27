import { splitParagraphs } from "@/features/traditional-fortune/ui/utils/split-paragraphs";

type Props = {
  text: string;
};

export function TraditionalFortuneCautionCard({ text }: Props) {
  const paragraphs = splitParagraphs(text);

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-50">
          <span className="text-[13px]">⚠️</span>
        </div>
        <span className="text-[13px] font-black">주의 사항</span>
      </div>
      <div className="rounded-2xl bg-[#FFF5F5] p-4 border border-red-100">
        {paragraphs.map((p, i) => (
          <p
            key={i}
            className="text-[13px] leading-[1.85] text-gray-600"
            style={i > 0 ? { marginTop: 10 } : {}}
          >
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}
