import "server-only";

import { z } from "zod";

import type {
  LocationSearchParams,
  LocationSearchPlace,
  LocationSearchResponse,
} from "@/entities/location/model/types";
import { KAKAO_LOCAL_KEYWORD_SEARCH_URL } from "@/shared/config/endPoint";
import { getServerEnv } from "@/shared/config/env";

type SearchLocationPlacesOnServerSuccess = {
  success: true;
  data: LocationSearchResponse;
};

type SearchLocationPlacesOnServerFailure = {
  success: false;
  status: number;
  message: string;
};

type SearchLocationPlacesOnServerResult =
  | SearchLocationPlacesOnServerSuccess
  | SearchLocationPlacesOnServerFailure;

const kakaoKeywordSearchResponseSchema = z.object({
  meta: z.object({
    total_count: z.number().default(0),
    pageable_count: z.number().default(0),
    is_end: z.boolean().default(true),
  }),
  documents: z
    .array(
      z.object({
        id: z.string().default(""),
        place_name: z.string().default(""),
        category_name: z.string().default(""),
        address_name: z.string().default(""),
        road_address_name: z.string().default(""),
        phone: z.string().default(""),
        place_url: z.string().default(""),
        x: z.string().default(""),
        y: z.string().default(""),
        distance: z.string().optional(),
      }),
    )
    .default([]),
});

function appendOptionalNumberParam(
  searchParams: URLSearchParams,
  name: string,
  value: number | undefined,
) {
  if (value !== undefined) {
    searchParams.set(name, String(value));
  }
}

function toPlace(document: {
  id: string;
  place_name: string;
  category_name: string;
  address_name: string;
  road_address_name: string;
  phone: string;
  place_url: string;
  x: string;
  y: string;
  distance?: string;
}): LocationSearchPlace | null {
  const longitude = Number(document.x);
  const latitude = Number(document.y);

  if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
    return null;
  }

  const distance = document.distance ? Number(document.distance) : undefined;

  return {
    id: document.id,
    name: document.place_name,
    categoryName: document.category_name,
    addressName: document.address_name,
    roadAddressName: document.road_address_name,
    phone: document.phone,
    placeUrl: document.place_url,
    longitude,
    latitude,
    distance: Number.isFinite(distance) ? distance : undefined,
  };
}

export async function searchLocationPlacesOnServer({
  query,
  x,
  y,
  radius,
  page,
  size,
  sort,
}: LocationSearchParams): Promise<SearchLocationPlacesOnServerResult> {
  const { KAKAO_REST_API_KEY } = getServerEnv();

  if (!KAKAO_REST_API_KEY) {
    return {
      success: false,
      status: 500,
      message: "Kakao REST API key is not configured.",
    };
  }

  const url = new URL(KAKAO_LOCAL_KEYWORD_SEARCH_URL);
  url.searchParams.set("query", query);
  appendOptionalNumberParam(url.searchParams, "x", x);
  appendOptionalNumberParam(url.searchParams, "y", y);
  appendOptionalNumberParam(url.searchParams, "radius", radius);
  appendOptionalNumberParam(url.searchParams, "page", page);
  appendOptionalNumberParam(url.searchParams, "size", size);

  if (sort) {
    url.searchParams.set("sort", sort);
  }

  let response: Response;

  try {
    response = await fetch(url, {
      headers: {
        Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
      },
      cache: "no-store",
    });
  } catch {
    return {
      success: false,
      status: 502,
      message: "Kakao location search request failed.",
    };
  }

  if (!response.ok) {
    return {
      success: false,
      status: response.status,
      message: "Kakao location search request failed.",
    };
  }

  let payload: unknown;

  try {
    payload = await response.json();
  } catch {
    return {
      success: false,
      status: 502,
      message: "Invalid Kakao location search response.",
    };
  }

  const parsed = kakaoKeywordSearchResponseSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      success: false,
      status: 502,
      message: "Invalid Kakao location search response.",
    };
  }

  return {
    success: true,
    data: {
      keyword: query,
      places: parsed.data.documents
        .map((document) => toPlace(document))
        .filter((place): place is LocationSearchPlace => place !== null),
      meta: {
        totalCount: parsed.data.meta.total_count,
        pageableCount: parsed.data.meta.pageable_count,
        isEnd: parsed.data.meta.is_end,
      },
    },
  };
}
