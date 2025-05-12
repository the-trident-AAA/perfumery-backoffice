"use client";
import { useCallback, useState } from "react";
import { editPerfumeType as editPerfumetypeService } from "@/services/perfume-types";
import { PerfumeTypeCreate } from "../form/new/schemas/perfume-type-create-schema";
import { convertPerfumeTypeEditDTO } from "@/types/perfume-types";


interface Props {
  id: string;
  onEditAction: () => void;
}

export default function useEditPerfumeType({ id, onEditAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editPerfumeType = useCallback(
    async (perfumeType: PerfumeTypeCreate) => {
      try {
        setLoading(true);
        setError(null);
        const res = await editPerfumetypeService(
          id,
          convertPerfumeTypeEditDTO(perfumeType)
        );
        if (!res.response || res.error)
          setError("Error en la edición del tipo de perfume");
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
    editPerfumeType,
  };
}
