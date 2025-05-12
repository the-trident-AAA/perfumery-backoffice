import { z } from "zod";

export interface OfferCreate {
  name: string;
  description: string;
  scope: string;
  discount: number;
  offerType: string;
}

export const offerCreateSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El nombre de la oferta no puede estar vacío" }),
  description: z
    .string()
    .min(1, { message: "La descripción de la oferta es requerida" }),
  scope: z.string().min(1, { message: "El alcance de la oferta es requerida" }),
  discount: z
    .number()
    .min(1, { message: "El descuento debe de ser un número entre 1 y 100" })
    .max(100, { message: "El descuento debe de ser un número entre 1 y 100" }),
  offerType: z.string().min(1, { message: "El tipo de oferta es requerido" }),
});
