import type { SajuSummaryItem, ManagementItem, InfoItem } from "@/features/mypage";

export const MYPAGE_SAJU_SUMMARY_ITEMS: SajuSummaryItem[] = [
  { label: "일주", value: "임인일주" },
  { label: "신강/신약", value: "신약" },
  { label: "격국", value: "정관격" },
  { label: "용신", value: "금 (金)" },
  { label: "보조 용신", value: "수 (水)" },
];

export const MYPAGE_MANAGEMENT_ITEMS: ManagementItem[] = [
  { label: "계정 관리", desc: "계정 정보 및 보안 관리", href: "/mypage/account" },
  { label: "사주정보 관리", desc: "나의 사주 정보 등록 및 수정", href: "/mypage/saju-manage" },
];

export const MYPAGE_INFO_ITEMS: InfoItem[] = [
  { label: "공지사항", desc: "서비스 공지 및 업데이트", href: "#" },
  { label: "고객센터", desc: "자주 묻는 질문 및 문의하기", href: "#" },
  { label: "추천하기", desc: "SAJU:ME를 친구에게 추천해보세요", href: "#" },
  { label: "점신 상담사 입점하기", desc: "전문 상담사로 활동하고 싶으신가요?", href: "#" },
];
