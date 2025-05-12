import { PerfumeTypeEdit } from "@/sections/perfume-types/form/edit/schemas/perfume-type-edit-schema";
import { PerfumeTypeCreate } from "@/sections/perfume-types/form/new/schemas/perfume-type-create-schema";

export interface PerfumeType {
  id: string;
  name: string;
}

export interface PerfumeTypeDetails {
  id: string;
  name: string;
}

export interface PerfumeTypeCreateDTO {
  name: string;
}

export interface PerfumeTypeEditDTO {
  name: string;
}

export const convertPerfumeTypeCreateDTO = (
  perfumeTypeCreate: PerfumeTypeCreate
): PerfumeTypeCreateDTO=> {
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