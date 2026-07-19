import { NextResponse } from "next/server";
import { completeRefundOnServer } from "@/entities/payment/server/completeRefundOnServer";

type RouteContext = {
  params: Promise<{ paymentId: string }>;
};

export async function POST(_req: Request, { params }: RouteContext) {
  const { paymentId: paymentIdParam } = await params;
  const paymentId = Number(paymentIdParam);

  if (!Number.isFinite(paymentId) || paymentId < 1) {
    return NextResponse.json(
      { success: false, message: "INVALID_PAYMENT_ID" },
      { status: 400 },
    );
  }

  const result = await completeRefundOnServer(paymentId);

  if (!result.success) {
    return NextResponse.json(
      { success: false, message: result.message },
      { status: result.status },
    );
  }

  return NextResponse.json({ success: true });
}
