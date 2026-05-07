import { type TimeInfo } from "./events/types";

export function extractTimeInfo(starts_at?: string): TimeInfo | undefined {
  if (!starts_at) return;

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

type FormattedDateTime = {
  date: string;
  time: string;
  full: string;
};

export function formatDateTime(
  dateString?: string,
): FormattedDateTime | undefined {
  if (!dateString) return;

  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return {
    date: formattedDate,
    time: formattedTime,
    full: `${formattedDate} • ${formattedTime}`,
  };
}

export const formatLocalDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
