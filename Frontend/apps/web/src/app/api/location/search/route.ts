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
      createErrorResponse("INVALID_LOCATION_SEARCH_QUERY"),
      { status: 400 },
    );
  }

  const result = await searchLocationPlacesOnServer(parsedQuery.data);

  if (!result.success) {
    return NextResponse.json(
      createErrorResponse("LOCATION_SEARCH_FAILED", result.message),
      { status: result.status },
    );
  }

  return NextResponse.json(createSuccessResponse(result.data));
}
