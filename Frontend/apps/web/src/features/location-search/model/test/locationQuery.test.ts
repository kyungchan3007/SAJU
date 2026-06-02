import {
  createClosedPlaceLocationParams,
  createKeywordLocationParams,
  createSelectedPlaceLocationParams,
  findSelectedPlaceFromParams,
  getLocationGroupFromParams,
} from "@/features/location-search/model/locationQuery";
import type { LocationSearchPlace } from "@/entities/location";
import { describe, expect, it } from "vitest";

const createPlace = (
  id: string,
  name: string,
  latitude: number,
  longitude: number,
): LocationSearchPlace => ({
  id,
  name,
  latitude,
  longitude,
  categoryName: "Cafe",
  addressName: "Seoul Address",
  roadAddressName: "Seoul Road",
  phone: "02-0000-0000",
  placeUrl: "https://place.example.com",
});

const places: LocationSearchPlace[] = [
  createPlace("1", "A Place", 37.5, 127.03),
  createPlace("2", "B Place", 37.6, 127.04),
];

describe("getLocationGroupFromParams", () => {
  it("returns group from url params", () => {
    const params = new URLSearchParams("group=cafe");
    expect(getLocationGroupFromParams(params)).toBe("cafe");
  });
});

describe("findSelectedPlaceFromParams", () => {
  it("returns null when group does not match selected keyword", () => {
    const params = new URLSearchParams("group=park&place=A Place&lat=37.5&lng=127.03");
    expect(
      findSelectedPlaceFromParams({
        effectiveSelectedKeyword: "cafe",
        groupFromUrl: "park",
        places,
        searchParams: params,
      }),
    ).toBeNull();
  });

  it("returns matched place when name and coordinates match", () => {
    const params = new URLSearchParams("group=cafe&place=A Place&lat=37.5&lng=127.03");
    expect(
      findSelectedPlaceFromParams({
        effectiveSelectedKeyword: "cafe",
        groupFromUrl: "cafe",
        places,
        searchParams: params,
      }),
    ).toEqual(places[0]);
  });

  it("returns null when required params are missing or invalid", () => {
    expect(
      findSelectedPlaceFromParams({
        effectiveSelectedKeyword: "cafe",
        groupFromUrl: "cafe",
        places,
        searchParams: new URLSearchParams("group=cafe&place=A Place&lat=abc&lng=127.03"),
      }),
    ).toBeNull();
  });
});

describe("query param builders", () => {
  it("creates keyword params with only group", () => {
    const params = createKeywordLocationParams("temple");
    expect(params.toString()).toBe("group=temple");
  });

  it("creates selected place params from existing params", () => {
    const params = createSelectedPlaceLocationParams({
      effectiveSelectedKeyword: "cafe",
      place: places[1],
      searchParams: new URLSearchParams("foo=bar"),
    });

    expect(params.get("foo")).toBe("bar");
    expect(params.get("group")).toBe("cafe");
    expect(params.get("place")).toBe("B Place");
    expect(params.get("lat")).toBe("37.6");
    expect(params.get("lng")).toBe("127.04");
  });

  it("removes place-related params when closing selection", () => {
    const params = createClosedPlaceLocationParams(
      new URLSearchParams("group=cafe&place=A Place&lat=37.5&lng=127.03&foo=bar"),
    );

    expect(params.get("group")).toBe("cafe");
    expect(params.get("foo")).toBe("bar");
    expect(params.get("place")).toBeNull();
    expect(params.get("lat")).toBeNull();
    expect(params.get("lng")).toBeNull();
  });
});
