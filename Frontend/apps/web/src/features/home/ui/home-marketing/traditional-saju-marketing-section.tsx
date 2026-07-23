import Image from "next/image";
import Link from "next/link";

import { TRADITIONAL_SAJU_FEATURE_CARDS } from "@/features/home/model/model";
import {
  MarketingExampleCard,
  MarketingSupportLinks,
} from "@/features/home/ui/home-marketing/marketing-support";
import { FeatureCardGrid } from "@/features/home/ui/home-marketing/feature-card-grid";

export function TraditionalSajuMarketingSection() {
  return (
    <section className="overflow-hidden bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-[1fr_420px]">
          {/* 좌: 텍스트 + 기능 카드 */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              {/*<div className="text-sm font-bold" style={{ color: "#5956E9" }}>01</div>*/}
              <div className="text-xs text-gray-500">
                가장 깊이 있는 나를 만나는 시간
              </div>
              <h2 className="text-3xl font-black leading-snug text-gray-900">
                정통사주 분석
              </h2>
              <p className="text-sm leading-relaxed text-gray-500">
                사주팔자, 오행, 심성, 격국, 대운까지
                <br />
                나의 타고난 성향과 인생 흐름을
                <br />
                체계적으로 분석합니다.
              </p>
              <Link
                href="/preview/traditional-saju"
                className="mt-1 text-sm font-semibold"
                style={{ color: "#5956E9" }}
              >
                정통사주 미리보기 →
              </Link>
            </div>

            <FeatureCardGrid cards={TRADITIONAL_SAJU_FEATURE_CARDS} />
            <MarketingExampleCard
              title="공개 예시"
              description="사주팔자의 오행 분포와 일간을 함께 보면 성향, 강점, 주의할 점을 하나의 흐름으로 읽을 수 있습니다."
            />
            <MarketingSupportLinks
              heading="관련 글"
              links={[
                { href: "/blog/saju-meaning", label: "사주팔자란 무엇인가?" },
                { href: "/blog/cheongan-jiji", label: "천간과 지지란?" },
              ]}
            />
          </div>

          {/* 우: 이미지 카드 — 궁합 섹션과 동일한 배치 */}
          <div
            className="relative hidden self-stretch md:flex md:items-center md:justify-center"
            style={{ minHeight: "460px" }}
          >
            <div
              className="relative overflow-hidden rounded-3xl shadow-2xl"
              style={{ width: "360px", height: "440px" }}
            >
              <Image
                src="/image/hero/marketingjueongtong.webp"
                alt="정통사주 분석"
                fill
                loading="eager"
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
                  📖 정통사주 분석
                </div>
              </div>
              {/* 하단 텍스트 */}
              <div className="absolute bottom-7 left-0 right-0 px-6 text-center">
                <p className="text-sm font-semibold leading-relaxed text-white">
                  나의 타고난 명식을
                  <br />
                  깊이 있게 해석합니다
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
