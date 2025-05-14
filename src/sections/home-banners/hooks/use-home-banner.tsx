"use client";
import { getHomeBannerById } from "@/services/home-banners";
import { HomeBannerDetails } from "@/types/home-banners";
import { useCallback, useEffect, useState } from "react";

interface Props {
  id: string | null;
}

export default function useHomeBanner({ id }: Props) {
  const [homeBanner, setHomeBanner] = useState<HomeBannerDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchHomeBanner = useCallback(async () => {
    if (id) {
      setLoading(true);
      setError(null);
      try {
        const res = await getHomeBannerById(id);

        if (!res.response || res.error)
          throw new Error("Error al cargar la información del home-banner");

        setHomeBanner(res.response);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchHomeBanner();
  }, [fetchHomeBanner]);
  return { homeBanner, error, loading, fetchHomeBanner };
}
