"use client";
import { useCallback, useState } from "react";
import { createScent as createScentService } from "@/services/scents";
import { ScentCreate } from "../form/new/schemas/scent-create-schema";
import { convertScentCreateDTO } from "@/types/scents";


interface Props {
  onCreateAction: () => void;
}

export default function useCreateScent({ onCreateAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createScent = useCallback(async (scent: ScentCreate) => {
    try {
      setLoading(true);
      setError(null);
      const res = await createScentService(convertScentCreateDTO(scent));
      if (!res.response || res.error)
        setError("Error en la creación del aroma del perfume");
      else {
        onCreateAction();
      }
    } catch (error) {
        console.log(error)
    } finally {
      setLoading(false);
    }
  }, [onCreateAction]);
  return {
    loading,
    error,
    createScent,
  };
}
