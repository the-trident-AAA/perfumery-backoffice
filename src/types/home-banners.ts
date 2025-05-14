import { HomeBannerCreate } from "@/sections/home-banners/form/new/schemas/home-banner-create-schema";
import { Perfume } from "./perfumes";

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
  perfumes: Perfume[];
}

export interface HomeBannerCreateDTO {
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
