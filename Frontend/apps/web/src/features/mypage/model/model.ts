import type { InfoItem, ManagementItem } from "@/features/mypage";
import { showComingSoonToast } from "@/shared/lib/showComingSoonToast";

export const MYPAGE_MANAGEMENT_ITEMS: ManagementItem[] = [
  {
    icon: "account",
    label: "계정 관리",
    desc: "계정 정보 및 보안 관리",
    href: "/mypage/account",
  },
  {
    icon: "saju",
    label: "사주정보 관리",
    desc: "내 사주 정보 등록 및 수정",
    href: "/mypage/saju-manage",
  },
];

export const MYPAGE_INFO_ITEMS: InfoItem[] = [
  {
    icon: "notice",
    label: "공지사항",
    desc: "서비스 공지 및 업데이트",
    onClick: showComingSoonToast,
  },
  {
    icon: "help",
    label: "FAQ 자주묻는 질문",
    desc: "자주 묻는 질문 및 문의하기",
    href: "/faq",
  },
  {
    icon: "recommend",
    label: "추천하기",
    desc: "SAJU:ME를 친구에게 추천해보세요",
    onClick: showComingSoonToast,
  },
  {
    icon: "partner",
    label: "SAJU:ME 상담사 입점하기",
    desc: "전문 상담사로 활동하고 싶으신가요?",
    onClick: showComingSoonToast,
  },
];
