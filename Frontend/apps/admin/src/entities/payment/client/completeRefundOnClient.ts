import { ADMIN_PAYMENT_COMPLETE_REFUND_ENDPOINT_PATH } from "@/shared/config/endPoint";

export async function completeRefundOnClient(paymentId: number): Promise<void> {
  const res = await fetch(ADMIN_PAYMENT_COMPLETE_REFUND_ENDPOINT_PATH(paymentId), {
    method: "POST",
  });

  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { message?: string };
    throw new Error(body.message ?? "환불 완료 처리 실패");
  }
}
