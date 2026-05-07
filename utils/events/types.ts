export type TimeInfo = {
  time: string;
  period: "AM" | "PM";
};

export type Event = {
  id: string;
  title: string;
  description?: string;
  starts_at: string;
  location?: string;
};

export type CreateEventPayload = Omit<Event, "id">;
