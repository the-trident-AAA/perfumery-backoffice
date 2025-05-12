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