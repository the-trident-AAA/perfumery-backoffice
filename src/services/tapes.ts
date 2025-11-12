"use server";
import { auth } from "@/auth";
import { buildApiResponse } from "@/lib/api";
import { QueryParamsURLFactory } from "@/lib/request";
import { createFormDataBody } from "@/lib/request-body";
import { apiRoutes, tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { IQueryable } from "@/types/request";
import { Tape, TapeCreateDTO, TapeDetails, TapeEditDTO } from "@/types/tapes";

export async function getTapesList(params: IQueryable) {
  const url = new QueryParamsURLFactory(
    params,
    apiRoutes.tapes.get
  ).build();

  const res = await fetch(url, {
    method: "GET",
    next: { tags: [tagsCacheByRoutes.tapes.multipleTag] },
  });
  console.log(res);
  return await buildApiResponse<Tape[]>(res);
}

export async function getTapeById(id: string) {
  const res = await fetch(apiRoutes.tapes.getById.replace(":id", id), {
    method: "GET",
    next: { tags: [tagsCacheByRoutes.tapes.singleTag] },
  });

  return await buildApiResponse<TapeDetails>(res);
}

export async function createTape(
  tapeCreateDTO: TapeCreateDTO,
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

  const res = await fetch(apiRoutes.tapes.get, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + session.accessToken,
    },
    body: createFormDataBody({
      ...tapeCreateDTO,
      images: formData.getAll("images[]") as File[],
    }),
  });

  return await buildApiResponse<TapeDetails>(res);
}

export async function editTape(
  id: string,
  tapeEditDTO: TapeEditDTO,
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

  const res = await fetch(apiRoutes.tapes.getById.replace(":id", id), {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + session.accessToken,
    },
    body: createFormDataBody({
      ...tapeEditDTO,
      images: formData.getAll("images[]") as File[],
    }),
  });

  return await buildApiResponse<TapeDetails>(res);
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
    apiRoutes.tapes.markedAsMain.replace(":id", id),
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + session.accessToken,
        "content-type": "application/json",
      },
    }
  );

  return await buildApiResponse<TapeDetails>(res);
}

export async function deleteTape(id: string) {
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

  const res = await fetch(apiRoutes.tapes.getById.replace(":id", id), {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + session.accessToken,
      "content-type": "application/json",
    },
  });

  return await buildApiResponse<TapeDetails>(res);
}
