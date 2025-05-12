import { z } from "zod";

export interface PerfumeTypeEdit {
  name: string;
}

export const perfumeTypeEditSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El tipo de perfume no puede estar vacío" }),
});
