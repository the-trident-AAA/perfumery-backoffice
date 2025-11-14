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

export interface HomeBannerFilterArraySchema {
  name: string;
  value: string[];
}

export const homeBannerFilterArraySchema = z.object({
  name: z.string().min(1, {
    message: "El nombre del filtro no puede estar vacío",
  }),
  value: z.array(z.string()),
});

export interface HomeBannerFilterNumberSchema {
  name: string;
  value: number;
}

export const homeBannerFilterNumberSchema = z.object({
  name: z.string().min(1, {
    message: "El nombre del filtro no puede estar vacío",
  }),
  value: z.number(),
});
