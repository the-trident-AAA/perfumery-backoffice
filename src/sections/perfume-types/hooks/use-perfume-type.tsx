"use client";
import { getPerfumeTypeById } from "@/services/perfume-types";
import { PerfumeTypeDetails } from "@/types/perfume-types";
import { useCallback, useEffect, useState } from "react";

interface Props {
  id: string | null;
}

export default function usePerfumeType({ id }: Props) {
  const [perfumeType, setPerfumeType] = useState<PerfumeTypeDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchPerfumeType = useCallback(async () => {
    if (id) {
      setLoading(true);
      setError(null);
      try {
        const res = await getPerfumeTypeById(id);

        if (!res.response || res.error)
          throw new Error("Error al cargar la información de la marca");

        setPerfumeType(res.response);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchPerfumeType();
  }, [fetchPerfumeType]);
  return { perfumeType, error, loading, fetchPerfumeType };
}
