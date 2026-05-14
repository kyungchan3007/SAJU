import { splitParagraphs } from "@/features/traditional-fortune/ui/utils/split-paragraphs";

type Props = {
  text: string;
};

export function TraditionalFortuneCautionCard({ text }: Props) {
  const paragraphs = splitParagraphs(text);

  return (
    <div
      className="overflow-hidden rounded-md border-2 border-black bg-[#FFFEF9]"
      style={{ boxShadow: "3px 3px 0 #0d0d0d" }}
    >
      <div className="border-b-2 border-black bg-[rgb(240,238,232)] px-4 py-3">
        <h3 className="font-display text-[14px]">주의 사항</h3>
      </div>
      <div className="p-4">
        <div
          className="rounded-sm border-2 border-black bg-[rgb(253,251,240)] p-4"
          style={{ boxShadow: "2px 2px 0 #0d0d0d" }}
        >
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
      </div>
    </div>
  );
}
