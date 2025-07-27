import { ScentsFilters } from "@/sections/scents/filters/hooks/use-scents-filters";
import { ScentEdit } from "@/sections/scents/form/edit/schemas/scent-edit-schema";
import { ScentCreate } from "@/sections/scents/form/new/schemas/scent-create-schema";

export interface Scent {
  id: string;
  name: string;
}

export interface ScentDetails {
  id: string;
  name: string;
}

export interface ScentCreateDTO {
  name: string;
}
export interface ScentEditDTO {
  name: string;
}
export interface ScentFiltersDTO {
  name?: string;
}

export const convertScentCreateDTO = (
  scentCreate: ScentCreate
): ScentCreateDTO=> {
  return {
    ...scentCreate,
  };
};

export const convertScentEditDTO = (
  scentEdit: ScentEdit
): ScentEditDTO => {
  return {
    ...scentEdit,
  };
};

export const convertScentFiltersDTO = (
  scentFilters: ScentsFilters
): ScentFiltersDTO => {
  return { ...scentFilters };
};
