import { Gender } from "@/types/perfumes";
import { z } from "zod";

export interface PerfumeEdit {
  name: string;
  description: string;
  brandId: string;
  image: File;
  images: File[];
  perfumeTypeId: string;
  offerId: string;
  milliliters: number;
  gender: Gender;
  scentsId: string[];
  available: boolean;
  price: number;
  cant: number;
}

export const perfumeEditSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El nombre del perfume no puede estar vacío" }),
  description: z
    .string()
    .min(1, { message: "La descripción del perfume es requerida" }),
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
  images: z.array(
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
  ),
  brandId: z.string().min(1, { message: "Debes seleccionar una marca válida" }),
  perfumeTypeId: z
    .string()
    .min(1, { message: "Debes seleccionar un tipo de perfume válido" }),
  offerId: z.string(),
  milliliters: z
    .number()
    .min(1, { message: "El volumen debe ser al menos 1 mililitro" })
    .multipleOf(0.01, {
      message: "El volumen no puede tener más de 2 decimales",
    }),
  gender: z.enum([Gender.MALE, Gender.FEMALE, Gender.UNISEX], {
    message:
      "Debes seleccionar un género válido (Masculino, Femenino o Unisex)",
  }),
  scentsId: z
    .array(z.string())
    .min(1, { message: "Debes seleccionar al menos un aroma" }),
  available: z.boolean(),
  price: z
    .number()
    .min(1, { message: "El precio debe ser mayor a 0" })
    .multipleOf(0.01, {
      message: "El precio no puede tener más de 2 decimales",
    }),
  cant: z
    .number()
    .int({ message: "La cantidad debe ser un número entero" })
    .min(1, { message: "La cantidad en stock debe ser al menos 1" }),
});
