import type { Metadata } from "next";
import { PageContainer } from "@/shared/ui/page-container";

export const metadata: Metadata = {
  title: "사주 보는 법 입문 가이드 | 사주팔자 분석 첫걸음",
  description:
    "사주팔자를 처음 보는 분을 위한 입문 가이드입니다. 생년월일시를 어떻게 사주로 변환하고, 무엇을 읽는지 단계별로 알려드립니다.",
  alternates: { canonical: "/blog/how-to-read-saju" },
};

const steps = [
  {
    step: "01",
    title: "생년월일시 확인",
    desc: "사주를 보려면 태어난 연도, 월, 일, 시간이 필요합니다. 시간을 모를 경우 출생 시간을 가능한 한 확인하는 것이 좋습니다. 시간에 따라 사주의 마지막 기둥(시주)이 달라지기 때문입니다.",
  },
  {
    step: "02",
    title: "사주팔자 세우기 (만세력 활용)",
    desc: "생년월일시를 음력 기준의 천간·지지로 변환합니다. 이를 '사주를 세운다'고 합니다. 예전에는 만세력 책을 찾아봤지만, 현재는 앱이나 사이트에서 자동으로 변환해줍니다.",
  },
  {
    step: "03",
    title: "일간(日干) 파악",
    desc: "사주 분석의 출발점은 일주(日柱)의 천간, 즉 일간(日干)입니다. 일간은 '나 자신'을 의미하며, 이를 기준으로 다른 7글자와의 관계를 분석합니다. 일간이 무엇이냐에 따라 성격과 운의 해석이 달라집니다.",
  },
  {
    step: "04",
    title: "오행의 균형 분석",
    desc: "8글자가 목·화·토·금·수 중 어디에 해당하는지 파악하고, 어떤 오행이 많고 부족한지 확인합니다. 오행이 치우쳐 있으면 관련된 성향이 강하게 나타나며, 부족한 오행을 보완하는 방향이 중요합니다.",
  },
  {
    step: "05",
    title: "십성(十星) 분석",
    desc: "일간을 기준으로 나머지 7글자와의 관계를 비겁·식상·재성·관성·인성의 십성으로 분류합니다. 십성을 통해 직업 성향, 재물운, 인간관계 패턴을 파악할 수 있습니다.",
  },
  {
    step: "06",
    title: "대운·세운 확인",
    desc: "대운(大運)은 10년 단위의 큰 운의 흐름이고, 세운(歲運)은 1년 단위의 운입니다. 타고난 사주팔자가 골격이라면, 대운과 세운은 그 위에 펼쳐지는 환경이라고 볼 수 있습니다.",
  },
];

export default function HowToReadSajuPage() {
  return (
    <main className="bg-white py-10 md:py-14">
      <PageContainer width="reading">
        <div className="flex flex-col gap-8">
          <header className="flex flex-col gap-3">
            <span className="w-fit rounded-full bg-[#F0EEFF] px-3 py-1 text-xs font-bold text-[#5956E9]">
              사주 기초
            </span>
            <h1 className="text-3xl font-black tracking-tight text-gray-900">
              사주 보는 법 입문 가이드
            </h1>
            <p className="text-sm leading-relaxed text-gray-500">
              처음 접하는 분도 이해할 수 있는 사주팔자 분석 6단계
            </p>
          </header>

          <section className="rounded-3xl border border-[#EDE9FF] bg-[#FAFAFF] px-5 py-5 text-sm leading-7 text-gray-600 md:px-7">
            <p>
              사주 보는 법은 처음에는 복잡해 보이지만, 핵심 원리만 이해하면 누구나 기본적인 분석이 가능합니다.
              6단계를 따라가며 사주팔자 읽는 법을 차근차근 익혀보세요.
            </p>
          </section>

          <div className="flex flex-col gap-4">
            {steps.map((s) => (
              <section
                key={s.step}
                className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#5956E9] text-xs font-black text-white">
                    {s.step}
                  </span>
                  <h2 className="text-base font-black text-gray-900">{s.title}</h2>
                </div>
                <p className="text-sm leading-7 text-gray-600">{s.desc}</p>
              </section>
            ))}
          </div>

          <section className="rounded-3xl bg-[#F0EEFF] px-5 py-6 md:px-7">
            <div className="flex flex-col gap-2">
              <h2 className="text-base font-black text-[#5956E9]">
                직접 사주를 분석해보세요
              </h2>
              <p className="text-sm leading-6 text-gray-600">
                복잡한 과정 없이 생년월일시만 입력하면 AI가 사주를 세우고 분석해드립니다.
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
