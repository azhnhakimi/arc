import { createEvent } from "@/utils/events/api";
import { CreateEventPayload } from "@/utils/events/types";
import { useState } from "react";

export function useCreateEvent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (payload: CreateEventPayload) => {
    setLoading(true);
    setError(null);
    try {
      const data = await createEvent(payload);
      return data;
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error };
}
