"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useContext } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { FetchingDataErrorPanel } from "@/components/fetching-data-error-panel/fetching-data-error-panel";
import useOrder from "../../hooks/use-order";
import EditOrderFormContainer from "./edit-order-form-container";

export default function EditOrderModalContainer() {
  const { getInfoModal } = useContext(ModalContext);
  const infoModal = getInfoModal(modalTypes.editOrderModal.name);
  const id = infoModal && infoModal.entity ? infoModal.entity : null;
  const { order, loading, error, fetchOrder } = useOrder({ id });
  return (
    <div className="flex flex-1 flex-col h-full w-full">
      {!loading ? (
        order && !error ? (
          <EditOrderFormContainer order={order} />
        ) : (
          <FetchingDataErrorPanel
            message={error as string}
            reset={fetchOrder}
          />
        )
      ) : (
        <div className="flex justify-center flex-1 items-center h-full w-full">
          <LoadingSpinner size={100} />
        </div>
      )}
    </div>
  );
}
