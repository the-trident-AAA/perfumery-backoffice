"use server";
import { auth } from "@/auth";
import { buildApiResponse } from "@/lib/api";
import { QueryParamsURLFactory } from "@/lib/request";
import { apiRoutes, tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { Order, OrderDetails, OrderEditDTO } from "@/types/orders";
import { PaginationResponse } from "@/types/pagination";
import { IQueryable } from "@/types/request";

export async function getOrdersList(params: IQueryable) {
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

  const url = new QueryParamsURLFactory(params, apiRoutes.orders.get).build();

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + session.accessToken,
      "content-type": "application/json",
    },
    next: { tags: [tagsCacheByRoutes.orders.multipleTag] },
  });

  return await buildApiResponse<PaginationResponse<Order>>(res);
}

export async function getOrderById(id: string) {
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

  const res = await fetch(apiRoutes.orders.getById.replace(":id", id), {
    method: "GET",
    headers: {
      Authorization: "Bearer " + session.accessToken,
      "content-type": "application/json",
    },
    next: { tags: [tagsCacheByRoutes.orders.singleTag] },
  });

  return await buildApiResponse<OrderDetails>(res);
}

export async function editOrder(id: string, orderEditDTO: OrderEditDTO) {
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

  const res = await fetch(apiRoutes.orders.getById.replace(":id", id), {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + session.accessToken,
      "content-type": "application/json",
    },
    body: JSON.stringify(orderEditDTO),
  });

  return await buildApiResponse<OrderDetails>(res);
}
