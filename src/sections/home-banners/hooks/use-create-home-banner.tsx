"use client";
import { useCallback, useState } from "react";
import { createHomeBanner as createHomeBannerService } from "@/services/home-banners";
import { convertHomeBannerCreateDTO } from "@/types/home-banners";
import { HomeBannerCreate } from "../form/new/schemas/home-banner-create-schema";

interface Props {
  onCreateAction: () => void;
}

export default function useCreateHomeBanner({ onCreateAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createHomeBanner = useCallback(
    async (homeBanner: HomeBannerCreate) => {
      try {
        setLoading(true);
        setError(null);
        const res = await createHomeBannerService(
          convertHomeBannerCreateDTO(homeBanner)
        );
        if (!res.response || res.error) {
          console.log(res.error);
          setError("Error en la creación del home-banner");
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
    createHomeBanner,
  };
}
