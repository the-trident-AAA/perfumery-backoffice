"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useCallback, useContext } from "react";
import ConfirmationPanel from "@/components/confirmation-panel/confirmation-panel";
import { revalidateServerTags } from "@/lib/cache";
import { tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import useDeleteScent from "../hooks/use-delete-scent";
import { toast } from "react-toastify";

export default function DeleteScentModalContainer() {
  const { getInfoModal, handleCloseModal } = useContext(ModalContext);
  const infoModal = getInfoModal(modalTypes.deleteScentModal.name);
  const id = infoModal && infoModal.entity ? infoModal.entity : null;
  const { deleteScent, loading, error } = useDeleteScent({
    id,
    onDeleteAction: () => {
      toast.success("Aroma eliminado con éxito");
      onCloseModal();
      revalidateServerTags(tagsCacheByRoutes.scents.multipleTag);
    },
  });
  const onCloseModal = useCallback(() => {
    handleCloseModal(modalTypes.deleteScentModal.name);
  }, [handleCloseModal]);
  return (
    <ConfirmationPanel
      title={modalTypes.deleteScentModal.title || "Elminación del Aroma"}
      message={modalTypes.deleteScentModal.message}
      error={error}
      warningMessage={modalTypes.deleteScentModal.warningMessage}
      onConfirm={deleteScent}
      onCancel={onCloseModal}
      isLoading={loading}
      isDestructive
    />
  );
}
