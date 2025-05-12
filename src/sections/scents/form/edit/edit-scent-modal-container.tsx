"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useContext } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { FetchingDataErrorPanel } from "@/components/fetching-data-error-panel/fetching-data-error-panel";
import EditScentFormContainer from "./edit-scent-form-container";
import useScent from "../../hooks/use-scent";


export default function EditScentModalContainer() {
  const { getInfoModal } = useContext(ModalContext);
  const infoModal = getInfoModal(modalTypes.editScentModal.name);
  const id = infoModal && infoModal.entity ? infoModal.entity : null;
  const { scent, loading, error, fetchScent } = useScent({ id });
   console.log(id);
  return (
    <div className="flex flex-1 flex-col h-full w-full">
      {!loading ? (
        scent && !error ? (
          <EditScentFormContainer scent={scent} />
        ) : (
          <FetchingDataErrorPanel
            message={error as string}
            reset={fetchScent}
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
