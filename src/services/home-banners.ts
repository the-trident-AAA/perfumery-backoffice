"use server";
import { auth } from "@/auth";
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

  const res = await fetch(apiRoutes.homeBanners.get, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + session.accessToken,
    },
    body: createFormDataBody({
      ...homeBannerCreateDTO,
      image: formData.get("image"),
    }),
  });

  return await buildApiResponse<HomeBannerDetails>(res);
}

export async function editHomeBanner(
  id: string,
  homeBannerEditDTO: HomeBannerEditDTO,
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

  const res = await fetch(apiRoutes.homeBanners.getById.replace(":id", id), {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + session.accessToken,
    },
    body: createFormDataBody({
      ...homeBannerEditDTO,
      image: formData.get("image"),
    }),
  });

  return await buildApiResponse<HomeBannerDetails>(res);
}

export async function markedAsMain(id: string) {
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

  const res = await fetch(
    apiRoutes.homeBanners.markedAsMain.replace(":id", id),
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + session.accessToken,
        "content-type": "application/json",
      },
    }
  );

  return await buildApiResponse<HomeBannerDetails>(res);
}

export async function deleteHomeBanner(id: string) {
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

  const res = await fetch(apiRoutes.homeBanners.getById.replace(":id", id), {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + session.accessToken,
      "content-type": "application/json",
    },
  });

  return await buildApiResponse<HomeBannerDetails>(res);
}
