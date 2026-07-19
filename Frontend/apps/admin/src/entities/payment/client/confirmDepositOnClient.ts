import { ADMIN_PAYMENT_CONFIRM_DEPOSIT_ENDPOINT_PATH } from "@/shared/config/endPoint";

export async function confirmDepositOnClient(paymentId: number): Promise<void> {
  const res = await fetch(ADMIN_PAYMENT_CONFIRM_DEPOSIT_ENDPOINT_PATH(paymentId), {
    method: "POST",
  });

  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { message?: string };
    throw new Error(body.message ?? "입금 확인 실패");
  }
}

