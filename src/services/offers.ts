"use server";

import { buildApiResponse } from "@/lib/api";
import { QueryParamsURLFactory } from "@/lib/request";
import { apiRoutes, tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { Offer } from "@/types/offers";
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
