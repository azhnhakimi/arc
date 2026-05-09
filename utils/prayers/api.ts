import { supabase } from "@/lib/supabase";
import type { PrayerTimesDayResponse, Zone } from "./types";

const BASE_URL = "https://api.waktusolat.app";

export async function fetchZones(): Promise<Zone[]> {
  const response = await fetch(`${BASE_URL}/zones`);

  if (!response.ok) {
    throw new Error("Failed to fetch zones");
  }

  return response.json();
}

export async function fetchPrayerTimesForDay(
  jakimCode: string | null,
  date: Date,
): Promise<PrayerTimesDayResponse> {
  const year = date.getFullYear();

  const month = date.getMonth() + 1;

  const day = date.getDate();

  const response = await fetch(
    `${BASE_URL}/solat/${jakimCode}/${day}?year=${year}&month=${month}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch prayer times");
  }

  return response.json();
}

export async function fetchPrayerLogs(date: string) {
  const { data, error } = await supabase
    .from("prayer_logs")
    .select("*")
    .eq("date", date);

  if (error) throw error;

  return data;
}

export async function upsertPrayerLog(
  date: string,
  prayerName: string,
  completed: boolean,
) {
  const { data, error } = await supabase
    .from("prayer_logs")
    .upsert(
      {
        date,
        prayer_name: prayerName,
        completed,
      },
      {
        onConflict: "date,prayer_name",
      },
    )
    .select();

  if (error) throw error;

  return data;
}

export async function fetchMonthlyPrayerLogs(year: number, month: number) {
  const start = new Date(Date.UTC(year, month - 1, 1));

  const today = new Date();

  const monthEnd = new Date(Date.UTC(year, month, 0, 23, 59, 59));

  const end = monthEnd > today ? today : monthEnd;

  const { data, error } = await supabase
    .from("prayer_logs")
    .select("*")
    .gte("date", start.toISOString().split("T")[0])
    .lte("date", end.toISOString().split("T")[0]);

  if (error) throw error;

  return data;
}
