"use client";
import { makeAsHiddenPerfume as makeAsHiddenPerfumeService } from "@/services/perfumes";
import { useCallback, useState } from "react";

interface Props {
  id: string | null;
  onHiddenAction: () => void;
}

export default function useMakeAsHiddenPerfume({ id, onHiddenAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const makeAsHiddenPerfume = useCallback(async () => {
    if (id) {
      setLoading(true);
      setError(null);
      try {
        const res = await makeAsHiddenPerfumeService(id);

        if (!res.response || res.error)
          setError(res.error?.reason || "Error al ocultar perfume");
        else onHiddenAction();
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  }, [id, onHiddenAction]);

  return { error, loading, makeAsHiddenPerfume };
}
