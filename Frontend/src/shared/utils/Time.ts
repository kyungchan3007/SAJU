export function parseTimeParts(time?: string | null) {
  if (!time) {
    return { hour: "", minute: "" };
  }

  const [hour, minute] = time.split(":");

  return {
    hour: hour ? String(Number(hour)) : "",
    minute: minute ? String(Number(minute)) : "",
  };
}
