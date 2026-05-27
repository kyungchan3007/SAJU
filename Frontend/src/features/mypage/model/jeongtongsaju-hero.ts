import {
  FIVE_ELEMENT_CONFIG,
  FIVE_ELEMENT_ORDER,
  YONGSHIN_DISPLAY_BY_IMAGE_KEY,
  type FiveElementKey,
} from "@/shared/model/five-elements/model";
import { normalizeYongshinImageKey } from "@/shared/model/five-elements/utils";
import { getSajuHeroImageSrc } from "@/shared/model/saju-hero-image/utils";

type HeroElements = Record<string, number> | undefined;

export function getJeongtongsajuHeroImageSrc(
  _yongshinPrimary: string | undefined,
  gender: string,
) {
  return getSajuHeroImageSrc("fire", gender);
}

export function getYongshinDisplayInfo(yongshin: string | undefined) {
  const yongshinImageKey = normalizeYongshinImageKey(yongshin);
  if (!yongshinImageKey) return null;

  return YONGSHIN_DISPLAY_BY_IMAGE_KEY[yongshinImageKey];
}

export function getOrderedHeroElements(elements: HeroElements) {
  return FIVE_ELEMENT_ORDER.map((key) => {
    const val = elements?.[key] ?? 0;
    const cfg = FIVE_ELEMENT_CONFIG[key as FiveElementKey];
    return { key, val, cfg };
  }).filter(({ val }) => val > 0);
}
