import type { Metadata } from "next";
import { TermsOfServicePage } from "@/widgets/terms-of-service";

export const metadata: Metadata = {
  title: "서비스 이용약관",
  description:
    "SAJU:ME 서비스 이용과 관련한 적용 범위, 이용자의 권리와 의무, 책임 제한, 약관 변경 및 분쟁 처리 기준을 안내합니다.",
  alternates: {
    canonical: "/terms-of-service",
  },
};

export default function TermsOfServiceRoute() {
  return <TermsOfServicePage />;
}
