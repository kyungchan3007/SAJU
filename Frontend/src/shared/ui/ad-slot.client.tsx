"use client";

import { useEffect } from "react";
import { Monitor } from "lucide-react";
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

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
      <p className="mb-3 text-xs font-bold tracking-wider text-slate-400">
        Advertisements
      </p>
      {canRenderAdsense ? (
        <ins
          className="adsbygoogle block min-h-[250px] w-full"
          data-ad-client={clientId}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <div
          className="flex min-h-[260px] flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50"
          aria-label="광고 영역"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-400">
            <Monitor size={22} strokeWidth={1.75} />
          </div>
          <div className="text-center">
            <p className="text-sm font-black text-slate-400">AD</p>
            <p className="mt-1 text-xs text-slate-400">
              광고가 표시되는 영역이에요
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
