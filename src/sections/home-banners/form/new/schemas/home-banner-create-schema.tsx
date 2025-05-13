import { z } from "zod";

export interface HomeBannerCreate {
  title: string;
  description: string;
}

export const homeBannerCreateSchema = z.object({
  title: z
    .string()
    .min(1, {
      message:
        "El título del banner de la página principal no puede estar vacío",
    }),
  description: z
    .string()
    .min(1, {
      message: "La descripción del banner de la página principal es requerida",
    }),
});
