import { PerfumeCreate } from "@/sections/perfumes/form/new/schemas/perfume-create-schema";

export interface Perfume {
  id: string;
  name: string;
  brand: string;
  gender: string;
  scents: string[];
  liters: number;
  perfumeType: string;
  available: boolean;
  price: number;
  cant: number;
}

export interface PerfumeCreateDTO {
  name: string;
  brandId: string;
  gender: string;
  scentsId: string[];
  liters: number;
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
