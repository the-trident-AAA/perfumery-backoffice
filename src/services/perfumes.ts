"use server";

import { buildApiResponse } from "@/lib/api";
import { QueryParamsURLFactory } from "@/lib/request";
import { createFormDataBody } from "@/lib/request-body";
import { apiRoutes, tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { PaginationResponse } from "@/types/pagination";
import {
  Perfume,
  PerfumeCreateDTO,
  PerfumeDetails,
  PerfumeEditDTO,
} from "@/types/perfumes";
import { IQueryable } from "@/types/request";

export async function getPerfumesList(params: IQueryable) {
  const url = new QueryParamsURLFactory(params, apiRoutes.perfumes.get).build();

  const res = await fetch(url, {
    method: "GET",
    next: { tags: [tagsCacheByRoutes.perfumes.multipleTag] },
  });

  return await buildApiResponse<PaginationResponse<Perfume>>(res);
}

export async function getPerfumeById(id: string) {
  const res = await fetch(apiRoutes.perfumes.getById.replace(":id", id), {
    method: "GET",
    next: { tags: [tagsCacheByRoutes.perfumes.singleTag] },
  });

  return await buildApiResponse<PerfumeDetails>(res);
}

export async function createPerfume(
  perfumeCreateDTO: PerfumeCreateDTO,
  formDataWithImage: FormData
) {
  console.log(
    createFormDataBody({
      ...perfumeCreateDTO,
      image: formDataWithImage.get("image"),
    })
  );
  const res = await fetch(apiRoutes.perfumes.get, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + "token",
    },
    body: createFormDataBody({
      ...perfumeCreateDTO,
      image: formDataWithImage.get("image"),
    }),
  });
  console.log(res);
  return await buildApiResponse<Perfume>(res);
}

export async function editPerfume(
  id: string,
  perfumeEditDTO: PerfumeEditDTO,
  formDataWithImage: FormData
) {
  const res = await fetch(apiRoutes.perfumes.getById.replace(":id", id), {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + "token",
    },
    body: createFormDataBody({
      ...perfumeEditDTO,
      image: formDataWithImage.get("image"),
    }),
  });

  return await buildApiResponse<Perfume>(res);
}

export async function deletePerfume(id: string) {
  const res = await fetch(apiRoutes.perfumes.getById.replace(":id", id), {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + "token",
      "content-type": "application/json",
    },
  });

  return await buildApiResponse<Perfume>(res);
}
