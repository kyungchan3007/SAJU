import {
  formatYongshinDisplayLabel,
  getYongshinDisplayInfo,
} from "@/shared/model/five-elements/utils";

export function formatWeakElementLabel(
  weakElement: string | null | undefined,
): string {
  if (!weakElement) return "-";

  return formatYongshinDisplayLabel(weakElement) ?? weakElement;
}

export function getWeakElementDisplayInfo(
  weakElement: string | null | undefined,
) {
  return getYongshinDisplayInfo(weakElement);
}
