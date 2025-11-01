"use server";

import { auth } from "@/auth";
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

  const res = await fetch(apiRoutes.perfumeTypes.get, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + session.accessToken,
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

  const res = await fetch(apiRoutes.perfumeTypes.getById.replace(":id", id), {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + session.accessToken,
    },
    body: createFormDataBody({
      ...perfumeTypeEditDTO,
      image: formDataWithImage.get("image"),
    }),
  });

  return await buildApiResponse<PerfumeType>(res);
}

export async function deletePerfumeType(id: string) {
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

  const res = await fetch(apiRoutes.perfumeTypes.getById.replace(":id", id), {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + session.accessToken,
      "content-type": "application/json",
    },
  });

  return await buildApiResponse<PerfumeType>(res);
}
