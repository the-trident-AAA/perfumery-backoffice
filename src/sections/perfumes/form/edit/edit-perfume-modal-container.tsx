"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useContext } from "react";
import usePerfume from "../../hooks/use-perfume";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import EditPerfumeFormContainer from "./edit-perfume-form-container";
import { FetchingDataErrorPanel } from "@/components/fetching-data-error-panel/fetching-data-error-panel";

export default function EditPerfumeModalContainer() {
  const { getInfoModal } = useContext(ModalContext);
  const infoModal = getInfoModal(modalTypes.editPerfumeModal.name);
  const id = infoModal && infoModal.entity ? infoModal.entity : null;
  const { perfume, loading, error, fetchPerfume } = usePerfume({ id });
  return (
    <div className="flex flex-1 flex-col h-full w-full">
      {!loading ? (
        perfume && !error ? (
          <EditPerfumeFormContainer perfume={perfume} />
        ) : (
          <FetchingDataErrorPanel
            message={error as string}
            reset={fetchPerfume}
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
