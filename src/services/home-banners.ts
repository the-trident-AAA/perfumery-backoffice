"use server";
import { buildApiResponse } from "@/lib/api";
import { QueryParamsURLFactory } from "@/lib/request";
import { createFormDataBody } from "@/lib/request-body";
import { apiRoutes, tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import {
  HomeBanner,
  HomeBannerCreateDTO,
  HomeBannerDetails,
  HomeBannerEditDTO,
} from "@/types/home-banners";
import { IQueryable } from "@/types/request";

export async function getHomeBannersList(params: IQueryable) {
  const url = new QueryParamsURLFactory(
    params,
    apiRoutes.homeBanners.get
  ).build();

  const res = await fetch(url, {
    method: "GET",
    next: { tags: [tagsCacheByRoutes.homeBanners.multipleTag] },
  });
  console.log(res);
  return await buildApiResponse<HomeBanner[]>(res);
}

export async function getHomeBannerById(id: string) {
  const res = await fetch(apiRoutes.homeBanners.getById.replace(":id", id), {
    method: "GET",
    next: { tags: [tagsCacheByRoutes.homeBanners.singleTag] },
  });

  return await buildApiResponse<HomeBannerDetails>(res);
}

export async function createHomeBanner(
  homeBannerCreateDTO: HomeBannerCreateDTO,
  formData: FormData
) {
  const res = await fetch(apiRoutes.homeBanners.get, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + "token",
    },
    body: createFormDataBody({
      ...homeBannerCreateDTO,
      images: formData.getAll("images[]") as File[],
    }),
  });

  return await buildApiResponse<HomeBannerDetails>(res);
}

export async function editHomeBanner(
  id: string,
  homeBannerEditDTO: HomeBannerEditDTO,
  formData: FormData
) {
  const res = await fetch(apiRoutes.homeBanners.getById.replace(":id", id), {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + "token",
    },
    body: createFormDataBody({
      ...homeBannerEditDTO,
      images: formData.getAll("images[]") as File[],
    }),
  });

  return await buildApiResponse<HomeBannerDetails>(res);
}

export async function deleteHomeBanner(id: string) {
  const res = await fetch(apiRoutes.homeBanners.getById.replace(":id", id), {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + "token",
      "content-type": "application/json",
    },
  });

  return await buildApiResponse<HomeBannerDetails>(res);
}
