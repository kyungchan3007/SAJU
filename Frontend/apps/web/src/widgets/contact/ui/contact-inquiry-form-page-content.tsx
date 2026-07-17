import { ContactInquiryFormClient } from "./contact-inquiry-form.client";

export function ContactInquiryFormPageContent() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black tracking-tight text-gray-900">
            문의하기
          </h1>
          <p className="text-sm leading-relaxed text-gray-500">
            서비스 이용 중 발생한 문의사항을 아래 양식으로 제출해 주세요.
            확인 후 순차적으로 답변드리겠습니다.
          </p>
        </div>
      </header>

      <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
        <ContactInquiryFormClient />
      </section>

      <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
        <h2 className="mb-4 text-lg font-bold text-gray-900">
          문의 작성 팁
        </h2>
        <ul className="flex flex-col gap-3 text-sm text-gray-600">
          <li className="flex gap-3">
            <span className="flex-shrink-0 font-bold text-saju-primary">
              1.
            </span>
            <span>
              <strong>제목:</strong> 문제를 간단하게 요약해 주세요. 예:
              “계정 로그인 오류”, “결과 조회 불가”
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 font-bold text-saju-primary">
              2.
            </span>
            <span>
              <strong>내용:</strong> 문제가 발생한 상황, 시간, 오류 메시지
              등을 가능한 자세히 작성해 주세요.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 font-bold text-saju-primary">
              3.
            </span>
            <span>
              <strong>이메일:</strong> 답변을 받을 이메일 주소를 정확히
              입력해 주세요.
            </span>
          </li>
        </ul>
      </section>
    </div>
  );
}
