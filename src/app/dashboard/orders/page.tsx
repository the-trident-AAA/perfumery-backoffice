import Modal from "@/components/modal/modal";
import { modalTypes } from "@/components/modal/types/modalTypes";
import OrderDetailsModalContainer from "@/sections/orders/details/order-details-modal-container";
import EditOrderModalContainer from "@/sections/orders/form/edit/edit-order-modal-container";
import OrdersContainer from "@/sections/orders/orders-container";
import { getOrdersList } from "@/services/orders";
import { SearchParamsPagination } from "@/types/pagination";
import React from "react";

type Props = {
  searchParams: Promise<SearchParamsPagination>;
};

export default async function OrdersPage({ searchParams }: Props) {
  const res = await getOrdersList(await searchParams);

  if (!res.response || res.error) throw new Error("Error fetching orders");

  const pagination = res.response.paginationMeta;

  return (
    <>
      <OrdersContainer orders={res.response.data} apiPagination={pagination} />
      <Modal
        formPath={modalTypes.detailsOrderModal.name}
        title={modalTypes.detailsOrderModal.title}
        maxWidth="max-w-3xl"
        className="min-h-[65vh]"
      >
        <OrderDetailsModalContainer />
      </Modal>
      <Modal
        formPath={modalTypes.editOrderModal.name}
        title={modalTypes.editOrderModal.title}
        maxWidth="max-w-3xl"
      >
        <EditOrderModalContainer />
      </Modal>
    </>
  );
}
