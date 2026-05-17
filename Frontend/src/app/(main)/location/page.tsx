import { Suspense } from "react";

import { LocationPageClient } from "@/app/(main)/location/location-page.client";

export default function LocationPage() {
  return (
    <main className="page-shell">
      <h1
        className="mb-5 flex items-center gap-3 font-['Jua',sans-serif] text-[26px] after:h-0.5 after:flex-1 after:bg-black after:content-['']"
      >
        위치 추천
      </h1>
      <Suspense
        fallback={
          <div className="rounded-sm border-2 border-black bg-white p-6 text-sm text-[#7a7570]">
            위치 추천을 불러오는 중입니다.
          </div>
        }
      >
        <LocationPageClient />
      </Suspense>
    </main>
  );
}
