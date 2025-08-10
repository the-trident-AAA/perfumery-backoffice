import { OffersFilters } from "@/sections/offers/filters/hooks/use-offers-filters";
import { OfferEdit } from "@/sections/offers/form/edit/schemas/offer-edit-schema";
import { OfferCreate } from "@/sections/offers/form/new/schemas/offer-create-schema";

export interface Offer {
  id: string;
  name: string;
  description: string;
  image?: string;
  scope: string;
  discount: number;
  offerType: string;
}

export interface OfferDetails {
  id: string;
  name: string;
  description: string;
  image?: string;
  scope: string;
  discount: number;
  offerType: string;
}

export interface OfferCreateDTO {
  name: string;
  description: string;
  scope: string;
  discount: number;
  offerType: string;
}

export interface OfferEditDTO {
  name: string;
  description: string;
  scope: string;
  discount: number;
  offerType: string;
}

export interface OfferFiltersDTO {
  name?: string;
  description?: string;
  scope?: string;
  minDiscont?: number;
  maxDiscont?: number;
  offerType?: string;
}

export const convertOfferCreateDTO = (
  offerCreate: OfferCreate
): OfferCreateDTO => {
  return { ...offerCreate, discount: offerCreate.discount / 100 };
};

export const convertOfferEditDTO = (offerCreate: OfferEdit): OfferEditDTO => {
  return { ...offerCreate, discount: offerCreate.discount / 100 };
};

export const convertOfferFiltersDTO = (
  offersFilters: OffersFilters
): OfferFiltersDTO => {
  return { ...offersFilters, minDiscont: offersFilters.discount[0], maxDiscont: offersFilters.discount[1] };
};
