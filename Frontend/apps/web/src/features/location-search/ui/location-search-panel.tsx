import type { LocationSearchPlace } from "@/entities/location";
import { KeywordTabs } from "@/features/location-search/ui/keyword-tabs";
import { PlaceList } from "@/features/location-search/ui/place-list";
import { YongshinBanner } from "@/features/location-search/ui/yongshin-banner";

type LocationSearchPanelProps = {
  keywords: string[];
  strongestElement?: string;
  strongestScore?: number;
  keywordsLoading: boolean;
  keywordsError: boolean;
  selectedKeyword: string | null;
  onSelectKeyword: (keyword: string) => void;
  places: LocationSearchPlace[];
  placesLoading: boolean;
  placesError: boolean;
  selectedPlace: LocationSearchPlace | null;
  currentPlaceIndex: number;
  onChangePlaceIndex: (index: number) => void;
  onSelectPlace: (place: LocationSearchPlace) => void;
};

export function LocationSearchPanel({
  keywords,
  strongestElement,
  strongestScore,
  keywordsLoading,
  keywordsError,
  selectedKeyword,
  onSelectKeyword,
  places,
  placesLoading,
  placesError,
  selectedPlace,
  currentPlaceIndex,
  onChangePlaceIndex,
  onSelectPlace,
}: LocationSearchPanelProps) {
  return (
    <div className="flex flex-col gap-4 lg:h-full lg:min-h-0">
      <div className="shrink-0">
        <YongshinBanner
          strongestElement={strongestElement}
          strongestScore={strongestScore}
        />
      </div>

      {keywordsLoading && (
        <div className="flex shrink-0 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-20 flex-1 animate-pulse rounded-sm border-2 border-black bg-[#F0EDE6]"
            />
          ))}
        </div>
      )}

      {keywordsError && !keywordsLoading && (
        <div
          className="shrink-0 rounded-sm border-2 border-black bg-white px-4 py-3 text-sm text-[#7a7570]"
          style={{ boxShadow: "2px 2px 0 #0d0d0d" }}
        >
          ⚠️ 추천 키워드를 불러올 수 없습니다.
        </div>
      )}

      {!keywordsLoading && !keywordsError && keywords.length === 0 && (
        <div
          className="shrink-0 rounded-sm border-2 border-black bg-white px-4 py-3 text-sm text-[#7a7570]"
          style={{ boxShadow: "2px 2px 0 #0d0d0d" }}
        >
          추천 키워드가 없습니다.
        </div>
      )}

      {!keywordsLoading && keywords.length > 0 && (
        <div className="shrink-0">
          <KeywordTabs
            keywords={keywords}
            selectedKeyword={selectedKeyword}
            onSelect={onSelectKeyword}
          />
        </div>
      )}

      <PlaceList
        places={places}
        selectedKeyword={selectedKeyword}
        selectedPlace={selectedPlace}
        currentIndex={currentPlaceIndex}
        onChangeIndex={onChangePlaceIndex}
        onSelectPlace={onSelectPlace}
        isLoading={placesLoading}
        isError={placesError}
      />
    </div>
  );
}
