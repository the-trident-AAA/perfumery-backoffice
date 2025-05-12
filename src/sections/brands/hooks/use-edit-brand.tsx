"use client";
import { useCallback, useState } from "react";
import { editBrand as editBrandService } from "@/services/brands";
import { convertPerfumeEditDTO } from "@/types/perfumes";
import { BrandCreate } from "../form/new/schemas/brand-create-schema";
import { convertBrandEditDTO } from "@/types/brands";

interface Props {
  id: string;
  onEditAction: () => void;
}

export default function useEditBrand({ id, onEditAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editBrand = useCallback(
    async (brand: BrandCreate) => {
      try {
        setLoading(true);
        setError(null);
        const res = await editBrandService(
          id,
          convertBrandEditDTO(brand)
        );
        if (!res.response || res.error)
          setError("Error en la edición de la marca");
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
    editBrand,
  };
}
