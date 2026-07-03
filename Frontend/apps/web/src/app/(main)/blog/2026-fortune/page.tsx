import type { Metadata } from "next";
import { createPageMetadata } from "@/shared/lib/seo";
import { PageContainer } from "@/shared/ui/page-container";

export const metadata: Metadata = createPageMetadata({
  title: "2026년 운세 총정리 | 올해 운세와 병오년 흐름",
  description: "2026년 운세와 올해 운세 흐름이 궁금한 분을 위해 병오년의 재물운, 애정운, 건강운, 직장운을 한눈에 정리했습니다.",
  path: "/blog/2026-fortune",
  type: "article",
});

const areas = [
  {
    area: "재물운",
    icon: "💰",
    summary: "상반기 안정, 하반기 도전",
    desc: "2026년 병오년은 화(火)의 기운이 강한 해입니다. 상반기는 기존 자산을 안정적으로 관리하기 좋은 시기이며, 하반기는 새로운 투자 기회가 생길 수 있습니다. 단, 병오년 화의 기운은 충동적 소비를 부추길 수 있으니 지출 계획을 철저히 세우는 것이 중요합니다.",
  },
  {
    area: "애정운",
    icon: "💕",
    summary: "활발한 만남, 진지한 관계 형성",
    desc: "화(火)의 기운은 사람들을 적극적이고 외향적으로 만들어 새로운 만남이 활발해집니다. 솔로라면 봄(3~5월)과 가을(9~11월)이 인연을 만나기 좋은 시기입니다. 기존 커플은 관계를 한 단계 발전시킬 수 있는 기회가 옵니다.",
  },
  {
    area: "직장·사업운",
    icon: "💼",
    summary: "도전과 변화, 리더십 발휘",
    desc: "병오년은 새로운 시작과 도전에 유리한 에너지를 가집니다. 이직, 창업, 새 프로젝트를 시도하기에 좋은 해입니다. 다만 준비 없는 무모한 도전은 금물이며, 충분한 계획을 세운 뒤 움직이는 것이 중요합니다.",
  },
  {
    area: "건강운",
    icon: "🌿",
    summary: "심장·혈압 주의, 스트레스 관리 필수",
    desc: "화(火)의 기운이 강한 해는 심장과 혈압, 피부 건강에 영향을 줄 수 있습니다. 과로와 번아웃을 조심하고 충분한 수면과 규칙적인 운동이 필요합니다. 감정 기복이 커질 수 있으니 명상이나 취미 활동으로 심리적 균형을 유지하세요.",
  },
  {
    area: "학업·시험운",
    icon: "📚",
    summary: "집중력 관리가 핵심",
    desc: "화의 기운은 에너지를 높여주지만 집중력이 산만해질 수 있습니다. 중요한 시험이나 자격증 취득을 준비하는 분이라면 상반기를 집중 학습 기간으로 활용하는 것이 유리합니다. 꾸준한 반복 학습이 좋은 결과로 이어집니다.",
  },
];

export default function Fortune2026Page() {
  return (
    <main className="bg-white py-10 md:py-14">
      <PageContainer width="reading">
        <div className="flex flex-col gap-8">
          <header className="flex flex-col gap-3">
            <span className="w-fit rounded-full bg-[#F0EEFF] px-3 py-1 text-xs font-bold text-[#5956E9]">
              2026년 운세
            </span>
            <h1 className="text-3xl font-black tracking-tight text-gray-900">
              2026년 병오년(丙午年) 운세
            </h1>
            <p className="text-sm leading-relaxed text-gray-500">
              올해 운세가 궁금할 때 먼저 보는 2026년 병오년 전체 흐름
            </p>
          </header>

          <section className="rounded-3xl border border-[#EDE9FF] bg-[#FAFAFF] px-5 py-5 text-sm leading-7 text-gray-600 md:px-7">
            <p>
              2026년은 천간(天干) 병(丙)과 지지(地支) 오(午)가 만나는 병오년(丙午年)입니다.
              병은 태양처럼 밝고 강렬한 화(火)의 기운이고, 오 역시 화에 해당하는 말(午)입니다.
              두 화가 겹치는 병오년은 열정과 도전의 기운이 넘치지만, 그만큼 과열에 주의가 필요한 해이기도 합니다.
            </p>
          </section>

          <div className="flex flex-col gap-4">
            {areas.map((a) => (
              <section
                key={a.area}
                className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7"
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-xl">{a.icon}</span>
                  <h2 className="text-lg font-black text-gray-900">{a.area}</h2>
                  <span className="rounded-full bg-[#F0EEFF] px-2.5 py-0.5 text-xs font-bold text-[#5956E9]">
                    {a.summary}
                  </span>
                </div>
                <p className="text-sm leading-7 text-gray-600">{a.desc}</p>
              </section>
            ))}
          </div>

          <section className="rounded-3xl bg-[#F0EEFF] px-5 py-6 md:px-7">
            <div className="flex flex-col gap-2">
              <h2 className="text-base font-black text-[#5956E9]">
                2026년 나의 개인 운세가 궁금하다면?
              </h2>
              <p className="text-sm leading-6 text-gray-600">
                전체 운세보다 정확한 나만의 사주 기반 2026년 운세를 확인해보세요.
              </p>
              <a
                href="/saju"
                className="mt-2 w-fit rounded-full bg-[#5956E9] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#4745c8]"
              >
                내 사주 보러 가기
              </a>
            </div>
          </section>
        </div>
      </PageContainer>
    </main>
  );
}
