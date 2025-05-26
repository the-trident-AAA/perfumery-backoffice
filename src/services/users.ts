"use server";
import { buildApiResponse } from "@/lib/api";
import { QueryParamsURLFactory } from "@/lib/request";
import { apiRoutes, tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { IQueryable } from "@/types/request";
import { User } from "@/types/users";

export async function getUsersList(params: IQueryable) {
    console.log('entro a getUsersList');
  const url = new QueryParamsURLFactory(params, apiRoutes.users.get).build();

  const res = await fetch(url, {
    method: "GET",
    next: { tags: [tagsCacheByRoutes.users.multipleTag] },
  });

  console.log('antes de retornar buildApiResponse');
  return await buildApiResponse<User[]>(res);

}

export async function getUserById(id: string) {
  const res = await fetch(apiRoutes.users.getById.replace(":id", id), {
    method: "GET",
    next: { tags: [tagsCacheByRoutes.users.singleTag] },
  });

  return await buildApiResponse<User>(res);
}