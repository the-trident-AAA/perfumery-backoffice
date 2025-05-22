"use client";
import { deletePerfumeType as deletePerfumeTypeService } from "@/services/perfume-types";
import { useCallback, useState } from "react";

interface Props {
  id: string | null;
  onDeleteAction: () => void;
}

export default function useDeletePerfumeType({ id, onDeleteAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const deletePerfumeType = useCallback(async () => {
    if (id) {
      setLoading(true);
      setError(null);
      try {
        const res = await deletePerfumeTypeService(id);

        if (!res.response || res.error)
          throw new Error("Error durante la eliminación del Tipo de Perfume");
        else onDeleteAction();
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  }, [id, onDeleteAction]);

  return { error, loading, deletePerfumeType };
}
