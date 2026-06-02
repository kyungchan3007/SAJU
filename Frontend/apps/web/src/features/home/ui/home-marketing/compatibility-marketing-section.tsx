import Link from "next/link";

import { COMPATIBILITY_FEATURE_CARDS } from "@/features/home/model/model";
import { FeatureCardGrid } from "@/features/home/ui/home-marketing/feature-card-grid";

export function CompatibilityMarketingSection() {
  return (
    <section className="overflow-hidden border-t border-[#E8E4F8] bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-[1fr_420px]">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <div className="text-xs text-gray-400">
                우리의 인연을 더 깊이 이해하는
              </div>
              <h2 className="text-3xl font-black leading-snug text-gray-900">
                궁합 분석
              </h2>
              <p className="text-sm leading-relaxed text-gray-500">
                두 사람의 명식 조화, 오행 궁합, 성향과
                <br />
                관계의 흐름을 분석하여 더 나은 관계의
                <br />
                방향을 제시합니다.
              </p>
              <Link
                href="/compatibility"
                className="mt-1 text-sm font-semibold"
                style={{ color: "#5956E9" }}
              >
                자세히 보기 →
              </Link>
            </div>

            <FeatureCardGrid cards={COMPATIBILITY_FEATURE_CARDS} />
          </div>

          <div
            className="relative hidden self-stretch md:flex md:items-center md:justify-center"
            style={{ minHeight: "460px" }}
          >
            <div
              className="relative overflow-hidden rounded-3xl shadow-2xl"
              style={{ width: "360px", height: "440px" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/image/hero/cupple.png"
                alt="궁합 커플"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(89,86,233,0.35) 0%, rgba(89,86,233,0.02) 40%, transparent 100%)",
                }}
              />
              <div className="absolute left-1/2 top-5 -translate-x-1/2">
                <div
                  className="whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-bold text-white"
                  style={{
                    background: "rgba(89,86,233,0.8)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  ❤️ 궁합 분석
                </div>
              </div>
              <div className="absolute bottom-7 left-0 right-0 px-6 text-center">
                <p className="text-sm font-semibold leading-relaxed text-white">
                  두 사람의 사주가
                  <br />
                  만나는 순간
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
