const KOREAN_WEEKDAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"];

export function formatKoreanDateWithWeekday(dateStr?: string): string {
  if (!dateStr) return "";

  const date = new Date(dateStr);

  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 (${KOREAN_WEEKDAY_LABELS[date.getDay()]})`;
}
