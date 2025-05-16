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
      try {
        setLoading(true);
        setError(null);
        // create form data for image
        const formDataWithImage = new FormData();
        if (offer.image) formDataWithImage.append("image", offer.image);
        const res = await createOfferService(
          convertOfferCreateDTO(offer),
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
