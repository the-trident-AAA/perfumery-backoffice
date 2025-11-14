import { z } from "zod";

export interface HomeBannerFilterSchema {
  name: string;
  value: string;
}

export const homeBannerFilterSchema = z.object({
  name: z.string().min(1, {
    message: "El nombre del filtro no puede estar vacío",
  }),
  value: z.string(),
});
