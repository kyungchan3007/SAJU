import { Info } from "lucide-react";

import { type SajuSectionHelpKey } from "@/shared/model/saju-section-help/model";
import { getSajuSectionHelp } from "@/shared/model/saju-section-help/utils";

type Props = {
  helpKey: SajuSectionHelpKey;
};

export function SajuSectionHeading({ helpKey }: Props) {
  const help = getSajuSectionHelp(helpKey);

  return (
    <div className="flex items-center justify-between gap-3 border-b-2 border-black bg-[#F0EDE6] px-5 py-3 font-['Jua',sans-serif] text-[15px]">
      <span>{help.title}</span>
      <span className="group relative inline-flex">
        <button
          type="button"
          aria-label={`${help.title} 설명 보기`}
          className="inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-black bg-[#FDFCF8] text-[#0d0d0d] outline-none transition-colors hover:bg-yellow-300 focus-visible:bg-yellow-300"
        >
          <Info size={14} strokeWidth={2.5} />
        </button>
        <span className="pointer-events-none absolute right-0 top-8 z-20 hidden w-[260px] rounded-sm border-2 border-black bg-[#FDFCF8] p-3 font-sans text-[12px] font-medium leading-relaxed text-[#0d0d0d] shadow-[3px_3px_0_#0d0d0d] group-focus-within:block group-hover:block">
          {help.description}
        </span>
      </span>
    </div>
  );
}
