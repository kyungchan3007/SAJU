import { LocationSearchPanel } from "@/features/location-search";
import { LocationMapPanel } from "@/widgets/location-map";

export default function LocationPage() {
  return (
    <main className="page-shell">
      <div className="page-grid">
        <LocationSearchPanel />
        <LocationMapPanel />
      </div>
    </main>
  );
}
