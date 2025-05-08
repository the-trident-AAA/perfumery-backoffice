"use client";
import { useCallback, useState } from "react";
import { PerfumeCreate } from "../form/new/schemas/perfume-create-schema";
import { editPerfume as editPerfumeService } from "@/services/perfumes";
import { convertPerfumeEditDTO } from "@/types/perfumes";

interface Props {
  id: string;
  onEditAction: () => void;
}

export default function useEditPerfume({ id, onEditAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editPerfume = useCallback(
    async (perfume: PerfumeCreate) => {
      try {
        setLoading(true);
        setError(null);
        const res = await editPerfumeService(
          id,
          convertPerfumeEditDTO(perfume)
        );
        if (!res.response || res.error)
          setError("Error en la edición del perfume");
        else {
          onEditAction();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [onEditAction, id]
  );
  return {
    loading,
    error,
    editPerfume,
  };
}
