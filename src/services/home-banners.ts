"use server";
import { buildApiResponse } from "@/lib/api";
import { QueryParamsURLFactory } from "@/lib/request";
import { apiRoutes, tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { HomeBanner, HomeBannerDetails } from "@/types/home-banners";
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

  return await buildApiResponse<HomeBanner[]>(res);
}

export async function getHomeBannerById(id: string) {
  const res = await fetch(apiRoutes.homeBanners.getById.replace(":id", id), {
    method: "GET",
    next: { tags: [tagsCacheByRoutes.homeBanners.singleTag] },
  });

  return await buildApiResponse<HomeBannerDetails>(res);
}
