"use client";
import { useCallback, useState } from "react";
import { createOffer as createOfferService } from "@/services/offers";
import { OfferCreate } from "../form/new/schemas/offer-create-schema";
import { convertOfferCreateDTO } from "@/types/offers";

interface Props {
  onCreateAction: () => void;
}

export default function useCreateOffer({ onCreateAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOffer = useCallback(
    async (offer: OfferCreate) => {
      const { image, mobileImage, ...rest } = offer;
      try {
        setLoading(true);
        setError(null);
        // create form data for image
        const formDataWithImage = new FormData();
        if (image) formDataWithImage.append("image", image);
        if (mobileImage) formDataWithImage.append("mobileImage", mobileImage);
        const res = await createOfferService(
          convertOfferCreateDTO(rest),
          formDataWithImage
        );
        if (!res.response || res.error)
          setError("Error en la creación de la oferta");
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
    createOffer,
  };
}
