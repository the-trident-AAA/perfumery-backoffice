"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useContext } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { FetchingDataErrorPanel } from "@/components/fetching-data-error-panel/fetching-data-error-panel";
import useHomeBanner from "../hooks/use-home-banner";
import HomeBannerDetailsContainer from "./home-banner-details-container";

export default function HomeBannerDetailsModalContainer() {
  const { getInfoModal } = useContext(ModalContext);
  const infoModal = getInfoModal(modalTypes.detailsHomeBannerModal.name);
  const id = infoModal && infoModal.entity ? infoModal.entity : null;
  const { homeBanner, loading, error, fetchHomeBanner } = useHomeBanner({ id });
  return (
    <div className="flex flex-1 flex-col h-full w-full">
      {!loading ? (
        homeBanner && !error ? (
          <HomeBannerDetailsContainer homeBanner={homeBanner} />
        ) : (
          <FetchingDataErrorPanel
            message={error as string}
            reset={fetchHomeBanner}
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
