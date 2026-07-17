import { permanentRedirect } from "next/navigation";

export function redirectToZodiacGuide() {
  permanentRedirect("/blog/2026-zodiac-fortune");
}
