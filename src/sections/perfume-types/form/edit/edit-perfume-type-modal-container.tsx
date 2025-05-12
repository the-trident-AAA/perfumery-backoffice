"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useContext } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { FetchingDataErrorPanel } from "@/components/fetching-data-error-panel/fetching-data-error-panel";
import EditPerfumeTypeFormContainer from "./edit-perfum-type-form-container";
import usePerfumeType from "../../hooks/use-perfume-type";


export default function EditPerfumeTypeModalContainer() {
  const { getInfoModal } = useContext(ModalContext);
  const infoModal = getInfoModal(modalTypes.editPerfumeTypeModal.name);
  const id = infoModal && infoModal.entity ? infoModal.entity : null;
  const { perfumeType, loading, error, fetchPerfumeType } = usePerfumeType({ id });
   console.log(id);
  return (
    <div className="flex flex-1 flex-col h-full w-full">
      {!loading ? (
        perfumeType && !error ? (
          <EditPerfumeTypeFormContainer perfumeType={perfumeType} />
        ) : (
          <FetchingDataErrorPanel
            message={error as string}
            reset={fetchPerfumeType}
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
