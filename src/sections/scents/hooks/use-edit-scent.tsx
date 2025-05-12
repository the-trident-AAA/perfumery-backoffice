"use client";
import { useCallback, useState } from "react";
import { editScent as editScentService } from "@/services/scents";
import { ScentCreate } from "../form/new/schemas/scent-create-schema";
import { convertScentEditDTO } from "@/types/scents";


interface Props {
  id: string;
  onEditAction: () => void;
}

export default function useEditScent({ id, onEditAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editScent = useCallback(
    async (scent: ScentCreate) => {
      try {
        setLoading(true);
        setError(null);
        const res = await editScentService(
          id,
          convertScentEditDTO(scent)
        );
        if (!res.response || res.error)
          setError("Error en la edición del aroma");
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
    editScent,
  };
}
