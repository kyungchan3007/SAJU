import Image from "next/image";

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
