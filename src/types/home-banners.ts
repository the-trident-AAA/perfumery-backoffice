import { HomeBannerCreate } from "@/sections/home-banners/form/new/schemas/home-banner-create-schema";
import { HomeBannerEdit } from "@/sections/home-banners/form/edit/schemas/home-banner-edit-schema";
import { HomeBannersFilters } from "@/sections/home-banners/filters/hooks/use-home-banners-filters";

export interface HomeBanner {
  id: string;
  title: string;
  description: string;
  isMain: boolean;
}

export interface HomeBannerDetails {
  id: string;
  title: string;
  description: string;
  isMain: boolean;
  images: string[];
}

export interface HomeBannerCreateDTO {
  title: string;
  description: string;
  statisticalTips: {
    statistics: string;
    info: string;
  }[];

  infoTips: string[];
}

export interface HomeBannerEditDTO {
  title: string;
  description: string;
  statisticalTips: {
    statistics: string;
    info: string;
  }[];

  infoTips: string[];
}

export interface HomeBannerFiltersDTO {
  title?: string;
  description?: string;
}

export const convertHomeBannerCreateDTO = (
  homeBannerCreate: Omit<HomeBannerCreate, "images">
): HomeBannerCreateDTO => {
  return {
    ...homeBannerCreate,
    infoTips: homeBannerCreate.infoTips.map((infoTip) => infoTip.name),
  };
};

export const convertHomeBannerEditDTO = (
  homeBannerEdit: Omit<HomeBannerEdit, "images">
): HomeBannerEditDTO => {
  return {
    ...homeBannerEdit,
    infoTips: homeBannerEdit.infoTips.map((infoTip) => infoTip.name),
  };
};

export const convertHomeBannerFiltersDTO = (
  homeBannersFilters: HomeBannersFilters
): HomeBannerFiltersDTO => {
  return { ...homeBannersFilters };
};
