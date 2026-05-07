import { getEventsByDate } from "@/utils/events/api";
import { Event } from "@/utils/events/types";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

export function useEvents(date: Date) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getEventsByDate(date);
        setEvents(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [date]);

  useFocusEffect(fetchEvents);

  return { events, loading, error };
}
