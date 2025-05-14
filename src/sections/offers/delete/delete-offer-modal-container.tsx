"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useCallback, useContext } from "react";
import ConfirmationPanel from "@/components/confirmation-panel/confirmation-panel";
import { revalidateServerTags } from "@/lib/cache";
import { tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import useDeleteOffer from "../hooks/use-delete-offer";
import { toast } from "react-toastify";

export default function DeleteOfferModalContainer() {
  const { getInfoModal, handleCloseModal } = useContext(ModalContext);
  const infoModal = getInfoModal(modalTypes.deleteOfferModal.name);
  const id = infoModal && infoModal.entity ? infoModal.entity : null;
  const { deleteOffer, loading } = useDeleteOffer({
    id,
    onDeleteAction: () => {
      toast.success("Oferta eliminada con éxito");
      onCloseModal();
      revalidateServerTags(tagsCacheByRoutes.offers.multipleTag);
    },
  });
  const onCloseModal = useCallback(() => {
    handleCloseModal(modalTypes.deleteOfferModal.name);
  }, [handleCloseModal]);
  return (
    <ConfirmationPanel
      title={modalTypes.deleteOfferModal.title || "Elminación de Oferta"}
      message={modalTypes.deleteOfferModal.message}
      warningMessage={modalTypes.deleteOfferModal.warningMessage}
      onConfirm={deleteOffer}
      onCancel={onCloseModal}
      isLoading={loading}
      isDestructive
    />
  );
}
