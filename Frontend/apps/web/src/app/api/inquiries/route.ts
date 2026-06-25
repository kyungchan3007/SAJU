import { NextResponse } from "next/server";

import { createInquiryOnServer } from "@/entities/inquiry/server/createInquiryOnServer";
import type { InquiryRequest } from "@/generated/api";
import { createErrorResponse, createSuccessResponse } from "@/shared/api";
import { withApiGuards } from "@/shared/api/auth/withApiGuards";

export const POST = withApiGuards(
  { requireCsrf: true },
  async (request: Request) => {
    let payload: InquiryRequest;

    try {
      payload = (await request.json()) as InquiryRequest;
    } catch {
      return NextResponse.json(createErrorResponse("INVALID_REQUEST_BODY"), {
        status: 400,
      });
    }

    const result = await createInquiryOnServer(payload);

    if (!result.success) {
      return NextResponse.json(
        createErrorResponse("INQUIRY_CREATE_FAILED", result.message),
        { status: result.status },
      );
    }

    return NextResponse.json(createSuccessResponse(result.data), {
      status: 201,
    });
  },
);
