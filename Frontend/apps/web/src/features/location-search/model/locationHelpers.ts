const KEYWORD_EMOJI_MAP: Array<[string, string]> = [
  ["숲카페", "🌿"],
  ["카페", "☕"],
  ["전시회", "🎨"],
  ["전시", "🎨"],
  ["산책로", "🚶"],
  ["산책", "🚶"],
  ["서점", "📚"],
  ["도서관", "📚"],
  ["공원", "🌿"],
  ["강", "🌊"],
  ["하천", "🌊"],
  ["수영장", "🏊"],
  ["온천", "♨️"],
  ["찜질", "♨️"],
  ["바다", "🌊"],
  ["산", "⛰️"],
  ["사찰", "🏯"],
  ["절", "🏯"],
  ["미술관", "🖼️"],
  ["박물관", "🏛️"],
  ["공방", "🎨"],
  ["체험", "✨"],
];

export function getKeywordEmoji(keyword: string): string {
  for (const [key, emoji] of KEYWORD_EMOJI_MAP) {
    if (keyword.includes(key)) return emoji;
  }
  return "📍";
}

export function formatDistance(meters: number | undefined): string {
  if (meters === undefined) return "";
  if (meters < 1000) return `${meters}m`;
  return `${(meters / 1000).toFixed(1)}km`;
}
