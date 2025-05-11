import { PerfumeTypeCreate } from "@/sections/perfume-types/form/new/schemas/perfume-type-create-schema";

export interface PerfumeType {
  id: string;
  name: string;
}
export interface PerfumeTypeCreateDTO {
  name: string;
}

export const convertPerfumeTypeCreateDTO = (
  perfumeTypeCreate: PerfumeTypeCreate
): PerfumeTypeCreateDTO=> {
  return {
    ...perfumeTypeCreate,
  };
};