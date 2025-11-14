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
  return {
    ...homeBannerCreate,
    infoTips: homeBannerCreate.infoTips.map((infoTip) => infoTip.name),
    filters: buildFilters(
      {
        nameFilter: homeBannerCreate.nameFilter,
        brandFilter: homeBannerCreate.brandFilter,
        genderFilter: homeBannerCreate.genderFilter,
        scentsFilters: homeBannerCreate.scentsFilters,
        millilitersMinFilter: homeBannerCreate.millilitersMinFilter,
        millilitersMaxFilter: homeBannerCreate.millilitersMaxFilter,
        salesMinFilter: homeBannerCreate.salesMinFilter,
        salesMaxFilter: homeBannerCreate.salesMaxFilter,
        priceMinFilter: homeBannerCreate.priceMinFilter,
        priceMaxFilter: homeBannerCreate.priceMaxFilter,
        perfumeTypeFilter: homeBannerCreate.perfumeTypeFilter,
        offerFilter: homeBannerCreate.offerFilter,
      },
      [
        "millilitersMinFilter",
        "millilitersMaxFilter",
        "salesMinFilter",
        "salesMaxFilter",
        "priceMinFilter",
        "priceMaxFilter",
      ]
    ),
  };
};

export const convertHomeBannerEditDTO = (
  homeBannerEdit: Omit<HomeBannerEdit, "image">
): HomeBannerEditDTO => {
  return {
    ...homeBannerEdit,
    infoTips: homeBannerEdit.infoTips.map((infoTip) => infoTip.name),
    filters: buildFilters(
      {
        nameFilter: homeBannerEdit.nameFilter,
        brandFilter: homeBannerEdit.brandFilter,
        genderFilter: homeBannerEdit.genderFilter,
        scentsFilters: homeBannerEdit.scentsFilters,
        millilitersMinFilter: homeBannerEdit.millilitersMinFilter,
        millilitersMaxFilter: homeBannerEdit.millilitersMaxFilter,
        salesMinFilter: homeBannerEdit.salesMinFilter,
        salesMaxFilter: homeBannerEdit.salesMaxFilter,
        priceMinFilter: homeBannerEdit.priceMinFilter,
        priceMaxFilter: homeBannerEdit.priceMaxFilter,
        perfumeTypeFilter: homeBannerEdit.perfumeTypeFilter,
        offerFilter: homeBannerEdit.offerFilter,
      },
      [
        "millilitersMinFilter",
        "millilitersMaxFilter",
        "salesMinFilter",
        "salesMaxFilter",
        "priceMinFilter",
        "priceMaxFilter",
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
