"use client";
import { useCallback, useState } from "react";
import { createPerfumeType as createPerfumeTypeService } from "@/services/perfume-types";
import { PerfumeTypeCreate } from "../form/new/schemas/perfume-type-create-schema";
import { convertPerfumeTypeCreateDTO } from "@/types/perfume-types";

interface Props {
  onCreateAction: () => void;
}

export default function useCreatePerfumeType({ onCreateAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPerfumeType = useCallback(
    async (perfumeType: PerfumeTypeCreate) => {
      try {
        setLoading(true);
        setError(null);
        // create form data for image
        const formDataWithImage = new FormData();
        if (perfumeType.image)
          formDataWithImage.append("image", perfumeType.image);
        const res = await createPerfumeTypeService(
          convertPerfumeTypeCreateDTO(perfumeType),
          formDataWithImage
        );
        if (!res.response || res.error)
          setError("Error en la creación del tipo de perfume");
        else {
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
    createPerfumeType,
  };
}
