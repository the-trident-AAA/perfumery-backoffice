import { HomeBannerCreate } from "@/sections/home-banners/form/new/schemas/home-banner-create-schema";
import { HomeBannerEdit } from "@/sections/home-banners/form/edit/schemas/home-banner-edit-schema";
import { HomeBannersFilters } from "@/sections/home-banners/filters/hooks/use-home-banners-filters";

export interface HomeBanner {
  id: string;
  title: string;
  image: string;
  description: string;
  isMain: boolean;
}

export interface HomeBannerDetails {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  isMain: boolean;
  image: string;
  statisticalTips: {
    statistics: string;
    info: string;
  }[];
  infoTips: string[];
  filters: {
    name: string;
    value: string;
  }[];
}

export interface HomeBannerCreateDTO {
  title: string;
  description: string;
  buttonText: string;
  statisticalTips: {
    statistics: string;
    info: string;
  }[];
  infoTips: string[];
  filters: {
    name: string;
    value: string;
  }[];
}

export interface HomeBannerEditDTO {
  title: string;
  description: string;
  buttonText: string;
  statisticalTips: {
    statistics: string;
    info: string;
  }[];
  infoTips: string[];
  filters: {
    name: string;
    value: string;
  }[];
}

export interface HomeBannerFiltersDTO {
  title?: string;
  description?: string;
}

export const convertHomeBannerCreateDTO = (
  homeBannerCreate: Omit<HomeBannerCreate, "image">
): HomeBannerCreateDTO => {
  const {
    nameFilter,
    brandFilter,
    genderFilter,
    scentsFilters,
    millilitersMinFilter,
    millilitersMaxFilter,
    salesMinFilter,
    salesMaxFilter,
    priceMinFilter,
    priceMaxFilter,
    perfumeTypeFilter,
    offerFilter,
    totalPriceMinFilter,
    totalPriceMaxFilter,
    ...rest
  } = homeBannerCreate;
  return {
    ...rest,
    infoTips: homeBannerCreate.infoTips.map((infoTip) => infoTip.name),
    filters: buildFilters(
      {
        nameFilter,
        brandFilter,
        genderFilter,
        scentsFilters,
        millilitersMinFilter,
        millilitersMaxFilter,
        salesMinFilter,
        salesMaxFilter,
        priceMinFilter,
        priceMaxFilter,
        perfumeTypeFilter,
        offerFilter,
        totalPriceMinFilter,
        totalPriceMaxFilter,
      },
      [
        "millilitersMinFilter",
        "millilitersMaxFilter",
        "salesMinFilter",
        "salesMaxFilter",
        "priceMinFilter",
        "priceMaxFilter",
        "totalPriceMinFilter",
        "totalPriceMaxFilter",
      ]
    ),
  };
};

export const convertHomeBannerEditDTO = (
  homeBannerEdit: Omit<HomeBannerEdit, "image">
): HomeBannerEditDTO => {
  const {
    nameFilter,
    brandFilter,
    genderFilter,
    scentsFilters,
    millilitersMinFilter,
    millilitersMaxFilter,
    salesMinFilter,
    salesMaxFilter,
    priceMinFilter,
    priceMaxFilter,
    perfumeTypeFilter,
    offerFilter,
    totalPriceMinFilter,
    totalPriceMaxFilter,
    ...rest
  } = homeBannerEdit;
  return {
    ...rest,
    infoTips: homeBannerEdit.infoTips.map((infoTip) => infoTip.name),
    filters: buildFilters(
      {
        nameFilter,
        brandFilter,
        genderFilter,
        scentsFilters,
        millilitersMinFilter,
        millilitersMaxFilter,
        salesMinFilter,
        salesMaxFilter,
        priceMinFilter,
        priceMaxFilter,
        perfumeTypeFilter,
        offerFilter,
        totalPriceMinFilter,
        totalPriceMaxFilter,
      },
      [
        "millilitersMinFilter",
        "millilitersMaxFilter",
        "salesMinFilter",
        "salesMaxFilter",
        "priceMinFilter",
        "priceMaxFilter",
        "totalPriceMinFilter",
        "totalPriceMaxFilter",
      ]
    ),
  };
};

export const convertHomeBannerFiltersDTO = (
  homeBannersFilters: HomeBannersFilters
): HomeBannerFiltersDTO => {
  return { ...homeBannersFilters };
};

// Utilidad para construir filtros dinámicos
const buildFilters = (
  source: Record<string, { name: string; value: any }>,
  numericKeys: string[] = []
) => {
  const entries = Object.entries(source);

  return entries
    .map(([key, filter]) => {
      if (!filter.value) return null;

      const value = numericKeys.includes(key)
        ? String(filter.value)
        : filter.value;

      return { name: filter.name, value };
    })
    .filter(Boolean)
    .flatMap((item) => {
      if (Array.isArray(item!.value)) {
        return item!.value.map((v) => ({ name: item!.name, value: v }));
      }
      return [item!];
    });
};
