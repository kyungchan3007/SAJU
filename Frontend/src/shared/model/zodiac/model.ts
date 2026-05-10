export const ZODIAC_LIST = [
  { key: "rat", emoji: "🐭", name: "쥐", hanja: "子" },
  { key: "ox", emoji: "🐮", name: "소", hanja: "丑" },
  { key: "tiger", emoji: "🐯", name: "호랑이", hanja: "寅" },
  { key: "rabbit", emoji: "🐰", name: "토끼", hanja: "卯" },
  { key: "dragon", emoji: "🐲", name: "용", hanja: "辰" },
  { key: "snake", emoji: "🐍", name: "뱀", hanja: "巳" },
  { key: "horse", emoji: "🐴", name: "말", hanja: "午" },
  { key: "goat", emoji: "🐐", name: "양", hanja: "未" },
  { key: "monkey", emoji: "🐵", name: "원숭이", hanja: "申" },
  { key: "rooster", emoji: "🐔", name: "닭", hanja: "酉" },
  { key: "dog", emoji: "🐶", name: "개", hanja: "戌" },
  { key: "pig", emoji: "🐷", name: "돼지", hanja: "亥" },
] as const;

export type Zodiac = (typeof ZODIAC_LIST)[number];
