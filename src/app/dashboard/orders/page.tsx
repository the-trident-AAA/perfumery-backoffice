import OrdersContainer from "@/sections/orders/order-container";
import { getOrdersList } from "@/services/orders";
import { SearchParamsPagination } from "@/types/pagination";
import React from "react";

type Props = {
  searchParams: Promise<SearchParamsPagination>;
};

export default async function OrdersPage({ searchParams }: Props) {
  const res = await getOrdersList(await searchParams);

  if (!res.response || res.error) throw new Error("Error fetching orders");

  return (
    <>
      <OrdersContainer orders={res.response} />
    </>
  );
}
