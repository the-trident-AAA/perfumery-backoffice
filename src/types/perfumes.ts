import { PerfumeCreate } from "@/sections/perfumes/form/new/schemas/perfume-create-schema";
import { Scent } from "./scents";
import { PerfumeType } from "./perfume-types";
import { Brand } from "./brands";
import { Offer } from "./offers";
import { PerfumeEdit } from "@/sections/perfumes/form/edit/schemas/perfume-edit-schema";

export interface Perfume {
  id: string;
  name: string;
  image?: string;
  description: string;
  brand: string;
  offer?: Offer;
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
  image?: string;
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
  [Gender.FEMALE, { name: "Femenino", color: "primary" }],
  [Gender.MALE, { name: "Masculino", color: "primary" }],
  [Gender.UNISEX, { name: "Unisex", color: "primary" }],
]);

export const genderMapInverted: Map<string, Gender> = new Map(
  Array.from(genderMap.entries()).map(([key, value]) => [value.name, key])
);

export const convertPerfumeCreateDTO = (
  perfumeCreate: PerfumeCreate
): PerfumeCreateDTO => {
  return {
    ...perfumeCreate,
    offerId: perfumeCreate.offerId !== "" ? perfumeCreate.offerId : undefined,
  };
};

export const convertPerfumeEditDTO = (
  perfumeEdit: PerfumeEdit
): PerfumeEditDTO => {
  return {
    ...perfumeEdit,
    offerId: perfumeEdit.offerId !== "" ? perfumeEdit.offerId : undefined,
  };
};
