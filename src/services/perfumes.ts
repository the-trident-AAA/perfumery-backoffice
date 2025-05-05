"use server";

import { buildApiResponse } from "@/lib/api";
import { QueryParamsURLFactory } from "@/lib/request";
import { apiRoutes, tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { Perfume } from "@/types/perfumes";
import { IQueryable } from "@/types/request";

export async function getPerfumesList(params: IQueryable) {
  const url = new QueryParamsURLFactory(params, apiRoutes.perfumes.get).build();

  const res = await fetch(url, {
    method: "GET",
    next: { tags: [tagsCacheByRoutes.perfumes.multipleTag] },
  });

  return await buildApiResponse<Perfume[]>(res);
}

export async function getPerfumeById(id: string) {
  const res = await fetch(apiRoutes.perfumes.getById.replace(":id", id), {
    method: "GET",
    next: { tags: [tagsCacheByRoutes.perfumes.singleTag] },
  });

  return await buildApiResponse<Perfume>(res);
}
