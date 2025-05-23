import { z } from "zod";

export interface PerfumeTypeEdit {
  name: string;
  image?: File;
}

export const perfumeTypeEditSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El tipo de perfume no puede estar vacío" }),
  image: z
    .instanceof(File, {
      message: "Por favor selecciona una imagen.",
    })
    .optional()
    .refine(
      (file) => !file || file.size <= 5 * 1024 * 1024,
      "La imagen no debe exceder 5MB."
    )
    .refine(
      (file) => !file || file.type.startsWith("image/"),
      "El archivo debe ser una imagen."
    ),
});
