"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useContext } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { FetchingDataErrorPanel } from "@/components/fetching-data-error-panel/fetching-data-error-panel";
import useOffer from "../hooks/use-offer";
import OfferDetailsContainer from "./offer-details-container";

export default function OfferDetailsModalContainer() {
  const { getInfoModal } = useContext(ModalContext);
  const infoModal = getInfoModal(modalTypes.detailsOfferModal.name);
  const id = infoModal && infoModal.entity ? infoModal.entity : null;
  const { offer, loading, error, fetchOffer } = useOffer({ id });
  return (
    <div className="flex flex-1 flex-col h-full w-full">
      {!loading ? (
        offer && !error ? (
          <OfferDetailsContainer offer={offer} />
        ) : (
          <FetchingDataErrorPanel
            message={error as string}
            reset={fetchOffer}
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
