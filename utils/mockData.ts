import { type Event } from "./events/types";

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Team Standup",
    description: "Daily sync with the dev team",
    starts_at: "2026-05-05T01:00:00.000Z",
    location: "Google Meet",
  },
  {
    id: "2",
    title: "Lunch with Alex",
    starts_at: "2026-05-05T04:30:00.000Z",
    location: "Downtown Cafe",
  },
];
