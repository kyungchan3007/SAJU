import { NextRequest, NextResponse } from "next/server";
import { getPaymentsByCohortOnServer } from "@/entities/payment/server/getPaymentsByCohortOnServer";
import type { PaymentStatus } from "@/features/payment/type/types";

type RouteContext = {
  params: Promise<{ cohortId: string }>;
};

const PAYMENT_STATUSES = new Set<PaymentStatus>([
  "REQUESTED",
  "DEPOSIT_CONFIRMED",
  "REFUND_PENDING",
  "REFUNDED",
  "CANCELLED",
]);

export const revalidate = 0;

export async function GET(req: NextRequest, { params }: RouteContext) {
  const { cohortId: cohortIdParam } = await params;
  const cohortId = Number(cohortIdParam);

  if (!Number.isFinite(cohortId) || cohortId < 1) {
    return NextResponse.json(
      { success: false, message: "INVALID_COHORT_ID" },
      { status: 400 },
    );
  }

  const statusParam = req.nextUrl.searchParams.get("status");
  const status =
    statusParam && PAYMENT_STATUSES.has(statusParam as PaymentStatus)
      ? (statusParam as PaymentStatus)
      : undefined;
  const result = await getPaymentsByCohortOnServer(cohortId, status);

  if (!result.success) {
    return NextResponse.json(
      { success: false, message: result.message },
      { status: result.status },
    );
  }

  return NextResponse.json({ success: true, data: result.data });
}

