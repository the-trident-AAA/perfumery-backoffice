"use server";

import { buildApiResponse } from "@/lib/api";
import { QueryParamsURLFactory } from "@/lib/request";
import { createFormDataBody } from "@/lib/request-body";
import { apiRoutes, tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import {
  PerfumeType,
  PerfumeTypeCreateDTO,
  PerfumeTypeEditDTO,
} from "@/types/perfume-types";
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

export async function createPerfumeType(
  perfumeTypeCreateDTO: PerfumeTypeCreateDTO,
  formDataWithImage: FormData
) {
  const res = await fetch(apiRoutes.perfumeTypes.get, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + "token",
    },
    body: createFormDataBody({
      ...perfumeTypeCreateDTO,
      image: formDataWithImage.get("image"),
    }),
  });

  return await buildApiResponse<PerfumeType>(res);
}

export async function editPerfumeType(
  id: string,
  perfumeTypeEditDTO: PerfumeTypeEditDTO,
  formDataWithImage: FormData
) {
  const res = await fetch(apiRoutes.perfumeTypes.getById.replace(":id", id), {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + "token",
    },
    body: createFormDataBody({
      ...perfumeTypeEditDTO,
      image: formDataWithImage.get("image"),
    }),
  });

  return await buildApiResponse<PerfumeType>(res);
}
