import Image from "next/image";
import Link from "next/link";

import { YEAR_FORTUNE_FEATURE_CARDS } from "@/features/home/model/model";
import { FeatureCardGrid } from "@/features/home/ui/home-marketing/feature-card-grid";

export function YearFortuneMarketingSection() {
  return (
    <section className="overflow-hidden bg-[#FAFAFA] py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-[1fr_420px]">
          {/* 좌: 텍스트 + 기능 카드 */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="text-xs text-gray-400">
                새해를 준비하는 가장 현명한 방법
              </div>
              <h2 className="text-3xl font-black leading-snug text-gray-900">
                신년운세
              </h2>
              <p className="text-sm leading-relaxed text-gray-500">
                한 해의 전체 흐름부터 월별 운세,
                <br />
                분야별 운세까지, 2026년을
                <br />더 현명하게 준비하세요.
              </p>
              <Link
                href="/mypage/year-fortune"
                className="mt-1 text-sm font-semibold"
                style={{ color: "#5956E9" }}
              >
                자세히 보기 →
              </Link>
            </div>

            <FeatureCardGrid cards={YEAR_FORTUNE_FEATURE_CARDS} />
          </div>

          {/* 우: 이미지 카드 */}
          <div
            className="relative hidden self-stretch md:flex md:items-center md:justify-center"
            style={{ minHeight: "460px" }}
          >
            <div
              className="relative overflow-hidden rounded-3xl shadow-2xl"
              style={{ width: "360px", height: "440px" }}
            >
              <Image
                src="/image/background/sinnyun.png"
                alt="신년운세"
                fill
                sizes="360px"
                className="object-cover object-center"
              />
              {/* 하단 보라 그라디언트 */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(89,86,233,0.35) 0%, rgba(89,86,233,0.02) 40%, transparent 100%)",
                }}
              />
              {/* 상단 배지 */}
              <div className="absolute left-1/2 top-5 -translate-x-1/2">
                <div
                  className="whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-bold text-white"
                  style={{
                    background: "rgba(89,86,233,0.8)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  ⭐ 신년운세
                </div>
              </div>
              {/* 하단 텍스트 */}
              <div className="absolute bottom-7 left-0 right-0 px-6 text-center">
                <p className="text-sm font-semibold leading-relaxed text-white">
                  2026년의 흐름을
                  <br />
                  미리 준비하세요
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
