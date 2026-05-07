import { type TimeInfo } from "./events/types";

export function extractTimeInfo(starts_at: string): TimeInfo {
  const date = new Date(starts_at);

  let hours = date.getHours();
  const minutes = date.getMinutes();

  const period: "AM" | "PM" = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;

  const paddedMinutes = minutes.toString().padStart(2, "0");

  return {
    time: `${hours}:${paddedMinutes}`,
    period,
  };
}
