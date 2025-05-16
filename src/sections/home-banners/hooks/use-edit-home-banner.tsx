"use client";
import { useCallback, useState } from "react";
import { editHomeBanner as editHomeBannerService } from "@/services/home-banners";
import { convertHomeBannerEditDTO } from "@/types/home-banners";
import { HomeBannerEdit } from "../form/edit/schemas/home-banner-edit-schema";

interface Props {
  id: string;
  onEditAction: () => void;
}

export default function useEditHomeBanner({ id, onEditAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editHomeBanner = useCallback(
    async (homeBanner: HomeBannerEdit) => {
      try {
        setLoading(true);
        setError(null);
        // create form data for image
        const formDataWithImage = new FormData();
        formDataWithImage.append("image", homeBanner.image);
        const res = await editHomeBannerService(
          id,
          convertHomeBannerEditDTO(homeBanner),
          formDataWithImage
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
    [id, onEditAction]
  );
  return {
    loading,
    error,
    editHomeBanner,
  };
}
