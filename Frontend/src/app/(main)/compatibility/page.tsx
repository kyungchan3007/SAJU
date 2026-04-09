import { PaymentCallout } from "@/features/payment";
import { CompatibilityResultCard } from "@/widgets/compatibility-result";

export default function CompatibilityPage() {
  return (
    <main className="page-shell">
      <div className="page-grid">
        <CompatibilityResultCard />
        <PaymentCallout />
      </div>
    </main>
  );
}
