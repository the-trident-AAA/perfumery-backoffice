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

export interface OfferCreateDTO {
  name: string;
  description: string;
  scope: string;
  discount: number;
  offerType: string;
}

export const convertOfferCreateDTO = (
  offerCreate: OfferCreate
): OfferCreateDTO => {
  return { ...offerCreate, discount: offerCreate.discount / 100 };
};
