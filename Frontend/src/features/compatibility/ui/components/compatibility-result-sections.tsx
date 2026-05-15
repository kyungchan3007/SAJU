import type { CompatibilitySectionDisplay } from "@/features/compatibility/model/compatibility";

type Props = {
  sections: CompatibilitySectionDisplay[];
};

export function CompatibilityResultSections({ sections }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {sections.map((section, i) => (
        <div key={i} className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <span className="w-4 shrink-0 text-[16px]">{section.icon}</span>
            <span className="text-[12px] font-bold leading-none">{section.label}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div
              className="flex-1 overflow-hidden rounded-full border border-[#d4d0c8] bg-[rgba(13,13,13,.08)]"
              style={{ height: 9 }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${section.score}%`,
                  background: section.color,
                }}
              />
            </div>
            <span className="w-6 shrink-0 text-right text-[11px] font-bold text-[#7a7570]">
              {section.score}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
