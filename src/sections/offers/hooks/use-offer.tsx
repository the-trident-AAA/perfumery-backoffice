"use client";
import { getOfferById } from "@/services/offers";
import { OfferDetails } from "@/types/offers";
import { useCallback, useEffect, useState } from "react";

interface Props {
  id: string | null;
}

export default function useOffer({ id }: Props) {
  const [offer, setOffer] = useState<OfferDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchOffer = useCallback(async () => {
    if (id) {
      setLoading(true);
      setError(null);
      try {
        const res = await getOfferById(id);

        if (!res.response || res.error)
          throw new Error("Error al cargar la información de la oferta");

        setOffer(res.response);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchOffer();
  }, [fetchOffer]);
  return { offer, error, loading, fetchOffer };
}
