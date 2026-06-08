import { PageContainer } from "@/shared/ui/page-container";
import { privacyPolicySections } from "../model/sections";

export function PrivacyPolicyPage() {
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
                개인정보처리방침
              </h1>
              <p className="text-sm leading-relaxed text-gray-500">
                SAJU:ME는 이용자의 개인정보를 투명하게 다루고, 관련 법령을
                준수하기 위해 아래와 같이 개인정보처리방침을 안내합니다.
              </p>
              <p className="text-xs font-semibold text-gray-400">
                최종 업데이트: 2026년 6월 8일
              </p>
            </div>
          </header>

          <section className="rounded-3xl border border-[#EDE9FF] bg-[#FAFAFF] px-5 py-5 text-sm leading-7 text-gray-600 md:px-7">
            <p>
              본 방침은 SAJU:ME 서비스 이용 과정에서 수집하는 개인정보와 그
              이용 목적, 보관 기간, 쿠키 및 광고 관련 안내를 포함합니다.
            </p>
          </section>

          <div className="flex flex-col gap-6">
            {privacyPolicySections.map((section) => (
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
