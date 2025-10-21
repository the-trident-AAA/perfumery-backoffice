"use server";
import { auth } from "@/auth";
import { buildApiResponse } from "@/lib/api";
import { QueryParamsURLFactory } from "@/lib/request";
import { apiRoutes, tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { IQueryable } from "@/types/request";
import { User, UserDetails } from "@/types/users";

export async function getUsersList(params: IQueryable) {
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
  const url = new QueryParamsURLFactory(params, apiRoutes.users.get).build();

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + session.accessToken,
      "content-type": "application/json",
    },
    next: { tags: [tagsCacheByRoutes.users.multipleTag] },
  });

  return await buildApiResponse<User[]>(res);
}

export async function getUserById(id: string) {
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

  const res = await fetch(apiRoutes.users.getById.replace(":id", id), {
    method: "GET",
    headers: {
      Authorization: "Bearer " + session.accessToken,
      "content-type": "application/json",
    },
    next: { tags: [tagsCacheByRoutes.users.singleTag] },
  });

  return await buildApiResponse<UserDetails>(res);
}
