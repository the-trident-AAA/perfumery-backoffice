"use server";

import { auth } from "@/auth";
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
  formData: FormData
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

  console.log(
    createFormDataBody({
      ...perfumeCreateDTO,
      image: formData.get("image"),
      images: formData.getAll("images[]") as File[],
    })
  );
  const res = await fetch(apiRoutes.perfumes.get, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + session.accessToken,
    },
    body: createFormDataBody({
      ...perfumeCreateDTO,
      image: formData.get("image"),
      images: formData.getAll("images[]") as File[],
    }),
  });
  console.log(res);
  return await buildApiResponse<Perfume>(res);
}

export async function editPerfume(
  id: string,
  perfumeEditDTO: PerfumeEditDTO,
  formData: FormData
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

  const res = await fetch(apiRoutes.perfumes.getById.replace(":id", id), {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + session.accessToken,
    },
    body: createFormDataBody({
      ...perfumeEditDTO,
      image: formData.get("image"),
      images: formData.getAll("images[]") as File[],
    }),
  });

  return await buildApiResponse<Perfume>(res);
}

export async function deletePerfume(id: string) {
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

  const res = await fetch(apiRoutes.perfumes.getById.replace(":id", id), {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + session.accessToken,
      "content-type": "application/json",
    },
  });

  return await buildApiResponse<Perfume>(res);
}
