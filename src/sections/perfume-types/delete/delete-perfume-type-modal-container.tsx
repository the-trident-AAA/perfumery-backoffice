"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useCallback, useContext } from "react";
import ConfirmationPanel from "@/components/confirmation-panel/confirmation-panel";
import { revalidateServerTags } from "@/lib/cache";
import { tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { toast } from "react-toastify";
import useDeletePerfumeType from "../hooks/use-delete-perfume-type";

export default function DeletePerfumeTypeModalContainer() {
  const { getInfoModal, handleCloseModal } = useContext(ModalContext);
  const infoModal = getInfoModal(modalTypes.deletePerfumeTypeModal.name);
  const id = infoModal && infoModal.entity ? infoModal.entity : null;
  const { deletePerfumeType, loading } = useDeletePerfumeType({
    id,
    onDeleteAction: () => {
      toast.success("Tipo de Perfume eliminado con éxito");
      onCloseModal();
      revalidateServerTags(tagsCacheByRoutes.perfumeTypes.multipleTag);
    },
  });
  const onCloseModal = useCallback(() => {
    handleCloseModal(modalTypes.deletePerfumeTypeModal.name);
  }, [handleCloseModal]);
  return (
    <ConfirmationPanel
      title={modalTypes.deletePerfumeTypeModal.title || "Elminación de la Marca"}
      message={modalTypes.deletePerfumeTypeModal.message}
      warningMessage={modalTypes.deletePerfumeTypeModal.warningMessage}
      onConfirm={deletePerfumeType}
      onCancel={onCloseModal}
      isLoading={loading}
      isDestructive
    />
  );
}
