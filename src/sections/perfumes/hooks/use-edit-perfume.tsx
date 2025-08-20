"use client";
import { useCallback, useState } from "react";
import { editPerfume as editPerfumeService } from "@/services/perfumes";
import { convertPerfumeEditDTO } from "@/types/perfumes";
import { PerfumeEdit } from "../form/edit/schemas/perfume-edit-schema";

interface Props {
  id: string;
  onEditAction: () => void;
}

export default function useEditPerfume({ id, onEditAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editPerfume = useCallback(
    async (perfume: PerfumeEdit) => {
      const {image, images, ...rest} = perfume
      try {
        setLoading(true);
        setError(null);
        // create form data for image
        const formData = new FormData();
        formData.append("image", image);
        images.forEach((image) => {
          formData.append("images[]", image);
        });
        const res = await editPerfumeService(
          id,
          convertPerfumeEditDTO(rest),
          formData
        );
        if (!res.response || res.error)
          setError("Error en la edición del perfume");
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
    editPerfume,
  };
}
