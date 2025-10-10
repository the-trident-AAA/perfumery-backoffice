"use client";
import { deleteBrand as deleteBrandService } from "@/services/brands";
import { useCallback, useState } from "react";

interface Props {
  id: string | null;
  onDeleteAction: () => void;
}

export default function useDeleteBrand({ id, onDeleteAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const deleteBrand = useCallback(async () => {
    if (id) {
      setLoading(true);
      setError(null);
      try {
        const res = await deleteBrandService(id);

        if (!res.response || res.error)
          setError(res.error?.reason || "Error en la eliminación de la marca");
        else onDeleteAction();
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  }, [id, onDeleteAction]);

  return { error, loading, deleteBrand };
}
