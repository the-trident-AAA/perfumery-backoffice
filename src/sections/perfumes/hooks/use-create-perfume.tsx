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

  const createPerfume = useCallback(
    async (perfume: PerfumeCreate) => {
      try {
        setLoading(true);
        setError(null);
        // create form data for image
        const formDataWithImage = new FormData();
        formDataWithImage.append("image", perfume.image);
        const res = await createPerfumeService(
          convertPerfumeCreateDTO(perfume),
          formDataWithImage
        );
        if (!res.response || res.error) {
          console.log(res.error);
          setError("Error en la creación del perfume");
        } else {
          onCreateAction();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [onCreateAction]
  );
  return {
    loading,
    error,
    createPerfume,
  };
}
