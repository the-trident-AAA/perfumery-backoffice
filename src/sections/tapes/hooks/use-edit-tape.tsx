"use client";
import { useCallback, useState } from "react";
import { editTape as editTapeService } from "@/services/tapes";
import { TapeEdit } from "../form/edit/schemas/tape-edit-schema";
import { convertTapeEditDTO } from "@/types/tapes";

interface Props {
  id: string;
  onEditAction: () => void;
}

export default function useEditTape({ id, onEditAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editTape = useCallback(
    async (tape: TapeEdit) => {
      const { image, ...rest } = tape;
      try {
        setLoading(true);
        setError(null);
        // create form data for image
        const formData = new FormData();
        formData.append("image", image);
        const res = await editTapeService(
          id,
          convertTapeEditDTO(rest),
          formData
        );
        if (!res.response || res.error) {
          console.log(res.error);
          setError("Error en la edición de la cinta");
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
    editTape,
  };
}
