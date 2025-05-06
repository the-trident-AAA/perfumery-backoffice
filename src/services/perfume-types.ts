"use server";

import { buildApiResponse } from "@/lib/api";
import { QueryParamsURLFactory } from "@/lib/request";
import { apiRoutes, tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { PerfumeType } from "@/types/perfume-types";
import { IQueryable } from "@/types/request";

export async function getPerfumeTypesList(params: IQueryable) {
  const url = new QueryParamsURLFactory(
    params,
    apiRoutes.perfumeTypes.get
  ).build();

  const res = await fetch(url, {
    method: "GET",
    next: { tags: [tagsCacheByRoutes.perfumeTypes.multipleTag] },
  });

  return await buildApiResponse<PerfumeType[]>(res);
}

export async function getPerfumeTypeById(id: string) {
  const res = await fetch(apiRoutes.perfumeTypes.getById.replace(":id", id), {
    method: "GET",
    next: { tags: [tagsCacheByRoutes.perfumeTypes.singleTag] },
  });

  return await buildApiResponse<PerfumeType>(res);
}
