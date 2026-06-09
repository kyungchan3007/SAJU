"use client";

import Link from "next/link";
import type { Route } from "next";

type Props = {
  agreedToTerms: boolean;
  agreedToPrivacy: boolean;
  onChangeAgreedToTerms: (checked: boolean) => void;
  onChangeAgreedToPrivacy: (checked: boolean) => void;
};

export function SajuInputConsentSection({
  agreedToTerms,
  agreedToPrivacy,
  onChangeAgreedToTerms,
  onChangeAgreedToPrivacy,
}: Props) {
  const privacyPolicyHref = "/privacy-policy" as Route;
  const termsOfServiceHref = "/terms-of-service" as Route;

  return (
    <div
      className="mt-5 rounded-2xl px-4 py-4"
      style={{ background: "#FAFAFA", border: "1px solid #F1F1F5" }}
    >
      <div className="mb-4">
        <p className="text-sm font-bold text-gray-900">필수 동의 항목</p>
        <p className="mt-1 text-[12px] leading-5 text-gray-500">
          서비스 이용을 시작하기 전에 아래 필수 약관과 개인정보 처리 내용을
          확인해 주세요.
        </p>
      </div>

      <div className="space-y-3">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => onChangeAgreedToTerms(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#5956E9] focus:ring-[#5956E9]"
          />
          <span className="min-w-0">
            <span className="block text-sm font-semibold text-gray-900">
              서비스 이용약관에 동의합니다.{" "}
              <span className="text-[#5956E9]">*</span>
            </span>
            <span className="mt-1 block text-[12px] leading-5 text-gray-500">
              사주 분석 결과 제공, 계정 기반 서비스 운영, 이용자와 운영자의
              권리 및 책임에 관한 내용을 확인하고 이에 동의합니다.
            </span>
          </span>
        </label>

        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={agreedToPrivacy}
            onChange={(e) => onChangeAgreedToPrivacy(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#5956E9] focus:ring-[#5956E9]"
          />
          <span className="min-w-0">
            <span className="block text-sm font-semibold text-gray-900">
              개인정보 수집 및 이용에 동의합니다.{" "}
              <span className="text-[#5956E9]">*</span>
            </span>
            <span className="mt-1 block text-[12px] leading-5 text-gray-500">
              사주 분석 결과 제공을 위해 생년월일, 출생시간, 성별 및 출생지
              정보를 수집하며, 처리 기준과 보관 정책은 개인정보처리방침에서
              확인할 수 있습니다.
            </span>
          </span>
        </label>
      </div>

      <div className="mt-3 flex flex-wrap gap-4">
        <Link
          href={termsOfServiceHref}
          className="inline-flex text-[12px] font-semibold text-[#5956E9] underline underline-offset-2"
        >
          서비스 이용약관 전문 보기
        </Link>
        <Link
          href={privacyPolicyHref}
          className="inline-flex text-[12px] font-semibold text-[#5956E9] underline underline-offset-2"
        >
          개인정보처리방침 전문 보기
        </Link>
      </div>
    </div>
  );
}
