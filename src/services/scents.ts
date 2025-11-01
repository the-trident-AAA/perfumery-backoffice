"use server";

import { auth } from "@/auth";
import { buildApiResponse } from "@/lib/api";
import { QueryParamsURLFactory } from "@/lib/request";
import { apiRoutes, tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { IQueryable } from "@/types/request";
import { Scent, ScentCreateDTO, ScentEditDTO } from "@/types/scents";

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

  const res = await fetch(apiRoutes.scents.get, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + session.accessToken,
      "content-type": "application/json",
    },
    body: JSON.stringify(scentCreateDTO),
  });

  return await buildApiResponse<Scent>(res);
}

export async function editScent(id: string, scentEditDTO: ScentEditDTO) {
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

  const res = await fetch(apiRoutes.scents.getById.replace(":id", id), {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + session.accessToken,
      "content-type": "application/json",
    },
    body: JSON.stringify(scentEditDTO),
  });

  return await buildApiResponse<Scent>(res);
}

export async function deleteScent(id: string) {
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

  const res = await fetch(apiRoutes.scents.getById.replace(":id", id), {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + session.accessToken,
      "content-type": "application/json",
    },
  });

  return await buildApiResponse<Scent>(res);
}
