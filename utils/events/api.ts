import { supabase } from "@/lib/supabase";
import { formatLocalDate } from "../helpers";
import { CreateEventPayload } from "./types";

export async function createEvent(payload: CreateEventPayload) {
  const { data, error } = await supabase
    .from("events")
    .insert(payload)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateEvent(
  id: string,
  payload: Partial<CreateEventPayload>,
) {
  const { data, error } = await supabase
    .from("events")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteEvent(id: string) {
  const { error } = await supabase.from("events").delete().eq("id", id);

  if (error) throw error;
}

export async function getEventsByDate(date: Date) {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .gte("starts_at", start.toISOString())
    .lte("starts_at", end.toISOString())
    .order("starts_at", { ascending: true });

  if (error) throw error;
  return data;
}

export async function getEventById(id: string) {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function getEventDatesForMonth(
  year: number,
  month: number,
): Promise<string[]> {
  const start = new Date(Date.UTC(year, month, 1));
  const end = new Date(Date.UTC(year, month + 1, 1));

  const { data, error } = await supabase
    .from("events")
    .select("starts_at")
    .gte("starts_at", start.toISOString())
    .lt("starts_at", end.toISOString());

  if (error) throw error;

  const uniqueDates = [
    ...new Set(data.map((e) => formatLocalDate(new Date(e.starts_at)))),
  ];

  return uniqueDates;
}
