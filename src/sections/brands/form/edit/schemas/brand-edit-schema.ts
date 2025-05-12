import { z } from "zod";

export interface BrandEdit {
  name: string;
}

export const brandEditSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El nombre de la marca del perfume no puede estar vacío" }),
});
