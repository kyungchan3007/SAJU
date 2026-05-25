export const ZODIAC_LIST = [
  { key: "rat", emoji: "🐭", name: "쥐", hanja: "子", img: "rat.png" },
  { key: "ox", emoji: "🐮", name: "소", hanja: "丑", img: "cow.png" },
  { key: "tiger", emoji: "🐯", name: "호랑이", hanja: "寅", img: "tiger.png" },
  { key: "rabbit", emoji: "🐰", name: "토끼", hanja: "卯", img: "rabbit.png" },
  { key: "dragon", emoji: "🐲", name: "용", hanja: "辰", img: "dragon.png" },
  { key: "snake", emoji: "🐍", name: "뱀", hanja: "巳", img: "snake.png" },
  { key: "horse", emoji: "🐴", name: "말", hanja: "午", img: "hors.png" },
  { key: "goat", emoji: "🐐", name: "양", hanja: "未", img: "sheep.png" },
  {
    key: "monkey",
    emoji: "🐵",
    name: "원숭이",
    hanja: "申",
    img: "monkey.png",
  },
  { key: "rooster", emoji: "🐔", name: "닭", hanja: "酉", img: "chiken.png" },
  { key: "dog", emoji: "🐶", name: "개", hanja: "戌", img: "dog.png" },
  { key: "pig", emoji: "🐷", name: "돼지", hanja: "亥", img: "pig.png" },
] as const;

export type Zodiac = (typeof ZODIAC_LIST)[number];
