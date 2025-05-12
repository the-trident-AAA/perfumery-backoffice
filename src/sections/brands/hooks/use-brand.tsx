"use client";

import { getBrandById } from "@/services/brands";
import { BrandDetails } from "@/types/brands";
import { useCallback, useEffect, useState } from "react";

interface Props {
  id: string | null;
}

export default function useBrand({ id }: Props) {
  const [brand, setBrand] = useState<BrandDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchBrand = useCallback(async () => {
    if (id) {
      setLoading(true);
      setError(null);
      try {
        const res = await getBrandById(id);

        if (!res.response || res.error)
          throw new Error("Error al cargar la información de la marca");

        setBrand(res.response);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchBrand();
  }, [fetchBrand]);
  return { brand, error, loading, fetchBrand };
}
