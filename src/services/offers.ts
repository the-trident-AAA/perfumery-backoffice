"use server";

import { auth } from "@/auth";
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
  const session = await auth();
  if (!session)
    return {
      error: {
        name: "Unauthorized",
        reason: "No está autorizado para usar este recurso",
        code: "401",
      },
      status: 401,
    };

  const res = await fetch(apiRoutes.offers.get, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + session.accessToken,
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
  const session = await auth();
  if (!session)
    return {
      error: {
        name: "Unauthorized",
        reason: "No está autorizado para usar este recurso",
        code: "401",
      },
      status: 401,
    };

  const res = await fetch(apiRoutes.offers.getById.replace(":id", id), {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + session.accessToken,
    },
    body: createFormDataBody({
      ...offerEditDTO,
      image: formDataWithImage.get("image"),
    }),
  });

  return await buildApiResponse<Offer>(res);
}

export async function deleteOffer(id: string) {
  const session = await auth();
  if (!session)
    return {
      error: {
        name: "Unauthorized",
        reason: "No está autorizado para usar este recurso",
        code: "401",
      },
      status: 401,
    };

  const res = await fetch(apiRoutes.offers.getById.replace(":id", id), {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + session.accessToken,
      "content-type": "application/json",
    },
  });

  return await buildApiResponse<Offer>(res);
}
