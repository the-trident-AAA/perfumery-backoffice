"use server";
import { buildApiResponse } from "@/lib/api";
import { QueryParamsURLFactory } from "@/lib/request";
import { apiRoutes, tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { Order, OrderDetails, OrderEditDTO } from "@/types/orders";
import { PaginationResponse } from "@/types/pagination";
import { IQueryable } from "@/types/request";

export async function getOrdersList(params: IQueryable) {
  const url = new QueryParamsURLFactory(params, apiRoutes.orders.get).build();

  const res = await fetch(url, {
    method: "GET",
    next: { tags: [tagsCacheByRoutes.orders.multipleTag] },
  });

  return await buildApiResponse<PaginationResponse<Order>>(res);
}

export async function getOrderById(id: string) {
  const res = await fetch(apiRoutes.orders.getById.replace(":id", id), {
    method: "GET",
    next: { tags: [tagsCacheByRoutes.orders.singleTag] },
  });

  return await buildApiResponse<OrderDetails>(res);
}

export async function editOrder(id: string, orderEditDTO: OrderEditDTO) {
  const res = await fetch(apiRoutes.orders.getById.replace(":id", id), {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + "token",
      "content-type": "application/json",
    },
    body: JSON.stringify(orderEditDTO),
  });

  return await buildApiResponse<OrderDetails>(res);
}
