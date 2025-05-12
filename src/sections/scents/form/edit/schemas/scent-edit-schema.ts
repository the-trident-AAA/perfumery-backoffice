import { z } from "zod";

export interface ScentEdit {
  name: string;
}

export const scentEditSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El aroma no puede estar vacío" }),
});
