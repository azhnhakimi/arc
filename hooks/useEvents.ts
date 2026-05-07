import {
  getEventById,
  getEventDatesForMonth,
  getEventsByDate,
} from "@/utils/events/api";
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

export function useEvent(id: string) {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        setLoading(true);
        try {
          const data = await getEventById(id);
          setEvent(data);
        } catch (e: any) {
          setError(e.message);
        } finally {
          setLoading(false);
        }
      };
      load();
    }, [id]),
  );

  return { event, loading, error };
}

export function useMonthEvents(year: number, month: number) {
  const [eventDates, setEventDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        setLoading(true);
        try {
          const dates = await getEventDatesForMonth(year, month);
          setEventDates(dates);
        } catch (e: any) {
          console.error(e.message);
        } finally {
          setLoading(false);
        }
      };
      load();
    }, [year, month]),
  );

  return { eventDates, loading };
}
