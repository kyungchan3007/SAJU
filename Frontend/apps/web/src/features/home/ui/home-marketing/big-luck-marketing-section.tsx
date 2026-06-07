import Link from "next/link";

import { BigLuckTimeline } from "@/features/home/ui/home-marketing/big-luck-timeline";

export function BigLuckMarketingSection() {
  return (
    <section className="bg-[#FAFAFA] py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1fr_2fr]">
          <div className="flex flex-col gap-4">
            <div className="text-xs text-gray-400">
              흐름을 알면 기회가 보입니다
            </div>
            <h2 className="text-3xl font-black leading-snug text-gray-900">
              대운·세운 흐름
            </h2>
            <p className="text-sm leading-relaxed text-gray-500">
              10년 단위 대운과 매년 세운의 흐름을 통해
              <br />
              앞으로의 기회와 주의할 점을
              <br />
              미리 대비할 수 있습니다.
            </p>
            <Link
              href="/mypage/traditional-fortune"
              className="mt-2 text-sm font-semibold"
              style={{ color: "#5956E9" }}
            >
              자세히 보기 →
            </Link>
          </div>

          <BigLuckTimeline />
        </div>
      </div>
    </section>
  );
}
