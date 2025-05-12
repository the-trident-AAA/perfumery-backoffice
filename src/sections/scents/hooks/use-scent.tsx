"use client";
import { getScentById } from "@/services/scents";
import { ScentDetails } from "@/types/scents";
import { useCallback, useEffect, useState } from "react";

interface Props {
  id: string | null;
}

export default function useScent({ id }: Props) {
  const [scent, setScent] = useState<ScentDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchScent = useCallback(async () => {
    if (id) {
      setLoading(true);
      setError(null);
      try {
        const res = await getScentById(id);

        if (!res.response || res.error)
          throw new Error("Error al cargar la información del aroma");

        setScent(res.response);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchScent();
  }, [fetchScent]);
  return { scent, error, loading, fetchScent };
}
