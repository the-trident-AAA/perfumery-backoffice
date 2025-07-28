import { PerfumeTypesFilters } from "@/sections/perfume-types/filters/hooks/use-perfume-types-filters";
import { PerfumeTypeEdit } from "@/sections/perfume-types/form/edit/schemas/perfume-type-edit-schema";
import { PerfumeTypeCreate } from "@/sections/perfume-types/form/new/schemas/perfume-type-create-schema";

export interface PerfumeType {
  id: string;
  name: string;
  image?: string;
}

export interface PerfumeTypeDetails {
  id: string;
  name: string;
  image?: string;
}

export interface PerfumeTypeCreateDTO {
  name: string;
}

export interface PerfumeTypeEditDTO {
  name: string;
}

export interface PerfumeTypeFiltersDTO {
  name?: string;
}

export const convertPerfumeTypeCreateDTO = (
  perfumeTypeCreate: PerfumeTypeCreate
): PerfumeTypeCreateDTO => {
  return {
    ...perfumeTypeCreate,
  };
};

export const convertPerfumeTypeEditDTO = (
  perfumeTypeEdit: PerfumeTypeEdit
): PerfumeTypeEditDTO => {
  return {
    ...perfumeTypeEdit,
  };
};

export const convertPerfumeTypeFiltersDTO = (
  perfumeTypesFilters: PerfumeTypesFilters
): PerfumeTypeFiltersDTO => {
  return { ...perfumeTypesFilters };
};
