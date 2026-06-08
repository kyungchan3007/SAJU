import type { Metadata } from "next";
import { PrivacyPolicyPage } from "@/widgets/privacy-policy";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description:
    "SAJU:ME 서비스 이용 과정에서 수집하는 개인정보 항목, 이용 목적, 보관 기간, 이용자 권리와 쿠키/광고 관련 안내를 제공합니다.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyRoute() {
  return <PrivacyPolicyPage />;
}
