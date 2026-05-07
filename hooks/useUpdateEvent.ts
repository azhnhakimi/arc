import { updateEvent } from "@/utils/events/api";
import { CreateEventPayload } from "@/utils/events/types";
import { useState } from "react";

export function useUpdateEvent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = async (id: string, payload: Partial<CreateEventPayload>) => {
    setLoading(true);
    setError(null);
    try {
      const data = await updateEvent(id, payload);
      return data;
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { update, loading, error };
}
