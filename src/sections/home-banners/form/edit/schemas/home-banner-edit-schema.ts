import { z } from "zod";
import {
  homeBannerFilterArraySchema,
  HomeBannerFilterArraySchema,
  homeBannerFilterNumberSchema,
  HomeBannerFilterNumberSchema,
  homeBannerFilterSchema,
  HomeBannerFilterSchema,
} from "../../schemas/home-banner-filter-schema";

export interface HomeBannerEdit {
  title: string;
  description: string;
  buttonText: string;
  statisticalTips: {
    statistics: string;
    info: string;
  }[];
  infoTips: { name: string }[];
  image: File;
  nameFilter: HomeBannerFilterSchema;
  brandFilter: HomeBannerFilterSchema;
  genderFilter: HomeBannerFilterSchema;
  scentsFilters: HomeBannerFilterArraySchema;
  millilitersMinFilter: HomeBannerFilterNumberSchema;
  millilitersMaxFilter: HomeBannerFilterNumberSchema;
  salesMinFilter: HomeBannerFilterNumberSchema;
  salesMaxFilter: HomeBannerFilterNumberSchema;
  priceMinFilter: HomeBannerFilterNumberSchema;
  priceMaxFilter: HomeBannerFilterNumberSchema;
  perfumeTypeFilter: HomeBannerFilterSchema;
  offerFilter: HomeBannerFilterSchema;
  totalPriceMinFilter: HomeBannerFilterNumberSchema;
  totalPriceMaxFilter: HomeBannerFilterNumberSchema;
}

export const homeBannerEditSchema = z.object({
  title: z.string().min(1, {
    message: "El título del banner de la página principal no puede estar vacío",
  }),
  description: z.string().min(1, {
    message: "La descripción del banner de la página principal es requerida",
  }),
  buttonText: z.string(),
  statisticalTips: z.array(
    z.object({
      statistics: z
        .string()
        .min(1, { message: "Es necesario especificar la estadística" }),
      info: z.string().min(1, {
        message: "Es necesario especificar la información de la estadística",
      }),
    })
  ),
  infoTips: z.array(
    z.object({
      name: z.string().min(1, { message: "El campo es requerido" }),
    })
  ),
  image: z
    .instanceof(File, {
      message: "Por favor selecciona una imagen.",
    })
    .refine(
      (file) => file && file.size <= 5 * 1024 * 1024,
      "La imagen no debe exceder 5MB."
    )
    .refine(
      (file) => file && file.type.startsWith("image/"),
      "El archivo debe ser una imagen."
    ),
  nameFilter: homeBannerFilterSchema,
  brandFilter: homeBannerFilterSchema,
  genderFilter: homeBannerFilterSchema,
  scentsFilters: homeBannerFilterArraySchema,
  millilitersMinFilter: homeBannerFilterNumberSchema,
  millilitersMaxFilter: homeBannerFilterNumberSchema,
  salesMinFilter: homeBannerFilterNumberSchema,
  salesMaxFilter: homeBannerFilterNumberSchema,
  priceMinFilter: homeBannerFilterNumberSchema,
  priceMaxFilter: homeBannerFilterNumberSchema,
  perfumeTypeFilter: homeBannerFilterSchema,
  offerFilter: homeBannerFilterSchema,
  totalPriceMinFilter: homeBannerFilterNumberSchema,
  totalPriceMaxFilter: homeBannerFilterNumberSchema,
});
