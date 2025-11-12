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
      const { image, ...rest } = homeBanner;
      try {
        setLoading(true);
        setError(null);
        // create form data for image
        const formData = new FormData();
        formData.append("image", image);
        const res = await createHomeBannerService(
          convertHomeBannerCreateDTO(rest),
          formData
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
