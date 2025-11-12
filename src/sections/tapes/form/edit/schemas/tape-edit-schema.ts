import { z } from "zod";

export interface TapeEdit {
  title: string;
  images: File[];
}

export const TapeEditSchema = z.object({
  title: z.string().min(1, {
    message: "El título de la cinta no puede estar vacío",
  }),
  images: z
    .array(
      z
        .instanceof(File, {
          message: "Por favor selecciona una imagen.",
        })
        .refine(
          (file) => file && file.size <= 5 * 1024 * 1024,
          "La imagen no debe exceder 5MB."
        )
        .refine(
          (file) => file && file.type.startsWith("image/"),
          "El archivo debe ser una imagen."
        )
    )
    .min(1, { message: "Es necesario seleccionar al menos una imagen" }),
});
