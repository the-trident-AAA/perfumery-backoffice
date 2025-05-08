"use client";

import { getPerfumeById } from "@/services/perfumes";
import { PerfumeDetails } from "@/types/perfumes";
import { useCallback, useEffect, useState } from "react";

interface Props {
  id: string | null;
}

export default function usePerfume({ id }: Props) {
  const [perfume, setPerfume] = useState<PerfumeDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchPerfume = useCallback(async () => {
    if (id) {
      setLoading(true);
      setError(null);
      try {
        const res = await getPerfumeById(id);

        if (!res.response || res.error)
          throw new Error("Error al cargar la información del perfume");

        setPerfume(res.response);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchPerfume();
  }, [fetchPerfume]);
  return { perfume, error, loading, fetchPerfume };
}
