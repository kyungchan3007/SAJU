import Image from "next/image";

// [DS] 역할: 사주/운세 계열 히어로에서 공통으로 쓰는 이미지 배경 카드 shell.
// [DS] 현재 사용처: 사주 미리보기 히어로, 궁합 히어로, 정통사주 히어로.
type SajuHeroCardShellProps = {
  imageSrc?: string | null;
  imageAlt: string;
  children: React.ReactNode;
};

export function SajuHeroCardShell({
  imageSrc,
  imageAlt,
  children,
}: SajuHeroCardShellProps) {
  return (
    <section className="pt-6">
      <div
        className="relative min-h-[420px] overflow-hidden rounded-[28px] md:h-[420px] md:rounded-[32px]"
        style={{
          boxShadow: "0 8px 40px rgba(89,86,233,0.18)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #3730a3 0%, #5956E9 45%, #7C3AED 100%)",
          }}
        />

        {imageSrc && (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover object-center md:object-[60%_10%]"
          />
        )}

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(20,15,60,0.72) 0%, rgba(20,15,60,0) 32%), linear-gradient(to left, rgba(20,15,60,0.72) 0%, rgba(20,15,60,0) 32%)",
          }}
        />

        {children}
      </div>
    </section>
  );
}
