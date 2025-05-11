import { z } from "zod";

export interface PerfumeTypeCreate {
  name: string;
}

export const perfumeTypeCreateSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El tipo de perfume no puede estar vacío" }),
});
