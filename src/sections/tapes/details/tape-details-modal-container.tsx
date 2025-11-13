"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useContext } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { FetchingDataErrorPanel } from "@/components/fetching-data-error-panel/fetching-data-error-panel";
import useTape from "../hooks/use-tape";
import TapeDetailsContainer from "./tape-details-container";

export default function TapeDetailsModalContainer() {
  const { getInfoModal } = useContext(ModalContext);
  const infoModal = getInfoModal(modalTypes.detailsTapeModal.name);
  const id = infoModal && infoModal.entity ? infoModal.entity : null;
  const { tape, loading, error, fetchTape } = useTape({ id });
  return (
    <div className="flex flex-1 flex-col h-full w-full">
      {!loading ? (
        tape && !error ? (
          <TapeDetailsContainer tape={tape} />
        ) : (
          <FetchingDataErrorPanel message={error as string} reset={fetchTape} />
        )
      ) : (
        <div className="flex justify-center flex-1 items-center h-full w-full">
          <LoadingSpinner size={100} />
        </div>
      )}
    </div>
  );
}
