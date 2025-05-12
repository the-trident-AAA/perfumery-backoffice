"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useContext } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { FetchingDataErrorPanel } from "@/components/fetching-data-error-panel/fetching-data-error-panel";
import useBrand from "../../hooks/use-brand";
import EditBrandFormContainer from "./edit-brand-form-container";

export default function EditBrandModalContainer() {
  const { getInfoModal } = useContext(ModalContext);
  const infoModal = getInfoModal(modalTypes.editBrandModal.name);
  const id = infoModal && infoModal.entity ? infoModal.entity : null;
  const { brand, loading, error, fetchBrand } = useBrand({ id });
   console.log(id);
  return (
    <div className="flex flex-1 flex-col h-full w-full">
      {!loading ? (
        brand && !error ? (
          <EditBrandFormContainer brand={brand} />
        ) : (
          <FetchingDataErrorPanel
            message={error as string}
            reset={fetchBrand}
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
