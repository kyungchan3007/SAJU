"use client";

import { useEffect, useRef, useState } from "react";

import type {
  LocationCoordinate,
  LocationSearchPlace,
} from "@/entities/location";
import { getKeywordEmoji } from "@/features/location-search/model/locationHelpers";
import { env } from "@/shared/config/env";

const DEFAULT_CENTER = {
  latitude: 37.566826,
  longitude: 126.9786567,
};

type KakaoMapProps = {
  places: LocationSearchPlace[];
  currentLocation: LocationCoordinate | null;
  selectedKeyword: string | null;
  selectedPlace: LocationSearchPlace | null;
  onSelectPlace: (place: LocationSearchPlace) => void;
};

type KakaoLatLng = {
  getLat(): number;
  getLng(): number;
};

type KakaoMapInstance = {
  setCenter(latlng: KakaoLatLng): void;
  setBounds(bounds: KakaoLatLngBounds): void;
};

type KakaoLatLngBounds = {
  extend(latlng: KakaoLatLng): void;
};

type KakaoOverlay = {
  setMap(map: KakaoMapInstance | null): void;
  setZIndex(zIndex: number): void;
};

type KakaoMarker = {
  setMap(map: KakaoMapInstance | null): void;
};

type KakaoMaps = {
  load(callback: () => void): void;
  LatLng: new (latitude: number, longitude: number) => KakaoLatLng;
  LatLngBounds: new () => KakaoLatLngBounds;
  Map: new (
    container: HTMLElement,
    options: { center: KakaoLatLng; level: number },
  ) => KakaoMapInstance;
  Marker: new (options: {
    map: KakaoMapInstance;
    position: KakaoLatLng;
    title?: string;
  }) => KakaoMarker;
  CustomOverlay: new (options: {
    clickable?: boolean;
    content: HTMLElement;
    map: KakaoMapInstance;
    position: KakaoLatLng;
    xAnchor?: number;
    yAnchor?: number;
    zIndex?: number;
  }) => KakaoOverlay;
};

declare global {
  interface Window {
    kakao?: {
      maps: KakaoMaps;
    };
    __kakaoMapsLoadPromise?: Promise<void>;
  }
}

