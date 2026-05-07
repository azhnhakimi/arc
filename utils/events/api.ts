import { supabase } from "@/lib/supabase";
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
