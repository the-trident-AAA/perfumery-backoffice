import { PerfumeCreate } from "@/sections/perfumes/form/new/schemas/perfume-create-schema";
import { Scent } from "./scents";
import { PerfumeType } from "./perfume-types";
import { Brand } from "./brands";
import { Offer } from "./offers";
import { PerfumeEdit } from "@/sections/perfumes/form/edit/schemas/perfume-edit-schema";
import { PerfumesFilters } from "@/sections/perfumes/filters/hooks/use-perfumes-filters";

export interface Perfume {
  id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  discountOffer: number | null;
  gender: string;
  scents: string[];
  milliliters: number;
  perfumeType: string;
  available: boolean;
  price: number;
  cant: number;
}

export interface PerfumeDetails {
  id: string;
  name: string;
  description: string;
  image: string;
  images: string[];
  brand: Brand;
  offer?: Offer;
  gender: Gender;
  scents: Scent[];
  milliliters: number;
  perfumeType: PerfumeType;
  available: boolean;
  price: number;
  cant: number;
}

export interface PerfumeCreateDTO {
  name: string;
  description: string;
  brandId: string;
  gender: string;
  scentsId: string[];
  milliliters: number;
  perfumeTypeId: string;
  available: boolean;
  price: number;
  cant: number;
  offerId?: string;
}

export interface PerfumeEditDTO {
  name: string;
  description: string;
  brandId: string;
  gender: string;
  scentsId: string[];
  milliliters: number;
  perfumeTypeId: string;
  available: boolean;
  price: number;
  cant: number;
  offerId?: string;
}

export interface PerfumesFiltersDTO {
  name?: string;
  description?: string;
  brandId?: string;
  gender?: Gender;
  scentsIds?: string[];
  milliliters?: number;
  millilitersMin?: number;
  millilitersMax?: number;
  priceMin?: number;
  priceMax?: number;
  perfumeTypeId?: string;
  available?: boolean;
  price?: number;
  cant?: number;
  offerId?: string;
}

export enum Gender {
  FEMALE = "femenino",
  MALE = "masculino",
  UNISEX = "unisex",
}

export const genderMap: Map<
  Gender,
  {
    name: string;
    color:
      | "default"
      | "primary"
      | "secondary"
      | "error"
      | "info"
      | "success"
      | "warning";
  }
> = new Map([
  [Gender.FEMALE, { name: "Femenino", color: "secondary" }],
  [Gender.MALE, { name: "Masculino", color: "secondary" }],
  [Gender.UNISEX, { name: "Unisex", color: "secondary" }],
]);

export const genderMapInverted: Map<string, Gender> = new Map(
  Array.from(genderMap.entries()).map(([key, value]) => [value.name, key])
);

export const convertPerfumeCreateDTO = (
  perfumeCreate: Omit<PerfumeCreate, "image" | "images">
): PerfumeCreateDTO => {
  return {
    ...perfumeCreate,
    offerId: perfumeCreate.offerId !== "" ? perfumeCreate.offerId : undefined,
  };
};

export const convertPerfumeEditDTO = (
  perfumeEdit: Omit<PerfumeEdit, "image" | "images">
): PerfumeEditDTO => {
  return {
    ...perfumeEdit,
    offerId: perfumeEdit.offerId !== "" ? perfumeEdit.offerId : undefined,
  };
};

export const convertPerfumeDetailsToPerfume = (
  perfumeDetails: PerfumeDetails
): Perfume => {
  return {
    ...perfumeDetails,
    brand: perfumeDetails.brand.name,
    discountOffer: perfumeDetails.offer ? perfumeDetails.offer.discount : 0,
    perfumeType: perfumeDetails.perfumeType.name,
    scents: perfumeDetails.scents.map((scent) => scent.name),
  };
};

export const convertPerfumesFiltersDTO = (
  perfumesFilters: PerfumesFilters
): PerfumesFiltersDTO => {
  const { priceRange, millilitersRange, ...rest } = perfumesFilters;
  return {
    ...rest,
    priceMin: priceRange[0],
    priceMax: priceRange[1],
    millilitersMin: millilitersRange[0],
    millilitersMax: millilitersRange[1],
  };
};
