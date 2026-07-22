import type { YongshinImageKey } from "@/shared/model/five-elements/model";

export function getSajuHeroImageSrc(
  elementImageKey: YongshinImageKey | string | null | undefined,
  gender: string,
): string | null {
  if (!elementImageKey) return null;

  return `/image/fortune-hero/saju-profile-${elementImageKey}-${gender}_hero.webp`;
}
