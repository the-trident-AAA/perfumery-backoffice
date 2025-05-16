"use server";

import { buildApiResponse } from "@/lib/api";
import { QueryParamsURLFactory } from "@/lib/request";
import { createFormDataBody } from "@/lib/request-body";
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

export async function createOffer(
  offerCreateDTO: OfferCreateDTO,
  formDataWithImage: FormData
) {
  const res = await fetch(apiRoutes.offers.get, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + "token",
    },
    body: createFormDataBody({
      ...offerCreateDTO,
      image: formDataWithImage.get("image"),
    }),
  });

  return await buildApiResponse<Offer>(res);
}

export async function editOffer(
  id: string,
  offerEditDTO: OfferEditDTO,
  formDataWithImage: FormData
) {
  const res = await fetch(apiRoutes.offers.getById.replace(":id", id), {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + "token",
    },
    body: createFormDataBody({
      ...offerEditDTO,
      image: formDataWithImage.get("image"),
    }),
  });

  return await buildApiResponse<Offer>(res);
}

export async function deleteOffer(id: string) {
  const res = await fetch(apiRoutes.offers.getById.replace(":id", id), {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + "token",
      "content-type": "application/json",
    },
  });

  return await buildApiResponse<Offer>(res);
}
