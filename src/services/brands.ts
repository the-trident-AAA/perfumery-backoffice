"use server";
import { buildApiResponse } from "@/lib/api";
import { QueryParamsURLFactory } from "@/lib/request";
import { apiRoutes, tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { Brand, BrandCreateDTO, BrandEditDTO } from "@/types/brands";
import { IQueryable } from "@/types/request";

export async function getBrandsList(params: IQueryable) {
  const url = new QueryParamsURLFactory(params, apiRoutes.brands.get).build();

  const res = await fetch(url, {
    method: "GET",
    next: { tags: [tagsCacheByRoutes.brands.multipleTag] },
  });

  return await buildApiResponse<Brand[]>(res);
}

export async function getBrandById(id: string) {
  const res = await fetch(apiRoutes.brands.getById.replace(":id", id), {
    method: "GET",
    next: { tags: [tagsCacheByRoutes.brands.singleTag] },
  });

  return await buildApiResponse<Brand>(res);
}

export async function createBrand(brandCreateDTO: BrandCreateDTO) {
  const res = await fetch(apiRoutes.brands.get, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + "token",
      "content-type": "application/json",
    },
    body: JSON.stringify(brandCreateDTO),
  });

  return await buildApiResponse<Brand>(res);
}

export async function editBrand(id: string, brandEditDTO: BrandEditDTO) {
  const res = await fetch(apiRoutes.brands.getById.replace(":id", id), {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + "token",
      "content-type": "application/json",
    },
    body: JSON.stringify(brandEditDTO),
  });

  return await buildApiResponse<Brand>(res);
}

export async function deleteBrand(id: string) {
  const res = await fetch(apiRoutes.brands.getById.replace(":id", id), {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + "token",
      "content-type": "application/json",
    },
  });

  return await buildApiResponse<Brand>(res);
}