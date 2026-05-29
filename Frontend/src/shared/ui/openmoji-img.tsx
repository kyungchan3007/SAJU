import Image from "next/image";

// [DS] 역할: 이모지 문자를 OpenMoji SVG 이미지 URL로 변환해 next/image로 렌더링한다.
// [DS] 현재 사용처: 현재 직접 import 사용처는 없으며, 이모지 자산을 이미지로 고정해야 할 때 사용할 후보.
type OpenmojiImgProps = {
  emoji: string;
  size?: number;
  alt?: string;
};

function emojiToHex(emoji: string): string {
  const codePoint = emoji.codePointAt(0);
  return codePoint ? codePoint.toString(16).toUpperCase() : "";
}

export function OpenmojiImg({ emoji, size = 40, alt = "" }: OpenmojiImgProps) {
  const hex = emojiToHex(emoji);
  const src = `https://openmoji.org/data/black/svg/${hex}.svg`;

  return (
    <Image
      src={src}
      alt={alt || emoji}
      width={size}
      height={size}
      style={{ width: size, height: size }}
    />
  );
}
