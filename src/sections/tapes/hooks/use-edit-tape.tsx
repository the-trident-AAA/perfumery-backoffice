"use client";
import { useCallback, useState } from "react";
import { editTape as editTapeService } from "@/services/tapes";
import { convertHomeBannerEditDTO } from "@/types/home-banners";
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
      const { images, ...rest } = tape;
      try {
        setLoading(true);
        setError(null);
        // create form data for images
        const formData = new FormData();
        images.forEach((image) => {
          formData.append("images[]", image);
        });
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
