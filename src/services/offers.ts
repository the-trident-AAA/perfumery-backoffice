"use server";

import { buildApiResponse } from "@/lib/api";
import { QueryParamsURLFactory } from "@/lib/request";
import { apiRoutes, tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { Offer, OfferCreateDTO, OfferEditDTO } from "@/types/offers";
import { IQueryable } from "@/types/request";

export async function getOffersList(params: IQueryable) {
  const url = new QueryParamsURLFactory(params, apiRoutes.offers.get).build();

  const res = await fetch(url, {
    method: "GET",
    next: { tags: [tagsCacheByRoutes.offers.multipleTag] },
  });

  return await buildApiResponse<Offer[]>(res);
}

export async function getOfferById(id: string) {
  const res = await fetch(apiRoutes.offers.getById.replace(":id", id), {
    method: "GET",
    next: { tags: [tagsCacheByRoutes.offers.singleTag] },
  });

  return await buildApiResponse<Offer>(res);
}

export async function createOffer(offerCreateDTO: OfferCreateDTO) {
  const res = await fetch(apiRoutes.offers.get, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + "token",
      "content-type": "application/json",
    },
    body: JSON.stringify(offerCreateDTO),
  });

  return await buildApiResponse<Offer>(res);
}

export async function editOffer(id: string, offerEditDTO: OfferEditDTO) {
  const res = await fetch(apiRoutes.offers.getById.replace(":id", id), {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + "token",
      "content-type": "application/json",
    },
    body: JSON.stringify(offerEditDTO),
  });

  return await buildApiResponse<Offer>(res);
}
