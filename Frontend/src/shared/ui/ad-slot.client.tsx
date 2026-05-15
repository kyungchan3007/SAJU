"use client";

import { useEffect } from "react";
import { env } from "@/shared/config/env";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdSlot() {
  const clientId = env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const slotId = env.NEXT_PUBLIC_ADSENSE_SAJU_LOADING_SLOT;
  const canRenderAdsense = Boolean(clientId && slotId);

  useEffect(() => {
    if (!canRenderAdsense) return;

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // Ad blockers or local development can make AdSense unavailable.
    }
  }, [canRenderAdsense]);

  if (!canRenderAdsense) {
    return (
      <div
        className="flex min-h-[250px] items-center justify-center rounded-sm border border-dashed border-black/25 bg-white/55 px-6 text-center"
        aria-label="광고 영역"
      >
        <div className="space-y-2">
          <p className="font-display text-2xl text-black">AD</p>
          <p className="text-xs font-semibold text-black/45">
            광고가 표시되는 영역이야.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ins
      className="adsbygoogle block min-h-[250px] w-full"
      data-ad-client={clientId}
      data-ad-slot={slotId}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
