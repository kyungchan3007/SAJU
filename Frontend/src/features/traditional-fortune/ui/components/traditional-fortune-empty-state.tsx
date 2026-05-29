import { Sparkles } from "lucide-react";

type Props = {
  message: string;
};

export function TraditionalFortuneEmptyState({ message }: Props) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-3xl border border-slate-100 bg-white py-14 text-center shadow-sm">
      <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-[#F0EEFF]">
        <Sparkles size={28} color="#5956E9" />
      </div>
      <span className="text-[17px] font-extrabold text-[#111827]">데이터가 없습니다</span>
      <p className="text-[13px] leading-relaxed text-[#6B7280]">
        {message}
      </p>
    </div>
  );
}
