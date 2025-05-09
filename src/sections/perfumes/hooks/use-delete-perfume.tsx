"use client";
import { deletePerfume as deletePerfumeService } from "@/services/perfumes";
import { useCallback, useState } from "react";

interface Props {
  id: string | null;
  onDeleteAction: () => void;
}

export default function useDeletePerfume({ id, onDeleteAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const deletePerfume = useCallback(async () => {
    if (id) {
      setLoading(true);
      setError(null);
      try {
        const res = await deletePerfumeService(id);

        if (!res.response || res.error)
          throw new Error("Error durante la eliminación del perfume");
        else onDeleteAction();
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  }, [id]);

  return { error, loading, deletePerfume };
}
