import { z } from "zod";

export interface ScentCreate {
  name: string;
}

export const scentCreateSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El nombre del aroma del perfume no puede estar vacío" }),
});
