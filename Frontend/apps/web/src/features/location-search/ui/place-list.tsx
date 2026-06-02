import { useCallback } from "react";

import type { LocationSearchPlace } from "@/entities/location";
import {
  formatDistance,
  getKeywordEmoji,
} from "@/features/location-search/model/locationHelpers";
import { LOCATION_PLACES_PER_PAGE } from "@/features/location-search/model/locationConstants";
import { cn } from "@/shared/lib/utils";

type PlaceListProps = {
  places: LocationSearchPlace[];
  selectedKeyword: string | null;
  selectedPlace: LocationSearchPlace | null;
  currentIndex: number;
  onChangeIndex: (index: number) => void;
  onSelectPlace: (place: LocationSearchPlace) => void;
  isLoading: boolean;
  isError: boolean;
};

export function PlaceList({
  places,
  selectedKeyword,
  selectedPlace,
  currentIndex,
  onChangeIndex,
  onSelectPlace,
  isLoading,
  isError,
}: PlaceListProps) {
  const keywordEmoji = selectedKeyword ? getKeywordEmoji(selectedKeyword) : "📍";
  const totalPages = Math.max(
    1,
    Math.ceil(places.length / LOCATION_PLACES_PER_PAGE),
  );
  const maxPageStart = Math.max(
    (totalPages - 1) * LOCATION_PLACES_PER_PAGE,
    0,
  );
  const currentPageStart = Math.min(
    Math.max(currentIndex, 0),
    maxPageStart,
  );
  const visiblePlaces = places.slice(
    currentPageStart,
    currentPageStart + LOCATION_PLACES_PER_PAGE,
  );
  const currentPage =
    Math.floor(currentPageStart / LOCATION_PLACES_PER_PAGE) + 1;

  const handlePrevious = useCallback(() => {
    onChangeIndex(Math.max(0, currentPageStart - LOCATION_PLACES_PER_PAGE));
  }, [currentPageStart, onChangeIndex]);

  const handleNext = useCallback(() => {
    onChangeIndex(
      Math.min(
        maxPageStart,
        currentPageStart + LOCATION_PLACES_PER_PAGE,
      ),
    );
  }, [currentPageStart, maxPageStart, onChangeIndex]);

  return (
    <div
      className="flex flex-col rounded-sm border-2 border-black bg-white lg:min-h-0 lg:flex-1"
      style={{ boxShadow: "4px 4px 0 #0d0d0d" }}
    >
      <div className="flex items-center gap-2 border-b-2 border-black bg-[#F0EDE6] px-4 py-2.5">
        <span>📍</span>
        <span className="font-['Jua',sans-serif] text-sm">
          {selectedKeyword ? `근처 ${selectedKeyword}` : "장소 목록"}
        </span>
        <span className="ml-auto text-[11px] text-[#7a7570]">카카오 검색 기준</span>
      </div>

      {isLoading && (
        <div className="flex flex-1 flex-col justify-center gap-3 px-4 py-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-8 w-8 animate-pulse rounded-full bg-[#F0EDE6]" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3 w-3/4 animate-pulse rounded bg-[#F0EDE6]" />
                <div className="h-2.5 w-1/2 animate-pulse rounded bg-[#F0EDE6]" />
              </div>
            </div>
          ))}
        </div>
      )}

      {isError && !isLoading && (
        <div className="grid flex-1 place-items-center px-4 py-8 text-center text-sm text-[#7a7570]">
          <div>
            <p className="text-lg">⚠️</p>
            <p className="mt-1">장소 검색 중 오류가 발생했습니다.</p>
            <p className="mt-0.5 text-xs">잠시 후 다시 시도해 주세요.</p>
          </div>
        </div>
      )}

      {!isLoading && !isError && places.length === 0 && selectedKeyword && (
        <div className="grid flex-1 place-items-center px-4 py-8 text-center text-sm text-[#7a7570]">
          <div>
            <p className="text-lg">🔍</p>
            <p className="mt-1">검색 결과가 없습니다.</p>
            <p className="mt-0.5 text-xs">다른 키워드를 선택해 보세요.</p>
          </div>
        </div>
      )}

      {!isLoading && !isError && !selectedKeyword && (
        <div className="grid flex-1 place-items-center px-4 py-8 text-center text-sm text-[#7a7570]">
          <div>
            <p className="text-lg">👆</p>
            <p className="mt-1">위의 키워드를 선택하면 장소가 표시됩니다.</p>
          </div>
        </div>
      )}

      {!isLoading && !isError && visiblePlaces.length > 0 && (
        <>
        <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-4">
          {visiblePlaces.map((place) => {
            const isSelected = place.id === selectedPlace?.id;

            return (
              <button
                key={place.id}
                type="button"
                onClick={() => onSelectPlace(place)}
                className={cn(
                  "flex min-h-0 w-full items-center gap-3 rounded-sm border-2 border-black p-3 text-left transition-colors",
                  isSelected ? "bg-[#FFE500]" : "bg-white hover:bg-[#F0EDE6]",
                )}
                style={{ boxShadow: "2px 2px 0 #0d0d0d" }}
              >
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-black text-base"
                  style={{
                    background: isSelected ? "#fff" : "#F0EDE6",
                    boxShadow: "1px 1px 0 #0d0d0d",
                  }}
                >
                  {keywordEmoji}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="min-w-0 flex-1 truncate text-[13px] font-bold">
                      {place.name}
                    </p>
                    {place.distance !== undefined && (
                      <span className="shrink-0 text-[11px] font-bold text-black">
                        {formatDistance(place.distance)}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 truncate text-[11px] text-[#7a7570]">
                    {place.roadAddressName || place.addressName}
                  </p>
                  {place.categoryName && (
                    <p className="mt-0.5 truncate text-[10px] font-semibold text-[#7a7570]">
                      {place.categoryName}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between border-t-2 border-black bg-[#F0EDE6] px-4 py-3">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentPageStart === 0}
            className="flex h-9 w-9 items-center justify-center rounded-sm border-2 border-black bg-white text-sm font-bold disabled:cursor-not-allowed disabled:opacity-35"
            style={{ boxShadow: "2px 2px 0 #0d0d0d" }}
            aria-label="이전 장소"
          >
            ←
          </button>

          <span className="text-xs font-bold text-[#7a7570]">
            {currentPage} / {totalPages}
          </span>

          <button
            type="button"
            onClick={handleNext}
            disabled={currentPage >= totalPages}
            className="flex h-9 w-9 items-center justify-center rounded-sm border-2 border-black bg-white text-sm font-bold disabled:cursor-not-allowed disabled:opacity-35"
            style={{ boxShadow: "2px 2px 0 #0d0d0d" }}
            aria-label="다음 장소"
          >
            →
          </button>
        </div>
        </>
      )}
    </div>
  );
}
