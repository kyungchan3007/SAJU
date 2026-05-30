import { YONGSHIN_DISPLAY_BY_IMAGE_KEY } from "@/shared/model/five-elements/model";
import { normalizeYongshinImageKey } from "@/shared/model/five-elements/utils";

export function formatWeakElementLabel(
  weakElement: string | null | undefined,
): string {
  if (!weakElement) return "-";

  const key = normalizeYongshinImageKey(weakElement);
  if (!key) return weakElement;

  const info = YONGSHIN_DISPLAY_BY_IMAGE_KEY[key];
  return `${info.ko}(${info.hanja})`;
}

export function getWeakElementDisplayInfo(
  weakElement: string | null | undefined,
) {
  if (!weakElement) return null;

  const key = normalizeYongshinImageKey(weakElement);
  if (!key) return null;

  return YONGSHIN_DISPLAY_BY_IMAGE_KEY[key];
}
