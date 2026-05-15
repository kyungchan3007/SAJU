import type { CompatibilitySectionDisplay } from "@/features/compatibility/model/compatibility";

type Props = {
  sections: CompatibilitySectionDisplay[];
  activeSectionIndex: number;
  activeSection: CompatibilitySectionDisplay | undefined;
  onSelectSection: (index: number) => void;
};

export function CompatibilityResultDetailTabs({
  sections,
  activeSectionIndex,
  activeSection,
  onSelectSection,
}: Props) {
  return (
    <div className="mt-4 overflow-hidden rounded-sm border-2 border-black bg-[#FFFEF9]">
      <div className="flex gap-[6px] overflow-x-auto border-b-2 border-black px-3 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {sections.map((section, i) => {
          const isActive = i === activeSectionIndex;
          return (
            <button
              key={`${section.label}-${i}`}
              type="button"
              onClick={() => onSelectSection(i)}
              className="inline-flex shrink-0 cursor-pointer items-center gap-1 whitespace-nowrap rounded-full border-2 border-black px-3 py-[5px] text-[11px] font-bold transition-all"
              style={
                isActive
                  ? {
                      background: "#0d0d0d",
                      color: "white",
                      transform: "translate(-1px,-1px)",
                      boxShadow: "2px 2px 0 #0d0d0d",
                    }
                  : {
                      background: "#FFFEF9",
                      boxShadow: "2px 2px 0 #0d0d0d",
                    }
              }
            >
              {section.icon} {section.label}
            </button>
          );
        })}
      </div>

      <div className="p-3.5">
        {activeSection?.content ? (
          <div
            className="rounded-sm border-2 border-black bg-[rgb(253,251,240)] p-[12px_14px]"
            style={{ boxShadow: "2px 2px 0 #0d0d0d" }}
          >
            {activeSection.keyword && (
              <div className="mb-1.5 text-[10px] font-bold tracking-[.1em] text-[rgba(13,13,13,.45)]">
                {activeSection.keyword}
              </div>
            )}
            <p className="whitespace-pre-line text-[13px] leading-[1.8] text-[rgba(13,13,13,.72)]">
              {activeSection.content}
            </p>
          </div>
        ) : (
          <p className="text-[13px] text-[rgba(13,13,13,.45)]">아직 상세 풀이가 없어요.</p>
        )}
      </div>
    </div>
  );
}
