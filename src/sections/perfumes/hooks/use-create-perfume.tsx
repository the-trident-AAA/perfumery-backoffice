"use client";
import { useCallback, useState } from "react";
import { PerfumeCreate } from "../form/new/schemas/perfume-create-schema";
import { createPerfume as createPerfumeService } from "@/services/perfumes";
import { convertPerfumeCreateDTO } from "@/types/perfumes";

interface Props {
  onCreateAction: () => void;
}

export default function useCreatePerfume({ onCreateAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPerfume = useCallback(async (perfume: PerfumeCreate) => {
    try {
      setLoading(true);
      setError(null);
      const res = await createPerfumeService(convertPerfumeCreateDTO(perfume));
      if (!res.response || res.error)
        setError("Error en la creación del perfume");
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
    createPerfume,
  };
}
