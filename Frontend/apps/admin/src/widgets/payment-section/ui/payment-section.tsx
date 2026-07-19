import { PaymentManagement } from "@/features/payment/ui/payment-management.client";

export function PaymentSection() {
  return (
    <section>
      <h3 className="mb-3 text-base font-bold text-content-primary">기수별 결제 목록</h3>
      <PaymentManagement />
    </section>
  );
}

