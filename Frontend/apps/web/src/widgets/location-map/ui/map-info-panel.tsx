import { ExternalLink } from "lucide-react";

import type { LocationSearchPlace } from "@/entities/location";
import {
  formatDistance,
  getKeywordEmoji,
} from "@/features/location-search/model/locationHelpers";

type MapInfoPanelProps = {
  place: LocationSearchPlace;
  selectedKeyword: string | null;
  onClose: () => void;
};

export function MapInfoPanel({ place, selectedKeyword, onClose }: MapInfoPanelProps) {
  const emoji = selectedKeyword ? getKeywordEmoji(selectedKeyword) : "📍";
  const kakaoRouteUrl = `https://map.kakao.com/link/to/${encodeURIComponent(
    place.name,
  )},${place.latitude},${place.longitude}`;

  return (
    <div
      className="absolute bottom-3 left-3 right-3 z-30 flex flex-wrap items-center gap-3 rounded-sm border-2 border-black bg-white px-4 py-3"
      style={{ boxShadow: "4px 4px 0 #0d0d0d" }}
    >
      <span className="shrink-0 text-2xl">{emoji}</span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold">{place.name}</p>
        <p className="truncate text-[11px] text-[#7a7570]">
          {place.roadAddressName || place.addressName}
          {place.distance !== undefined && ` · ${formatDistance(place.distance)}`}
        </p>
      </div>
      <a
        href={kakaoRouteUrl}
        target="_blank"
        rel="noreferrer"
        className="ml-auto inline-flex h-9 shrink-0 items-center gap-1.5 rounded-sm border-2 border-black bg-[#FFE500] px-3 text-xs font-bold text-black transition-transform hover:-translate-y-0.5"
        style={{ boxShadow: "2px 2px 0 #0d0d0d" }}
      >
        카카오맵 길찾기
        <ExternalLink className="h-3.5 w-3.5" aria-hidden />
      </a>
      <button
        type="button"
        onClick={onClose}
        className="shrink-0 p-1 text-lg leading-none text-[#7a7570] transition-colors hover:text-black"
        aria-label="닫기"
      >
        ✕
      </button>
    </div>
  );
}
