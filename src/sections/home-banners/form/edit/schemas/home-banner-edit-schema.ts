import { perfumeSchema } from "@/sections/perfumes/form/schemas/perfume-schema";
import { Perfume } from "@/types/perfumes";
import { z } from "zod";

export interface HomeBannerEdit {
  title: string;
  description: string;
  image: File;
  perfumes: Perfume[];
}

export const homeBannerEditSchema = z.object({
  title: z.string().min(1, {
    message: "El título del banner de la página principal no puede estar vacío",
  }),
  description: z.string().min(1, {
    message: "La descripción del banner de la página principal es requerida",
  }),
  image: z
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
    ),
  perfumes: z.array(perfumeSchema),
});
