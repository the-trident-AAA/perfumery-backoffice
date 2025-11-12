"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useCallback, useContext } from "react";
import ConfirmationPanel from "@/components/confirmation-panel/confirmation-panel";
import { revalidateServerTags } from "@/lib/cache";
import { tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import useDeleteBrand from "../hooks/use-delete-brand";
import { toast } from "react-toastify";

export default function DeleteTapeModalContainer() {
  const { getInfoModal, handleCloseModal } = useContext(ModalContext);
  const infoModal = getInfoModal(modalTypes.deleteTapeModal.name);
  const id = infoModal && infoModal.entity ? infoModal.entity : null;
  const { deleteTape, loading, error } = useDeleteTape({
    id,
    onDeleteAction: () => {
      toast.success("Cinta eliminada con éxito");
      onCloseModal();
      revalidateServerTags(tagsCacheByRoutes.tapes.multipleTag);
    },
  });
  const onCloseModal = useCallback(() => {
    handleCloseModal(modalTypes.deleteTapeModal.name);
  }, [handleCloseModal]);
  return (
    <ConfirmationPanel
      title={modalTypes.deleteTapeModal.title || "Elminación de la Cinta"}
      error={error}
      message={modalTypes.deleteTapeModal.message}
      warningMessage={modalTypes.deleteTapeModal.warningMessage}
      onConfirm={deleteTape}
      onCancel={onCloseModal}
      isLoading={loading}
      isDestructive
    />
  );
}
