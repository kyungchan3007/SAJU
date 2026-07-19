import type { Metadata } from "next";
import { PaymentSection } from "@/widgets/payment-section/ui/payment-section";

export const metadata: Metadata = { title: "결제 관리" };

export default function PaymentsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-content-primary">결제 관리</h2>
        <p className="mt-1 text-sm text-content-muted">
          기수별 참가비 입금 상태를 확인하고 입금 확인, 참여 확정, 환불 완료를 처리합니다.
        </p>
      </div>
      <PaymentSection />
    </div>
  );
}
