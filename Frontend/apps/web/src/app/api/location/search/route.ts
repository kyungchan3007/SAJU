import { NextResponse } from "next/server";
import { z } from "zod";

import { searchLocationPlacesOnServer } from "@/entities/location/server/searchLocationPlacesOnServer";
import { createErrorResponse, createSuccessResponse } from "@/shared/api";

export const revalidate = 0;

const optionalNumber = z.coerce.number().finite().optional();

const locationSearchQuerySchema = z
  .object({
    query: z.string().trim().min(1).max(100),
    x: optionalNumber,
    y: optionalNumber,
    radius: z.coerce.number().int().min(0).max(20_000).optional(),
    page: z.coerce.number().int().min(1).max(45).optional(),
    size: z.coerce.number().int().min(1).max(15).optional(),
    sort: z.enum(["accuracy", "distance"]).optional(),
  })
  .superRefine(({ radius, sort, x, y }, context) => {
    if ((x === undefined) !== (y === undefined)) {
      context.addIssue({
        code: "custom",
        message: "x and y must be provided together.",
        path: x === undefined ? ["x"] : ["y"],
      });
    }

    if (radius !== undefined && (x === undefined || y === undefined)) {
      context.addIssue({
        code: "custom",
        message: "radius requires x and y.",
        path: ["radius"],
      });
    }

    if (sort === "distance" && (x === undefined || y === undefined)) {
      context.addIssue({
        code: "custom",
        message: "distance sort requires x and y.",
        path: ["sort"],
      });
    }
  });

function getQueryValue(searchParams: URLSearchParams, key: string) {
  const value = searchParams.get(key);

  if (value === null || value.trim() === "") {
    return undefined;
  }

  return value;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // 1) 사용자가 선택한 추천 키워드와 선택 좌표 옵션을 BFF 쿼리에서 읽는다.
  const parsedQuery = locationSearchQuerySchema.safeParse({
    query: getQueryValue(searchParams, "query"),
    x: getQueryValue(searchParams, "x"),
    y: getQueryValue(searchParams, "y"),
    radius: getQueryValue(searchParams, "radius"),
    page: getQueryValue(searchParams, "page"),
    size: getQueryValue(searchParams, "size"),
    sort: getQueryValue(searchParams, "sort"),
  });

  if (!parsedQuery.success) {
    return NextResponse.json(
      createErrorResponse(
        "INVALID_LOCATION_SEARCH_QUERY",
        "Invalid location search query.",
      ),
      { status: 400 },
    );
  }

  // 2) 서버 전용 Kakao REST API 키로 Local Keyword Search API를 호출한다.
  const result = await searchLocationPlacesOnServer(parsedQuery.data);

  if (!result.success) {
    return NextResponse.json(
      createErrorResponse("LOCATION_SEARCH_FAILED", result.message),
      { status: result.status },
    );
  }

  // 3) Kakao 원본 응답 대신 지도/리스트 UI가 바로 쓰는 장소 타입으로 내려준다.
  return NextResponse.json(createSuccessResponse(result.data));
}
