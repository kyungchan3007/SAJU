import type { LocationSearchPlace } from "@/entities/location";

const COORDINATE_TOLERANCE = 0.000001;

export function getLocationGroupFromParams(searchParams: URLSearchParams) {
  return searchParams.get("group");
}

export function findSelectedPlaceFromParams({
  effectiveSelectedKeyword,
  groupFromUrl,
  places,
  searchParams,
}: {
  effectiveSelectedKeyword: string | null;
  groupFromUrl: string | null;
  places: LocationSearchPlace[];
  searchParams: URLSearchParams;
}) {
  if (groupFromUrl !== effectiveSelectedKeyword) {
    return null;
  }

  const placeName = searchParams.get("place");
  const lat = Number(searchParams.get("lat"));
  const lng = Number(searchParams.get("lng"));

  if (!placeName || !Number.isFinite(lat) || !Number.isFinite(lng)) {
    return null;
  }

  return (
    places.find(
      (place) =>
        place.name === placeName &&
        Math.abs(place.latitude - lat) < COORDINATE_TOLERANCE &&
        Math.abs(place.longitude - lng) < COORDINATE_TOLERANCE,
    ) ?? null
  );
}

export function createKeywordLocationParams(keyword: string) {
  const nextParams = new URLSearchParams();
  nextParams.set("group", keyword);

  return nextParams;
}

export function createSelectedPlaceLocationParams({
  effectiveSelectedKeyword,
  place,
  searchParams,
}: {
  effectiveSelectedKeyword: string | null;
  place: LocationSearchPlace;
  searchParams: URLSearchParams;
}) {
  const nextParams = new URLSearchParams(searchParams.toString());

  if (effectiveSelectedKeyword) {
    nextParams.set("group", effectiveSelectedKeyword);
  }

  nextParams.set("lat", String(place.latitude));
  nextParams.set("lng", String(place.longitude));
  nextParams.set("place", place.name);

  return nextParams;
}

export function createClosedPlaceLocationParams(searchParams: URLSearchParams) {
  const nextParams = new URLSearchParams(searchParams.toString());
  nextParams.delete("lat");
  nextParams.delete("lng");
  nextParams.delete("place");

  return nextParams;
}
