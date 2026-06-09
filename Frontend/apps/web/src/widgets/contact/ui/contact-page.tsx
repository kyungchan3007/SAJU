import { PageContainer } from "@/shared/ui/page-container";

const contactItems = [
  {
    title: "문의 이메일",
    body: "서비스 이용, 계정, 개인정보 처리, 제휴 또는 기타 운영 문의는 아래 이메일로 접수해 주세요.",
    value: "saju.official@gmail.com",
    href: "mailto:saju.official@gmail.com",
  },
  {
    title: "문의 유형",
    body: "아래 유형에 해당하는 문의를 접수할 수 있으며, 제목에 문의 유형을 함께 기재하면 확인이 더 빨라집니다.",
    values: [
      "계정 및 로그인 문의",
      "사주 분석 결과 또는 기능 이용 문의",
      "개인정보 열람, 정정, 삭제 및 처리 관련 문의",
      "제휴, 협업 및 기타 운영 문의",
    ],
  },
  {
    title: "응답 안내",
    body: "접수된 문의는 영업일 기준 순차적으로 검토하며, 문의 내용의 성격과 확인 범위에 따라 답변까지 시간이 소요될 수 있습니다.",
    values: [
      "영업일 기준 순차 응답",
      "개인정보 및 계정 문의는 본인 확인 후 처리 가능",
      "기술 이슈는 재현 정보가 충분할수록 확인 속도가 빨라질 수 있음",
    ],
  },
  {
    title: "문의 시 포함 권장 정보",
    body: "원활한 확인을 위해 아래 정보를 함께 전달해 주세요.",
    values: [
      "계정 이메일 또는 로그인 방식",
      "이용 중인 메뉴 또는 기능명",
      "문제가 발생한 일시와 상황 설명",
      "오류 메시지, 화면 캡처 또는 재현 절차",
    ],
  },
] as const;

const faqItems = [
  {
    question: "문의 답변은 얼마나 걸리나요?",
    answer:
      "일반 문의는 영업일 기준 순차적으로 확인합니다. 다만 계정 확인이나 기술 검토가 필요한 경우 답변이 더 지연될 수 있습니다.",
  },
  {
    question: "개인정보 삭제나 정정 요청도 이메일로 가능한가요?",
    answer:
      "가능합니다. 다만 본인 확인이 필요한 요청은 추가 확인 절차를 거친 뒤 처리될 수 있습니다.",
  },
  {
    question: "문의 메일에 무엇을 포함해야 하나요?",
    answer:
      "계정 식별 정보, 이용 기능, 발생 시점, 문제 설명, 오류 화면 또는 재현 절차를 함께 보내면 확인이 더 수월합니다.",
  },
  {
    question: "민감한 개인정보를 메일 본문에 모두 적어도 되나요?",
    answer:
      "아닙니다. 주민등록번호, 금융정보 등 불필요한 민감정보는 메일에 포함하지 마세요. 필요한 경우 운영자가 별도로 안내합니다.",
  },
] as const;

export function ContactPage() {
  return (
    <main className="bg-white py-10 md:py-14">
      <PageContainer width="reading">
        <div className="flex flex-col gap-8">
          <header className="flex flex-col gap-3">
            <span className="w-fit rounded-full bg-[#F0EEFF] px-3 py-1 text-xs font-bold text-[#5956E9]">
              Support
            </span>
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-black tracking-tight text-gray-900">
                문의하기
              </h1>
              <p className="text-sm leading-relaxed text-gray-500">
                SAJU:ME 서비스 이용 중 발생한 문의, 계정 관련 요청, 개인정보 관련
                문의, 제휴 또는 기타 운영 문의를 아래 경로로 접수할 수 있습니다.
              </p>
            </div>
          </header>

          <section className="rounded-3xl border border-[#EDE9FF] bg-[#FAFAFF] px-5 py-5 text-sm leading-7 text-gray-600 md:px-7">
            <p>
              운영자는 접수된 문의를 확인하여 합리적인 범위 내에서 응답하며,
              개인정보 또는 계정 관련 민감한 요청은 본인 확인이 필요할 수
              있습니다.
            </p>
          </section>

          <div className="flex flex-col gap-6">
            {contactItems.map((item) => (
              <section
                key={item.title}
                className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7"
              >
                <h2 className="mb-3 text-lg font-black text-gray-900">
                  {item.title}
                </h2>
                <div className="flex flex-col gap-3 text-sm leading-7 text-gray-600">
                  <p>{item.body}</p>
                  {"href" in item ? (
                    <a
                      href={item.href}
                      className="font-semibold text-[#5956E9] underline underline-offset-4"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <ul className="list-disc space-y-1 pl-5">
                      {item.values.map((value) => (
                        <li key={value}>{value}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>

          <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
            <h2 className="mb-3 text-lg font-black text-gray-900">자주 묻는 질문</h2>
            <div className="flex flex-col gap-4 text-sm leading-7 text-gray-600">
              {faqItems.map((item) => (
                <div key={item.question} className="rounded-2xl bg-[#FAFAFA] px-4 py-4">
                  <p className="font-semibold text-gray-900">Q. {item.question}</p>
                  <p className="mt-1">A. {item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </PageContainer>
    </main>
  );
}
