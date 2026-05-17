"use client";

import dynamic from "next/dynamic";

import type {
  LocationCoordinate,
  LocationSearchPlace,
} from "@/entities/location";
import { MapInfoPanel } from "@/widgets/location-map/ui/map-info-panel";

const KakaoMap = dynamic(
  () =>
    import("@/widgets/location-map/ui/kakao-map.client").then(
      (module) => module.KakaoMap,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 grid place-items-center bg-[#e8f0e8] text-sm font-semibold text-[#7a7570]">
        카카오 지도를 불러오는 중입니다.
      </div>
    ),
  },
);

type LocationMapPanelProps = {
  places: LocationSearchPlace[];
  currentLocation: LocationCoordinate | null;
  selectedKeyword: string | null;
  selectedPlace: LocationSearchPlace | null;
  onSelectPlace: (place: LocationSearchPlace) => void;
  onClosePlace: () => void;
};

export function LocationMapPanel({
  places,
  currentLocation,
  selectedKeyword,
  selectedPlace,
  onSelectPlace,
  onClosePlace,
}: LocationMapPanelProps) {
  return (
    <div
      className="overflow-hidden rounded-sm border-2 border-black bg-white lg:sticky lg:top-5 lg:flex lg:h-full lg:flex-col"
      style={{ boxShadow: "4px 4px 0 #0d0d0d" }}
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between border-b-2 border-black bg-[#F0EDE6] px-4 py-2.5">
        <div className="flex items-center gap-2 font-['Jua',sans-serif] text-sm">
          <span>🗺</span>
          <span>카카오 지도</span>
        </div>
        <span className="text-[11px] text-[#7a7570]">
          {places.length > 0
            ? `${places.length}개 장소`
            : "장소를 선택하면 마커가 표시됩니다"}
        </span>
      </div>

      {/* 지도 영역 */}
      <div
        className="relative h-[360px] overflow-hidden sm:h-[460px] lg:min-h-0 lg:flex-1"
        style={{ background: "#e8f0e8" }}
        id="kakao-map-container"
      >
        <KakaoMap
          places={places}
          currentLocation={currentLocation}
          selectedKeyword={selectedKeyword}
          selectedPlace={selectedPlace}
          onSelectPlace={onSelectPlace}
        />

        {/* 선택 장소 정보 패널 */}
        {selectedPlace && (
          <MapInfoPanel
            place={selectedPlace}
            selectedKeyword={selectedKeyword}
            onClose={onClosePlace}
          />
        )}
      </div>
    </div>
  );
}
