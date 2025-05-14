import { perfumeSchema } from "@/sections/perfumes/form/schemas/perfume-schema";
import { Perfume } from "@/types/perfumes";
import { z } from "zod";

export interface HomeBannerCreate {
  title: string;
  description: string;
  perfumes: Perfume[];
}

export const homeBannerCreateSchema = z.object({
  title: z.string().min(1, {
    message: "El título del banner de la página principal no puede estar vacío",
  }),
  description: z.string().min(1, {
    message: "La descripción del banner de la página principal es requerida",
  }),
  perfumes: z.array(perfumeSchema),
});
