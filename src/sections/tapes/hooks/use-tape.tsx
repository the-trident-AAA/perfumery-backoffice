"use client";
import { getTapeById } from "@/services/tapes";
import { TapeDetails } from "@/types/tapes";
import { useCallback, useEffect, useState } from "react";

interface Props {
  id: string | null;
}

export default function useTape({ id }: Props) {
  const [tape, setTape] = useState<TapeDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchTape = useCallback(async () => {
    if (id) {
      setLoading(true);
      setError(null);
      try {
        const res = await getTapeById(id);

        if (!res.response || res.error)
          throw new Error("Error al cargar la información de la cinta");

        setTape(res.response);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchTape();
  }, [fetchTape]);
  return { tape, error, loading, fetchTape };
}
