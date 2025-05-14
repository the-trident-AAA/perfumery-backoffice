import { HomeBannerCreate } from "@/sections/home-banners/form/new/schemas/home-banner-create-schema";
import { Perfume, PerfumeDetails } from "./perfumes";
import { HomeBannerEdit } from "@/sections/home-banners/form/edit/schemas/home-banner-edit-schema";

export interface HomeBanner {
  id: string;
  title: string;
  description: string;
  image?: string;
}

export interface HomeBannerDetails {
  id: string;
  title: string;
  description: string;
  image?: string;
  perfumes: PerfumeDetails[];
}

export interface HomeBannerCreateDTO {
  title: string;
  description: string;
  image?: string;
  perfumes: string[];
}

export interface HomeBannerEditDTO {
  title: string;
  description: string;
  image?: string;
  perfumes: string[];
}

export const convertHomeBannerCreateDTO = (
  homeBannerCreate: HomeBannerCreate
): HomeBannerCreateDTO => {
  return {
    ...homeBannerCreate,
    perfumes: homeBannerCreate.perfumes.map((perfume) => perfume.id),
  };
};

export const convertHomeBannerEditDTO = (
  homeBannerEdit: HomeBannerEdit
): HomeBannerEditDTO => {
  return {
    ...homeBannerEdit,
    perfumes: homeBannerEdit.perfumes.map((perfume) => perfume.id),
  };
};
