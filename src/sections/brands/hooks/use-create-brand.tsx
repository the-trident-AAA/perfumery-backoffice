"use client";
import { useCallback, useState } from "react";
import { createBrand as createBrandService } from "@/services/brands";
import { BrandCreate } from "../form/new/schemas/brand-create-schema";
import { convertBrandCreateDTO } from "@/types/brands";

interface Props {
  onCreateAction: () => void;
}

export default function useCreateBrand({ onCreateAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBrand = useCallback(async (brand: BrandCreate) => {
    try {
      setLoading(true);
      setError(null);
      const res = await createBrandService(convertBrandCreateDTO(brand));
      if (!res.response || res.error)
        setError("Error en la creación de la marca del perfume");
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
    createBrand,
  };
}
