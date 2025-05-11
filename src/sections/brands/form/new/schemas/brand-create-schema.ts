import { z } from "zod";

export interface BrandCreate {
  name: string;
}

export const brandCreateSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El nombre de la marca del perfume no puede estar vacío" }),
});
