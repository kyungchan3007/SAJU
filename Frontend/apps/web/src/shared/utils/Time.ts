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

export function buildTimeString(hour: string, minute: string) {
  if (!hour && !minute) {
    return "";
  }

  const formattedHour = hour ? hour.padStart(2, "0") : "";
  const formattedMinute = minute ? minute.padStart(2, "0") : "";

  return `${formattedHour}:${formattedMinute}`;
}

export function updateTimeStringPart(
  time: string | null | undefined,
  part: "hour" | "minute",
  value: string,
) {
  const { hour, minute } = parseTimeParts(time);

  return buildTimeString(
    part === "hour" ? value : hour,
    part === "minute" ? value : minute,
  );
}
