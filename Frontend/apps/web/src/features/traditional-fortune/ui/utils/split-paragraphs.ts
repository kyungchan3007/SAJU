export function splitParagraphs(text?: string): string[] {
  if (!text) return [];
  return text
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}
