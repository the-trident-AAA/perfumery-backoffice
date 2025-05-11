"use server";

import { buildApiResponse } from "@/lib/api";
import { QueryParamsURLFactory } from "@/lib/request";
import { apiRoutes, tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { IQueryable } from "@/types/request";
import { Scent, ScentCreateDTO } from "@/types/scents";

export async function getScentsList(params: IQueryable) {
  const url = new QueryParamsURLFactory(params, apiRoutes.scents.get).build();

  const res = await fetch(url, {
    method: "GET",
    next: { tags: [tagsCacheByRoutes.scents.multipleTag] },
  });

  return await buildApiResponse<Scent[]>(res);
}

export async function getScentById(id: string) {
  const res = await fetch(apiRoutes.scents.getById.replace(":id", id), {
    method: "GET",
    next: { tags: [tagsCacheByRoutes.scents.singleTag] },
  });

  return await buildApiResponse<Scent>(res);
}

export async function createScent(scentCreateDTO: ScentCreateDTO) {
  const res = await fetch(apiRoutes.scents.get, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + "token",
      "content-type": "application/json",
    },
    body: JSON.stringify(scentCreateDTO),
  });

  return await buildApiResponse<Scent>(res);
}

