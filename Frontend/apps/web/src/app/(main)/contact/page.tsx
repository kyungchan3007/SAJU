import type { Metadata } from "next";
import { ContactPage } from "@/widgets/contact";

export const metadata: Metadata = {
  title: "문의하기",
  description:
    "SAJU:ME 서비스 이용, 계정, 개인정보 처리 및 기타 운영 문의를 접수할 수 있는 안내 페이지입니다.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactRoute() {
  return <ContactPage />;
}
