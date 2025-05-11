import { BrandCreate } from "@/sections/brands/form/new/schemas/brand-create-schema";

export interface Brand {
  id: string;
  name: string;
}

export interface BrandCreateDTO{
  name: string;
}

export const convertBrandCreateDTO = (
  brandCreate: BrandCreate
): BrandCreateDTO => {
  return {
    ...brandCreate,
  };
};