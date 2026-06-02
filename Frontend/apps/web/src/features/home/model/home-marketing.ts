import type {
  HomeBigLuckStep,
  HomeMarketingFeatureCard,
  HomeTarotCard,
} from "@/features/home/type/type";

export const TRADITIONAL_SAJU_FEATURE_CARDS: HomeMarketingFeatureCard[] = [
  {
    icon: "📖",
    title: "사주팔자 해석",
    desc: "천간·지지·12운성으로 명식의 구조를 분석",
  },
  {
    icon: "⚖️",
    title: "오행 균형 분석",
    desc: "오행의 강약과 흐름을 한눈에 파악",
  },
  {
    icon: "🌱",
    title: "심성 심층 분석",
    desc: "나의 성향, 재능, 관계 패턴 심층 해석",
  },
  {
    icon: "📈",
    title: "대운 흐름 분석",
    desc: "10년 단위 대운으로 인생의 큰 흐름을 확인",
  },
];

export const BIG_LUCK_STEPS: HomeBigLuckStep[] = [
  {
    age: "11-20세",
    hanja: "戊辰",
    kor: "무진",
    year: "2000-2009",
    opacity: 50,
  },
  {
    age: "21-30세",
    hanja: "丁卯",
    kor: "정묘",
    year: "2010-2019",
    opacity: 70,
  },
  {
    age: "31-40세",
    hanja: "丙寅",
    kor: "병인",
    year: "2020-2029",
    active: true,
  },
  {
    age: "41-50세",
    hanja: "乙丑",
    kor: "을축",
    year: "2030-2039",
  },
  {
    age: "51-60세",
    hanja: "甲子",
    kor: "갑자",
    year: "2040-2049",
  },
];

export const COMPATIBILITY_FEATURE_CARDS: HomeMarketingFeatureCard[] = [
  { icon: "🔀", title: "명식 조화 분석", desc: "두 사람의 사주 구조 비교" },
  { icon: "🌿", title: "오행 궁합", desc: "오행의 상생·상극 관계" },
  { icon: "💞", title: "관계 흐름", desc: "연애, 결혼, 미래 흐름 예측" },
  { icon: "💡", title: "맞춤 조언", desc: "더 좋은 관계를 위한 조언" },
];

export const YEAR_FORTUNE_FEATURE_CARDS: HomeMarketingFeatureCard[] = [
  {
    icon: "📅",
    title: "연간 총운",
    desc: "2026년 전체 흐름 분석",
  },
  {
    icon: "🌙",
    title: "월별 운세",
    desc: "매월의 흐름과 주의점",
  },
  {
    icon: "💼",
    title: "분야별 운세",
    desc: "연애·직장·재물·건강",
  },
  {
    icon: "⭐",
    title: "행운 포인트",
    desc: "행운의 색, 방향, 날짜 안내",
  },
];

export const TAROT_COMMUNITY_FEATURE_CARDS: HomeMarketingFeatureCard[] = [
  { icon: "🔮", title: "타로 상담", desc: "연애, 고민, 직장, 재물\n지금 필요한 힌트를 얻어보세요." },
  { icon: "💬", title: "커뮤니티", desc: "같은 고민을 가진 사람들과\n이야기하고 공감해요." },
  { icon: "🌙", title: "오늘의 타로", desc: "매일 새로운 타로 카드로\n하루의 흐름을 확인해요." },
  { icon: "🤝", title: "함께 나누기", desc: "사주·운세 경험을 서로\n공유하고 댓글로 소통해요." },
];

export const TAROT_CARDS: HomeTarotCard[] = [
  {
    label: "THE STAR",
    bg: "linear-gradient(160deg, #1a1060, #3a2090)",
  },
  {
    label: "THE MOON",
    bg: "linear-gradient(160deg, #2d1060, #6020a0)",
  },
];
