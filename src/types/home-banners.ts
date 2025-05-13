import { HomeBannerCreate } from "@/sections/home-banners/form/new/schemas/home-banner-create-schema";

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
}

export interface HomeBannerCreateDTO {
  title: string;
  description: string;
  image?: string;
}

export const convertHomeBannerCreateDTO = (
  homeBannerCreate: HomeBannerCreate
): HomeBannerCreateDTO => {
  return {
    ...homeBannerCreate,
  };
};
