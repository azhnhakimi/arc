type TimeInfo = {
  time: string;
  period: "AM" | "PM";
};

export type Event = {
  title: string;
  description?: string;
  starts_at: string;
  location?: string;
};

export const mockEvents: Event[] = [
  {
    title: "Team Standup",
    description: "Daily sync with the dev team",
    starts_at: "2026-05-05T01:00:00.000Z",
    location: "Google Meet",
  },
  {
    title: "Lunch with Alex",
    starts_at: "2026-05-05T04:30:00.000Z",
    location: "Downtown Cafe",
  },
  {
    title: "Project Review",
    description: "Review Q2 progress and blockers",
    starts_at: "2026-05-06T07:15:00.000Z",
    location: "Office Meeting Room A",
  },
  {
    title: "Gym Session",
    starts_at: "2026-05-06T10:00:00.000Z",
  },
  {
    title: "Client Call",
    description: "Discuss new requirements",
    starts_at: "2026-05-07T02:45:00.000Z",
    location: "Zoom",
  },
  {
    title: "Dinner with Family",
    starts_at: "2026-05-07T11:30:00.000Z",
    location: "Home",
  },
];

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
