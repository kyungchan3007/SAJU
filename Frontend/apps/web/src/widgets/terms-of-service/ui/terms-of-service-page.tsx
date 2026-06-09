import { PageContainer } from "@/shared/ui/page-container";
import { termsOfServiceSections } from "../model/sections";

export function TermsOfServicePage() {
  return (
    <main className="bg-white py-10 md:py-14">
      <PageContainer width="reading">
        <div className="flex flex-col gap-8">
          <header className="flex flex-col gap-3">
            <span className="w-fit rounded-full bg-[#F0EEFF] px-3 py-1 text-xs font-bold text-[#5956E9]">
              Legal
            </span>
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-black tracking-tight text-gray-900">
                서비스 이용약관
              </h1>
              <p className="text-sm leading-relaxed text-gray-500">
                SAJU:ME 서비스 이용과 관련하여 서비스 제공 범위, 이용자의 권리 및 의무,
                책임 제한, 약관 변경 및 분쟁 처리 기준을 안내합니다.
              </p>
              <div className="flex flex-col gap-1 text-xs font-semibold text-gray-400">
                <p>운영자: SAJU:ME</p>
                <p>문의 이메일: saju.official@gmail.com</p>
                <p>최종 업데이트: 2026년 6월 9일</p>
              </div>
            </div>
          </header>

          <section className="rounded-3xl border border-[#EDE9FF] bg-[#FAFAFF] px-5 py-5 text-sm leading-7 text-gray-600 md:px-7">
            <p>
              본 약관은 SAJU:ME 서비스를 이용하는 모든 이용자에게 적용되며,
              이용자가 서비스를 실제로 이용하는 시점부터 적용됩니다.
            </p>
          </section>

          <div className="flex flex-col gap-6">
            {termsOfServiceSections.map((section) => (
              <section
                key={section.title}
                className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7"
              >
                <h2 className="mb-3 text-lg font-black text-gray-900">
                  {section.title}
                </h2>
                <div className="flex flex-col gap-3 text-sm leading-7 text-gray-600">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </PageContainer>
    </main>
  );
}