function loadKakaoMaps(appKey: string): Promise<void> {
  if (window.kakao?.maps?.Map) {
    return Promise.resolve();
  }

  if (window.__kakaoMapsLoadPromise) {
    return window.__kakaoMapsLoadPromise;
  }

  window.__kakaoMapsLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${encodeURIComponent(appKey)}&autoload=false`;
    script.async = true;
    script.onload = () => {
      window.kakao?.maps.load(resolve);
    };
    script.onerror = () => {
      window.__kakaoMapsLoadPromise = undefined;
      reject(new Error("Failed to load Kakao Maps SDK."));
    };
    document.head.appendChild(script);
  });

  return window.__kakaoMapsLoadPromise;
}

function createLatLng(place: LocationSearchPlace) {
  return new window.kakao!.maps.LatLng(place.latitude, place.longitude);
}

function createCoordinateLatLng(coordinate: LocationCoordinate) {
  return new window.kakao!.maps.LatLng(
    coordinate.latitude,
    coordinate.longitude,
  );
}

function createPlaceMarkerContent({
  emoji,
  isActive,
  place,
}: {
  emoji: string;
  isActive: boolean;
  place: LocationSearchPlace;
}) {
  const button = document.createElement("button");
  button.type = "button";
  button.setAttribute("aria-label", place.name);
  button.style.display = "flex";
  button.style.flexDirection = "column";
  button.style.alignItems = "center";
  button.style.border = "0";
  button.style.background = "transparent";
  button.style.cursor = "pointer";
  button.style.transform = isActive ? "scale(1.12)" : "scale(1)";
  button.style.transition = "transform 120ms ease";

  const pin = document.createElement("span");
  pin.textContent = emoji;
  pin.style.display = "grid";
  pin.style.placeItems = "center";
  pin.style.width = "36px";
  pin.style.height = "36px";
  pin.style.border = "2px solid #0d0d0d";
  pin.style.borderRadius = "999px";
  pin.style.background = isActive ? "#FFE500" : "#FDFCF8";
  pin.style.boxShadow = "2px 2px 0 #0d0d0d";
  pin.style.fontSize = "18px";

  const label = document.createElement("span");
  label.textContent = place.name.length > 8
    ? `${place.name.slice(0, 8)}...`
    : place.name;
  label.style.marginTop = "4px";
  label.style.maxWidth = "96px";
  label.style.overflow = "hidden";
  label.style.textOverflow = "ellipsis";
  label.style.whiteSpace = "nowrap";
  label.style.borderRadius = "999px";
  label.style.background = isActive ? "#FFE500" : "#0d0d0d";
  label.style.color = isActive ? "#0d0d0d" : "#fff";
  label.style.padding = "2px 6px";
  label.style.fontSize = "10px";
  label.style.fontWeight = "700";
  label.style.boxShadow = "1px 1px 0 #0d0d0d";

  button.append(pin, label);

  return button;
}

function createCurrentLocationContent() {
  const marker = document.createElement("div");
  marker.setAttribute("aria-label", "내 위치");
  marker.style.width = "18px";
  marker.style.height = "18px";
  marker.style.borderRadius = "999px";
  marker.style.background = "#3b82f6";
  marker.style.border = "3px solid #fff";
  marker.style.boxShadow =
    "0 0 0 4px rgba(59,130,246,.28), 2px 2px 0 #0d0d0d";

  return marker;
}

export function KakaoMap({
  places,
  currentLocation,
  selectedKeyword,
  selectedPlace,
  onSelectPlace,
}: KakaoMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<KakaoMapInstance | null>(null);
  const placeOverlaysRef = useRef<KakaoOverlay[]>([]);
  const currentLocationOverlayRef = useRef<KakaoOverlay | null>(null);
  const [status, setStatus] = useState<"idle" | "ready" | "error">(() =>
    env.NEXT_PUBLIC_KAKAO_MAP_KEY ? "idle" : "error",
  );

  useEffect(() => {
    if (!env.NEXT_PUBLIC_KAKAO_MAP_KEY) {
      return;
    }

    let isMounted = true;

    loadKakaoMaps(env.NEXT_PUBLIC_KAKAO_MAP_KEY)
      .then(() => {
        if (!isMounted || !containerRef.current || mapRef.current) {
          return;
        }

        const centerPlace = selectedPlace ?? places[0];
        const center = centerPlace
          ? createLatLng(centerPlace)
          : currentLocation
            ? createCoordinateLatLng(currentLocation)
          : new window.kakao!.maps.LatLng(
              DEFAULT_CENTER.latitude,
              DEFAULT_CENTER.longitude,
            );

        mapRef.current = new window.kakao!.maps.Map(containerRef.current, {
          center,
          level: 5,
        });
        setStatus("ready");
      })
      .catch(() => {
        if (isMounted) {
          setStatus("error");
        }
      });

    return () => {
      isMounted = false;
    };
  }, [currentLocation, places, selectedPlace]);

  useEffect(() => {
    const map = mapRef.current;

    if (!map || status !== "ready") {
      return;
    }

    placeOverlaysRef.current.forEach((marker) => marker.setMap(null));
    placeOverlaysRef.current = [];
    currentLocationOverlayRef.current?.setMap(null);
    currentLocationOverlayRef.current = null;

    if (currentLocation) {
      currentLocationOverlayRef.current = new window.kakao!.maps.CustomOverlay({
        content: createCurrentLocationContent(),
        map,
        position: createCoordinateLatLng(currentLocation),
        xAnchor: 0.5,
        yAnchor: 0.5,
        zIndex: 30,
      });
    }

    if (places.length === 0) {
      if (currentLocation) {
        map.setCenter(createCoordinateLatLng(currentLocation));
      }
      return;
    }

    const bounds = new window.kakao!.maps.LatLngBounds();
    const emoji = selectedKeyword ? getKeywordEmoji(selectedKeyword) : "📍";

    if (currentLocation) {
      bounds.extend(createCoordinateLatLng(currentLocation));
    }

    places.forEach((place) => {
      const position = createLatLng(place);
      const isActive = selectedPlace?.id === place.id;
      bounds.extend(position);

      const content = createPlaceMarkerContent({
        emoji,
        isActive,
        place,
      });
      content.addEventListener("click", () => {
        onSelectPlace(place);
      });

      const overlay = new window.kakao!.maps.CustomOverlay({
        clickable: true,
        content,
        map,
        position,
        xAnchor: 0.5,
        yAnchor: 1,
        zIndex: isActive ? 20 : 10,
      });

      placeOverlaysRef.current.push(overlay);
    });

    if (selectedPlace) {
      map.setCenter(createLatLng(selectedPlace));
      return;
    }

    if (places.length === 1) {
      map.setCenter(createLatLng(places[0]));
      return;
    }

    map.setBounds(bounds);

    return () => {
      placeOverlaysRef.current.forEach((marker) => marker.setMap(null));
      placeOverlaysRef.current = [];
      currentLocationOverlayRef.current?.setMap(null);
      currentLocationOverlayRef.current = null;
    };
  }, [
    currentLocation,
    onSelectPlace,
    places,
    selectedKeyword,
    selectedPlace,
    status,
  ]);

  useEffect(() => {
    if (!selectedPlace || !mapRef.current || status !== "ready") {
      return;
    }

    mapRef.current.setCenter(createLatLng(selectedPlace));
  }, [selectedPlace, status]);

  return (
    <>
      <div ref={containerRef} className="h-full w-full" />
      {status === "idle" && (
        <div className="absolute inset-0 grid place-items-center bg-[#e8f0e8] text-sm font-semibold text-[#7a7570]">
          카카오 지도를 불러오는 중입니다.
        </div>
      )}
      {status === "error" && (
        <div className="absolute inset-0 grid place-items-center bg-[#F8F6F1] px-6 text-center text-sm font-semibold text-[#7a7570]">
          카카오 지도를 불러올 수 없습니다.
        </div>
      )}
    </>
  );
}
