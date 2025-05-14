"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useCallback, useContext } from "react";
import ConfirmationPanel from "@/components/confirmation-panel/confirmation-panel";
import { revalidateServerTags } from "@/lib/cache";
import { tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import useDeleteHomeBanner from "../hooks/use-delete-home-banner";

export default function DeleteHomeBannerModalContainer() {
  const { getInfoModal, handleCloseModal } = useContext(ModalContext);
  const infoModal = getInfoModal(modalTypes.deleteHomeBannerModal.name);
  const id = infoModal && infoModal.entity ? infoModal.entity : null;
  const { deleteHomeBanner, loading } = useDeleteHomeBanner({
    id,
    onDeleteAction: () => {
      onCloseModal();
      revalidateServerTags(tagsCacheByRoutes.homeBanners.multipleTag);
    },
  });
  const onCloseModal = useCallback(() => {
    handleCloseModal(modalTypes.deleteHomeBannerModal.name);
  }, [handleCloseModal]);
  return (
    <ConfirmationPanel
      title={
        modalTypes.deleteHomeBannerModal.title || "Elminación de Home Banner"
      }
      message={modalTypes.deleteHomeBannerModal.message}
      warningMessage={modalTypes.deleteHomeBannerModal.warningMessage}
      onConfirm={deleteHomeBanner}
      onCancel={onCloseModal}
      isLoading={loading}
      isDestructive
    />
  );
}
