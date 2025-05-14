"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useContext } from "react";
import SelectablePerfumes from "./selectable-perfumes";
import usePerfumes from "../../hooks/use-perfumes";
import { FetchingDataErrorPanel } from "@/components/fetching-data-error-panel/fetching-data-error-panel";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Perfume } from "@/types/perfumes";

export default function SelectablePerfumesModalContainer() {
  const { getInfoModal } = useContext(ModalContext);
  const infoModal = getInfoModal(modalTypes.selectablePerfumesModal.name);
  const selectedPerfumes =
    infoModal && infoModal.elements ? (infoModal.elements as Perfume[]) : null;
  const action =
    infoModal && infoModal.actionInsert ? infoModal.actionInsert : null;
  const { perfumes, loadingData, error, fetchPerfumes } = usePerfumes();
  return (
    <div className="flex flex-1 flex-col h-full w-full">
      {!loadingData ? (
        !error ? (
          <SelectablePerfumes
            perfumes={perfumes.filter(
              (perfume) =>
                !selectedPerfumes?.some(
                  (selectedPerfume) => perfume.id === selectedPerfume.id
                )
            )}
            action={action as (perfumes: Perfume[]) => void}
          />
        ) : (
          <FetchingDataErrorPanel
            message={error as string}
            reset={fetchPerfumes}
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
