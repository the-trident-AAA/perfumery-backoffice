import { z } from "zod";
import {
  homeBannerFilterArraySchema,
  HomeBannerFilterArraySchema,
  homeBannerFilterNumberSchema,
  HomeBannerFilterNumberSchema,
  homeBannerFilterSchema,
  HomeBannerFilterSchema,
} from "../../schemas/home-banner-filter-schema";
import { TextColor } from "@/types/home-banners";

export interface HomeBannerCreate {
  title: string;
  description: string;
  buttonText: string;
  textColor: TextColor;
  statisticalTips: {
    statistics: string;
    info: string;
  }[];
  infoTips: { name: string }[];
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
  image: File;
  mobileImage: File;
}

export const homeBannerCreateSchema = z.object({
  title: z.string(),
  description: z.string(),
  buttonText: z.string(),
  textColor: z.enum([TextColor.LIGHT, TextColor.DARK], {
    message: "Debes seleccionar un color de texto válido (Claro o Oscuro)",
  }),
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
  mobileImage: z
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
