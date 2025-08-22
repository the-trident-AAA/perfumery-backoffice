import { z } from "zod";

export interface HomeBannerCreate {
  title: string;
  description: string;
  statisticalTips: {
    statistics: string;
    info: string;
  }[];

  infoTips: { name: string }[];
  images: File[];
}

export const homeBannerCreateSchema = z.object({
  title: z.string().min(1, {
    message: "El título del banner de la página principal no puede estar vacío",
  }),
  description: z.string().min(1, {
    message: "La descripción del banner de la página principal es requerida",
  }),
  statisticalTips: z.array(
    z.object({
      statistics: z
        .string()
        .min(1, { message: "Es necesario especificar la estadística" }),
      info: z.string().min(1, {
        message: "Es necesario especificar la información de la estadística",
      }),
    })
  ),
  infoTips: z.array(
    z.object({
      name: z.string().min(1, { message: "El campo es requerido" }),
    })
  ),
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
