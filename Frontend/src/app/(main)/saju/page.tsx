import { SajuInputForm } from "@/features/saju-input";
import { SajuResultCard } from "@/widgets/saju-result";

export default function SajuPage() {
  return (
    <main className="page-shell">
      <div className="page-grid">
        <SajuInputForm />
        <SajuResultCard />
      </div>
    </main>
  );
}
