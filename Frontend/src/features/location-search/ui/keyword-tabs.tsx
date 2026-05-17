import { getKeywordEmoji } from "@/features/location-search/model/locationHelpers";
import { cn } from "@/shared/lib/utils";

type KeywordTabsProps = {
  keywords: string[];
  selectedKeyword: string | null;
  onSelect: (keyword: string) => void;
};

export function KeywordTabs({ keywords, selectedKeyword, onSelect }: KeywordTabsProps) {
  if (keywords.length === 0) return null;

  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {keywords.map((keyword) => {
        const isActive = keyword === selectedKeyword;
        return (
          <button
            key={keyword}
            type="button"
            onClick={() => onSelect(keyword)}
            className={cn(
              "flex min-w-[72px] flex-1 flex-col items-center gap-1 rounded-sm border-2 border-black px-2 py-3 text-center transition-all",
              isActive
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-[#F0EDE6]",
            )}
            style={{
              boxShadow: isActive ? "4px 4px 0 #0d0d0d" : "2px 2px 0 #0d0d0d",
              transform: isActive ? "translate(-1px, -1px)" : undefined,
            }}
          >
            <span className="text-xl leading-none">
              {getKeywordEmoji(keyword)}
            </span>
            <span className="text-[11px] font-bold leading-tight">{keyword}</span>
          </button>
        );
      })}
    </div>
  );
}
