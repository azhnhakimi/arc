import { deleteEvent } from "@/utils/events/api";
import { useState } from "react";

export function useDeleteEvent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteEvent(id);
      return true;
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { remove, loading, error };
}
