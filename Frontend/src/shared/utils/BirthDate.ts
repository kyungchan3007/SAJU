export function parseBirthMonthDay(value: string) {
  const compact = value.replace(/\s/g, "");
  const match = compact.match(/^(\d{1,2})[\/.-]?(\d{1,2})$/);

  if (!match) {
    return null;
  }

  const month = Number(match[1]);
  const day = Number(match[2]);

  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return null;
  }

  return { month, day };
}

export function isValidBirthMonthDay(value: string) {
  return parseBirthMonthDay(value) !== null;
}

export function toBackendBirthDate(
  birthYear: string,
  birthDate: string,
): string | null {
  const trimmedYear = birthYear.trim();
  const monthDay = parseBirthMonthDay(birthDate);

  if (!/^\d{4}$/.test(trimmedYear) || !monthDay) {
    return null;
  }

  return `${trimmedYear}-${String(monthDay.month).padStart(2, "0")}-${String(monthDay.day).padStart(2, "0")}`;
}
