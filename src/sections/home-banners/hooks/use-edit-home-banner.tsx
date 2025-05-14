"use client";
import { useCallback, useState } from "react";
import { editHomeBanner as editHomeBannerService } from "@/services/home-banners";
import { convertHomeBannerEditDTO } from "@/types/home-banners";
import { HomeBannerCreate } from "../form/new/schemas/home-banner-create-schema";

interface Props {
  id: string;
  onEditAction: () => void;
}

export default function useEditHomeBanner({ id, onEditAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editHomeBanner = useCallback(
    async (homeBanner: HomeBannerCreate) => {
      try {
        setLoading(true);
        setError(null);
        const res = await editHomeBannerService(
          id,
          convertHomeBannerEditDTO(homeBanner)
        );
        if (!res.response || res.error) {
          console.log(res.error);
          setError("Error en la edición del home-banner");
        } else {
          onEditAction();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [onEditAction]
  );
  return {
    loading,
    error,
    editHomeBanner,
  };
}
