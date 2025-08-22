"use client";
import { useCallback, useState } from "react";
import { markedAsMain as markedAsMainService } from "@/services/home-banners";

interface Props {
  onMarkedAsMainAction: () => void;
}

export default function useMarkedAsMain({ onMarkedAsMainAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const markedAsMain = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        setError(null);

        const res = await markedAsMainService(id);
        if (!res.response || res.error) {
          console.log(res.error);
          setError("Error en el proceso de marcar como activo al banner");
        } else {
          onMarkedAsMainAction();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [onMarkedAsMainAction]
  );
  return {
    loading,
    error,
    markedAsMain,
  };
}
