import { z } from "zod";

export interface OfferEdit {
  name: string;
  description: string;
  image?: File;
  scope: string;
  discount: number;
  offerType: string;
}

export const offerEditSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El nombre de la oferta no puede estar vacío" }),
  description: z
    .string()
    .min(1, { message: "La descripción de la oferta es requerida" }),
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
  scope: z.string().min(1, { message: "El alcance de la oferta es requerida" }),
  discount: z
    .number()
    .min(1, { message: "El descuento debe de ser un número entre 1 y 100" })
    .max(100, { message: "El descuento debe de ser un número entre 1 y 100" }),
  offerType: z.string().min(1, { message: "El tipo de oferta es requerido" }),
});
