import Image, { getImageProps } from "next/image";

// [DS] 역할: 사주/운세 계열 히어로에서 공통으로 쓰는 이미지 배경 카드 shell.
// [DS] 현재 사용처: 사주 미리보기 히어로, 궁합 히어로, 정통사주 히어로.
type SajuHeroCardShellProps = {
  imageSrc?: string | null;
  imageWidth?: number;
  imageHeight?: number;
  mobileImageSrc?: string | null;
  mobileImageWidth?: number;
  mobileImageHeight?: number;
  imageAlt: string;
  children: React.ReactNode;
};

export function SajuHeroCardShell({
  imageSrc,
  imageWidth,
  imageHeight,
  mobileImageSrc,
  mobileImageWidth,
  mobileImageHeight,
  imageAlt,
  children,
}: SajuHeroCardShellProps) {
  const useResponsiveSources =
    !!imageSrc &&
    !!mobileImageSrc &&
    !!imageWidth &&
    !!imageHeight &&
    !!mobileImageWidth &&
    !!mobileImageHeight;

  const desktopImageProps = useResponsiveSources
    ? getImageProps({
        src: imageSrc,
        alt: imageAlt,
        width: imageWidth,
        height: imageHeight,
        sizes: "(max-width: 768px) 100vw, 1200px",
        quality: 75,
      }).props
    : null;

  const mobileImageProps = useResponsiveSources
    ? getImageProps({
        src: mobileImageSrc,
        alt: imageAlt,
        width: mobileImageWidth,
        height: mobileImageHeight,
        sizes: "100vw",
        quality: 70,
      }).props
    : null;

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

        {useResponsiveSources && desktopImageProps && mobileImageProps ? (
          <picture className="absolute inset-0">
            <source
              media="(max-width: 767px)"
              srcSet={mobileImageProps.srcSet}
              sizes={mobileImageProps.sizes}
              type="image/webp"
            />
            <source
              media="(min-width: 768px)"
              srcSet={desktopImageProps.srcSet}
              sizes={desktopImageProps.sizes}
              type="image/webp"
            />
            <img
              {...desktopImageProps}
              className="h-full w-full object-cover object-center md:object-[60%_10%]"
            />
          </picture>
        ) : (
          imageSrc && (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover object-center md:object-[60%_10%]"
          />
          )
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
