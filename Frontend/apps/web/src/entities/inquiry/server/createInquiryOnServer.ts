import "server-only";

import type { InquiryRequest, InquiryResponse } from "@/generated/api";
import { authenticatedBackendFetch } from "@/shared/api/auth/authenticatedBackendFetch";
import { parseBackendApiResponse } from "@/shared/api/backend/parseBackendApiResponse";
import { INQUIRIES_ENDPOINT_PATH } from "@/shared/config/endPoint";

type CreateInquiryOnServerSuccess = {
  success: true;
  data: InquiryResponse | undefined;
};

type CreateInquiryOnServerFailure = {
  success: false;
  status: number;
  message: string;
};

type CreateInquiryOnServerResult =
  | CreateInquiryOnServerSuccess
  | CreateInquiryOnServerFailure;

export async function createInquiryOnServer(
  payload: InquiryRequest,
): Promise<CreateInquiryOnServerResult> {
  const result = await authenticatedBackendFetch(INQUIRIES_ENDPOINT_PATH, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const parsed = await parseBackendApiResponse<InquiryResponse>(
    result.response,
    "Create inquiry request failed.",
  );

  if (!parsed.success) {
    return parsed;
  }

  return { success: true, data: parsed.data };
}
