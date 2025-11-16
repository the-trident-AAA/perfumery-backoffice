"use client";
import { useCallback, useState } from "react";
import { editOffer as editOfferService } from "@/services/offers";
import { OfferEdit } from "../form/edit/schemas/offer-edit-schema";
import { convertOfferEditDTO } from "@/types/offers";

interface Props {
  id: string;
  onEditAction: () => void;
}

export default function useEditOffer({ id, onEditAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editOffer = useCallback(
    async (offer: OfferEdit) => {
      const { image, mobileImage, ...rest } = offer;
      try {
        setLoading(true);
        setError(null);
        // create form data for image
        const formDataWithImage = new FormData();
        if (image) formDataWithImage.append("image", image);
        if (mobileImage) formDataWithImage.append("mobileImage", mobileImage);
        const res = await editOfferService(
          id,
          convertOfferEditDTO(rest),
          formDataWithImage
        );
        if (!res.response || res.error)
          setError("Error en la edición de la oferta");
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
    editOffer,
  };
}
