import { BrandEdit } from "@/sections/brands/form/edit/schemas/brand-edit-schema";
import { BrandCreate } from "@/sections/brands/form/new/schemas/brand-create-schema";

export interface Brand {
  id: string;
  name: string;
}

export interface BrandDetails {
  id: string;
  name: string;
}

export interface BrandCreateDTO{
  name: string;
}

export interface BrandEditDTO {
  name: string;
}

export const convertBrandCreateDTO = (
  brandCreate: BrandCreate
): BrandCreateDTO => {
  return {
    ...brandCreate,
  };
};

export const convertBrandEditDTO = (
  brandEdit: BrandEdit
): BrandEditDTO => {
  return {
    ...brandEdit,
  };
};
