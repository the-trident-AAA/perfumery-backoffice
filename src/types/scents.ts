import { ScentCreate } from "@/sections/scents/form/new/schemas/scent-create-schema";

export interface Scent {
  id: string;
  name: string;
}

export interface ScentCreateDTO {
  name: string;
}

export const convertScentCreateDTO = (
  scentCreate: ScentCreate
): ScentCreateDTO=> {
  return {
    ...scentCreate,
  };
};