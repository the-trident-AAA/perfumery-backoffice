"use client";
import { useCallback, useState } from "react";
import { createTape as createTapeService } from "@/services/tapes";
import { TapeCreate } from "../form/new/schemas/tape-create-schema";
import { convertTapeCreateDTO } from "@/types/tapes";

interface Props {
  onCreateAction: () => void;
}

export default function useCreateTape({ onCreateAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTape = useCallback(
    async (tape: TapeCreate) => {
      const { images, ...rest } = tape;
      try {
        setLoading(true);
        setError(null);
        // create form data for images
        const formData = new FormData();
        images.forEach((image) => {
          formData.append("images[]", image);
        });
        const res = await createTapeService(
          convertTapeCreateDTO(rest),
          formData
        );
        if (!res.response || res.error) {
          console.log(res.error);
          setError("Error en la creación de la cinta");
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
    createTape,
  };
}
