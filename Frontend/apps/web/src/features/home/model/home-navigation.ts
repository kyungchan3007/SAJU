import type {
  HomeIconLinkItem,
  HomeServiceCategory,
} from "@/features/home/type/type";

export const QUICK_MENUS: HomeIconLinkItem[] = [
  { href: "/saju", emoji: "🏮", label: "신년운세", isNew: false },
  { href: "/saju", emoji: "🪬", label: "토정비결", isNew: false },
  { href: "/saju", emoji: "📖", label: "정통사주", isNew: false },
  { href: "/saju", emoji: "📅", label: "오늘의 운세", isNew: false },
  { href: "/saju", emoji: "🌙", label: "내일의 운세", isNew: false },
  { href: "/saju", emoji: "🪞", label: "관상", isNew: true },
  { href: "/saju", emoji: "🧠", label: "심리풀이", isNew: true },
  { href: "/compatibility", emoji: "💑", label: "짝궁합", isNew: false },
];

export const PROMO_CARDS: HomeIconLinkItem[] = [
  { href: "/saju", emoji: "🔮", label: "사주풀이", isNew: false },
  { href: "/compatibility", emoji: "💞", label: "궁합", isNew: true },
  { href: "/saju", emoji: "☯️", label: "오늘의 기운", isNew: false },
  { href: "/saju", emoji: "🌟", label: "연간운세", isNew: false },
  { href: "/saju", emoji: "🎴", label: "타로", isNew: true },
];

export const SERVICE_CATEGORIES: HomeServiceCategory[] = [
  {
    category: "사주 & 운명",
    items: [
      { label: "무료 사주풀이", href: "/saju" },
      { label: "오늘의 운세", href: "/saju" },
      { label: "연간 운세", href: "/saju" },
      { label: "월간 운세", href: "/saju" },
    ],
  },
  {
    category: "인연 & 궁합",
    items: [
      { label: "연인 궁합", href: "/compatibility" },
      { label: "부부 궁합", href: "/compatibility" },
      { label: "친구 궁합", href: "/compatibility" },
      { label: "비즈니스 궁합", href: "/compatibility" },
    ],
  },
];
