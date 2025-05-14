"use client";
import { deleteHomeBanner as deleteHomeBannerService } from "@/services/home-banners";
import { useCallback, useState } from "react";

interface Props {
  id: string | null;
  onDeleteAction: () => void;
}

export default function useDeleteHomeBanner({ id, onDeleteAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const deleteHomeBanner = useCallback(async () => {
    if (id) {
      setLoading(true);
      setError(null);
      try {
        const res = await deleteHomeBannerService(id);

        if (!res.response || res.error)
          throw new Error("Error durante la eliminación del home-banner");
        else onDeleteAction();
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  }, [id, onDeleteAction]);

  return { error, loading, deleteHomeBanner };
}
