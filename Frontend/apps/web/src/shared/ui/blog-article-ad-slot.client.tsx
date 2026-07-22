"use client";

import { useEffect } from "react";
import { Monitor } from "lucide-react";
import Script from "next/script";
import { env } from "@/shared/config/env";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function BlogArticleAdSlot() {
  const clientId = env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const slotId =
    env.NEXT_PUBLIC_ADSENSE_BLOG_SLOT ||
    env.NEXT_PUBLIC_ADSENSE_SAJU_LOADING_SLOT;
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
    <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
      <p className="mb-3 text-xs font-bold tracking-wider text-slate-400">
        Advertisement
      </p>
      {canRenderAdsense ? (
        <>
          <Script
            id="adsense-script"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
            crossOrigin="anonymous"
            strategy="lazyOnload"
          />
          <ins
            className="adsbygoogle block min-h-[140px] w-full overflow-hidden rounded-2xl bg-slate-50"
            data-ad-client={clientId}
            data-ad-slot={slotId}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </>
      ) : (
        <div
          className="flex min-h-[160px] items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-4"
          aria-label="블로그 광고 영역"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-400">
            <Monitor size={22} strokeWidth={1.75} />
          </div>
          <div className="text-left">
            <p className="text-sm font-black text-slate-400">AD</p>
            <p className="mt-1 text-xs text-slate-400">
              본문 하단에 표시되는 광고 영역입니다.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
